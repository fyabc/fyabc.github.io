---
layout: post
title: AlphaFold2论文笔记
description: AlphaFold2论文、附录及用法
permalink: /research-notes/AlphaFold2
categories: [task.PSP, task.MSA, model.AlphaFold2, tech.KD, dataset.CASP14]
local_repo: https://github.com/fyabc/off-AF2/blob/master
---

## 链接

- 主页：<https://www.nature.com/articles/s41586-021-03819-2>
- 正文：<https://www.nature.com/articles/s41586-021-03819-2_reference.pdf>
- 附件：<https://static-content.springer.com/esm/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_MOESM1_ESM.pdf>
- 代码：<https://github.com/deepmind/alphafold>
  - AF2 Database: <https://alphafold.ebi.ac.uk/>
- 本地代码：<https://github.com/fyabc/off-AF2>
- 其他笔记：
  - <https://zhuanlan.zhihu.com/p/396756568>
  - <https://www.jiqizhixin.com/articles/2021-07-30-5>
  - <https://blog.csdn.net/xixiaoyaoww/article/details/118886646>

## 信息

- Name: Highly accurate protein structure prediction with AlphaFold
- Abbr: **AlphaFold2**
- Author: DeepMind Team
- Affiliation: DeepMind
- Published Time: 2021.05.11
- Accept Time: 2021.07.12
- Meeting: Nature
- Citation: **46** (2021.08.22)
- Dataset: CASP14

## 文章解读

正在完善中。

### Abstract

