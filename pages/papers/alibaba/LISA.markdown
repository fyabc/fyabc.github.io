---
layout: post
title: LISA
# description: 描述
permalink: /research-notes/LISA
categories: [tech.Attention, tech.AttentionSpeedup, task.RecSys]
---

## 链接

- 主页：<https://arxiv.org/abs/2105.14068>
- 正文：<https://arxiv.org/pdf/2105.14068/pdf>
- 附件：无
- 代码：<https://xxx>
- 其他笔记：
  - <https://xxx>

## 信息

- Name: Linear-Time Self Attention with Codeword Histogram for Efficient Recommendation
- Abbr: **LISA**
- Author: Yongji Wu, Defu Lian, Neil Zhenqiang Gong, Lu Yin, Mingyang Yin, Jingren Zhou, Hongxia Yang
- Affiliation: DAMO Alibaba
- Preprint/Received Time: 20XX.XX.XX
- Published Time: 2021.05.28
- Meeting: WWW 2021
- Citation: **1** (2021.09.03)
- Dataset: XXX
- Main Method: XXX

## 文章解读

### 摘要

由于其有效性，自注意力在从自然语言处理到推荐的各种序列建模任务中变得越来越流行。
然而，自注意力受到二次计算和记忆复杂性的影响，禁止其在长序列上的应用。解决这个问题的现有方法主要依赖于稀疏注意力上下文，要么使用局部窗口，要么使用局部敏感哈希（LSH）或排序获得的置换桶，而关键信息可能会丢失。
受到使用簇质心来近似项目的矢量量化思想的启发，我们提出了 LISA（线性时间自注意力），它既享有普通自注意力的有效性，又具有稀疏注意力的效率。
LISA 与序列长度成线性关系，同时通过计算码字分布的可微直方图实现完全上下文关注。
同时，与一些有效的注意力方法不同，我们的方法对随意掩码或序列长度没有限制。我们在四个真实世界的数据集上评估我们的方法以进行顺序推荐。
结果表明，LISA 在性能和速度上都优于最先进的高效注意力方法；并且它比普通的 self-attention 快 57 倍，内存效率高 78 倍。

### 简介

自从在 Transformers [34] 中引入 self-attention 机制以来，它在各种领域的各种序列建模任务中取得了令人难以置信的成功，例如机器翻译 [4]、对象检测 [38]、音乐生成 [16] 和生物信息学 [26]。
最近，self-attention 在推荐 [18, 31, 46] 中也展示了其强大的力量。

然而，尽管由于其识别输入序列中元素之间复杂依赖关系的能力而获得了令人印象深刻的性能，但基于自注意力的模型在面对更长的序列时会遭受计算和内存成本飙升的困扰。
由于为每个标记计算整个序列的注意力分数，自注意力需要 O(L^2) 次操作来处理长度为 L 的输入序列。 这阻碍了在许多设置中建立在自注意力上的模型的可扩展性。

最近，已经提出了许多解决方案来解决这个问题。这些方法中的大多数 [1, 2, 6, 19, 28, 33, 44] 利用稀疏注意力模式，限制了每个查询可以关注的键数。虽然这些稀疏模式可以通过各种依赖于内容的方式来建立，比如 LSH [19]、排序 [33] 和 k 均值聚类 [28]，但通过裁剪每个查询的感受野可能会丢失关键信息。虽然成功地将计算注意力权重的成本从 O(L^2 D) 降低到 O(LBD)，其中 B 是固定的桶大小，但将键/值分配到桶中会产生额外的成本。该成本通常仍然是关于 L 的二次方，并且可能会导致处理较短序列的显着开销。我们观察到，在长度为 128 的序列上，Reformer [19] 可能比普通 Transformer 慢 7.6 倍。其他技术也被用来提高自注意力的效率。例如，[37] 中使用了注意力权重矩阵的低秩近似。然而，这种方法只支持双向注意力模式，并假设输入序列的长度是固定的。

