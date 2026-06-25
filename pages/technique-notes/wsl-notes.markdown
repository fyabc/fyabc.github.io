---
layout: post
title: WSL技巧
description: WSL (Windows Subsystem for Linux)脚本技巧知识
permalink: /technique-notes/wsl-notes
categories: [WSL, 技巧]
---

## 20251227 安装WSL

1. 从MS商店下载“ubuntu"
2. 点击“打开”，报错需要启动虚拟化
3. 
    1. "Windows功能" -> 打开“虚拟机平台”
    2. 重启
4. 修改WSL安装路径：

```powershell
wsl.exe --export Ubuntu D:\Ubuntu.tar
wsl.exe --unregister Ubuntu
wsl.exe --import Ubuntu D:\WSLRoot\Ubuntu D:\Ubuntu.tar

# 修改默认用户
ubuntu.exe config --default-user fyabc

# 登入wsl
wsl.exe

# 移动HOME
usermod --home /mnt/d/WSLRoot/Ubuntu/home --move-home fyabc

# 在文件资源管理器中，输入 \\wsl$\Ubuntu\home\fyabc 能找到原始home目录，把下面的东西搬到新home下
```

## 20251227 WSL中安装 vllm

```bash
sudo apt update
sudo apt install python3 python-is-python3
sudo apt install python3-pip

sudo pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
sudo pip config set install.trusted-host mirrors.aliyun.com
sudo pip install uv --break-system-packages

# 安装CUDA
mkdir -p ~/software
cd ~/software
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update
sudo apt-get -y install cuda-toolkit-12-8

# 加到~/.bashrc中
export PATH="/usr/local/cuda/bin:$PATH"
export LD_LIBRARY_PATH="/usr/local/cuda/lib64:$LD_LIBRARY_PATH"

# 创建venv
cd ~
mkdir -p uv-envs/dev-py312
uv venv --python 3.12 --seed uv-envs/dev-py312
source uv-envs/dev-py312/bin/activate
# 把这一行加到~/.bashrc中
export UV_DEFAULT_INDEX="https://mirrors.aliyun.com/pypi/simple/"

uv pip install vllm --torch-backend=auto
uv pip install ipython

uv cache clean
pip cache purge
```

## 20251227 WSL中下载并运行Qwen on vllm

- 结果：失败（`NVML初始化报错`）

```bash
mkdir -p ~/models
cd ~/models

sudo apt install git-lfs
git lfs install

git clone https://www.modelscope.cn/Qwen/Qwen3-4B-FP8.git
git clone https://www.modelscope.cn/Qwen/Qwen3-0.6B.git

mkdir -p ~/code/LLMCode
cd code/LLMCode

# copy from <https://github.com/vllm-project/vllm/blob/main/examples/offline_inference/basic/chat.py>
vim vllm_basic_chat.py
```

## 20251227 WSL中下载并运行Qwen on transformers

- 上述方法已经安装好transformers
