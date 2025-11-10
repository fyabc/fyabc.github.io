---
layout: post
title: Shell技巧
description: Shell脚本技巧知识
permalink: /technique-notes/llvm-notes
categories: [LLVM, 技巧]
---

## Windows上为CLion配置LLVM+Clang工具链

1. 安装windows预编译的LLVM+Clang

- <https://github.com/vovkos/llvm-package-windows> 从此处下载，解压，加PATH即可。

2. 在CLion中，选择添加WSL工具链，将clang, clang++, lldb分别设置为C/C++编译器和调试器即可。
