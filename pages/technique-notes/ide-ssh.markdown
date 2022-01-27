---
layout: post
title: SSH以及IDE连接SSH
# description: 
permalink: /technique-notes/ide-ssh
categories: [VSCode, PyCharm, JetBrains, SSH]
---

## SSH相关

1. `ssh-agent`：SSH密钥管理器
   1. 运行：`eval $(ssh-agent)`
   2. 检查是否运行：检查环境变量`SSH_AGENT_SOCK`或`SSH_AUTH_SOCK`
   3. 目前管理的密钥：`ssh-add -l`
   4. 添加密钥：`ssh-add private-key-file`
2. 设置默认密钥：在`~/.ssh/config`中添加：`IdentityFile private-key-file`
3. 通过Jumptainer登入GCR Linux GPU Servers (GCRAZGDLxxx)
   1. 在本机使用Local forwarding登入跳板机：`ssh -L 22:10.8.17.108:22 FAREAST.t-yafan@jumptainer.westus2.cloudapp.azure.com -p 22222`
      1. `-L port1:address:port2`：指将`localhost:port1`绑定到`address:port2`上
      2. 可选：在跳板机上运行`watch -n 60 ls`，防止中途断掉
   2. 在本机登入目标机器：`ssh FAREAST.t-yafan@127.0.0.1`

4. 连接

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
