---
layout: post
title: SBMolGen
# description: 描述
permalink: /research-notes/SBMolGen
categories: [task.SBDD, tech.MCTS, tech.Docking]
---

## 链接

- 主页：<https://chemrxiv.org/engage/chemrxiv/article-details/60c75725842e65c7acdb4638>
- 正文：<https://s3.eu-west-1.amazonaws.com/assets.prod.orp.cambridge.org/34/4a8bcb5ad24b2d819c3baf16b83a6e_no_meta_no_meta_no_meta.pdf?AWSAccessKeyId=ASIA5XANBN3JNAGMGODR&Expires=1630563318&Signature=lVCE7sFAOp1m6u9W4fZ2u%2FjQxSM%3D&response-cache-control=no-store&response-content-disposition=inline%3B%20filename%20%3D%22structure-based-de-novo-molecular-generator-combined-with-artificial-intelligence-and-docking-simulations.pdf%22&response-content-type=application%2Fpdf&x-amz-security-token=FwoGZXIvYXdzENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDH6csrOJNv8TyxELaiKtAa%2BHMR6OJW%2FB3VxCivF%2FEkQZfAPz3CbYYhshKhV1zycsuVtbT6w%2Fqs8P03mkvDL1iHvoheajGhcN4%2FJxqjZQHIb4o7iPq8w3Gqd6Lqi6WUGewDwpFSoIGqGTp%2FwbH2LVubwNuj%2FbNVL8kpXCyly%2F%2BRrSLkOLdIKNFWVPIJFom%2Bh%2FwWSPFuYCe1SXjJ8zQyv9HWWTJ1L5LLY4v9421zEQ7SCHNvCIgxHnN%2BgoBOEtKInRwYkGMi1O73OTAW%2BZ809RNTzDke%2BZQAUVbEHUtK5CeMYSlBBzi1xd0Ri1j1ASki015CU%3D>
- 附件：无
- 代码：<https://xxx>
- 其他笔记：
  - <https://xxx>

## 信息

- Name: Structure-Based De Novo Molecular Generator Combined with Artificial Intelligence and Docking Simulations
- Abbr: **SBMolGen**
- Author: XXX
- Affiliation: XXX
- Published Time: 20XX.XX.XX
- Accept Time: 20XX.XX.XX
- Meeting: XXX
- Citation: **1** (2021.09.02)
- **Dataset**: ZINC以及四个固定的靶点（详见[数据集](#数据集)）
- Main Method: MCTS

## 文章解读

### 数据集

1. Ligand: About **250K** molecules from ZINC
2. Target: 4 targets (CDK2, EGFR, AA2AR, ADRB2), 对应的PDB IDs: 1H00, 2RGP, 3EML, 3NY8

### Docking (Evaluation) 方法

1. Evaluation Metric: Better Docking score
2. Docking软件：[rDock](http://rdock.sourceforge.net/)
3. Docking参数：详见2.3节
4. Docking分数作为MCTS的reward

## 代码研究

正在完善中。
