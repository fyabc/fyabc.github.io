---
layout: post
title: AlphaFold2论文笔记
description: AlphaFold2论文、附录及用法
permalink: /research-notes/AlphaFold2
categories: [PSP(蛋白质结构预测), MSA(多序列比对), AlphaFold2]
---

## 链接

- 主页：<https://www.nature.com/articles/s41586-021-03819-2>
- 正文：<https://www.nature.com/articles/s41586-021-03819-2_reference.pdf>
- 附件：<https://static-content.springer.com/esm/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_MOESM1_ESM.pdf>
- 代码：<https://github.com/deepmind/alphafold>
- 其他笔记：
  - <https://zhuanlan.zhihu.com/p/396756568>
  - <https://www.jiqizhixin.com/articles/2021-07-30-5>
  - <https://blog.csdn.net/xixiaoyaoww/article/details/118886646>

## 信息

- Name: Highly accurate protein structure prediction with AlphaFold
- Author: DeepMind Team
- Affiliation: DeepMind
- Published Time: 2021.05.11
- Accept Time: 2021.07.12
- Citation: 46 (2021.08.22)
- Dataset: CASP14

## 文章解读

正在完善中。

## 代码研究

1. **NOTE**：代码研究基于2021.08.21的代码（commit `cef198e`）。

正在完善中。

## 代码实例

详见[proj-misc](https://github.com/fyabc/proj-misc/blob/master/)

1. **2021.08.24**

   1. 根据刚才讨论的paper的思路，我们如果要做Target2Drug forget的话，理想状况的是把所有binding site之外的部分都遗忘掉，可以朝这个方向改进他的模型

   2. 目前Target2Drug的数据现状是数据量小而数据很长，可以考虑进行data augmentation，从一个长序列生成多个短序列作为输入

      1. 简单方法：从序列中的每个氨基酸中sample一个原子的坐标（而不是average），构成新序列
      2. 其他思路：设计一个generator，输入长序列输出若干短序列，该generator训练目标为：a) 新序列和原序列的recover loss；b) 新序列之间的diversity  
         然后将这个generator接在transformer前面（generator和transformer一起训练或单独训练）

   3. 在target中起作用的只是binding site那一小部分，而且不同的ligand对应不同的binding site，因此单纯target sequence作为输入可能缺少信息  
      PDB文件中有binding site的信息，可以利用，作为输入的一部分（以序列中位置的格式）  
      但是inference的时候没有binding site信息，考虑在inference时候输出所有的binding site和对应的ligand
   4. 可以利用target的**二级结构**（PDB官网上的`ss_dis.txt`有PDB与二级结构序列的一一对应）作为额外的序列输入
   5. Drug2Target面临同样的缺少binding site的问题以及信息量的问题，需求pretraining的支持，但问题在于目前的pretraining中缺少binding site的信息，这个问题需要解决
