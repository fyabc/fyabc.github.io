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
5. Template search （template是另外的类似结构文件）
   1. 用从UniRef90搜索出来的MSA，使用HHSearch在PDB70中搜索模板
   2. 训练过程中，去除了发布时间晚于训练样本的模板，且去掉了其他一些低质量模板，剩余的模板随机采样，至多四个（防止模型直接复制模板）
   3. 推断过程中，提供Top-4模板，按正确对齐的残基数期望排序
6. Training Data
   1. p=75% from self-distillation data, p=25% from PDB data
7. Filtering: Resolution, chain length, amino acid diversity, cluster (详见1.2.5)
8. MSA block detection: 从MSA输出中扇区一些连续的block，以生成多样性
9. MSA clustering: 为了降低Evoformer计算复杂度（$$O(N^2_{seq} \times N_{res})$$）以减少输入序列数量
   1. 随机选择$$N_{clust}$$序列作为MSA聚类中心，第一个聚类中心始终设置为输入序列。
   2. 生成一个掩码，使得MSA聚类中心的每个位置都有15%的概率被包含在掩码中。掩码中包含的MSA中的每个元素都按以下方式替换：
      1. 以10%的概率将氨基酸替换为均匀采样的随机氨基酸。
      2. 有10%的概率对于给定的位置将氨基酸替换为从MSA配置文件中采样的氨基酸
      3. 氨基酸有10%的可能性不被替换。
      4. 氨基酸以70%的概率被特殊标记(masked_msa_token)替换。这些掩蔽位置是1.9.9节中使用的预测目标。请注意，此掩码在训练时和推理时都使用。
   3. 剩余的序列通过Hamming距离（忽略被屏蔽的残基和间隙）分配给它们最近的簇。对于每个序列簇，计算几个统计数据，例如每个残基的氨基酸分布。有关完整说明，请参阅表1中的“聚类”项。
   4. 使用步骤1中没有被选为聚类中心的MSA序列，对$$N_{extra\_seq}$$序列进行不放回随机采样。如果可用的剩余序列少于$$N_{extra\_seq}$$，则使用所有这些序列。这些序列形成了表1中的“额外”MSA 项。
10. Residue cropping
    1. 训练过程中：Unclamped loss下和Clamped loss下两种不同裁剪方式
    2. 残基维度被裁剪到一个连续的区域，裁剪开始位置在上面定义。 最终的裁剪大小由$$N_{res}$$表示，其具体值见1.11节。
11. Featurization and model inputs 见表1，重要的特征包括：
    1. target_feat ($$[N_{res}, 21]$$): one-hot 氨基酸类别
    2. residue_index ($$[N_{res}]$$): 氨基酸在原序列中的下标
    3. msa_feat ($$[N_{clust}, N_{res}, 49]$$): MSA之间的氨基酸特征，具体见表1；随机选取$$N_{cycle}\timesN_{ensemble}$$个特征，每个循环/Ensemble使用不同的sample
    4. extra_msa_feat ($$[N_{extra\_seq}, N_{res}, 25]$$):与上面类似
    5. template_pair_feat ($$[N_{templ}, N_{res}, N_{res}, 88]$$): 模板的距离特征
    6. template_angle_feat ($$[N_{templ}, N_{res}, 51]$$): 模板的角度特征

## 1.3-Self-distillation dataset

1. Build dataset
   1. 针对每个数据库计算Uniclust30中每个簇的MSA，然后贪婪地删除所有重复的MSA序列，得到6.3M个序列
   2. 删除长度不在$$[200, 1024]$$之间的序列，以及MSA少于200个的序列，得到356K个序列。
   3. **Undistilled** model:只在PDB数据集上训练的模型，使用该模型预测356K个序列的结构，得到每对残基之间的距离分布$$p_{i, j}(r)$$。
      1. 参考分布$$p^{ref}_{\|i - j\|(r)}$$：从Uniclust30中随机选取1000个序列取平均距离分布
      2. Pairwise metric：参考分布与预测分布之间的KL散度，对j取平均值得到残基置信度$$c_i$$（该值越高越好），mask掉$$c_i<0.5$$的残基

## 1.4-AlphaFold2 Inference

1. ![输入特征]({% link assets/images/papers/AlphaFold2-InputFeatures.png %})
2. 算法：![算法]({% link assets/images/papers/AlphaFold2-InferAlgo.png %})
3. **Input**: Sequence, MSA, Templates; **Output**: Atom coordinates, distogram, per-residue confidence scores
4. 循环$$N_{cycle}$$次；模型第一部分（Feature Embedding和Evoformer）用不同抽样的输入随机执行$$$N_{ensemble}$$次，输出取平均值，作为结构模块和循环的输入。平均的特征以额外的上标表示（$$\hat{z_{ij}}$$（配对表示）和$$\hat{s_i}$$（单独表示））。Ensemble只在inference时使用，且只能少量提升性能。
   1. 总计使用了$$N_{cycle}\times N_{ensemble}$$个随机MSA Feature样本，以$$\mathbf{f}$$表示
5. 算法步骤：
   1. 初始化MSA表示和配对表示（MSA表示的第一行为序列表示，与配对表示一起使用之前循环的输出更新）
   2. 加入模板信息：template_angle_feat（氨基酸与扭转角）使用简单MLP嵌入过后连接到MSA表示上，template_pair_feat（残基对）使用浅层Attention嵌入过后加到配对表示上。
   3. 使用Extra MSA Stack处理额外的MSA表示
   4. 最终输出送入Evoformer
   5. Evoformer的输出送入结构模块，输出原子坐标和每残基置信度(pLDDT)

## 1.5-输入嵌入

1. MSA feature size $$c_m = 256$$, pairwise feature size $$c_z = 128$$
2. Relative position embedding: 使用裁剪的one-hot距离（最大距离32），减小超长序列带来的退化影响

## 1.6-Evoformer

1. ![算法]({% link assets/images/papers/AlphaFold2-EvoformerAlgo.png %})
2. 图示详见图1e

### 1.6.1-MSA row-wise gated self-attention with pair bias

1. Row-wise（附录图2，算法7）: 计算残基对之间的Attention weight，并加入配对表示的信息作为额外bias
2. Column-wise（附录图3，算法8）：使不同MSA之间的同一残基交换信息
3. MSA transition（附录图4，算法9）：

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
