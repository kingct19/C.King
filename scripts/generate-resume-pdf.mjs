import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_PDF = path.join(ROOT, "public", "Chandler-King-Resume.pdf");

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "google-chrome",
  "chromium",
];

function findChrome() {
  for (const bin of CHROME_CANDIDATES) {
    if (bin.startsWith("/") && fs.existsSync(bin)) {
      return bin;
    }
  }
  throw new Error("Google Chrome binary not found for headless PDF generation.");
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Chandler King - Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
  <style>
    @page {
      size: letter;
      margin: 0.28in 0.36in;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-variant-ligatures: none;
      font-feature-settings: "liga" 0, "clig" 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8.2pt;
      line-height: 1.25;
      color: #111111;
      background: #ffffff;
    }

    a {
      color: #111111;
      text-decoration: none;
    }

    /* Outer site-matched dashed frame */
    .frame {
      border: 1px dashed #d4d4d8;
    }

    /* Header */
    .header {
      padding: 7px 14px 6px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .header-main {
      flex: 1;
      min-width: 0;
    }

    .name {
      font-family: "Instrument Serif", Georgia, serif;
      font-style: italic;
      font-weight: 400;
      font-size: 21.5pt;
      line-height: 1;
      letter-spacing: -0.01em;
      color: #09090b;
    }

    .headline {
      margin-top: 2px;
      font-family: "Geist Mono", monospace;
      font-size: 7.7pt;
      font-weight: 500;
      color: #27272a;
    }

    .contact-bar {
      margin-top: 3px;
      font-family: "Geist Mono", monospace;
      font-size: 7.1pt;
      color: #3f3f46;
      line-height: 1.25;
    }

    .contact-bar span.sep {
      color: #a1a1aa;
      margin: 0 3.5px;
    }

    .logo-badge {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      background: #09090b;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 2px;
    }

    /* Section Heading — matches .section-heading on chandlerking.dev */
    .section-heading {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: "DM Sans", sans-serif;
      font-size: 8pt;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #09090b;
      background: #f6f6f7;
      border-top: 1px dashed #d4d4d8;
      border-bottom: 1px dashed #d4d4d8;
      padding: 2.5px 14px;
    }

    .section-icon {
      width: 13px;
      height: 13px;
      flex-shrink: 0;
    }

    .section-body {
      padding: 5px 14px 5.5px;
    }

    .summary-text {
      color: #27272a;
      font-size: 8.1pt;
      line-height: 1.28;
    }

    /* Experience & Education Items */
    .entry {
      margin-bottom: 5px;
    }

    .entry:last-child {
      margin-bottom: 0;
    }

    .entry-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
    }

    .entry-title {
      font-size: 8.6pt;
      font-weight: 700;
      color: #09090b;
    }

    .entry-company {
      font-weight: 600;
      color: #27272a;
    }

    .entry-meta {
      font-family: "Geist Mono", monospace;
      font-size: 7.2pt;
      color: #52525b;
      white-space: nowrap;
      flex-shrink: 0;
    }

    ul.bullets {
      margin-top: 1.5px;
      padding-left: 12px;
      color: #27272a;
    }

    ul.bullets li {
      margin-bottom: 1px;
      font-size: 8pt;
      line-height: 1.25;
    }

    ul.bullets li:last-child {
      margin-bottom: 0;
    }

    /* Projects */
    .project-entry {
      margin-bottom: 4px;
      padding-bottom: 3.5px;
      border-bottom: 1px dashed #e4e4e7;
    }

    .project-entry:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .project-stack-inline {
      font-family: "Geist Mono", monospace;
      font-size: 7pt;
      color: #52525b;
    }

    /* Technical Skills Rows — matches numbered Stack rows on chandlerking.dev */
    .skills-table {
      width: 100%;
    }

    .skill-row {
      display: flex;
      align-items: baseline;
      gap: 10px;
      padding: 2.2px 14px;
      border-bottom: 1px dashed #e4e4e7;
    }

    .skill-row:last-child {
      border-bottom: none;
    }

    .skill-cat {
      width: 138px;
      flex-shrink: 0;
      font-family: "Geist Mono", monospace;
      font-size: 7.2pt;
      font-weight: 600;
      color: #3f3f46;
    }

    .skill-items {
      flex: 1;
      font-size: 8pt;
      color: #18181b;
    }
  </style>
</head>
<body>
  <main class="frame">
    <!-- HEADER -->
    <header class="header">
      <div class="header-main">
        <h1 class="name">Chandler King</h1>
        <p class="headline">Forward Deployed Engineer · Full-Stack, Mobile &amp; AI Software Engineer · Founder @ Studio Sozo</p>
        <p class="contact-bar">
          Kansas City, MO<span class="sep">|</span><a href="mailto:chandler@studiosozo.dev">chandler@studiosozo.dev</a><span class="sep">|</span>+1 (903) 424-4805<span class="sep">|</span><a href="https://chandlerking.dev">chandlerking.dev</a><span class="sep">|</span><a href="https://www.studiosozo.dev">studiosozo.dev</a><span class="sep">|</span><a href="https://github.com/kingct19">github.com/kingct19</a><span class="sep">|</span><a href="https://www.linkedin.com/in/chandler-king-052861240">linkedin.com/in/chandler-king-052861240</a>
        </p>
      </div>
      <div class="logo-badge" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="26" height="26" rx="5.5" stroke="#ffffff" stroke-width="3" />
          <path d="M 19.4 3.6 L 14.2 17.5 C 10.0 21.6 10.0 25.4 14.2 28.4" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 3.6 11.4 C 7.0 13.5 10.8 17.5 14.2 18.1 C 18.3 18.7 23.8 17.9 28.4 15.2" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </header>

    <!-- PROFESSIONAL SUMMARY -->
    <section>
      <h2 class="section-heading">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="#18181b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="#fef3c7" />
          <path d="M12 8v4l3 2" />
        </svg>
        Professional Summary
      </h2>
      <div class="section-body">
        <p class="summary-text">
          Forward Deployed Engineer and Software Founder in Kansas City, MO with a B.S. and M.S. in Computer Science (Artificial Intelligence concentration). Experienced working directly with clients to translate ambiguous operational problems into system architecture and shipping production software end-to-end across discovery, prototype, pilot, and deployment. Hands-on across TypeScript, JavaScript, Python, SQL, React, Next.js, React Native, Flutter, Node.js, PostgreSQL, REST APIs, webhooks, Docker, Linux, CI/CD, and LLM/AI agentic automation.
        </p>
      </div>
    </section>

    <!-- WORK EXPERIENCE -->
    <section>
      <h2 class="section-heading">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="#18181b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="7" width="18" height="13" rx="2" fill="#dbeafe" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
        </svg>
        Work Experience
      </h2>
      <div class="section-body">
        <div class="entry">
          <div class="entry-header">
            <div>
              <span class="entry-title">Founder &amp; Lead Software Engineer</span> · <span class="entry-company">Studio Sozo / Sozo Tech Enterprise</span>
            </div>
            <span class="entry-meta">Jan 2026 - Present · Kansas City, MO</span>
          </div>
          <ul class="bullets">
            <li>Own consulting-style discovery and solution engineering with clients: map business systems, workflows, and operating constraints, then convert them into architecture blueprints, database schemas, and production software.</li>
            <li>Shipped The Sozo CRM (thesozocrm.com) from zero to production: role-based dashboards, analytics, authentication, REST APIs, PostgreSQL, MongoDB, TypeScript, Next.js, Docker, and CI/CD pipelines on GitHub Actions and Vercel.</li>
            <li>Lead mobile and AI product engineering on AnglerIQ (angleriqapp.com), an AI Co-Angler mobile app built with React Native, TypeScript, Claude AI, computer vision, and location intelligence for lake zone rankings and bite forecasts.</li>
            <li>Architected and delivered custom client platforms including Studio Sozo (studiosozo.dev), Home Ranger Services (homerangerservices.com), Splash &amp; Dash Rentals (splashanddashrents.com), and Serene Dreams with Stripe, QuickBooks, and Twilio integrations.</li>
            <li>Manage a team of 3 developers across roadmap, sprint planning, code review, testing, and production releases while using LLMs and agentic workflows daily for rapid prototyping, debugging, and technical documentation.</li>
          </ul>
        </div>

        <div class="entry">
          <div class="entry-header">
            <div>
              <span class="entry-title">Head of Technology</span> · <span class="entry-company">Elevate Solar</span>
            </div>
            <span class="entry-meta">Jan 2025 - Jan 2026 · United States</span>
          </div>
          <ul class="bullets">
            <li>Owned full-stack technical delivery and digital operations for a solar installation company while completing an M.S. in Computer Science: partnered with sales and field operators to replace manual bottlenecks with working software.</li>
            <li>Designed, built, and launched elevate-solar.com with Next.js and TypeScript — a fast, conversion-focused lead-generation platform integrated with analytics and automated inbound sales routing.</li>
            <li>Engineered an internal computer-vision facial recognition application and documented system architecture, process maps, and operational runbooks for non-technical staff.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- SELECTED PROJECTS -->
    <section>
      <h2 class="section-heading">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="#18181b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" fill="#fef3c7" />
        </svg>
        Projects
      </h2>
      <div class="section-body">
        <div class="project-entry">
          <div class="entry-header">
            <div>
              <span class="entry-title">AnglerIQ — AI Co-Angler Mobile App</span> <span class="project-stack-inline">(angleriqapp.com | React Native, TypeScript, Claude AI, Next.js, Computer Vision)</span>
            </div>
            <span class="entry-meta">2026 - Present</span>
          </div>
          <ul class="bullets">
            <li>Built an AI-native fishing companion that maps lakes by species, computes real-time bite scores from weather and barometric pressure, runs Species IQ tournaments, and preserves private user catch coordinates.</li>
          </ul>
        </div>

        <div class="project-entry">
          <div class="entry-header">
            <div>
              <span class="entry-title">Studio Sozo &amp; Client Platforms</span> <span class="project-stack-inline">(studiosozo.dev | Next.js, TypeScript, PostgreSQL, Stripe, QuickBooks, Twilio, AI)</span>
            </div>
            <span class="entry-meta">2026 - Present</span>
          </div>
          <ul class="bullets">
            <li>Engineered custom 100% client-owned software platforms and booking/service engines including Home Ranger Services (DFW &amp; Austin HVAC), Splash &amp; Dash (Highland Lakes jet ski delivery), and Serene Dreams e-commerce.</li>
          </ul>
        </div>

        <div class="project-entry">
          <div class="entry-header">
            <div>
              <span class="entry-title">The Sozo CRM</span> <span class="project-stack-inline">(thesozocrm.com | Next.js, TypeScript, PostgreSQL, REST APIs, RBAC, CI/CD)</span>
            </div>
            <span class="entry-meta">2025 - Present</span>
          </div>
          <ul class="bullets">
            <li>Designed and shipped a full-stack solar sales and pipeline management CRM from blank repository to production with multi-role workspaces, quote builders, and automated follow-up workflows.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- EDUCATION -->
    <section>
      <h2 class="section-heading">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="#18181b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3 2 8l10 5 10-5-10-5Z" fill="#dbeafe" />
          <path d="M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5" />
        </svg>
        Education
      </h2>
      <div class="section-body">
        <div class="entry">
          <div class="entry-header">
            <div>
              <span class="entry-title">Master of Science (M.S.) in Computer Science — Artificial Intelligence Concentration</span> · <span class="entry-company">Texas A&amp;M University–Commerce</span>
            </div>
            <span class="entry-meta">Jan 2024 - May 2026</span>
          </div>
          <ul class="bullets">
            <li>Graduate research and coursework in artificial intelligence, machine learning, intelligent systems, LLM orchestration, embeddings, and data exploration with Python and Jupyter.</li>
          </ul>
        </div>

        <div class="entry">
          <div class="entry-header">
            <div>
              <span class="entry-title">Bachelor of Science (B.S.) in Computer Science — Artificial Intelligence Concentration</span> · <span class="entry-company">Texas A&amp;M University–Commerce</span>
            </div>
            <span class="entry-meta">Aug 2019 - Dec 2023</span>
          </div>
          <ul class="bullets">
            <li>NCAA Division I Men's Track &amp; Field Student-Athlete (Sprints &amp; Jumps); Southland Conference Spring Commissioner's Academic Honor Roll; built the ETAMU All-in-One cross-platform Flutter campus app (91+ commits).</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- TECHNICAL SKILLS -->
    <section>
      <h2 class="section-heading">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="#18181b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" fill="#fef3c7" />
          <path d="m8 10 3 2-3 2m5 0h3" />
        </svg>
        Technical Skills
      </h2>
      <div class="skills-table">
        <div class="skill-row">
          <span class="skill-cat">Languages:</span>
          <span class="skill-items">TypeScript, JavaScript (ES6+), Python, SQL, Dart, HTML5, CSS3</span>
        </div>
        <div class="skill-row">
          <span class="skill-cat">Frontend &amp; Mobile:</span>
          <span class="skill-items">React, Next.js (App Router), React Native, Flutter, Tailwind CSS, shadcn/ui, Framer Motion</span>
        </div>
        <div class="skill-row">
          <span class="skill-cat">Backend &amp; Databases:</span>
          <span class="skill-items">Node.js, Express, REST APIs, Webhooks, PostgreSQL, MongoDB, Supabase, Firebase, Prisma</span>
        </div>
        <div class="skill-row">
          <span class="skill-cat">AI, LLMs &amp; Automation:</span>
          <span class="skill-items">LLM Integration (OpenAI, Claude, Vercel AI SDK), AI Agents, Computer Vision, RAG, Embeddings, Jupyter, MCP</span>
        </div>
        <div class="skill-row">
          <span class="skill-cat">DevOps &amp; Tooling:</span>
          <span class="skill-items">Git, GitHub Actions, Docker, Linux, CI/CD, Vercel, npm, System Architecture, Technical Documentation</span>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`;

const tmpHtml = path.join(os.tmpdir(), `chandler-king-resume-${Date.now()}.html`);
fs.writeFileSync(tmpHtml, html, "utf8");

try {
  const chrome = findChrome();
  execFileSync(
    chrome,
    [
      "--headless",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--print-to-pdf=${OUTPUT_PDF}`,
      `file://${tmpHtml}`,
    ],
    { stdio: "inherit" },
  );
  console.log(`Generated ATS + site-styled resume PDF at: ${OUTPUT_PDF}`);
} finally {
  fs.rmSync(tmpHtml, { force: true });
}
