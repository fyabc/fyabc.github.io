# fyabc.github.io

Personal homepage of Yang Fan: <https://fyabc.github.io/>

Built with [Jekyll](https://jekyllrb.com/) and the [al-folio](https://github.com/alshedivat/al-folio) theme, deployed via GitHub Actions (`.github/workflows/deploy.yml`) to the `gh-pages` branch.

## Content map

- `_pages/about.md` — landing page (bio, news, selected papers)
- `_bibliography/papers.bib` — publications (rendered by jekyll-scholar)
- `_news/` — short announcements shown on the landing page
- `_projects/` — hobby project cards linking to project sites
- `_data/cv.yml` — CV data (rendered on `/cv/`, PDF via rendercv workflow)
- `_data/socials.yml` — contact and social links

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Push to `master` to deploy; the deploy workflow builds the site and publishes `_site/` to `gh-pages`.
