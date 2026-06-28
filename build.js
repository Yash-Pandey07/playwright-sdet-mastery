#!/usr/bin/env node
/**
 * build.js — Playwright SDET Mastery Ebook → Multi-page static site
 *
 * Reads the single-file HTML ebook (playwright-sdet-ebook.html),
 * extracts each module <section>, and generates standalone HTML pages
 * in the docs/ directory for GitHub Pages deployment.
 *
 * Usage: node build.js [source-path]
 *   Default source: ../playwright-sdet-ebook.html (relative to this script)
 *   Output: docs/
 *
 * Zero dependencies — pure Node.js.
 */

const fs = require('fs');
const path = require('path');

// ─── Config ────────────────────────────────────────────────────────
const SCRIPT_DIR = __dirname;
const DEFAULT_SOURCE = path.join(SCRIPT_DIR, '..', 'playwright-sdet-ebook.html');
const SOURCE_FILE = process.argv[2] || DEFAULT_SOURCE;
const OUT_DIR = path.join(SCRIPT_DIR, 'docs');
const SITE_BASE = '/';
const SITE_URL = 'https://playwright-sdet-mastery.vercel.app';

// ═══════════════════════════════════════════════════════════════════
// MODULE REGISTRY — Map all 72 modules from the sidebar nav
// Each entry: { id, num, title, slug, cat }
// ═══════════════════════════════════════════════════════════════════

