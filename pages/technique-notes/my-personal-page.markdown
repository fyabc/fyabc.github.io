---
layout: post
title: 个人主页
# description: 
permalink: /technique-notes/personal-page
categories: []
---

## 构建个人主页

1. My GitHub page repo: <https://github.com/fyabc/fyabc.github.io>
2. Install Jekyll on WSL 2: <https://davemateer.com/2020/10/20/running-jekyll-on-wsl2>
    1. My blog path (on MS desktop): ROOT=D:/GitProjects/fyabc.github.io
    2. 安装过程中，sudo gem install bundler报ArgumentError：改用其他版本
        1. 运行上述命令直到sudo apt install一大堆（不要装ruby相关的东西）
        2. `sudo apt install rbenv`
        3. `rbenv install 2.4.1`
        4. Run `rbenv init` and append the output into `~/.bashrc`
        5. `cd $ROOT`
        6. `rbenv local 2.4.1`
        7. `gem install bundler`
        8. `gem install jekyll`
        9. `gem update --system`
        10. `bundle update`
    3. Check jekyll install: in $ROOT
        1. `bundle exec jekyll --help`
    4. Build and check my website:
        1. `bundle exec jekyll b`
        2. `bundle exec jekyll s -P 20999`
        3. Open <http://127.0.0.1:20999> in browser.
3. Setup GitHub Pages with Jekyll: <https://docs.github.com/cn/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll>
    1. `cd $ROOT`
    2. `rbenv local 2.4.1`
    3. `$(rbenv which jekyll) new .`