我们观察到自注意力本质上计算每个查询的输入序列的加权平均值，权重是根据查询和键之间的内积计算的。对于每个查询，内积较大的键将得到更多关注。我们将此与最大内积搜索 (MIPS) 问题联系起来。 MIPS 问题在许多机器学习问题中具有重要意义 [11, 21, 29]，研究人员对快速近似 MIPS 算法进行了深入研究。其中，向量（乘积）量化[8, 13, 14]一直是一种流行且成功的方法。有了矢量量化，我们不再需要详尽地计算给定查询与数据库中所有 N 个点之间的内积。我们只能计算 B 个质心（即代码字），其中 B 是预算超参数。因此，我们成功地避免了冗余计算，因为属于同一质心的点与查询共享相同的内积。

矢量量化的思想也被应用于压缩项目嵌入矩阵并提高推荐系统的内存和搜索效率 [5, 24]。
在最先进的轻量级推荐模型 LightRec [24] 中，使用一组 B 个可差分学习的码本对项目进行编码，每个项目由 W 个码字组成。
项目由每个码本中最相似的码字的组合表示。
因此，我们只需要存储其相应码字的索引，而不是其嵌入向量。
由于码本中的码字索引可以用 log W 位进行紧凑编码，因此存储项目表示的总体内存要求可以从 4ND 字节减少到 1/8 NB log W + 4DBW 字节 [24]。

受基于矢量量化的 MIPS 算法中可以规避冗余内积计算的好处以及使用码本量化任何嵌入矩阵的能力的启发，我们提出了 LISA（线性时间自注意力），一种基于计算码字直方图。
LISA 配备了一系列码本来对项目（或任何形式的令牌）进行编码，以类似的方式显着降低内积计算的成本。
由于每个项目（令牌）都表示为码字的组合，并且整个输入序列可以压缩为每个码本的码字直方图（如图 1 所示），因此我们本质上是对码字执行注意力。
直方图用于在 O(L) 时间内计算注意力权重矩阵。然后我们将具有注意力权重的码字合并以获得输出。
为了在单向设置中启用自注意力（即使用临时掩码 [19]），我们可以采用前缀和的机制并在序列的每个位置计算直方图。

与依赖稀疏模式的高效注意方法相比，我们提出的方法对输入序列执行完全上下文注意，计算和记忆复杂度与序列长度成线性关系。我们提出的方法还享有 LightRec 带来的项目嵌入的压缩。
特别是在在线推荐设置中，我们的方法可以用固定大小的直方图封装用户的整个历史，大大降低存储成本。

我们的贡献可以总结如下：

- 我们提出了LISA（线性时间自注意力），这是一种用于有效推荐的新型注意力机制，可将计算注意力分数的复杂性从O(L2D) 降低到O(LBW)，同时启用模型压缩。码字总数 BW 是性能和速度之间的预算超参数平衡。
- 我们还提出了 LISA 的两种变体，其中一种允许软码字分配，另一种使用单独的码本对序列进行编码。这些技术使我们能够使用更小的码本，从而进一步提高效率。
- 我们对四个真实世界的数据集进行了大量实验。我们提出的方法获得了与 vanilla self-attention 相似的性能，同时在性能和效率方面都显着优于最先进的高效注意力基线。

### 相关工作

1. Self-attention in sequential recommendation
2. Faster attention
   1. Transformer-XL: long-term dependency
   2. Sinkhorn Transformer: 
   3. Reformer:
   4. Big Bird:
   5. Clustered Attention:
   6. Linformer: 

### Notations

1. $$ L $$: 序列长度
2. $$ D $$: Hidden size
3. $$ X \in \mathbb{R}^{L \times D} $$: Input
4. $$ B $$: 码本的基数量 ($$B \ll D$$)
5. 每个码本以 $$W$$ 个 $$D$$ 维的码字（codeword）组成
6. $$ \Omega_X $$: 不同的码字下标数 ($$\Omega_X \ll L$$)