const MODULE_REGISTRY = [
  // ── Home ───────────────────────────────────────────────────────
  { id: 'm0',  num: '★',  title: 'Home & How to Use',                   slug: 'index',             cat: 'home' },

  // ── ① Prerequisites ─────────────────────────────────────────────
  { id: 'm60', num: '1',  title: 'Node.js for SDET — Start Here',       slug: 'nodejs-sdet',      cat: 'prereq' },
  { id: 'm18', num: '2',  title: 'JavaScript Masterclass',               slug: 'javascript',       cat: 'prereq' },
  { id: 'm19', num: '3',  title: 'TypeScript Crash Course',              slug: 'typescript',       cat: 'prereq' },

  // ── ② Playwright Core ─────────────────────────────────────────
  { id: 'm1',  num: '4',  title: 'Architecture & Internals',             slug: 'architecture',     cat: 'core' },
  { id: 'm70', num: '5',  title: 'Deep Internals: CDP, Workers, Headless', slug: 'cdp-internals', cat: 'core' },
  { id: 'm2',  num: '6',  title: 'Locators & UI Testing',                slug: 'locators',         cat: 'core' },
  { id: 'm3',  num: '7',  title: 'Fixtures, Parallelism, Config',        slug: 'fixtures',        cat: 'core' },
  { id: 'm4',  num: '8',  title: 'Network & Advanced',                   slug: 'network',         cat: 'core' },
  { id: 'm11', num: '9',  title: 'Locator Playground',                   slug: 'locator-playground', cat: 'core' },
  { id: 'm22', num: '10', title: 'Popups, Alerts, Windows',              slug: 'popups',          cat: 'core' },
  { id: 'm13', num: '11', title: 'Visual Regression',                    slug: 'visual-regression', cat: 'core' },
  { id: 'm14', num: '12', title: 'Accessibility Testing',                slug: 'accessibility',   cat: 'core' },
  { id: 'm15', num: '13', title: 'Performance Testing',                  slug: 'performance',     cat: 'core' },
  { id: 'm16', num: '14', title: 'Mobile & Device',                      slug: 'mobile',         cat: 'core' },
  { id: 'm21', num: '15', title: 'Playwright with Python',               slug: 'python',         cat: 'core' },
  { id: 'm34', num: '16', title: 'Playwright Cheat Sheet',               slug: 'cheat-sheet',    cat: 'core' },

  // ── ③ API & Backend Testing ─────────────────────────────────────
  { id: 'm5',  num: '17', title: 'API Testing',                          slug: 'api-testing',     cat: 'api' },
  { id: 'm25', num: '18', title: 'HTTP Status Codes',                    slug: 'http-status',    cat: 'api' },
  { id: 'm12', num: '19', title: 'API Chaining',                         slug: 'api-chaining',   cat: 'api' },
  { id: 'm17', num: '20', title: 'Postman Deep-Dive',                    slug: 'postman',        cat: 'api' },
  { id: 'm7',  num: '21', title: 'Database Testing',                     slug: 'database',       cat: 'api' },
  { id: 'm48', num: '22', title: 'GraphQL & gRPC Testing',               slug: 'graphql-grpc',  cat: 'api' },
  { id: 'm49', num: '23', title: 'Contract Testing (Pact)',              slug: 'contract-testing', cat: 'api' },
  { id: 'm6',  num: '24', title: 'REST Assured (Java)',                  slug: 'rest-assured',   cat: 'api' },

  // ── ④ Dev & CI ─────────────────────────────────────────────────
  { id: 'm41', num: '25', title: 'Git for SDETs',                        slug: 'git',            cat: 'devops' },
  { id: 'm8',  num: '26', title: 'CI/CD with GitHub Actions',           slug: 'ci-cd',          cat: 'devops' },
  { id: 'm50', num: '27', title: 'Docker for Testing',                   slug: 'docker',        cat: 'devops' },
  { id: 'm52', num: '28', title: 'Kubernetes for Testers',               slug: 'kubernetes',     cat: 'devops' },
  { id: 'm51', num: '29', title: 'Linux & Shell for SDET',              slug: 'linux-shell',    cat: 'devops' },
  { id: 'm62', num: '30', title: 'Jenkins',                              slug: 'jenkins',       cat: 'devops' },
  { id: 'm29', num: '31', title: 'Cloud Execution & BrowserStack',       slug: 'cloud-execution', cat: 'devops' },
  { id: 'm32', num: '32', title: 'Flakiness: Local vs CI',              slug: 'flakiness',      cat: 'devops' },

  // ── ⑤ Testing Foundations ──────────────────────────────────────
  { id: 'm24', num: '33', title: 'Manual Testing Foundations',           slug: 'manual-testing', cat: 'foundations' },
  { id: 'm20', num: '34', title: 'Test Automation Architecture',         slug: 'test-automation', cat: 'foundations' },
  { id: 'm27', num: '35', title: 'BDD with Cucumber',                   slug: 'bdd',            cat: 'foundations' },
  { id: 'm26', num: '36', title: 'SDET System Design',                   slug: 'sdet-system-design', cat: 'foundations' },
  { id: 'm30', num: '37', title: 'Left-Shift & Right-Shift',            slug: 'shift-testing',  cat: 'foundations' },
  { id: 'm31', num: '38', title: 'Test Data Management',                slug: 'tdm',            cat: 'foundations' },
  { id: 'm39', num: '39', title: 'Mocking Strategies',                   slug: 'mocking',       cat: 'foundations' },
  { id: 'm40', num: '40', title: 'Reporting & Observability',           slug: 'reporting',      cat: 'foundations' },
  { id: 'm64', num: '41', title: 'Allure Reports (deep)',               slug: 'allure',        cat: 'foundations' },
  { id: 'm66', num: '42', title: 'OpenTelemetry & Grafana',             slug: 'opentelemetry', cat: 'foundations' },

  // ── ⑥ AI & Emerging ────────────────────────────────────────────
  { id: 'm28', num: '43', title: 'AI in Testing · MCP · Agents',         slug: 'ai-testing',     cat: 'ai' },
  { id: 'm43', num: '44', title: 'Selenium WebDriver',                   slug: 'selenium',      cat: 'tools' },
  { id: 'm45', num: '45', title: 'Cypress (full)',                       slug: 'cypress',       cat: 'tools' },
  { id: 'm46', num: '46', title: 'Appium / Mobile Native',              slug: 'appium',        cat: 'tools' },
  { id: 'm44', num: '47', title: 'Java for SDET',                        slug: 'java',         cat: 'tools' },
  { id: 'm57', num: '48', title: 'Vitest',                               slug: 'vitest',       cat: 'tools' },
  { id: 'm47', num: '49', title: 'Karate Framework',                    slug: 'karate',       cat: 'tools' },
  { id: 'm42', num: '50', title: 'XPath Deep-Dive Practice',            slug: 'xpath',         cat: 'tools' },

  // ── ⑦ Advanced & Specialized ────────────────────────────────────
  { id: 'm56', num: '51', title: 'Microservices & Kafka Testing',        slug: 'kafka-testing',  cat: 'advanced' },
  { id: 'm53', num: '52', title: 'Security Testing (OWASP)',            slug: 'security',      cat: 'advanced' },
  { id: 'm54', num: '53', title: 'JMeter',                               slug: 'jmeter',       cat: 'advanced' },
  { id: 'm55', num: '54', title: 'k6 & Gatling',                        slug: 'k6-gatling',   cat: 'advanced' },
  { id: 'm65', num: '55', title: 'Chaos Engineering',                    slug: 'chaos',        cat: 'advanced' },

  // ── ⑧ Full-stack Dev ────────────────────────────────────────────
  { id: 'm59', num: '56', title: 'React for SDET',                       slug: 'react',        cat: 'fullstack' },
  { id: 'm61', num: '57', title: 'Next.js for SDET',                     slug: 'nextjs',       cat: 'fullstack' },
  { id: 'm63', num: '58', title: 'MongoDB',                              slug: 'mongodb',      cat: 'fullstack' },
  { id: 'm58', num: '59', title: 'Jira for SDET',                        slug: 'jira',         cat: 'fullstack' },
  { id: 'm36', num: '60', title: 'Blockchain & DLT',                    slug: 'blockchain',   cat: 'fullstack' },

  // ── ⑨ DSA & Coding ─────────────────────────────────────────────
  { id: 'm37', num: '61', title: 'DSA Fundamentals',                     slug: 'dsa',          cat: 'dsa' },
  { id: 'm9',  num: '62', title: 'Coding Round (DSA)',                  slug: 'coding-round', cat: 'dsa' },
  { id: 'm23', num: '63', title: 'Extended Coding Round',                slug: 'extended-coding', cat: 'dsa' },
  { id: 'm67', num: '64', title: 'DSA Pro (complete)',                   slug: 'dsa-pro',      cat: 'dsa' },

  // ── ⑩ System Design ────────────────────────────────────────────
  { id: 'm38', num: '65', title: 'System Design Fundamentals',            slug: 'system-design', cat: 'design' },
  { id: 'm68', num: '66', title: 'System Design Pro (complete)',         slug: 'system-design-pro', cat: 'design' },

  // ── ⑪ Interview Prep ───────────────────────────────────────────
  { id: 'm10', num: '67', title: 'Behavioral & Scenario',                slug: 'behavioral',   cat: 'interview' },
  { id: 'm71', num: '68', title: 'Scenario Interview Masterclass',       slug: 'scenario-masterclass', cat: 'interview' },
  { id: 'm33', num: '69', title: 'Interview Q&A by Experience',          slug: 'interview-qa', cat: 'interview' },
  { id: 'm67', num: '69', title: 'Interview Q&A Mega-Bank',              slug: 'interview-mega-bank', cat: 'interview' },
  { id: 'm69', num: '70', title: 'Interview Q&A Mega-Bank',              slug: 'interview-mega-bank', cat: 'interview' },
  { id: 'm35', num: '71', title: 'Final Review & Gaps',                 slug: 'final-review', cat: 'interview' },

  // ── ⑫ Bonus ─────────────────────────────────────────────────────
  { id: 'm33', num: '★',  title: '5-Year SDET Deep Q&A',                slug: 'sdet-qa',      cat: 'bonus' },
];

