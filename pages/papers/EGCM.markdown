---
layout: post
title: EGCM
# description: 描述
permalink: /research-notes/EGCM
categories: [task.Tgt2Drug]
---

## 链接

- 主页：<https://pubs.acs.org/doi/abs/10.1021/acs.jcim.0c01494>
- 正文：<https://microsoftapc-my.sharepoint.com/personal/v-jinhuazhu_microsoft_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fv%2Djinhuazhu%5Fmicrosoft%5Fcom%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FDe%20Novo%20Molecule%20Design%20Through%20the%20Molecular%20Generative%20Model%20Conditioned%20by%203D%20Information%20of%20Protein%20Bindi%2Epdf&parent=%2Fpersonal%2Fv%2Djinhuazhu%5Fmicrosoft%5Fcom%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files&originalPath=aHR0cHM6Ly9taWNyb3NvZnRhcGMtbXkuc2hhcmVwb2ludC5jb20vOmI6L2cvcGVyc29uYWwvdi1qaW5odWF6aHVfbWljcm9zb2Z0X2NvbS9FVkJOZUJVQkpqaEVnQmlDV3ZIOFoxb0JmcTVsQjlybzFCMEpnWm1WR2g4U0x3P3J0aW1lPTI1UDVCRHR4MlVn>
  - 正文版本2：<https://s3-eu-west-1.amazonaws.com/itempdf74155353254prod/13498332/De_Novo_Molecule_Design_Through_Molecular_Generative_Model_Conditioned_by_3D_Information_of_Protein_Binding_Sites_v1.pdf>
  - 正文版本3：<https://chemrxiv.org/engage/api-gateway/chemrxiv/assets/orp/resource/item/60c7537a702a9bbac118c383/original/de-novo-molecule-design-through-molecular-generative-model-conditioned-by-3d-information-of-protein-binding-sites.pdf>
  - 本地PDF(Biomedical/same title)
- 附件：无
- 代码：<https://xxx>
- 其他笔记：
  - <https://xxx>

## 信息

- Name: De Novo Molecule Design Through the Molecular Generative ModelConditioned by 3D Information of Protein Binding Sites
- Abbr: **EGCM**
- Author: Mingyuan Xu, Ting Ran, and Hongming Chen
- Affiliation: Guangzhou Regenerative Medicine and Health - Guangdong Laboratory
- Preprint/Received Time: 2021.01.03
- Published Time: 2021.07.01
- Conference / Journal: JCIM (IF: 4.543)
- Citation: **2** (2021.09.14)
- Dataset: sc-PDB & eModel-BDB
- Main Method: XXX

## 文章解读

1. 主要思路：基于氨基酸预先设计了11种模板（怀疑有化学系的人预先设计），然后基于这11中模板抽取Binding Pocket的EGCM（特征矩阵），然后该矩阵的特征值就是这个Pocket的特征
2. cRNN generative model (teacher forcing 加速收敛)
3. Based on DeeplyTouch cRNN

## 代码研究

正在完善中。
