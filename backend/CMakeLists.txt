cmake_minimum_required(VERSION 3.2.0)
project(backend)

find_package(Boost COMPONENTS REQUIRED)
if(Boost_FOUND)
    add_executable(main main.cpp)
    target_link_libraries(main ${Boost_LIBRARIES})
endif()