// ─── Build slug → module lookup ──────────────────────────────────
const MODULES_BY_ID = {};
const MODULES_BY_SLUG = {};
const NAV_ORDER = [];

MODULE_REGISTRY.forEach((m, i) => {
  // Dedupe: skip duplicates — only keep first occurrence
  if (MODULES_BY_ID[m.id] && m.id !== 'm33') return;
  if (m.id === 'm33') {
    // m33 appears twice in nav — use the first (group 69) and skip the second
    if (MODULES_BY_ID['m33']) return;
  }
  MODULES_BY_ID[m.id] = m;
  MODULES_BY_SLUG[m.slug] = m;
  NAV_ORDER.push(m);
});

// ═══════════════════════════════════════════════════════════════════
// PARSE: Extract all module sections from the source HTML
// ═════════════════════════════════════════════════════════════════════

function loadSource() {
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error(`❌ Source file not found: ${SOURCE_FILE}`);
    console.error(`   Run from: ${SCRIPT_DIR}`);
    console.error(`   Or: node build.js /full/path/to/playwright-sdet-ebook.html`);
    process.exit(1);
  }
  return fs.readFileSync(SOURCE_FILE, 'utf-8');
}

function extractModuleSections(html) {
  const sections = {};
  // Pattern: <section class="module" id="mX"> ... </section>
  // Match each module section by its id attribute
  const moduleRegex = /<section\s+class="module"\s+id="(m\d+)"[^>]*>[\s\S]*?<\/section>/g;
  let match;
  while ((match = moduleRegex.exec(html)) !== null) {
    const id = match[1];
    const content = match[0];
    sections[id] = content;
  }
  return sections;
}

