#include "crow_all.h"
#include <cstdlib>
#include <iostream>
#include <unordered_set>
#include <thread>
#include "AudioLogic.h"

std::unordered_set<crow::websocket::connection*> users;
std::mutex mtx;
AudioLogic* logic;

std::string parse_data(){
    std::vector<float> data;
    std::copy (data.begin(), data.end(), logic->data_buffer);
    std::string result;
    for(unsigned long i=0; i<data.size(); i++){
        result.append(std::to_string(data[i]));
        if (i != data.size()-1){
            result.append(" ");
        }
    }
    return result;
}

[[noreturn]] void loop() {
    while (true) {
        if (logic->data_buffer != nullptr) {
            for (auto user: users) {
                user->send_text(parse_data());
            }
        }
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
}

int main()
{
    crow::SimpleApp app;
    int port = 18080;

    CROW_ROUTE(app, "/audio")
        .websocket()
        .onopen([&](crow::websocket::connection& conn){
            CROW_LOG_INFO << "Socket connection established";
            std::lock_guard<std::mutex> _(mtx);
            users.insert(&conn);
            if (users.size() == 1){
                logic = new AudioLogic();
            }
        })
        .onclose([&](crow::websocket::connection& conn, const std::string& reason){
            CROW_LOG_INFO << "Socket connection closed";
            std::lock_guard<std::mutex> _(mtx);
            users.erase(&conn);
            if (users.size() == 0 && logic != NULL){
                free(logic);
            }
        });

    CROW_ROUTE(app, "/heartbeat")([](){
        return "Success!";
    });

    std::thread t1(loop);

    app.port(port).run();
}