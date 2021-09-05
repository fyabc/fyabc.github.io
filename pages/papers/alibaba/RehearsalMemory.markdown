---
layout: post
title: Rehearsal Memory (RM)
# description: 描述
permalink: /research-notes/RehearsalMemory
categories: [task.Reasoning]
---

## 链接

- 主页：<https://arxiv.org/abs/2106.01096>
- 正文：<https://arxiv.org/pdf/2106.01096/pdf>
- 附件：无
- 代码：<https://xxx>
- 其他笔记：
  - <https://xxx>

## 信息

- Name: Learning to Rehearse in Long Sequence Memorization
- Abbr: **Rehearsal Memory (RM)**
- Author: XXX
- Affiliation: DAMO Alibaba
- Preprint/Received Time: 20XX.XX.XX
- Published Time: 20XX.XX.XX
- Meeting: XXX
- Citation: **XXX** (Check date)
- Dataset: XXX
- Main Method: XXX

## 文章解读

1. Rehearse: 排练
2. Main Task: Reasoning（给定输入内容X和查询Q）
   1. Example 1: Given background image/text，Question Answering
   2. Example 2: Given user behavior sequence, determine whether the user will click the given item

### Abstract

现有的推理任务通常有一个重要的假设，即**推理时总是可以访问输入内容**，这需要**无限的存储资源**，并且**在长序列上存在严重的时间延迟**。
为了**在存储资源有限的长序列上实现有效推理**，记忆增强神经网络(**MANN**)引入了一种类似人类的读写记忆来压缩和记忆长输入序列，试图仅根据记忆回答后续查询。
但是它们有两个严重的缺点：1）**它们不断地根据当前信息更新记忆，不可避免地忘记了早期的内容**； 2）**他们不区分哪些信息是重要的**，对所有内容一视同仁。
在本文中，我们提出了排练记忆 (RM)，通过使用历史采样器进行自我监督排练来增强长序列记忆。
为了减轻对早期信息的逐渐遗忘，我们设计了带有**回忆和熟悉任务**的自我监督排练训练。
此外，我们设计了一个**历史采样器**来选择用于排练训练的信息片段，使记忆集中在关键信息上。
我们通过合成 bAbI 任务和几个下游任务（包括文本/视频问答和长序列推荐）来评估我们的排练记忆的性能。

### Introduction

1. 记忆增强神经网络(**MANN**): 引入额外的存储M
   1. Neural Turing Machine (NTM)
   2. Differentiable Neural Computer (DNC)

### Notations

1. Input sequence $$\mathbf{X} = \{ \mathbf{x}_1, \mathbf{x}_2, \cdots \} $$, Query $$\mathbf{Q}$$, Answer $$\mathbf{A}$$
2. Model $$\mathcal{T}(\mathbf{X}, \mathbf{Q}), \mathcal{R}(\mathbf{M}, \mathbf{Q}) $$, fixed-size memory $$\mathbf{M}=\{\mathbf{m}_k\}_{k=1}^K$$
3. Input/Memory Dimension $$d_x$$

### Rehearsal Memory

1. 训练过程中，同时使用：
   1. Self-supervised Rehearsal Training：Rehearsal Model $$\mathcal{H}(\mathbf{M}, \mathbf{H})$$
      1. Recollection Task: 重构masked history fragments
      2. Familiarity Task: 区分历史正例和负例
      3. History Sampler: $$\mathcal{S}$$，输出重要的历史片段$$\mathbf{H}$$
   2. Task-specific Reasoning Training：Task-specific Model $$\mathcal{R}(\mathbf{M}, \mathbf{Q})$$
2. 测试过程中：Rehearsal Model和History Sampler不再需要，只需Rehearsal Model和Task-specific Model
3. Rehearsal Memory Machine $$\mathcal{G}(\mathbf{X})\rightarrow\mathbf{M}$$
   1. 以Segment为单位处理输入X，使用Transformer编码为Features$$\mathbf{F}$$
   2. Memory Update Module: 使用Features更新上一个时间的Memory（做Slot2Item Attention，GRU update）
4. Self-Supervised Rehearsal Training
5. **TODO**:写完这一篇

## 总结&提问

1. 可否参考可寒分享的[Not All Memories are Created Equal: Learning to Forget by Expiring](https://arxiv.org/pdf/2105.06548.pdf)？
2. MANN和Transformer-XL等超长序列Transformer有何关系和区别？

## 代码研究

正在完善中。
