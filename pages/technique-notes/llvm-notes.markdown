---
layout: post
title: Shell技巧
description: Shell脚本技巧知识
permalink: /technique-notes/llvm-notes
categories: [LLVM, 技巧]
---

## Windows上为CLion配置LLVM+Clang工具链

1. <https://clang.llvm.org/get_started.html>

```bash
# Run in WSL bash
# Need to install git and cmake

PARENT=/path/to/root
cd ${PARENT}
git clone https://github.com/llvm/llvm-project.git
cd llvm-project
ROOT=$(pwd)

# Install LLVM and Clang
mkdir -p build
mkdir -p out
cd build
cmake -DLLVM_ENABLE_PROJECTS="clang;lldb" -DLLVM_ENABLE_RUNTIMES=libcxx -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=../out -G "Unix Makefiles" ../llvm
make -j8
make install
```

2. 在CLion中，选择添加WSL工具链，将clang, clang++, lldb分别设置为C/C++编译器和调试器即可。
