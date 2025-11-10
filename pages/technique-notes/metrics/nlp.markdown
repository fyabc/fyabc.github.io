---
layout: post
title: NLP指标一览
description: 
permalink: /technique-notes/metrics/nlp
categories: [tech.Metrics,task.NLP]
---

## Language Modeling Metrics

### 参考

1. [参考1](https://thegradient.pub/understanding-evaluation-metrics-for-language-models/)
2. [参考2](https://vaclavkosar.com/ml/bits-per-byte-and-bits-per-character)

### 概述

1. 前向LM: $P(w_1,\cdots,w_n)=\prod_{i=1}^n{p(w_i|w_1,\cdots w_{i-1})}$
2. **语言熵**：$H(P)=\sum_x{P(x)\log P(x)}$
3. **交叉熵（Cross-Entropy）**: $H(P, Q) = -\sum_x{P(x)\log Q(x)} = H(P) + D_{KL}(P||Q)$
4. **困惑度（PPL）**: 预测下一个词的困惑程度（*例如*：对于一个词有三位熵的LM，预测下一个词需要在$2^3=8$个可能性中选取，故其困惑度为$8$）
   1. $\textrm{PPL}(P, Q) = 2^{\textrm{H}(P, Q)}$
   2. 困惑度（PPL）依赖于文本预处理方式，在不同LM之间不可通用（例如基于字符的PPL通常低于基于词的PPL）
   3. 与Accuracy相比，PPL没有明确的最优值目标。
   4. PPL的值的准确度与上下文长度相关。

5. Bits-per-character (BPC), Bits-per-byte (BPB), Bits-per-word (BPW) 等同于语言熵的原始定义，每字符/词的最短表示的比特数