// ═══════════════════════════════════════════════════════════════════
// TEMPLATES
// ═══════════════════════════════════════════════════════════════════

// ─── Shared CSS (from original) ──────────────────────────────────
function getSharedCSS() {
  // Read the original CSS from the source <style> block
  const cssMatch = /<style>([\s\S]*?)<\/style>/i.exec(fs.readFileSync(SOURCE_FILE, 'utf-8'));
  return cssMatch ? cssMatch[1].trim() : '';
}

// ─── Shared JS (from original) ───────────────────────────────────
function getSharedJS() {
  // Read the original JS from the <script> blocks
  const source = fs.readFileSync(SOURCE_FILE, 'utf-8');
  const jsMatches = [];
  const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(source)) !== null) {
    jsMatches.push(match[1].trim());
  }
  const js = jsMatches.join('\n\n');

  // Replace single-page navigation and search logic with multi-page equivalents
  const navSearchRegex = /\/\* ===== Navigation ===== \*\/[\s\S]*?(?=\/\* ===== Syntax highlighter)/;
  const multiPageNavSearch = `/* ===== Navigation (Multi-page) ===== */
const links = document.querySelectorAll('#navlist a');

function show(id) {
  const activeLink = document.querySelector(\`#navlist a[data-id="\${id}"]\`);
  if (activeLink) {
    links.forEach(a => a.classList.remove('active'));
    activeLink.classList.add('active');
  }
}

links.forEach(a => {
  a.addEventListener('click', e => {
    // If the clicked link is the active page, just scroll to top and prevent reload
    if (a.classList.contains('active') || a.pathname === window.location.pathname) {
      e.preventDefault();
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  });
});

/* ===== Search ===== */
const search = document.getElementById('search');
if (search) {
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    if (!q) {
      links.forEach(a => a.parentElement.classList.remove('hidden'));
      return;
    }
    links.forEach(a => {
      const text = a.textContent.toLowerCase();
      a.parentElement.classList.toggle('hidden', !text.includes(q));
    });
  });
}

// Scroll active sidebar link into view on page load
setTimeout(() => {
  const activeLinkOnLoad = document.querySelector('#navlist a.active');
  if (activeLinkOnLoad) {
    activeLinkOnLoad.scrollIntoView({ block: 'center' });
  }
}, 50);


`;
  return js.replace(navSearchRegex, multiPageNavSearch);
}

// ─── Console noise suppression (extension logs) ──────────────────
function getConsoleSuppression() {
  return `<script>
(function(){
  var _e = console.error, _w = console.warn;
  var _r = [/AdUnit/i, /sentence/i, /message channel closed/i];
  function _s(a) {
    if (!a) return false;
    var str = String(a);
    return _r.some(function(p) { return p.test(str); });
  }
  console.error = function() {
    for (var i = 0; i < arguments.length; i++) {
      if (_s(arguments[i])) return;
    }
    _e.apply(console, arguments);
  };
  console.warn = function() {
    for (var i = 0; i < arguments.length; i++) {
      if (_s(arguments[i])) return;
    }
    _w.apply(console, arguments);
  };
  window.addEventListener('unhandledrejection', function(e) {
    var r = e.reason;
    var m = r ? (r.message || String(r)) : '';
    if (_s(m)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
  window.addEventListener('error', function(e) {
    var m = e.message || '';
    if (_s(m)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
})();
<\/script>`;
}

// ─── Meta description generator ──────────────────────────────────
function generateMeta(module) {
  const title = module.title;
  const desc = `Learn ${title} — comprehensive guide for SDETs and QA engineers. Covers Playwright testing, automation patterns, and real-world interview scenarios.`;
  const keywords = `playwright, sdet, ${module.slug}, testing, automation, playwright ${title.toLowerCase().replace(/[^a-z0-9]+/g, ' ')}`;
  return { description: desc, keywords };
}

