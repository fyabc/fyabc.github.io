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
3. Docker拉取交互运行一个容器：
   1. `docker pull registry-name`
   2. `docker run -itd --name test registry-name /bin/bash`
4. Docker每个命令都在一个独立的容器中运行，因此`RUN cd xxx`在后续的命令中没有效果，需要使用`WORKDIR`代替。
5. 挂载本地目录：`--mount`选项
   1. 不好处理目录中的符号链接，需要在容器内部做链接
