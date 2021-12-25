---
layout: post
title: Python技巧
description: Python脚本技巧知识
permalink: /technique-notes/python-notes
categories: [Python, 技巧]
---

1. 分割字符串时保留分隔符

    ```python
    import re
    PAT_SET_END = re.compile(r'([!"\')?”。」！）＊※？]+)')
    sentences_with_ends = PAT_SET_END.split(line)
    if sentences_with_ends and sentences_with_ends[-1] == '':
        sentences_with_ends.pop()
    sentences_with_ends.append('')
    sentences = [s + e for s, e in zip(sentences_with_ends[0::2], sentences_with_ends[1::2])]
    ```

2. 一个with语句打开一个列表中的文件

    ```python
    from contextlib import ExitStack
    filenames = ['1.txt', '2.txt', '3.txt']

    with ExitStack() as stack:
        fds = [stack.enter_context(open(fn, 'r', encoding='utf-8')) for fn in filenames]
    ```