// ─── Navigation sidebar HTML (for each page) ──────────────────────
function buildNavSidebar(currentSlug) {
  const cats = {
    home: 'Home',
    prereq: '① Prerequisites',
    core: '② Playwright Core',
    api: '③ API & Backend Testing',
    devops: '④ Dev & CI',
    foundations: '⑤ Testing Foundations',
    ai: '⑥ AI & Emerging',
    tools: '⑦ Alternative Tools',
    advanced: '⑧ Advanced & Specialized',
    fullstack: '⑨ Full-stack Dev',
    dsa: '⑩ DSA & Coding',
    design: '⑪ System Design',
    interview: '⑫ Interview Prep',
    bonus: '⑬ Bonus',
  };

  let currentCat = '';
  let html = `<aside id="sidebar">
  <div class="brand">
    <h1>Playwright SDET</h1>
    <p>Mastery ebook · open source</p>
    <p style="font-size:11px;color:var(--fg-3);margin-top:6px">Created by <a href="https://portfolio-yash-sage.vercel.app/" target="_blank" style="color:var(--accent);text-decoration:none;font-weight:600;padding:0;display:inline">Yash Pandey</a></p>
  </div>
  <div class="search-wrap">
    <input type="search" id="search" placeholder="Search topics, code, Q&A…">
  </div>
  <nav>
    <ul id="navlist">`;

  NAV_ORDER.forEach((m, i) => {
    const catKey = m.cat;
    const catLabel = cats[catKey] || '';
    if (catLabel && catLabel !== currentCat) {
      currentCat = catLabel;
      html += `\n      <li class="cat">${catLabel}</li>`;
    }
    const isActive = (m.slug === currentSlug) || (currentSlug === 'index' && m.slug === 'index');
    const activeClass = isActive ? ' active' : '';
    const num = m.num;
    // Link to the page
    const href = m.slug === 'index' ? SITE_BASE : `${SITE_BASE}${m.slug}.html`;
    html += `\n      <li><a href="${href}" data-id="${m.id}" class="${activeClass}"><span class="num">${num}</span>${m.title}</a></li>`;
  });

  html += `\n    </ul>
  </nav>
</aside>`;

  return html;
}

