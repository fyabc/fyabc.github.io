---
layout: post
title: From Target to Drug - Generative Modeling for the Multimodal Structure-Based Ligand Design
# description: 描述
permalink: /research-notes/LiGANN
categories: [task.Tgt2Drug, task.BindingPocket2Drug, tech.GAN, dataset.DUD-E]
---

## 链接

- 主页：<https://pubs.acs.org/doi/pdf/10.1021/acs.molpharmaceut.9b00634>
- 正文：本地PDF(same title)
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
- Meeting: XXX
- Citation: **12** (2021.09.02)
- Dataset: DUD-E
- Main Method: BicycleGAN

## 文章解读

### 之前工作

1. 非生成式模型：**LigVoxel**

### 数据集

1. 数据集：[DUD-E](https://pubs.acs.org/doi/10.1021/jm300687e)
   1. **101** targets, **11,256** binding compounds
   2. **39 - 592** binders for each target, **111** in average

### Docking (Evaluation)

1. Docking tool: AutoDock-smina
   1. Box size: 20A

## 代码研究

正在完善中。
