cmake_minimum_required(VERSION 3.15)

project(backend VERSION 0.0.1)

if(APPLE)
        link_directories("/opt/homebrew/lib")
        include_directories("/opt/homebrew/include")
endif(APPLE)

add_executable(backend main.cpp)

find_package(Boost COMPONENTS REQUIRED)
if(Boost_FOUND)
        target_link_libraries(backend ${Boost_LIBRARIES})
endif()