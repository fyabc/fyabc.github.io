---
layout: post
title: 杂项笔记
description: 一些简单的知识点，以链接为主
permalink: /technique-notes/misc-notes
categories: [杂项，技巧]
---

1. Linux挂载Azure Blob: <https://docs.microsoft.com/en-us/azure/storage/blobs/storage-how-to-mount-container-linux>
2. 使用VSCode在线浏览GitHub仓库：在仓库的GitHub目录下，将`github.com`改为`github1s.com`
3. All-In-One Note: [Notion](https://www.notion.so/zh-cn)
4. 在WSL挂载UNC path: `sudo mount -t drvfs '\\msralab\ProjectData\LA' /mnt/LA` (先建立`/mnt/LA`目录)
5. [Electron](https://www.electronjs.org/): 一个使用JavaScript的桌面GUI库
6. Powershell中使用SSH连接时遇到问题："Bad owner or permissions on C:\Users\XXX/.ssh/config"
   1. 解决办法：<https://stackoverflow.com/a/58275268> (修改.ssh文件夹属性)
7. 尝试在GCR Linux GPU Dev Node中挂载UNC Path `\\msralab\ProjectData\LA`:
   1. <https://dev.azure.com/msresearch/GCR/_wiki/wikis/GCR.wiki/532/Mounting-CIFS-on-Linux>
   2. `sudo mount.cifs //msralab/ProjectData/LA /mnt/LA --verbose -o cruid=$(id -u),uid=$(id -u),gid=$(id -g),nounix,serverino,mapposix,file_mode=0777,dir_mode=0777,noforceuid,vers=2.1,domain=FAREAST,username=t-yafan`
   3. **失败**："mount error: could not resolve address for msralab: Unknown error"
8. 连接Internet-first GCR Windows Server: 见邮件
   1. 连接Jumptainer，保持开启
   2. 连接`localhost:XXXXX`，使用PIN登录（必须用笔记本自己或Remote到工位电脑登录）
   3. 挂载本地Drive：在Show Options -> Local Resources -> Local devices and resources -> Add drives
9. 在WSL上安装Anaconda/Miniconda: <https://gist.github.com/kauffmanes/5e74916617f9993bc3479f401dfec7da>
10. 更新WSL的Ubuntu系统本身：<https://wsl-guide-cn.readthedocs.io/zh_CN/latest/update.html>
    1. <https://clay-atlas.com/us/blog/2020/08/03/linux-en-note-how-to-upgrade-to-new-release/>
11. Bash manage jobs:
    1. `jobs`显示所有运行任务
    2. `kill %1`终止1号任务
12. Copy folders using scp on 跳板机：先打开`ssh gcrazgdl0180-scp`，然后`scp -P 22222 -r localhost:/scratch/my_output/valid-nox-000[7-9]?? .`
