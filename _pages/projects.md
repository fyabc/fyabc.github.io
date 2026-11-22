---
layout: page
permalink: /projects/
title: projects
description: Hobby projects developed in spare time.
nav: true
nav_order: 3
horizontal: false
---

Personal projects developed in spare time, ranging from world-building simulators to programming language design. For up-to-date features and roadmaps, follow the links to each project's site and repository.

<div class="projects">
{% assign sorted_projects = site.projects | sort: "importance" %}
{% for project in sorted_projects %}
{% if project.redirect %}
- <a href="{{ project.redirect }}" target="_blank" rel="noopener"><strong>{{ project.title }}</strong></a> — {{ project.description }}
{% else %}
- <a href="{{ project.url | relative_url }}"><strong>{{ project.title }}</strong></a> — {{ project.description }}
{% endif %}
{% endfor %}
</div>