### Methodology

1. Attention Mechanism (略)
2. EmbeddingQuantization with Codebooks
   1. LightRec (推荐系统加速): 使用 $$B$$ 个码本（codebooks）编码嵌入矩阵（每个码本以 $$W$$ 个 $$D$$ 维的码字（codeword）组成，视为隐空间的一个基）
   2. 嵌入$$ x_i $$的分解：$$ x_i = \sum_{b=1}^B{c_{w^b_i}^b}, \text{s.t.} w^b_i = \arg \max_{w}{\text{sim} (x_i, c_w^b)} $$
      1. 本质：将$$x_i$$以码字为基分解，其中每个码本提供一个其中与$$x_i$$最接近的码字
   3. In LightRec: $$ \text{sim}(x, y) = x^\intercal \mathbf{W} y + \langle \mathbf{w_1}, x \rangle + \langle \mathbf{w_2}, y \rangle $$
      1. $$ \mathbf{W}, \mathbf{w_1}, \mathbf{w_2} $$为参数
   4. $$ c_w^b $$为第b个码本中的第w个码字
   5. 训练过程中，$$\arg\max$$使用可微的softmax代替
   6. 推断过程中，将$$x_i$$用每个码本中码字的下标代替，存储空间（字节）由$$4ND$$降至$$\frac{1}{8}NB \log_{2}{W} + 4BWD$$
3. Motivation: 考虑只有一个码本的情况，此时$$x_i = c_{w_i}$$（码本中最接近的向量）
   1. 观察公式（3），当有重复码本下标时，会重复计算内积，故可化简为公式（4）
4. Linear-Time Self Attention
   1. 将上述Motivation扩展到多个码本s的情况，与单码本场景不同，虽然在每个码本中，许多项可能对应同一个码字，但它们的表示在加法组合后会发散。因此，我们仍然需要计算$$q$$和序列中每个项目$$x_i$$之间的内积。
   2. 因此，将公式（5）按照码本分解，得到公式（6）（可视为多个码本之间的Multi-head），在使用Motivation中的技巧变为公式（7）
   3. 然而，$$\Omega_X^b$$ 的基数在不同序列X和不同码本b之间变化。因此，公式(7)的计算在不同大小的张量上运行，这对于GPU和TPU中的高效批处理来说是次优的 [20]。出于批处理目的，我们对每个码本中的所有码字执行Attention，将Attention的“上下文大小”固定到W（变换为等价的公式（8））
   4. 代入Self-Attention情况，又因为不同码本视为不同空间中的Attention，忽略不同码本之间的计算（**这里有疑问？为什么可以忽略？LightRec为什么不使用这个优化？**），得到公式（9）
   5. 公式（9）处理的是双向Attention情况（可以Attention整个序列），改造为推荐系统中的单向Attention（只能Attend on当前之前的项）
      1. 使用$$O(\log L)$$的算法快速计算前缀和
   6. 将Attention参数矩阵Q,K,V代入，得到最终公式（11）
      1. 可以以$$O(BW^2)$$的空间开销缓存所有内积（这对于原始Attention是不可行的）
5. Variants
   1. LISA-Soft: 用softmax替换one-hot下标w，并且不缓存
   2. LISA-Mini: 两个码本：BW值较小的编码序列，大的编码Target items
   3. Extensions: 推荐系统中，根据[18]，多层Attention Layers效果不好，故只用单层；LISA也可用于其他任务，如NLP
6. Complexity: 均摊时间复杂度$$O(LBWD)$$

### 实验

1. Datasets: Alibaba, ML-1M, Video Games
2. Metrics: HR, NDCG
3. 从Vanilla Self-Attention迁移到LISA：性能略微上升，说明LISA模拟Attention性能较好

## 总结&提问

## 代码研究

正在完善中。
