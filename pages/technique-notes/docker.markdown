---
layout: post
title: Docker笔记
description: 
permalink: /technique-notes/docker
categories: [Docker]
---

## 教程

1. Docker实践： <https://yeasy.gitbook.io/docker_practice/>

## 遇到的问题

1. Docker中的CMD命令与前台后台：<https://yeasy.gitbook.io/docker_practice/image/dockerfile/cmd>
   1. Docker容器中所有的东西都要以前台运行，因此`systemd`等守护进程不能使用
2. Docker中的`systemctl`替代品：<https://github.com/gdraheim/docker-systemctl-replacement>
   1. 用法：参考<https://github.com/gdraheim/docker-systemctl-images>
   2. 目前实验，对安装docker没用，报错：`ERROR:systemctl:Unit docker.service not found.`
3. Docker交互运行一个容器：
   1. `docker run -itd --name test registry-name`
   2. `docker exec -it test /bin/bash`
