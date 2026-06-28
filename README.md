# 🎭 Playwright SDET Mastery

> **Free, open-source ebook for SDETs and QA engineers** — 72+ modules covering Playwright, API testing, CI/CD, system design, and interview prep.

[![Vercel Deployment](https://img.shields.io/badge/hosted-Vercel-black?logo=vercel)](https://playwright-sdet-mastery.vercel.app/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 📖 About

This is a **multi-page static website** built from the [Playwright SDET Ebook](https://github.com/Yash-Pandey07/playwright-sdet-mastery) — a comprehensive single-file HTML ebook that is split into **72+ standalone pages** for superior SEO, faster loading, premium readability, and Google AdSense optimization.

## 🚀 Deployment

The site is configured for **Vercel** with the following directory layout:

```text
📁 docs/            ← Vercel output publish directory
├── index.html      ← Home page
├── architecture.html
├── locators.html
├── api-testing.html
├── ...
├── sitemap.xml
└── robots.txt
```

**Live Site:** [playwright-sdet-mastery.vercel.app](https://playwright-sdet-mastery.vercel.app/)

## ✨ Key Features & UX Improvements
- **Vercel Analytics:** Built-in lightweight page view tracking.
- **Smart Sidebar Scrolling:** The left navigation sidebar automatically scrolls the active page's link into vertical center on load, keeping your place saved.
- **Improved Collapse Toggle:** A floating toggle button on desktop and tablet that slides smoothly out of the way of the header text.
- **Clean Console Output:** Automatically filters out common console errors and unhandled rejections caused by browser extensions.

## 🛠 How to Update

1. Edit the **source file** (`playwright-sdet-ebook.html`) in the parent directory — this is the single source of truth.
2. Run the build script to regenerate the site:

```bash
node build.js
```

3. The `docs/` folder is automatically rebuilt — just commit and push your changes.

## 📦 Requirements

- **Zero** client-side framework dependencies.
- Rebuilt with a single, vanilla Node.js script: [build.js](build.js).

## 📄 License

MIT — open source, free to use, modify, and share.

---

Built with ❤️ by [Yash Pandey](https://portfolio-yash-sage.vercel.app/) ([GitHub](https://github.com/Yash-Pandey07) | [LinkedIn](https://www.linkedin.com/in/yashpandey7/)) for the SDET community.