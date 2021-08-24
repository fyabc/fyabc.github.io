---
layout: post
title: IDE连接SSH
# description: 
permalink: /technique-notes/ide-ssh
categories: [VSCode, SSH]
---

## VSCode连接SSH

### 链接

<https://code.visualstudio.com/docs/remote/ssh>

### 步骤

1. 安装VSCode SSH插件
2. 设置储存的配置文件，通常设为`~/.ssh/vscode_config`
3. 远程资源管理器中添加新的SSH目标：命令中加入`-i`私钥
4. 命令会转化为配置信息记录在配置文件中

## PyCharm连接SSH

### 链接

<https://www.jetbrains.com/help/pycharm/remote-debugging-with-product.html#remote-debug-config>

### 步骤

**TODO**
