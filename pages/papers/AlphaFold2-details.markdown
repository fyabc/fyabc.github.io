---
layout: post
title: AlphaFold2论文笔记（附录篇）
description: AlphaFold2论文、附录及用法
permalink: /research-notes/AlphaFold2-details
categories: [model.AlphaFold2]
local_repo: https://github.com/fyabc/off-AF2/blob/master
---

## 1.1-Notations

1. 主序列中的残基数量$$N_{res}$$，模型中使用的模板数量$$N_{templ}$$，所有可用的MSA序列数量$$N_{all\_seq}$$，MSA聚类后的聚类数量$$N_{clust}$$，MSA stack中处理的序列数$$N_{seq} = N_{clust} + N_{templ}$$，（降采样后）未聚类的MSA序列数$$N_{extra\_seq}$$
2. Evoformer层数$$N_{block}$$，ensemble迭代次数$$N_{ensemble}$$，循环次数$$N_{cycle}$$
3. 几何变换帧（frame）：$$T = (R, \vec{\mathbf{t}}) \in (\mathbb{R}^{3\times 3}, \mathbb{R}^3)$$ （旋转 + 平移）
   1. 给定三维坐标$$\vec{\mathbf{x}}$$，$$\vec{\mathbf{x}_{result}} = T \circ \vec{\mathbf{x}} = R\vec{\mathbf{x}} + \vec{\mathbf{t}}$$

## 1.2-数据流

1. Input: an mmCIF file (in training mode) or a FASTA file (in inference mode)
   1. [mmCIF格式介绍](https://pdb101.rcsb.org/learn/guide-to-understanding-pdb-data/beginner%E2%80%99s-guide-to-pdb-structures-and-the-pdbx-mmcif-format)
2. Output: Model features
3. Parsing: 对于mmCIF，抽取序列，原子坐标，发布时间，名称和分辨率，此外进行一些数据清理
   1. **NOTE**：此处的数据清理可能对我们有用（处理多个原子/残基坐标，选择占有率（occupancy）最高的那个），change MSE（硒代甲硫氨酸）into MET（甲硫氨酸）（其他硒代氨基酸应该也要替换），以及处理精氨酸的命名歧义（保证NH1总是比NH2更接近CD））
4. Genetic search
   1. [JackHMMER](http://eddylab.org/software/hmmer/Userguide.pdf)
   2. [HHBlits](http://sysbio.rnet.missouri.edu/bdm_download/DeepRank_db_tools/tools/DNCON2/hhsuite-2.0.16-linux-x86_64/hhsuite-userguide.pdf)
   3. 输出MSA去重并堆叠起来
5. Template search

### 1.2.7-MSA聚类

## 1.6-Evoformer

### 1.6.1-MSA row-wise gated self-attention with pair bias

### 1.6.4-外积模块

### 1.6.5-三角形乘法更新

### 1.6.6-三角形self-attention

## 1.8-结构模块

## 1.8.1-从原子位置构造骨架

### 1.8.2-IPA

### 1.8.4-计算所有原子坐标

### 1.8.6-Amber松弛

## 1.9-损失函数和辅助Heads

### 1.9.1-侧链和骨架扭转角损失函数

1. 扭转角：<https://zh.wikipedia.org/wiki/%E4%BA%8C%E9%9D%A2%E8%A7%92#%E7%AB%8B%E4%BD%93%E5%8C%96%E5%AD%A6>

## 1.12-CASP14评估

## 1.16-Attention可视化
