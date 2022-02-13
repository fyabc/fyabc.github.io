---
layout: post
title: SBMolGen
# description: 描述
permalink: /research-notes/SBMolGen
categories: [task.SBDD, tech.MCTS, tech.Docking]
---

## 链接

- 主页：<https://chemrxiv.org/engage/chemrxiv/article-details/60c75725842e65c7acdb4638>
- 正文：本地PDF(Biomedical/same title)
- 附件：无
- 代码：<https://github.com/clinfo/SBMolGen>
- 其他笔记：
  - <https://xxx>

## 信息

- Name: Structure-Based De Novo Molecular Generator Combined with Artificial Intelligence and Docking Simulations
- Abbr: **SBMolGen**
- Author: XXX
- Affiliation: XXX
- Published Time: 2021.04.06
- Accept Time: 2021.04.06
- Conference / Journal: JCIM (IF: 4.543)
- Citation: **1** (2021.09.02)
- **Dataset**: ZINC以及四个固定的靶点（详见[数据集](#数据集)）
- Main Method: RNN + MCTS

## 文章解读

1. **前置工作**：[ChemTS](https://github.com/tsudalab/ChemTS)
   1. Paper (2017.09.29): <https://arxiv.org/abs/1710.00616> (Citation: 131, Journal: Science and Technology of Advanced Materials, IF: 5.799)
   2. 方法：MCTS + Neural Rollout
      1. ChemTS使用MCTS，搜索对象为SMILES，每个Step生成一个新的SMILES符号（与普通正则切分符号基本一致）
      2. Reward为要优化的属性，若分子不合法，reward为一个极小值
      3. MCTS之前，用分子数据集训练一个RNN（Language Model Objective）
      4. 在Simulation时，需要对从根到当前子序列的部分SMILES使用RNN进行Rollout，得到完整的分子，并计算其Reward
   3. 用途：设计具有给定属性（HOMO-LUMO Gap, Energy, LogP等）的分子；与rDock结合可以设计对目标蛋白具有活性的分子
2. 本文方法：将ChemTS中的Reward换成rDock。

### 数据集

1. Ligand: About **250K** molecules from ZINC
2. Target: 4 targets (CDK2, EGFR, AA2AR, ADRB2), 对应的PDB IDs: 1H00, 2RGP, 3EML, 3NY8

### Docking (Evaluation) 方法

1. Evaluation Metric: Better Docking score
2. Docking软件：[rDock](http://rdock.sourceforge.net/)
3. Docking参数：详见2.3节
4. Docking分数作为MCTS的reward

## 其他事项

1. Table 1中的Decoy（诱饵）的含义
   1. 诱饵蛋白质：<https://www.blopig.com/blog/2017/05/a-brief-history-of-usage-of-the-word-decoy-in-protein-structure-prediction/>
      1. 概括：从头开始预测蛋白质结构的一种策略是生成大量可能的结构（诱饵）并根据评分或自由能函数选择最合适的结构
      2. 这个术语是蛋白质结构无法精确测定的遗留问题。
   2. 这个术语既指蛋白质也指配体（本文中指诱饵配体），分别对应了蛋白质结构预测和Docking中的不精确性，诱饵配体指的就是那些在Docking时由于预测不正确的配体形状而选择的不正确分子，它对Docking算法提供了重要的测试。（<https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1557646/>）

## 代码研究

正在完善中。
