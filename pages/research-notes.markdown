---
layout: default
title: Research Notes
description: 论文、领域等的简单笔记
permalink: /research-notes/
---

## 笔记列表

<ul>
{% for page in site.pages %}
    {% if page.path contains "pages/" and page.path contains ".markdown" %}
<li>
<a href="{{ page.url }}">{{ page.title }}</a>
</li>
    {% endif %}
{% endfor %}
</ul>
