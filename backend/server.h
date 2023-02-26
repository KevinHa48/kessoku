#include "crow_all.h"
#include <cstdlib>
#include <iostream>
#include <unordered_set>
#include <thread>
#include "AudioLogic.h"

std::unordered_set<crow::websocket::connection*> users;
std::mutex mtx;

std::string parse_data(AudioLogic* logic){
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

[[noreturn]] void loop(AudioLogic* logic) {
    while (true) {
        if (logic->data_buffer != nullptr) {
            for (auto user: users) {
                user->send_text(parse_data(logic));
            }
        }
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
}

void start_server(AudioLogic* logic)
{
    crow::SimpleApp app;
    int port = 18080;

    CROW_ROUTE(app, "/audio")
        .websocket()
        .onopen([&](crow::websocket::connection& conn){
            CROW_LOG_INFO << "Socket connection established";
            std::lock_guard<std::mutex> _(mtx);
            users.insert(&conn);
        })
        .onclose([&](crow::websocket::connection& conn, const std::string& reason){
            CROW_LOG_INFO << "Socket connection closed";
            std::lock_guard<std::mutex> _(mtx);
            users.erase(&conn);
        });

    CROW_ROUTE(app, "/heartbeat")([](){
        return "Success!";
    });

    std::thread t1(loop, logic);

    app.port(port).run();
}