1. 蛋白质结构：见[解读1](https://zhuanlan.zhihu.com/p/396756568)
2. 同源结构：见[解读1](https://zhuanlan.zhihu.com/p/396756568)
3. 序列比对与多序列比对(**MSA**)：  
   1. 序列比对即为找出两个序列的（最大）共同区段，可以使用"-"表示间隔符  
   一个序列比对例子：

      {% highlight text %}
      tcctctgcctctgccatcat---caaccccaaagt
      |||| ||| ||||| |||||   ||||||||||||
      tcctgtgcatctgcaatcatgggcaaccccaaagt
      {% endhighlight %}

   1. 多序列比对一次处理多于两条序列  
   多序列比对常见方法：**Clustal**
      1. [Clustal Omega](https://www.ebi.ac.uk/Tools/msa/clustalo/)，输入FASTA格式的序列（参见example sequence）即可进行对齐
4. AlphaFold2是第一个在缺少同源结构的情况下以原子精度预测蛋白质结构（即只提供序列输入）
5. AlphaFold2在CASP14中取得了SOTA且极大优于其他模型的结果
6. AlphaFold2将关于蛋白质结构的物理和生物学知识，利用多序列比对，融入深度学习算法的设计中

### Introduction

1. 现有的基于生物的1D to 3D PSP方法：
   1. 基于物理的方法：计算分子驱动力，动力学模拟、统计近似等（计算复杂度过高，对中等大小的蛋白质也极具挑战性）
   2. 基于演化的方法：根据蛋白质演化历史的生物信息学分析、密切同源物的结构及成对演化相关性（大多数情况下，密切同源物结构尚未测出）
2. CASP：两年一次，使用尚未加入PDB的新蛋白质结构进行测试。
3. 评价标准1：**骨架准确度**中位数（median backbone accuracy）的RMSD95（95% 残基覆盖率时的 **Cα** 均方根偏差），单位为埃
   1. AlphaFold2：`0.96`，次优方法：`2.8`，碳原子宽度：`1.4`
   2. 除了非常准确的域结构（图1b），当主链高度准确时，AlphaFold 还能够产生高度准确的侧链（图1c），并且即使在强大的模板可用的情况下也能显着改善基于模板的方法
   3. 图1c中准确地预测出了四个侧链构建出的锌离子的结合位点
4. 评价标准2：**全原子精度**（all-atom accuracy）的RMSD95
   1. AlphaFold2：`1.5`，次优方法：`3.5`
5. 图1d显示AlphaFold2能够准确预测超长且没有同源物的蛋白质结构
6. 图2显示AlphaFold2在PDB上的结果（已加入PDB）：
   1. 图2a显示PDB上的精度分布，总精度中位数为`1.46`埃，图提示精度最高一档的数量相对较少，精度最差一档的较多（解释为受**domain packing**影响敏感，缺少这一项或不正确会影响准确度）
   2. 图2b显示高骨架准确度情况下，可以得到高**侧链准确度**（指Cα之外的原子）
      1. 在Cα确定的情况下，侧链位置预测主要取决于旋转异构体的扭转角度预测，若预测扭转角度与实际差别小于40度，视为分类正确
   3. 图2c显示预测的**局部距离差异测试** (pLDDT) 置信度可以可靠地预测**Cα局部距离差异测试** (lDDT-Cα) 准确度
      1. **局部距离差异测试** (predicted Local Distance Difference Test, **pLDDT**)
      2. **Cα局部距离差异测试** (Cα Local Distance Difference Test, **lDDT-Cα**)
      3. [lDDT定义][4]：**TODO**
         1. 其他定义之Root-Mean-Square Deviation (RMSD): **TODO**
         2. 其他定义之Global Distance Test (GDT): **TODO**
   4. 图2d显示可以准确估计**全局叠加度量模板建模分数** (global superposition metric template modeling score, [TM-score][5])。
      1. (From [here](https://zhanggroup.org/TM-score/)): TM-score 是评估蛋白质结构拓扑相似性的指标。 它旨在解决传统度量中的两个主要问题，例如均方根偏差 (RMSD)：(1) TM-score 权重较小的距离误差比较大的距离误差更强，并使评分值对全局折叠相似度更敏感 而不是局部结构变化； (2) TM-score 引入了一个长度相关的尺度来归一化距离误差并使随机结构对的 TM-score 的大小与长度无关。 TM-score 的值在 (0,1] 中，其中 1 表示两个结构之间的完美匹配。根据 PDB 中结构的严格统计，低于 0.17 的分数对应于随机选择的无关蛋白质，而高于 0.5 的结构则假定 SCOP/CATH 中的折叠一般相同。TM-score 的公式可以在维基百科或原始出版物中找到。

### AlphaFold2 Network

<!-- URL to details page. -->
{% capture DetailsURL %}{% link pages/papers/AlphaFold2-details.markdown %}{% endcapture %}

1. ![AlphaFold2模型架构]({% link assets/images/papers/AlphaFold2-ModelArch.png %})
2. 模型：基于演化、物理和几何约束的新模型结构和训练算法
   1. **输入特征**：MSA表示 + 配对(pairwise)表示
      1. 输入人的蛋白质序列，在基因数据集中搜索同源序列并进行MSA，作为MSA输入（使用[rawMSA][1]初始化，但对特别深的MSA作特别处理，参见[附录1.2.7]({{DetailsURL}}#12-数据流)）
      2. 对输入蛋白质序列进行配对(pairing)和在结构数据集中搜索模板，作为pairwise features输入
         1. 配对表示(Pair representation)：将蛋白质结构预测视为3D空间中的图推理问题，其中图的边缘由邻近的残基定义。配对表示的元素编码有关残基之间关系的信息（图3b）
   2. 一种新的**输出表示**和相关的损失函数，可实现准确的端到端结构预测
   3. 新的**等变 (Equivariant) Attention**模型结构
   4. 使用**中间损失**(Intermediate loss)实现迭代式改进预测
   5. 屏蔽MSA Loss以与结构联合训练
   6. 使用**自蒸馏**(Self-distillation)从未标记的蛋白质序列中学习
   7. 自我估计准确率
   8. **模型输出**：所有重原子的3D坐标
3. **Notations**
   1. $$N_{seq}$$：序列数；$$N_{res}$$：残基数
4. 主模块**Evoformer**
   1. MSA input/output: $$N_{seq}\times N_{res}$$
   2. Residual pairs input/output: $$N_{res}\times N_{res}$$
   3. **关键创新点**
      1. MSA内部交换信息
      2. 允许直接推理空间和演化关系的配对表示(pairwise representation)
5. 结构模块(**Structure Module**)
   1. 以蛋白质的每个残基（全局刚体框架）的旋转和平移的形式引入了明确的 3D 结构
   2. 这些表示在简单的状态下初始化，所有旋转设置为一致，所有位置设置为原点，但快速发展和完善为具有精确原子细节的高度准确的蛋白质结构。
   3. **关键创新点**
      1. **打破链原子结构**以允许同时对结构的所有部分进行局部细化
      2. 一个新的**等变Transformer**，允许网络隐式推理未表示的侧链原子
      3. 一个代表残基方向准确性的**损失函数项**
   4. 详细解读：[附录1.8]({{DetailsURL}}#18-结构模块)
6. **Recycle**：反复将最终损失函数应用于输出，然后将输出递归地提供给相同的模块
   1. 来源：CV (**TODO**：read ref 28, 29)
   2. 显著提升准确率，额外训练时间很少

### Evoformer

1. ![Evoformer结构]({% link assets/images/papers/AlphaFold2-EvoformerArch.png %})
2. 用MSA表示更新配对表示：在MSA序列维度上求和的逐元素外积(Element-wise outer product)
   1. 来源：[rawMSA][1]
   2. 与rawMSA不同：此操作应用于每个块中，而不是在网络中应用一次，这使得从不断发展的MSA表示到配对表示的连续通信成为可能。
   3. 细节：[附录1.6.4]({{DetailsURL}}#16-Evoformer)
3. 配对表示中的两种更新模式（图3c）（受配对表示中一致性需求的启发：为了将氨基酸的成对描述表示为单个 3-D 结构，必须满足许多约束，包括距离上的三角不等式。）
   1. 整个配对表示被描述为一个以邻接矩阵表示的有向图；图3c中被更新的边为`ij`
   2. Attention基本结构：用于高维Transformer的[轴向注意力(Axial Attention)][2]
      1. Axial Attention: 对于高维数据（如图像等），将除了某个维度之外的所有维度转置到batch dim上面去，降低计算复杂度
   3. 更新模式1：三角形self-attention（图3c后两个），根据某条边更新与其起点或终点相同的边
   4. 更新模式2：三角形乘法更新（图3c前两个，作为self-attention的简化替代品），根据`ik`和`jk`更新`ij` (outgoing)，或根据`ki`和`kj`更新`ij` (incoming)
   5. 两种更新模式可以单独使用，联合使用效果更好
   6. 细节：[附录1.6.5和附录1.6.6]({{DetailsURL}}#16-Evoformer)
4. MSA row-wise（针对每个序列的）self-attention加入了pair bias信息（图3a第一行第一个block）
   1. 从配对栈(pair stack)中投射额外的logits以偏置MSA attention；提供从配对表示到MSA表示的信息流，完成信息闭环以保证混合两类信息
   2. 细节：[附录1.6.1]({{DetailsURL}}#16-Evoformer)

### 端到端结构预测

1. ![结构模块]({% link assets/images/papers/AlphaFold2-StructureArch.png %})
2. 输入：**配对表示**及MSA表示中的**原始序列行**（**单一表示**/single representation），基于**3D骨架帧**(3D backbone frames)
3. 3D骨架帧（图3e）：表示为$$N_{res}$$个独立的旋转和平移$$\{R_i, \vec{\textbf{t}_i}\} \in \{ \mathbb{R}^{3\times3}, \mathbb{R}^3 \}$$（相对于全局帧/**residue gas**），表示`N-Cα-C`原子的几何形状（细节：[附录1.8.1]({{DetailsURL}}#181-从原子位置构造骨架)）
   1. 优先考虑蛋白质骨架的方向，以便每个残基的侧链位置在该帧内受到高度限制。
   2. 相反，肽键几何形状完全不受约束，并且在应用结构模块期间观察到网络经常违反链约束，因为打破此约束允许对链的所有部分进行局部细化，而无需解决复杂的闭环问题。（在微调期间通过violation loss item鼓励满足肽键几何形状）
   3. 只有在Amber力场中通过梯度下降对结构进行预测后松弛（细节：[附录1.8.6]({{DetailsURL}}#186-amber松弛)），才能实现肽键几何形状的精确执行。
      1. 根据经验，这种最终松弛并没有提高模型的准确性，如通过全局距离测试(GDT)或IDDT-Cα测量的那样，但确实消除了分散注意力的立体化学违规（distracting stereochemical violations）而不会损失准确性。
      2. Amber力场是在生物大分子的模拟计算领域有著广泛应用的一个分子力场。Amber力场的优势在于对生物大分子的计算，其对小分子体系的计算结果常常不能令人满意。
   4. **TODO**：这段话是什么意思？“蛋白质骨架方向”和“肽键几何形状”的“约束”分别是什么？
4. 更新Residue gas（图3d）：分两步
   1. 使用不变点注意力(Invariant Point Attention, **IPA**)更新单一表示（$$N_{res}$$个neural activations）（固定3D位置），然后根据更新后的activations更新Residual gas
   2. IPA对Attention中的Q/K/V都通过每个残基的局部帧中产生的3D点进行了增强，使得最终值对全局旋转和平移保持不变。
   3. 3D Q/K也对Attention施加了强烈的空间/局部偏差（spatial/locality bias），以适应蛋白质结构的迭代细化。
   4. 在每个IPA和Element-wise Transition Block之后，该模块计算每个3D骨架帧的旋转和平移的更新。这些更新在每个残基的局部帧内的应用使得整个Attention和Update block成为对residue gas的等变操作。
   5. IPA细节：[附录1.8.2]({{DetailsURL}}#182-ipa)
5. 侧链chi角和最终的pLDDT的预测：在网络末端的final activation上使用小的每个残基网络（per-residual network）计算。
   1. 最终的pTM-score从pairwise error prediction中获得，由最终的配对表示经过一个线性变换得到。
   2. **Final Loss**: Frame-aligned point error (FAPE) (图3f)
      1. 对于多个Alignment，根据骨架$$R_k, \mathbf{t}_k $$构造原子坐标，计算每个原子预测位置与真实位置的距离，得到$$N_{frames} \times N_{atoms}$$个距离，以Clamped L1-loss优化。该Loss强烈倾向于使每个原子符合其局部骨架，并且是输出中手性（chirality）的主要来源（细节：[附录1.9.1]({{DetailsURL}}#191-侧链和骨架扭转角损失函数)及附录图9）
   3. 侧链chi角：参见<https://en.wikipedia.org/wiki/Dihedral_angle#Proteins>。
      1. 侧链图示：![蛋白质二面角图示]({% link assets/images/papers/AlphaFold2-DehedralAngle.png %})
      2. 图中，$$\omega, \Phi, \Psi$$三个角分别表示的是它们图标所在的两个平面的夹角
      3. 由于羰基的性质，$$\omega$$通常为180°
      4. 从Cα开始，侧链的第n个二面角称为$$\chi_n$$，通常趋向于180°和±60°
      5. “键长-二面角”表示和“3D坐标”表示之间可以互换，但计算需要耗时间
   4. 细节：[附录1.8.4]({{DetailsURL}}#184-计算所有原子坐标)

### 使用标记和未标记数据进行训练

1. Supervised Learning: Only use PDB data
2. [Noisy student self-distillation][3] from ~350K Uniclust30 序列数据集（使用only PDB trained model）
   1. 使用PDB + Uniclust30-Distilled从头重新训练模型，并使用多种数据增强（e.g. Cropping, MSA subsampling）
   2. 随机mask/mutate MSA中的单个残基，然后使用具有BERT-style objective的bidirectional encoder representation预测masked elements
      1. 这个目标鼓励网络学习解释系统发育和协变关系，而无需将特定的相关统计量硬编码到特征中。
      2. 与[MSA Transformer][6]相比，BERT-loss与正常的PDB-loss联合训练，且没有预训练过程

### 解释网络

1. 为48个Evoformer各自单独训练了一个结构模块，同时冻结主网络参数（细节：[附录1.12]({{DetailsURL}}#112-casp14评估)）
   1. 共计48 Evoformer * 4 Recycling Stages = 192 Sturctures的序列，准确度轨迹见图4b
   2. 对于简单蛋白质（T1024）：快速收敛；对于复杂蛋白质（T1064），在四次循环中逐渐提升
   3. 图4a：Ablation study of different model components
   4. Attention Visualization：[附录1.16]({{DetailsURL}}#116-attention可视化)

### MSA 深度和跨链接触

1. 当平均MSA对齐深度小于约30个序列时，性能下降明显（图5a）
2. 与异型接触的数量相比，AlphaFold 对于链内或同型接触很少的蛋白质要弱得多。但AlphaFold 通常能够为同聚体提供高精度预测，即使链基本上交织在一起
3. 图5：MSA 深度和跨链接触的影响。（机翻，仅供参考，**TODO**：理解这张图的含义）  
   (a) 在我们的训练数据截止后，PDB 的冗余减少集的主干精度 (lDDT-Cα)，仅限于蛋白质，其中最多 25% 的远程接触位于不同的异聚体链之间。我们进一步考虑基于 30% 序列同一性的模板覆盖率的两组蛋白质：覆盖超过 60% 的链（N = 6,743 个蛋白质链）和覆盖少于 30% 的链（N = 1,596 个蛋白质链）。 MSA 深度是通过计算 MSA 中每个位置的非间隙残基的数量来计算的（使用 Neff 加权方案，详细信息参见方法）并取残基的中值。曲线是通过高斯核平均平滑获得的（窗口大小为 log10 Neff 中的 0.2 个单位）；阴影区域是使用 10,000 个样本的 bootstrap 估计的 95% 置信区间。  
   (b) 在没有输入化学计量和只有弱模板的情况下正确预测了交织的同源三聚体（蓝色是预测的，绿色是实验性的）。

### Related Work

略

### Discussion

1. AlphaFold2能够减少手工特征（例如可以自己学习出氢键评价函数）
2. AlphaFold2能够处理缺失物理环境、交织同源异构体等复杂情况
3. **Inference Speed**: 对于384个残基的蛋白质，1 GPU-min

### Methods

1. Invariant Point Attention (IPA) (附录图8)
   1. 使用平方距离(squared distances)和坐标变换(coordinate transformation)确保相对全局的不变性
   2. [Previous work][7]
2. Inputs & Data Sources
   1. MSA tools: **jackhmmer**, **HHBlits**, 及少数可用的同源结构（模板）的3D原子坐标
   2. Big Fantastic Database (BFD): 最大的公开可用的蛋白质家族集合
      1. 65M蛋白质家族，以MSA和HMM表示，包含2.2G个蛋白质序列
      2. Build BFD: (a) Collect 2.4G sequences from UniProt/SRC/MERC, 聚类到30%序列一致性，同时使用MMseqs2/Linclust强制执行较短序列的90%比对覆盖率，得到345M聚类。然后删除所有成员少于三个的聚类，得到61M个聚类。(b) From Metaclust NR; (c) 剩余的25M个序列单独聚类
      3. 每个聚类使用FAMSA计算MSA，并用Uniclust HH-suite计算HMM
   3. 其他数据：
      1. Training: PDB & PDB70聚类数据库
      2. MSA Lookup: Uniref90, Mgnify, Uniclust30, BFD
      3. Sequence distillation: Uniclust30 (356K) 用于构建distilled dataset
      4. Tools: HHBlits, HHSearch, jackhmmer, OpenMM, Amber99sb force field, TensorFlow
   4. 移除BFD降低0.4GDT，移除Mgnify降低0.7GDT，同时移除降低6.1GDT
      1. 大多数蛋白质降低很小，少数蛋白质降低很大
3. 训练方案
   1. Sample PDB chains from clusters, **crop to 256** residues, batch size = **128**
   2. Source: 128 TPUv3 cores
   3. Convergence: ~10M samples
   4. Tuning: **crop to 384** residues, larger MSA stack, reduced learning rate
   5. Loss: FAPE loss + several auxiliary losses
      1. 最终的配对表示变换为距离直方图，计算交叉熵
      2. BERT-like loss of random masked input MSAs
      3. 结构模块输出的单一表示计算lDDT-Cα损失
      4. 训练时增加辅助的侧链损失，微调时增加结构违反损失
   6. Training time: 7d initial training + 4d fine-tuning

## 附录解读

见[此页]({% link pages/papers/AlphaFold2-details.markdown %})。

## 代码研究

1. **NOTE**：代码研究基于2021.09.09的代码（commit `b1d772d127fcff4cc01d8fa1b4ea6e07da12193d`）

### 关于用到的库

1. [JAX](https://github.com/google/jax): TensorFlow autograd and XLA
   1. [XLA](https://www.tensorflow.org/xla): 加速线性代数编译器
   2. [Haiku](https://github.com/deepmind/dm-haiku): Haiku is a simple neural network library for JAX developed by some of the authors of Sonnet, a neural network library for TensorFlow.

### 代码结构

1. 主入口：[`run_alphafold.py`]({{page.local_repo}}/run_alphafold.py)
   1. 主函数：[`predict_structure`]({{page.local_repo}}/run_alphafold.py#L107)

正在完善中。

## 代码实例

详见[proj-misc](https://github.com/fyabc/proj-misc/blob/master/Medical/AlphaFold2/README.md)

[1]: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0220182
[2]: https://arxiv.org/abs/1912.12180
[3]: https://openaccess.thecvf.com/content_CVPR_2020/papers/Xie_Self-Training_With_Noisy_Student_Improves_ImageNet_Classification_CVPR_2020_paper.pdf
[4]: https://core.ac.uk/download/pdf/85213912.pdf
[5]: https://d1wqtxts1xzle7.cloudfront.net/32489697/249-with-cover-page-v2.pdf?Expires=1631215021&Signature=FFr7qS00b-MBbOYMstEQ~Ph65szDq0qGusvBbIeXtNoU6bcf25Uo~e8NUEmlJ4a8pk5q2fvf-xTDpBbTmkKcNCRdfR3rJ--3SP9LSAzAFE8qehLO~SE973~lBTkI7YmFzPtTcwOf0mSxiTAnUHodY1COM8M9aVtSLuhF4ruv1BVL1SzGDQJ530os2eZKrDu5flMz2FKE-QjwKJ8oTI5nVW62xmrRUyrOlY0DE6Eol-8c8BHWBSehRkZfZ8~twWYCEE43B2Z11Am5BnoripLqShVzQA02FOOY6Jqd2O8dQ6rIoOmzRPVl4mdxv2xMdMqklmtwfq6mKCkwFkTsxe5bCw__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA
[6]: https://www.biorxiv.org/content/biorxiv/early/2021/02/13/2021.02.12.430858.full.pdf
[7]: https://openreview.net/pdf?id=ByMEAHrgLB
