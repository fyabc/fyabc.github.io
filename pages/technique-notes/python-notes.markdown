---
layout: post
title: Python技巧
description: Python脚本技巧知识
permalink: /technique-notes/python-notes
categories: [Python, 技巧]
---

## 核心语法与标准库

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

3. 根据非空有序下标列表选择列表中的子集（`numpy`中的多重下标）

    ```python
    indices = [1, 3, 5]     # Sorted, non-empty
    data = ['a', 'b', 'c', 'd', 'e']
    def process(item): pass

    indices_iter = iter(indices)
    next_index = next(indices_iter)
    for index, item in enumerate(data):
        if index != next_index:
            continue
        process(item)
        try:
            next_index = next(indices_iter)
        except StopIteration:
            break
    ```

4. 由于实现问题（`fork`），Unix下的`multiprocessing`可以共享全局变量，但不要依赖这一点。还是需要在每个进程函数中传递锁和其他共享对象。
5. 在多进程`Pool`之间传递锁：<https://stackoverflow.com/a/25558333>
6. Python打包：参考<https://packaging.python.org/en/latest/tutorials/packaging-projects/#packaging-python-projects>
   1. 核心步骤：`pyproject.toml`, `setup.cfg`, `python -m build`, `python -m twine upload --repository testpypi dist/*`

## 好用的第三方库

1. [`pubchempy`](https://zhuanlan.zhihu.com/p/58596574)
   1. PubChem分子数据库的Python接口
   2. [Doc](https://pubchempy.readthedocs.io/en/latest/)
