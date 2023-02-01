---
layout: post
title: Git笔记
description: Git/GitHub知识点，以链接为主
permalink: /technique-notes/git-notes
categories: [Git, GitHub, 技巧]
---

## Git

1. 将Git项目打包为ZIP：`git archive <tree-ish> --format zip -o xxx.zip`
2. 对于需要远程机器同步的项目：（配置换行问题）
   1. `git config core.autocrlf false`
   2. `dos2unix`
3. 对于Ali项目：记得改用户名和邮箱（`git config user.name`, `git config user.email`）

## GitHub

### GitHub Actions

1. 教程：<https://zhuanlan.zhihu.com/p/164744104>

### Personal Access Tokens

1. Pycharm access token: see my mobile notes.
