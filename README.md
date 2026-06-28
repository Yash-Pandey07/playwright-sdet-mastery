# 🎭 Playwright SDET Mastery

> **The Ultimate Free, Open-Source Ebook & Learning Roadmap for SDETs and QA Automation Engineers.** 72+ modules covering Playwright, API Testing, CI/CD, DevOps, System Design, DSA, and Interview Preparation.

[![Vercel Deployment](https://img.shields.io/badge/hosted-Vercel-black?logo=vercel&style=for-the-badge)](https://playwright-sdet-mastery.vercel.app/)
[![Playwright Version](https://img.shields.io/badge/Playwright-v1.61.0-blue?logo=playwright&style=for-the-badge)](https://github.com/microsoft/playwright)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

---

## 📖 About the Project

This repository hosts the **multi-page static website** generated from the master single-file Playwright SDET Ebook. The book is compiled into **72 standalone, highly-optimized pages** to ensure:
* **⚡ Blazing Fast Speeds:** Static HTML layout loads instantly.
* **🔍 Premium SEO:** Easily indexable by Google/search engines for rapid discovery.
* **📱 Desktop & Mobile Responsive:** Collapsible side nav with a clean dark theme.

**Live Site:** [playwright-sdet-mastery.vercel.app](https://playwright-sdet-mastery.vercel.app/)

---

## 📚 What is Covered? (72+ Modules Roadmap)

The curriculum is structured into 13 curated sections, guiding you from programming fundamentals to senior architect-level concepts:

### 1. ⚙️ Prerequisites & Languages
* **Module 1-3:** Node.js for SDETs, JavaScript Masterclass (Closures, Event Loop, Promises), and TypeScript Crash Course (Types, Generics).

### 2. 🎭 Playwright Core
* **Module 4-5:** Client-Server Architecture, CDP (Chrome DevTools Protocol) vs Webdriver, Deep Internals (Workers, Headless).
* **Module 6-10:** Locators, Web-First Assertions, Custom Fixtures, Network Mocking (`page.route`), Locator Playground, Popups, and Window events.
* **Module 11-16:** Visual Regression Testing, Accessibility (axe-core, ARIA Snapshots), Performance (Lighthouse, Web Vitals), Mobile Emulation, and Playwright with Python.

### 3. 🌐 API & Backend Testing
* **Module 17-20:** REST APIs, APIRequestContext, Schema Validation, API Chaining, and Postman/Newman Deep-Dive.
* **Module 21-24:** Database Testing (JDBC, pg client), GraphQL, gRPC/Protobuf, Contract Testing (Pact), and REST Assured (Java comparison).

### 4. 🚀 CI/CD & DevOps
* **Module 25-28:** Git Version Control, GitHub Actions Pipelines (sharding, caching, reporting), Docker Containers, and Kubernetes for Testers.
* **Module 29-32:** Linux Command Line (grep, sed, awk), Jenkins, Cloud Grid Execution (BrowserStack), and Flakiness Diagnostic Playbook.

### 5. 🛡️ Testing Foundations & Observability
* **Module 33-35:** Manual Testing Foundations, Test Automation Architecture patterns, and BDD with Cucumber.
* **Module 36-39:** SDET System Design, Left-Shift & Right-Shift testing, Test Data Management, and Mocking/Stubbing Strategies.
* **Module 40-42:** Reporting Dashboards, Allure Reports, OpenTelemetry, and Grafana Dashboard setup.

### 6. 🤖 AI & Emerging Tech
* **Module 43:** LLMs in Testing, Model Context Protocol (MCP), and Playwright Agents.

### 7. 🛠️ Alternative Frameworks
* **Module 44-50:** Selenium WebDriver, Cypress (In-Browser Architecture), Appium (Mobile Native), Java for SDETs, Vitest, Karate, and Advanced XPath.

### 8. 🌩️ Advanced Topics
* **Module 51-55:** Microservices & Kafka Event Testing, OWASP Top 10 Security Testing, JMeter Performance, k6 & Gatling Load Testing, and Chaos Engineering.

### 9. 💻 Full-stack Stack Integration
* **Module 56-60:** React, Next.js (App Router, Server Components), MongoDB, Jira Integration, and Blockchain & dApp Testing.

### 10. 🧠 DSA & Coding Round Preparation
* **Module 61-64:** Big-O Complexity, Data Structures, JavaScript/TypeScript Coding Problems (debounce, retry, deep-equal), and DSA Pro (sort, search, graphs, DP).

### 11. 📐 System Design Pro
* **Module 65-66:** System Design Fundamentals (Load Balancers, Sharding, CAP theorem), DB Internals, and 15+ real-world distributed architectures.

### 12. 💼 Interview Preparation
* **Module 67-71:** Behavioral & Scenario questions, tiered questions by experience level (1y / 3y / 5y / 8y), 5-Year SDET Deep Q&A, and Final Review Checklist.

---

## ✨ Premium UX Features

* **Offline-Ready:** The master copy is a single self-contained HTML file that runs anywhere without internet.
* **Live Search:** Fast, client-side keyword filtering in the navigation sidebar.
* **Smart Sidebar Scrolling:** Restores scroll position and automatically centers the active module link in the viewport.
* **Clean Console Noise Suppression:** Prevents standard browser extension warnings from cluttering developer tools.

---

## 🛠️ How to Update (For the Author)

1. Edit the **source file** (`playwright-sdet-ebook.html`) in your local parent directory.
2. Run the build script to regenerate the static pages:

```bash
node build.js
```

3. The `docs/` folder is automatically rebuilt. Commit and push the changes to trigger a new Vercel deployment.

---

## 🤝 Contributing

To prevent the redistribution of the single-file offline edition, **the raw source `playwright-sdet-ebook.html` is kept private**. 

If you notice typos, bugs, or have content suggestions:
1. **Open an Issue** or submit a **Pull Request** directly against the generated files under the `docs/` directory.
2. Once merged, the author will backport your updates into the master source HTML file.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.

---

Built with ❤️ by [Yash Pandey](https://portfolio-yash-sage.vercel.app/) ([GitHub](https://github.com/Yash-Pandey07) | [LinkedIn](https://www.linkedin.com/in/yashpandey7/)) for the global SDET community.