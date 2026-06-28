# Playwright SDET Mastery

**Free, open-source ebook for SDETs and QA engineers** — 72+ modules covering Playwright, API testing, CI/CD, system design, and interview prep.

[![Vercel](https://img.shields.io/badge/hosted-Vercel-black)](https://playwright-sdet-mastery.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## Live Site

**https://playwright-sdet-mastery.vercel.app**

## About

A multi-page static website built from the [Playwright SDET Ebook](https://github.com/Yash-Pandey07/playwright-sdet-mastery) — a comprehensive single-file HTML ebook split into **72+ standalone pages** for better SEO, readability, and performance.

## Tech Stack

- **Hosting:** Vercel (automatic deploys from `main` branch)
- **Analytics:** @vercel/analytics
- **Build:** Zero-dependency Node.js script (`build.js`)
- **Output:** Static HTML files in `docs/`

## Directory Structure

```
playwright-sdet-ebook.html   ← Source of truth (single-file HTML)
build.js                     ← Build script (pure Node.js, no deps)
docs/                        ← Generated output (deployed to Vercel)
├── index.html
├── architecture.html
├── locators.html
├── ...
├── sitemap.xml
└── robots.txt
vercel.json                  ← Vercel config (output: docs/, clean URLs)
package.json                 ← Only @vercel/analytics
```

## How to Update

1. Edit the source file `playwright-sdet-ebook.html`
2. Run the build script:

```bash
node build.js
```

3. The `docs/` folder is regenerated — commit and push to deploy

## License

MIT — open source, free to use, modify, and share.

Built for the SDET community.