// ─── Generate page HTML ──────────────────────────────────────────
function generatePage(moduleContent, module, css, js) {
  const meta = generateMeta(module);
  const pageTitle = `${module.title} | Playwright SDET Mastery`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${meta.description}">
  <meta name="keywords" content="${meta.keywords}">
  <meta name="author" content="Yash Pandey">
  <meta property="og:title" content="${module.title} — Playwright SDET">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${SITE_URL}/${module.slug}.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${module.title}">
  <meta name="twitter:description" content="${meta.description}">
  <link rel="canonical" href="${SITE_URL}/${module.slug}.html">

  <style>
${css}

/* Custom layout overrides */
.nav-toggle {
  position: fixed;
  top: 14px;
  left: 314px; /* Desktop: position button to the right of the 300px sidebar */
  z-index: 1002;
  transition: left .25s cubic-bezier(.4,0,.2,1), background .15s, border-color .15s, color .15s;
}

@media(min-width:769px) and (max-width:1024px) {
  .nav-toggle {
    left: 274px; /* Tablet: position button to the right of the 260px sidebar */
  }
}

@media(max-width:768px) {
  .nav-toggle {
    top: 12px;
    left: 12px; /* Mobile: position button in the topbar */
  }
}

@media(min-width:769px) {
  .layout.sidebar-collapsed ~ .nav-toggle {
    left: 14px; /* Collapsed: position button in the top-left corner */
  }
}
  </style>
  <!-- Vercel Analytics -->
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
  ${getConsoleSuppression()}
</head>
<body>
  <!-- Mobile top bar -->
  <div class="mobile-topbar">
    <span class="topbar-title" id="topbar-title">${module.title}</span>
  </div>

  <!-- Sidebar backdrop -->
  <div class="sidebar-backdrop" id="sidebar-backdrop"></div>

  <div class="layout">
    ${buildNavSidebar(module.slug)}
    <main>
      ${moduleContent}
    </main>
  </div>

  <!-- Sidebar toggle button -->
  <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" title="Toggle sidebar">&#9776;</button>

  <script>
${js}
  </script>
</body>
</html>`;
}

// ─── Generate index/home page ────────────────────────────────────
function generateIndexPage(moduleContent, css, js) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Yash Pandey">
  <title>Playwright SDET Mastery — Open Source Ebook</title>
  <meta name="description" content="Free, open-source Playwright SDET ebook covering 72+ modules: architecture, locators, API testing, CI/CD, system design, and interview prep for QA engineers.">
  <meta name="keywords" content="playwright, sdet, ebook, testing, automation, open source, api testing, ci-cd, system design">
  <meta property="og:title" content="Playwright SDET Mastery — Open Source Ebook">
  <meta property="og:description" content="Complete Playwright SDET mastery ebook — 72+ modules, free and open source">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE_URL}/">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${SITE_URL}/">

  <style>
${css}

/* Custom layout overrides */
.nav-toggle {
  position: fixed;
  top: 14px;
  left: 314px; /* Desktop: position button to the right of the 300px sidebar */
  z-index: 1002;
  transition: left .25s cubic-bezier(.4,0,.2,1), background .15s, border-color .15s, color .15s;
}

@media(min-width:769px) and (max-width:1024px) {
  .nav-toggle {
    left: 274px; /* Tablet: position button to the right of the 260px sidebar */
  }
}

@media(max-width:768px) {
  .nav-toggle {
    top: 12px;
    left: 12px; /* Mobile: position button in the topbar */
  }
}

@media(min-width:769px) {
  .layout.sidebar-collapsed ~ .nav-toggle {
    left: 14px; /* Collapsed: position button in the top-left corner */
  }
}
  </style>
  <!-- Vercel Analytics -->
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
  ${getConsoleSuppression()}
</head>
<body>
  <!-- Mobile top bar -->
  <div class="mobile-topbar">
    <span class="topbar-title" id="topbar-title">Home & How to Use</span>
  </div>

  <!-- Sidebar backdrop -->
  <div class="sidebar-backdrop" id="sidebar-backdrop"></div>

  <div class="layout">
    ${buildNavSidebar('index')}
    <main>
      ${moduleContent}
    </main>
  </div>

  <!-- Sidebar toggle button -->
  <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" title="Toggle sidebar">&#9776;</button>

  <script>
${js}
  </script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════

function build() {
  console.log('📖 Playwright SDET Mastery — Site Builder');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Source: ${SOURCE_FILE}`);

  // 1. Load
  const source = loadSource();
  const css = getSharedCSS();
  const js = getSharedJS();
  const extracted = extractModuleSections(source);
  console.log(`\n📦 Extracted ${Object.keys(extracted).length} module sections`);

  // 2. Clean output
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // 3. Generate each module page
  const generated = [];
  const moduleCount = Object.keys(MODULES_BY_ID).length;

  NAV_ORDER.forEach((mod) => {
    const raw = extracted[mod.id];
    if (!raw) {
      console.warn(`  ⚠️  Module ${mod.id} ("${mod.title}") not found in source`);
      return;
    }

    // Strip the outer <section> tags to get inner content
    const innerMatch = raw.match(/<section\s+class="module"\s+id="m\d+"[^>]*>([\s\S]*?)<\/section>/);
    const innerContent = innerMatch ? innerMatch[1].trim() : raw;

    // Generate page
    const fileName = mod.slug === 'index' ? 'index.html' : `${mod.slug}.html`;
    const filePath = path.join(OUT_DIR, fileName);

    let pageHtml;
    if (mod.slug === 'index') {
      pageHtml = generateIndexPage(innerContent, css, js);
    } else {
      pageHtml = generatePage(innerContent, mod, css, js);
    }

    fs.writeFileSync(filePath, pageHtml, 'utf-8');
    generated.push({ file: fileName, title: mod.title, size: pageHtml.length });
    console.log(`  ✅ ${fileName} — ${mod.title}`);
  });

  // 4. Generate sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${NAV_ORDER.filter(m => m.slug !== 'index').map(m => `  <url>
    <loc>${SITE_URL}/${m.slug}.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemap, 'utf-8');
  console.log('  ✅ sitemap.xml');

  // 5. Generate robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;
  fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robots, 'utf-8');
  console.log('  ✅ robots.txt');

  // 6. Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📁 Output: ${OUT_DIR}/`);
  console.log(`📄 Pages: ${generated.length}`);
  const totalSize = generated.reduce((s, g) => s + g.size, 0);
  console.log(`📦 Total: ${(totalSize / 1024 / 1024).toFixed(1)} MB`);
  console.log('\n✨ Done! Deploy docs/ to Vercel.');
}

build();