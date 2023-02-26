#include "crow_all.h"
#include <cstdlib>
#include <iostream>
#include <unistd.h>
#include <unordered_set>
#include <thread>

std::unordered_set<crow::websocket::connection*> users;
std::mutex mtx;

std::string mock_data(){
    std::string result = "";
    for(auto i=0; i<10; i++){
        result.append(std::to_string(rand() % 100 + 2));
        if (i!=9){
            result.append(" ");
        }
    }
    return result;
}

void loop(){
    while (true){
        for(std::unordered_set<crow::websocket::connection*>::iterator it = users.begin(); it != users.end(); ++it){
            (*it)->send_text(mock_data());
        }
        std::this_thread::sleep_for(std::chrono::milliseconds());
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
        })
        .onclose([&](crow::websocket::connection& conn, const std::string& reason){
            CROW_LOG_INFO << "Socket connection closed";
            std::lock_guard<std::mutex> _(mtx);
            users.erase(&conn);
        });

    CROW_ROUTE(app, "/heartbeat")([](){
        return "Success!";
    });

    std::thread t1(loop);

    app.port(port).run();
}