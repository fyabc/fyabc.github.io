---
layout: post
title: 杂项笔记
description: 一些简单的知识点，以链接为主
permalink: /technique-notes/misc-notes
categories: [杂项，技巧]
---

## General

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
11. Copy folders using scp on 跳板机：先打开`ssh gcrazgdl0180-scp`，然后`scp -P 22222 -r localhost:/scratch/my_output/valid-nox-000[7-9]?? .`
12. 使用`amlt`提交CPU job：
    1. YAML: `target.name: itplabrr1cl1`
    2. YAML: `target.vc: gcrcpu`
    3. YAML: `sku: 64C8`
    4. 在CPU上运行PyTorch时会遇到[错误](https://github.com/pytorch/pytorch/issues/37377)：

      ```text
      Error: mkl-service + Intel® MKL: MKL_THREADING_LAYER=INTEL is incompatible with libgomp.so.1 library.
      ```

      在运行前设置环境变量：`MKL_THREADING_LAYER=GNU`即可。
13. Bug: 远程生成的TensorBoard Events在本地打开出错（E0111）
    1. 在远程机器上运行TensorBoard：<https://stackoverflow.com/a/40413202>
       1. 利用Local forwarding，使用`ssh -L 16006:127.0.0.1:6006 -p 30704 t-yafan@phlrr3104.guest.corp.microsoft.com`连接远程机器，在远程机器上启动TensorBoard
       2. 然后本地`http://localhost:16006`即可运行。
14. GCR上挂载Blob
    1. <https://docs.microsoft.com/en-us/azure/storage/blobs/storage-how-to-mount-container-linux>
    2. Command: `sudo blobfuse ~/mycontainer --tmp-path=/mnt/blobfusetmp  --config-file=/home/t-yafan/fuse_connection.cfg -o attr_timeout=240 -o entry_timeout=240 -o negative_timeout=120 -o allow_other`
15. Windows全屏游戏任务栏不隐藏：重启文件资源管理器
16. `amlt`备忘录
    1. `amlt`设置默认实验：<https://phillytools.azurewebsites.net/main/advanced/0_default_experiments.html>
    2. `amlt run`报错：

        ```text
        CC Connection error while attempting to download azcopy 10.12.2. You could also install the specified azcopy version to C:\Users\v-yaf\AppData\Roaming\amulet manually. (<urlopen error [Errno 11001] getaddrinfo failed>)
        ```

        解决方法：在Python中：

        ```python
        from amlt import azcopy
        iloc = azcopy._get_default_install_location()
        azcopy.AzCopy.install_azcopy(iloc)
        # 可以在文件夹下检查iloc是否安装了azcopy
        ```

    3. 连接SSH：`amlt ssh :job_name`

## Visual Studio Code

1. VSCode隐藏某些文件：<https://paulnelson.ca/posts/hiding-pycache-files-in-vscode>
