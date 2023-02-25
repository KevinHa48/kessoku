cd %temp%
mkdir kessoku
cd kessoku

::Install VCPKG
git clone https://github.com/Microsoft/vcpkg.git
.\vcpkg\bootstrap-vcpkg.bat -disableMetrics
vcpkg install openssl --triplet x64-windows-release
SET OPENSSL_ROOT=path\installed\x64-windows-release

::Install Boost
git clone --recursive https://github.com/boostorg/boost.git
.\boost\bootstrap.bat