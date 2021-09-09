---
layout: post
title: NoisyStudent
description: 描述
permalink: /research-notes/noisy-student
categories: [tech.NoisyStudent, tech.SelfTraining]
---

## 链接

- 主页：<https://openaccess.thecvf.com/content_CVPR_2020/html/Xie_Self-Training_With_Noisy_Student_Improves_ImageNet_Classification_CVPR_2020_paper.html>
- 正文：<https://openaccess.thecvf.com/content_CVPR_2020/papers/Xie_Self-Training_With_Noisy_Student_Improves_ImageNet_Classification_CVPR_2020_paper.pdf>
- 附件：无
- 代码：<https://xxx>
- 其他笔记：
  - <https://xxx>

## 信息

- Name: Self-training with Noisy Student improves ImageNet classification
- Abbr: **NoisyStudent**
- Author: XXX
- Affiliation: Google
- Preprint/Received Time: 20XX.XX.XX
- Published Time: 20XX.XX.XX
- Meeting: CVPR 2020
- Citation: **628** (2021.09.10)
- Dataset: XXX
- Main Method: XXX

## 基础知识：Self-Training

Self-training是最简单的半监督方法之一，其主要思想是找到一种方法，用未标记的数据集来扩充已标记的数据集。算法流程如下：

1. 首先，利用已标记的数据来训练一个好的模型，然后使用这个模型对未标记的数据进行标记。
2. 然后，进行伪标签的生成，因为我们知道，已训练好的模型对未标记数据的所有预测都不可能都是好的，因此对于经典的Self-training，通常是使用分数阈值过滤部分预测，以选择出未标记数据的预测标签的一个子集。
3. 其次，将生成的伪标签与原始的标记数据相结合，并在合并后数据上进行联合训练。
4. 整个过程可以重复N次，直到达到收敛。

## 文章解读

正在完善中。

## 代码研究

正在完善中。
