---
layout: post
title: LiGANN
# description: 描述
permalink: /research-notes/LiGANN
categories: [task.Tgt2Drug, task.BindingPocket2Drug, tech.GAN, dataset.DUD-E]
---

## 链接

- 主页：<https://pubs.acs.org/doi/pdf/10.1021/acs.molpharmaceut.9b00634>
- 正文：本地PDF(Biomedical/same title)
- 附件：<https://xxx>
- 代码：<https://xxx>
- 其他笔记：
  - <https://xxx>

## 信息

- Name: From Target to Drug - Generative Modeling for the Multimodal Structure-Based Ligand Design
- Abbr: **LiGANN**
- Author: Miha Skalic, Davide Sabbadin, Boris Sattarov, Simone Sciabola, and Gianni De Fabritiis
- Affiliation: PRBB
- Preprint/Received Time: 2019.06.07
- Published Time: 2019.08.22
- Conference / Journal: Molecular Pharmaceutics (IF: 4.321)
- Citation: **12** (2021.09.02)
- Dataset: DUD-E
- Main Method: BicycleGAN

## 文章解读

1. 主要方法：通过Binding Pocket使用GAN生成配体形状(Ligand Shapes)，然后通过Shape Captioning网络生成Compounds

### 之前工作

1. 之前典型的基于结构的从头生成工作：将碎片放在Pocket中，通过生长的方式匹配Pocket；或通过迭代的方式替换碎片，并最终将结构匹配的那些碎片连接起来（计算方法，非ML）
2. [Latent Molecular Optimization for Targeted Therapeutic Design](https://arxiv.org/abs/1809.02032)
   1. 使用GraphCNN提取Pocket的特征$$P$$，使用Junction Tree VAE (JTVAE)提取配体的结构$$C$$，然后使用三个模型分别从C恢复P、估计CP之间的BindingAffinity、以及拟合C的化学属性
3. 非生成式模型：**LigVoxel**，从Pocket体素图生成配体形状
   1. 问题：除了是单峰的外，输出还模糊且不具体、（其他Image Translation同样的问题）
4. BicycleGAN: <https://zhuanlan.zhihu.com/p/31627736>
   1. BicycleGAN通过增加从Generated B恢复Latent code z的方式，防止模型坍缩和单峰输出的问题.

### 数据集

1. 数据集：[DUD-E](https://pubs.acs.org/doi/10.1021/jm300687e)
   1. **101** targets, **11,256** binding compounds
   2. **39 - 592** binders for each target, **111** in average
2. Test on 3 targets (not in DUD-E)

### Docking (Evaluation)

1. Docking tool: AutoDock-smina
   1. Box size: 20A

## 代码研究

正在完善中。
