---
layout: post
title: Shell技巧
description: Shell脚本技巧知识
permalink: /technique-notes/shell-notes
categories: [Shell, 技巧]
---

1. Bash manage jobs:
    1. `jobs`显示所有运行任务
    2. `kill %1`终止1号任务
2. Bash打印某行: `sed 'NUMq;d' filename`
3. PowerShell读写环境变量：
   1. `$Env:SomeEnvVar = 'True'`
   2. `echo $Env:SomeEnvVar`
4. Bash 删除所有匹配的行，除了第一行（用于若干CSV文件合成等）：`sed '1!{/^header/d;}' in.txt > out.txt`
