# 🎭 Playwright SDET Mastery

> **Free, open-source ebook for SDETs and QA engineers** — 72+ modules covering Playwright, API testing, CI/CD, system design, and interview prep.

[![GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-blue)](https://playwright-sdet-mastery.pages.dev)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 📖 About

This is a **multi-page static website** built from the [Playwright SDET Ebook](https://github.com/your-username/playwright-sdet-mastery) — a comprehensive single-file HTML ebook that has been split into **72+ standalone pages** for better SEO, readability, and monetization (Google AdSense ready).

## 🚀 Deployment

The site uses **GitHub Pages** (free, zero-cost hosting):

```
📁 docs/            ← GitHub Pages publish directory
├── index.html      ← Home page
├── architecture.html
├── locators.html
├── api-testing.html
├── ...
├── sitemap.xml
└── robots.txt
```

**Live at:** `https://playwright-sdet-mastery.pages.dev/`

## 🛠 How to Update

1. Edit the **source file** (`playwright-sdet-ebook.html`) — this is the single source of truth
2. Run the build script to regenerate the site:

```bash
node ../playwright-mastery/build.js
```

3. The `docs/` folder is updated — just commit and push to GitHub

## 📦 Requirements

- **Zero** — no npm, no dependencies. Pure Node.js.
- The build script is a single file: `build.js`

## 🔍 SEO & Monetization

Each page includes:
- `<title>` and `<meta name="description">` for each module
- Open Graph tags (`og:title`, `og:description`, `og:type`)
- `link rel="canonical"` for proper indexing
- `sitemap.xml` and `robots.txt`
- Google AdSense ready (placeholder `<ins>` tags — just add your AdSense client ID)

## 📄 License

MIT — open source, free to use, modify, and share.

---

Built with ❤️ for the SDET community.