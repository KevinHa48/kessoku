#include "crow_all.h"
#include <unordered_set>
#include <thread>
#include <fcntl.h>

std::unordered_set<crow::websocket::connection*> users;
std::mutex mtx;

char * fifoPipe = "/tmp/kessoku_data";

char data[1024];

void update(){
    while (true){
        int fd;
        fd = open(fifoPipe, O_RDONLY);
        read(fd, data, sizeof(data));
        memset(data, 0, sizeof(data));
        close(fd);
    }
}

[[noreturn]] void loop() {
    while (true) {
        if (data != nullptr) {
            std::string result;
            result.append(data);
            for (auto user: users) {
                user->send_text(result);
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
    std::thread t2(update);

    app.port(port).run();
}