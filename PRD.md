# 🪨 AWS GenAI Pro Study Hub — Product Requirements Document

**Version:** 3.0 | **Author:** mo-bekheet | **Repo:** mo-bekheet/aws-genai-pro-study-hub
**Status:** Active Development | **License:** MIT

[![GitHub Stars](https://img.shields.io/github/stars/mo-bekheet/aws-genai-pro-study-hub?style=social)](https://github.com/mo-bekheet/aws-genai-pro-study-hub)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Ko-fi](https://img.shields.io/badge/Support-Ko--fi-FF5E5B?logo=ko-fi)](https://ko-fi.com/mobekheet)

> **Ace the AWS AI Practitioner Exam — Free, Forever.**
> The community-driven study hub to master GenAI on AWS. Flashcards, mock exams, and practical roadmaps — everything you need to pass, with zero paywalls.

---

## 📋 Table of Contents

1. [The Problem](#1-the-problem)
2. [Product Vision](#2-product-vision)
3. [Users](#3-users)
4. [Core Principles](#4-core-principles)
5. [Features](#5-features)
6. [Lesson Template System](#6-lesson-template-system)
7. [Screen Map](#7-screen-map)
8. [User Flows](#8-user-flows)
9. [Data Architecture](#9-data-architecture)
10. [Tech Stack](#10-tech-stack)
11. [Design System](#11-design-system)
12. [Component Architecture](#12-component-architecture)
13. [Stitch UI Prompts](#13-stitch-ui-prompts)
14. [Database Schema](#14-database-schema)
15. [Contributing](#15-contributing)
16. [Risks](#16-risks)

---

## 1. The Problem

> "There is no trusted, free, scenario-based practice resource for the AIP-C01 exam."

AWS AIP-C01 candidates face real gaps:

- AWS Skill Builder has official tests but limited questions
- Udemy courses exist but questions are too easy vs reality
- No community-driven, open question bank exists
- The exam is architecture-heavy — flashcard-only study fails
- Existing paid tools (Tutorials Dojo) charge for content that should be free

**This project fills that gap. Free, open, community-driven, forever.**

---

## 2. Product Vision

### Landing Page Copy (source of truth for tone)

```
Ace the AWS AI Practitioner Exam — Free, Forever

The community-driven study hub to master GenAI on AWS.
Flashcards, mock exams, and practical roadmaps — everything
you need to pass, with zero paywalls.

[ Start Studying Free ]  [ View on GitHub ]
No credit card required · Open Source · Community Maintained
```

### Feature Headlines

```
Everything you need to pass

Spaced-Repetition Flashcards
  Master terminology and AWS services with smart flashcards
  that adapt to your learning pace.

Realistic Mock Exams
  Practice with timed exams that mirror the actual AIP-C01
  format, complete with detailed explanations.

Visual Mind Maps
  Understand complex GenAI concepts and how different AWS
  services connect with interactive mind maps.

Extensive Question Bank
  Filter practice questions by domain (Fundamentals, Security,
  Bedrock) to focus on weak areas.

Progress Tracking
  Visualize your readiness with detailed analytics on your
  domain performance and test scores.

Structured Study Roadmap
  Follow a step-by-step curriculum designed to take you from
  beginner to certified professional.
```

### How It Works

```
1 — Sign in instantly
    Create your free account in seconds using Google or GitHub.
    No credit card, no hidden fees.

2 — Study your way
    Follow the roadmap, tackle the flashcards, or jump straight
    into practice exams. Learn at your own pace.

3 — Track your readiness
    Monitor your scores across all exam domains so you know
    exactly when you're ready for the real thing.
```

---

## 3. Users

### Primary User
**AWS practitioner** preparing for AIP-C01 — any experience level.
- Studies in 30–90 min sessions
- Wants structured, measurable progress
- Will contribute content if the friction is near-zero

### Secondary User
**Community contributor** — practitioners who passed or are studying and want to give back by adding questions, flashcards, or lessons.

---

## 4. Core Principles

| Principle | What It Means |
|---|---|
| 🆓 Free Forever | No paywalls, no premium tiers, no credit card |
| 🔓 Open Source | MIT License — fork it, improve it, own it |
| 🔐 Auth from Day One | Google + GitHub login to track real progress |
| ☕ Community Supported | Ko-fi for voluntary support, never required |
| 📱 Responsive Web | Works on all devices, mobile-readable |
| 🌱 Content Grows Continuously | App ships first, content added via PRs |
| 🎓 Fun Learning First | Lessons use interactive HTML templates, not walls of text |
| 🤝 Easy Contribution | JSON + Markdown PRs, zero backend knowledge needed |

---

## 5. Features

### 5.1 Authentication (Day One)

- **Provider:** Clerk
- **Methods:** Google OAuth + GitHub OAuth
- **Why from day one:** Progress tracking, streaks, saved questions, and roadmap require a user identity
- **Free tier:** 10,000 MAU — sufficient for launch and growth
- **No email/password** — social login only, lowest friction

---

### 5.2 Dashboard

| Element | Detail |
|---|---|
| Exam countdown | Days remaining to user-set exam date |
| Study streak | 🔥 N-day streak, tracks actual study activity |
| Domain progress | 5 color-coded bars (green >70%, amber 40-70%, red <40%) |
| Stats | Questions answered, avg score, mock exams taken, study hours |
| Quick actions | Continue studying, start mock exam, view weak areas, roadmap |

---

### 5.3 Lessons (Interactive HTML Templates)

See full specification in [Section 6](#6-lesson-template-system).

Each lesson is a self-contained HTML file with interactive components. Not slides, not video — an **interactive learning experience** with:
- Animated concept reveals
- Click-to-explore diagrams
- Knowledge checks inline
- AWS architecture walkthroughs
- Visual comparisons with hover states

---

### 5.4 Flashcards

| Element | Detail |
|---|---|
| Card types | concept, comparison, scenario, fact, gotcha |
| Difficulty | easy, medium, hard |
| Front | Question + emoji icon + hint on request |
| Back | Answer + key points + mnemonic + exam tip |
| Flip animation | 3D rotateY via Framer Motion |
| Keyboard nav | Arrow keys + Space + H for hint |
| Swipe | Mobile swipe gestures |
| Spaced repetition | known / learning / new state tracked per user |
| Filters | Domain, difficulty, type, saved |

---

### 5.5 Question Bank (certiq-style)

The core study tool. Scenario-based, distractor-explained.

| Element | Detail |
|---|---|
| Modes | Practice (instant feedback) + Timed (exam pressure) |
| Filters | Domain, difficulty, status, type, tags |
| Question display | Domain badge, difficulty badge, question ID in monospace |
| Options | Full-width selectable cards (A, B, C, D) |
| Answer states | Default → hover → correct (green border) / incorrect (red border) |
| Explanation | Why correct + why each wrong answer fails (distractor breakdown) |
| Actions | 🔖 Save, ⚑ Flag, 👍 Like, ⚠️ Report |
| Report | User reports incorrect or outdated questions |

---

### 5.6 Mock Exams

| Element | Detail |
|---|---|
| Duration | 130 minutes, 65 questions |
| Modes | Full / Quick (25q) / Domain-specific |
| Timer | Countdown visible, turns red + pulses under 10 minutes |
| Question navigator | Grid of 65 squares: white / indigo / amber / current |
| Flag | Flag questions for review before submitting |
| Results | Score %, pass/fail, time taken, domain heatmap |
| Review | Full question-by-question with explanations post-exam |

---

### 5.7 Mind Maps (Interactive)

| Element | Detail |
|---|---|
| Count | 5 maps (one per exam domain) |
| Library | React Flow |
| Interactions | Zoom, pan, expand/collapse nodes |
| Node click | Opens detail card for that concept |
| Export | Download as PNG |

---

### 5.8 Study Roadmap

| Element | Detail |
|---|---|
| Input | User sets target exam date |
| Output | Auto-generated day-by-day plan |
| Duration | Up to 60 days |
| Structure | Week cards with daily task checkboxes |
| Color coding | Week 1-2 blue, 3-4 purple, 5-6 green, 7-8 orange, 9+ red |
| Progress | Per-day and per-week completion rings |

---

### 5.9 Services Compare

Predefined static comparison tables, curated and maintained via PRs.

Planned tables:
- RAG vs Fine-tuning vs Continued Pre-training
- On-Demand vs Provisioned Throughput
- Bedrock vs SageMaker
- EC2 vs Lambda vs Fargate
- OpenSearch vs Aurora pgvector (for RAG)
- S3 vs EFS vs EBS

---

### 5.10 Resources

Curated links to:
- AWS Bedrock docs
- AWS AI Practitioner exam guide (official)
- Recommended whitepapers
- re:Invent talks on GenAI
- Community blog posts

---

### 5.11 My Progress

| Element | Detail |
|---|---|
| Streak calendar | GitHub-style heatmap (12 weeks) |
| Domain radar chart | Pentagon — user score vs passing threshold |
| Weak areas | Top domains needing attention + Study Now CTA |
| Exam history | Table: date, score, mode, time, pass/fail |
| Flashcard mastery | Known / Learning / New pie chart |

---

### 5.12 Ko-fi Support

```
"This app is free forever.
 If it helped you pass your exam, consider buying me a coffee ☕"
```

- Ko-fi widget embedded on support page
- Ko-fi button visible in footer of every page (subtle, not pushy)
- Never required, never gated, never mentioned in study flows
- Contributor list from GitHub API shown on this page

---

## 6. Lesson Template System

### Philosophy

Lessons are not slides. They are not walls of text. They are **interactive HTML experiences** that make learning AWS GenAI concepts genuinely enjoyable.

Each lesson lives in `/lessons/` as a self-contained `.html` file. The React app renders them in an iframe or fetches and injects them. Contributors write lessons — not courses.

---

### Lesson HTML Template

Every lesson follows this structure:

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lesson: [Title]</title>

  <!-- Lesson metadata (read by the React app) -->
  <meta name="lesson-id"      content="BED-L001" />
  <meta name="lesson-title"   content="What is Amazon Bedrock?" />
  <meta name="lesson-domain"  content="bedrock" />
  <meta name="lesson-duration" content="8" /><!-- minutes -->
  <meta name="lesson-difficulty" content="beginner" />
  <meta name="lesson-author"  content="mo-bekheet" />

  <style>
    /* ── Design tokens (synced with app) ────────────────────── */
    :root {
      --bg:          #0a0f1e;
      --surface:     #1e293b;
      --border:      #334155;
      --primary:     #6366f1;
      --success:     #22c55e;
      --warning:     #f59e0b;
      --danger:      #ef4444;
      --text:        #f1f5f9;
      --muted:       #94a3b8;
      --font-sans:   'Plus Jakarta Sans', sans-serif;
      --font-mono:   'JetBrains Mono', monospace;
      --radius:      12px;
    }
    [data-theme="light"] {
      --bg:      #ffffff;
      --surface: #f8fafc;
      --border:  #e2e8f0;
      --text:    #0f172a;
      --muted:   #64748b;
    }

    /* ── Base ────────────────────────────────────────────────── */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      font-size: 16px;
      line-height: 1.7;
      padding: 32px 24px;
      max-width: 760px;
      margin: 0 auto;
    }

    /* ── Typography ──────────────────────────────────────────── */
    h1 { font-size: 2rem;  font-weight: 700; margin-bottom: 8px; }
    h2 { font-size: 1.4rem; font-weight: 600; margin: 32px 0 12px; color: var(--primary); }
    h3 { font-size: 1.1rem; font-weight: 600; margin: 24px 0 8px; }
    p  { margin-bottom: 16px; color: var(--text); }
    code {
      font-family: var(--font-mono);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 0.875em;
    }

    /* ── Lesson header ───────────────────────────────────────── */
    .lesson-header {
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 8px;
    }
    .lesson-badge {
      background: var(--primary);
      color: white;
      border-radius: 20px;
      padding: 3px 12px;
      font-size: 12px;
      font-family: var(--font-mono);
      font-weight: 600;
    }
    .lesson-meta {
      color: var(--muted);
      font-size: 13px;
      font-family: var(--font-mono);
      margin-bottom: 32px;
    }

    /* ── Concept card ────────────────────────────────────────── */
    .concept-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      margin: 20px 0;
      position: relative;
      overflow: hidden;
    }
    .concept-card::before {
      content: '';
      position: absolute; top: 0; left: 0;
      width: 4px; height: 100%;
      background: var(--primary);
    }
    .concept-card .icon {
      font-size: 2rem;
      margin-bottom: 12px;
      display: block;
    }

    /* ── Analogy box ─────────────────────────────────────────── */
    .analogy {
      background: linear-gradient(135deg, #1e1b4b22, #312e8122);
      border: 1px solid var(--primary);
      border-radius: var(--radius);
      padding: 20px 24px;
      margin: 20px 0;
    }
    .analogy-label {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--primary);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    /* ── Comparison table ────────────────────────────────────── */
    .compare-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 14px;
    }
    .compare-table th {
      background: var(--primary);
      color: white;
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
    }
    .compare-table th:first-child { border-radius: 8px 0 0 0; }
    .compare-table th:last-child  { border-radius: 0 8px 0 0; }
    .compare-table td {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      background: var(--surface);
    }
    .compare-table tr:hover td { background: var(--border); }

    /* ── Reveal section (click to expand) ───────────────────── */
    .reveal-trigger {
      background: var(--surface);
      border: 1px dashed var(--border);
      border-radius: var(--radius);
      padding: 16px 20px;
      cursor: pointer;
      display: flex; align-items: center; gap: 12px;
      margin: 12px 0;
      transition: border-color 0.2s;
      user-select: none;
    }
    .reveal-trigger:hover { border-color: var(--primary); }
    .reveal-trigger .arrow {
      transition: transform 0.25s;
      color: var(--primary);
      font-size: 18px;
    }
    .reveal-trigger.open .arrow { transform: rotate(90deg); }
    .reveal-content {
      display: none;
      background: var(--surface);
      border: 1px solid var(--border);
      border-top: none;
      border-radius: 0 0 var(--radius) var(--radius);
      padding: 20px;
      margin-top: -12px;
      margin-bottom: 12px;
    }
    .reveal-content.open { display: block; }

    /* ── Knowledge check (inline quiz) ──────────────────────── */
    .knowledge-check {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      margin: 32px 0;
    }
    .knowledge-check-label {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--warning);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }
    .kc-question { font-weight: 600; margin-bottom: 16px; }
    .kc-option {
      display: block;
      width: 100%;
      text-align: left;
      background: transparent;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 16px;
      color: var(--text);
      font-family: var(--font-sans);
      font-size: 15px;
      cursor: pointer;
      margin-bottom: 8px;
      transition: border-color 0.15s, background 0.15s;
    }
    .kc-option:hover   { border-color: var(--primary); }
    .kc-option.correct { border-color: var(--success); background: rgba(34,197,94,0.08); }
    .kc-option.wrong   { border-color: var(--danger);  background: rgba(239,68,68,0.08); }
    .kc-feedback {
      display: none;
      margin-top: 16px;
      padding: 16px;
      border-radius: 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .kc-feedback.correct { background: rgba(34,197,94,0.1); border: 1px solid var(--success); color: #86efac; }
    .kc-feedback.wrong   { background: rgba(239,68,68,0.1);  border: 1px solid var(--danger);  color: #fca5a5; }

    /* ── Architecture diagram placeholder ───────────────────── */
    .arch-diagram {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 32px;
      margin: 20px 0;
      text-align: center;
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--muted);
      line-height: 2;
      white-space: pre;
      overflow-x: auto;
    }

    /* ── Tip / exam tip box ──────────────────────────────────── */
    .tip {
      border-radius: var(--radius);
      padding: 16px 20px;
      margin: 20px 0;
      font-size: 14px;
      line-height: 1.6;
    }
    .tip.exam  { background: rgba(99,102,241,0.1); border: 1px solid var(--primary); }
    .tip.warn  { background: rgba(245,158,11,0.1); border: 1px solid var(--warning); }
    .tip.good  { background: rgba(34,197,94,0.1);  border: 1px solid var(--success); }
    .tip-label {
      font-size: 11px;
      font-family: var(--font-mono);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }
    .tip.exam  .tip-label { color: var(--primary); }
    .tip.warn  .tip-label { color: var(--warning); }
    .tip.good  .tip-label { color: var(--success); }

    /* ── Lesson nav ──────────────────────────────────────────── */
    .lesson-nav {
      display: flex; justify-content: space-between;
      margin-top: 48px; padding-top: 24px;
      border-top: 1px solid var(--border);
    }
    .nav-btn {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 10px 20px;
      color: var(--text);
      font-family: var(--font-sans);
      font-size: 14px;
      cursor: pointer;
      transition: border-color 0.15s;
      text-decoration: none;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .nav-btn:hover  { border-color: var(--primary); }
    .nav-btn.primary {
      background: var(--primary);
      border-color: var(--primary);
      color: white;
    }
  </style>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</head>

<body>
  <!-- ── Lesson header ─────────────────────────────────── -->
  <div class="lesson-header">
    <span class="lesson-badge">BED-L001</span>
    <span style="color: var(--muted); font-size: 13px;">Amazon Bedrock</span>
  </div>

  <h1>🪨 What is Amazon Bedrock?</h1>

  <div class="lesson-meta">
    ⏱ 8 min read · Beginner · Domain 2 — GenAI Development
  </div>

  <!-- ── Concept intro ─────────────────────────────────── -->
  <p>
    Before Bedrock, using a foundation model on AWS meant provisioning GPU clusters,
    managing model weights, and wiring up your own API. Complex, expensive, slow.
    Bedrock changes the equation entirely.
  </p>

  <div class="concept-card">
    <span class="icon">🪨</span>
    <h3>Amazon Bedrock — One-Line Definition</h3>
    <p style="margin:0">
      A <strong>fully managed service</strong> that provides access to high-performing
      <strong>foundation models</strong> from Amazon and leading AI companies via a
      <strong>single API</strong> — with no infrastructure to manage.
    </p>
  </div>

  <!-- ── Analogy ───────────────────────────────────────── -->
  <div class="analogy">
    <div class="analogy-label">💡 Analogy</div>
    <p style="margin:0">
      Think of Bedrock like <strong>Netflix for foundation models</strong>.
      One subscription gives you access to many choices — Anthropic Claude, Meta Llama,
      Mistral, Amazon Titan — with no need to own the hardware.
      You pick the model, send it a prompt, and get a response.
    </p>
  </div>

  <!-- ── Reveal: available models ─────────────────────── -->
  <h2>Who's in the Model Catalog?</h2>

  <div class="reveal-trigger" onclick="toggleReveal(this)">
    <span class="arrow">▶</span>
    <span>Click to explore available foundation models</span>
  </div>
  <div class="reveal-content">
    <table class="compare-table">
      <thead>
        <tr><th>Provider</th><th>Model</th><th>Best For</th></tr>
      </thead>
      <tbody>
        <tr><td>Anthropic</td><td>Claude 3.x (Haiku, Sonnet, Opus)</td><td>Reasoning, coding, long context</td></tr>
        <tr><td>Amazon</td><td>Titan Text, Titan Embeddings, Titan Image</td><td>Cost-effective, native AWS</td></tr>
        <tr><td>Meta</td><td>Llama 3.x</td><td>Open weights, customization</td></tr>
        <tr><td>Mistral AI</td><td>Mistral, Mixtral</td><td>Efficient, multilingual</td></tr>
        <tr><td>AI21 Labs</td><td>Jurassic-2</td><td>Long-form writing</td></tr>
        <tr><td>Cohere</td><td>Command, Embed</td><td>Enterprise search, embeddings</td></tr>
        <tr><td>Stability AI</td><td>SDXL</td><td>Image generation</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ── Architecture diagram ──────────────────────────── -->
  <h2>How Bedrock Fits Into Your Architecture</h2>

  <div class="arch-diagram">Your App
    ↓
Amazon Bedrock API (single endpoint)
    ↓
┌─────────────────────────────────────┐
│  Claude  │  Titan  │  Llama  │ ...  │
└─────────────────────────────────────┘
    ↓
Your Response (streaming or sync)</div>

  <!-- ── Key capabilities ──────────────────────────────── -->
  <h2>Three Things Bedrock Unlocks</h2>

  <div class="concept-card">
    <h3>① Inference — Just Use a Model</h3>
    <p>Send a prompt, get a response. Two modes:</p>
    <ul style="padding-left:20px; color: var(--muted);">
      <li><strong style="color:var(--text)">On-Demand</strong> — pay per token, no commitment</li>
      <li><strong style="color:var(--text)">Provisioned Throughput</strong> — reserved capacity, consistent latency</li>
    </ul>
  </div>

  <div class="concept-card">
    <h3>② Customization — Make It Yours</h3>
    <p>Adapt models on your own data without exposing that data externally:</p>
    <ul style="padding-left:20px; color: var(--muted);">
      <li><strong style="color:var(--text)">Continued Pre-training</strong> — domain vocabulary (unlabeled data)</li>
      <li><strong style="color:var(--text)">Instruction Fine-tuning</strong> — task behavior (labeled prompt-completion pairs)</li>
    </ul>
  </div>

  <div class="concept-card">
    <h3>③ Knowledge Bases — Ground It in Facts</h3>
    <p>Connect your documents to the model via RAG (Retrieval-Augmented Generation).
    Reduces hallucination. No retraining needed.</p>
  </div>

  <!-- ── Exam tip ───────────────────────────────────────── -->
  <div class="tip exam">
    <div class="tip-label">🎯 Exam Tip</div>
    If a question says "no infrastructure to manage" or "data never leaves your account" or
    "multiple foundation models via single API" — the answer is <strong>Amazon Bedrock</strong>.
    These three phrases are the signature Bedrock pattern.
  </div>

  <!-- ── Gotcha warning ─────────────────────────────────── -->
  <div class="tip warn">
    <div class="tip-label">⚠️ Common Trap</div>
    Fine-tuned models on Bedrock <strong>cannot</strong> use On-Demand inference.
    They require <strong>Provisioned Throughput</strong> — this is a favorite exam gotcha.
  </div>

  <!-- ── Knowledge check ───────────────────────────────── -->
  <div class="knowledge-check">
    <div class="knowledge-check-label">🧠 Knowledge Check</div>
    <p class="kc-question">
      A company wants to use an LLM on AWS without managing any GPU servers.
      They need to switch between multiple models from different providers.
      Which AWS service fits this requirement?
    </p>
    <button class="kc-option" onclick="checkAnswer(this, false)">
      A — Amazon SageMaker JumpStart
    </button>
    <button class="kc-option" onclick="checkAnswer(this, true)">
      B — Amazon Bedrock
    </button>
    <button class="kc-option" onclick="checkAnswer(this, false)">
      C — AWS Lambda with HuggingFace
    </button>
    <button class="kc-option" onclick="checkAnswer(this, false)">
      D — Amazon EC2 with GPU instances
    </button>
    <div class="kc-feedback correct" id="kc-correct">
      ✅ <strong>Correct!</strong> Amazon Bedrock is the only option that:
      provides multiple FM providers via one API, is fully managed
      (no GPU servers), and keeps your data private.
    </div>
    <div class="kc-feedback wrong" id="kc-wrong">
      ❌ <strong>Not quite.</strong> SageMaker JumpStart deploys models on EC2
      (you manage the infrastructure). Lambda + HuggingFace and EC2 both
      require you to manage the underlying servers. Only Bedrock is fully
      managed with multi-provider model access.
    </div>
  </div>

  <!-- ── Lesson navigation ──────────────────────────────── -->
  <div class="lesson-nav">
    <a href="#" class="nav-btn">← Previous: AI/ML Foundations</a>
    <a href="#" class="nav-btn primary">Next: Bedrock Inference Modes →</a>
  </div>

  <!-- ── Interaction scripts ───────────────────────────── -->
  <script>
    function toggleReveal(trigger) {
      trigger.classList.toggle('open');
      const content = trigger.nextElementSibling;
      content.classList.toggle('open');
    }

    let answered = false;
    function checkAnswer(btn, isCorrect) {
      if (answered) return;
      answered = true;

      const allOptions = document.querySelectorAll('.kc-option');
      allOptions.forEach(opt => {
        opt.style.pointerEvents = 'none';
        opt.style.opacity = '0.7';
      });

      btn.style.opacity = '1';
      btn.classList.add(isCorrect ? 'correct' : 'wrong');

      const correctFb = document.getElementById('kc-correct');
      const wrongFb   = document.getElementById('kc-wrong');

      if (isCorrect) {
        correctFb.style.display = 'block';
      } else {
        wrongFb.style.display = 'block';
        // also highlight correct answer
        allOptions.forEach(opt => {
          if (opt.textContent.includes('Amazon Bedrock')) {
            opt.classList.add('correct');
            opt.style.opacity = '1';
          }
        });
      }

      // Notify parent app that lesson activity occurred
      window.parent?.postMessage({ type: 'LESSON_ACTIVITY', lessonId: 'BED-L001' }, '*');
    }
  </script>
</body>
</html>
```

---

### Lesson Metadata Schema

```json
{
  "id": "BED-L001",
  "title": "What is Amazon Bedrock?",
  "domain": "bedrock",
  "duration_minutes": 8,
  "difficulty": "beginner | intermediate | advanced",
  "order": 1,
  "file": "/lessons/bedrock/BED-L001.html",
  "description": "Learn what Amazon Bedrock is, what models it supports, and the three core capabilities it unlocks.",
  "prerequisites": [],
  "next_lesson": "BED-L002",
  "tags": ["bedrock", "foundation-models", "inference"],
  "author": "mo-bekheet",
  "last_updated": "2025-03",
  "knowledge_checks": 1
}
```

---

### Lesson Content Rules (for contributors)

Every lesson HTML must include:
1. Correct `<meta>` tags for the React app to read metadata
2. At least one `knowledge-check` component
3. At least one `exam-tip` box
4. One `analogy` or `concept-card` explaining the core idea
5. Navigation links to previous and next lesson
6. The `postMessage` call on knowledge check completion (for streak tracking)

---

## 7. Screen Map

```
📱 AWS GenAI Pro Study Hub
│
├── 🌐 Landing Page (public, non-logged in)
│   ├── Hero: headline + CTAs + trust signals
│   ├── Feature grid (6 cards)
│   ├── How it works (3 steps)
│   ├── Community stats (questions, contributors, stars)
│   └── Footer: GitHub + Ko-fi + MIT license
│
├── 🔐 Sign In
│   └── Google + GitHub OAuth (Clerk)
│
├── 🏠 Dashboard (post-login)
│   ├── Exam countdown
│   ├── Study streak
│   ├── Domain progress bars
│   ├── Stats cards
│   └── Quick actions
│
├── 📚 Lessons (Interactive HTML)
│   ├── Browse lessons (by domain, difficulty)
│   ├── Lesson viewer (iframe renderer)
│   └── Completion tracking
│
├── 🃏 Flashcards
│   ├── Browse + Filter
│   ├── Study Mode (3D flip)
│   └── Saved Cards
│
├── 🧠 Mind Maps
│   └── Interactive (React Flow), one per domain
│
├── 📖 Study Guide
│   └── Markdown content per domain
│
├── 🗺️ Roadmap
│   └── Day-by-day plan from exam date
│
├── ❓ Question Bank (certiq-style)
│   ├── Browse + Filter
│   ├── Practice Mode (instant feedback)
│   ├── Timed Mode
│   ├── Flagged Questions
│   └── Saved / Favorites
│
├── 📝 Mock Exam
│   ├── Setup (Full / Quick / Domain)
│   ├── Exam Screen + Timer + Navigator
│   └── Results + Review
│
├── ⚖️ Services Compare
│   └── Predefined static tables
│
├── 📚 Resources
│   └── Curated AWS docs + links
│
├── 📊 My Progress
│   ├── Streak calendar
│   ├── Domain radar chart
│   ├── Exam history
│   └── Weak areas
│
└── ☕ Support
    └── Ko-fi widget + contributor credits
```

---

## 8. User Flows

### Flow 1 — First Visit

```
Land on homepage
→ See: "342 questions · 10 contributors · Free forever"
→ CTA: "Start Studying Free" (Google or GitHub login — Clerk)
→ Set exam date (optional, can skip)
→ Land on Dashboard
→ Start in under 60 seconds
```

### Flow 2 — Lesson Flow

```
Dashboard → "Start Lesson" quick action
→ Browse lessons by domain
→ Open lesson (interactive HTML in viewer)
→ Read + interact with concept cards, reveals, diagrams
→ Complete knowledge check
→ Progress tracked automatically
→ "Next Lesson →" navigation
```

### Flow 3 — Mock Exam

```
Select: Full (65q / 130min) | Quick (25q / 50min) | Domain-specific
→ Timer starts
→ Question → select → flag or next (no instant feedback)
→ End of exam:
    score + domain heatmap + wrong answer review
    wrong answer = explanation + full distractor breakdown
→ "Try Again" or "Study Weak Domain"
```

### Flow 4 — Question Review

```
Filter by domain → difficulty → tag
→ Card: stem + collapsed options
→ Expand: answer + explanation + distractor breakdown per wrong option
→ Actions: save / flag / like / report
→ No timer — pure study mode
```

### Flow 5 — Contributor

```
"Contribute" button (always visible in nav)
→ Links to CONTRIBUTING.md
→ JSON/HTML template + schema in docs
→ Submit PR → auto-live on merge
```

---

## 9. Data Architecture

### Domain Mapping (AIP-C01 weights)

| Key | Label | Weight |
|---|---|---|
| `foundations` | AI/ML Foundations | 20% |
| `bedrock` | GenAI Development and Bedrock | 28% |
| `lifecycle` | GenAI Application Lifecycle | 28% |
| `responsible_ai` | Guidelines and Responsible AI | 12% |
| `security` | Security, Compliance and Governance | 12% |

---

### Question Schema

```json
{
  "id": "q001",
  "domain": "bedrock",
  "subdomain": "security",
  "difficulty": "hard",
  "type": "single",
  "stem": "A company needs private Bedrock access with no public internet traversal. Which solution meets this requirement?",
  "options": {
    "A": "VPC endpoint + PrivateLink",
    "B": "NAT Gateway to Bedrock endpoint",
    "C": "Internet Gateway with security groups",
    "D": "Transit Gateway with route tables"
  },
  "answer": "A",
  "explanation": "VPC endpoints + PrivateLink keeps all traffic on the AWS backbone with no internet exposure.",
  "distractors": "B uses NAT which still traverses the internet. C explicitly uses internet gateway. D is for VPC-to-VPC routing, not service access.",
  "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html",
  "tags": ["vpc", "privatelink", "security", "bedrock"],
  "contributor": "mo-bekheet",
  "date_added": "2025-03"
}
```

> The `distractors` field is non-negotiable. No PR merged without it.

---

### Flashcard Schema

```json
{
  "meta": {
    "topic": "Amazon Bedrock",
    "domain": "bedrock",
    "exam_domain_weight": "28%",
    "version": "1.0.0",
    "last_updated": "2025-03",
    "card_count": 5,
    "tags": ["bedrock", "foundation-models"]
  },
  "cards": [
    {
      "id": "BED-001",
      "type": "concept | comparison | scenario | fact | gotcha",
      "difficulty": "easy | medium | hard",
      "domain": "string",
      "front": {
        "question": "string",
        "hint": "string",
        "emoji": "string"
      },
      "back": {
        "answer": "string",
        "key_points": ["string"],
        "mnemonic": "string",
        "analogy": "string",
        "aws_docs_ref": "string"
      },
      "exam_tip": "string",
      "related_cards": ["string"],
      "tags": ["string"]
    }
  ]
}
```

---

### Lesson Metadata Schema

```json
{
  "id": "BED-L001",
  "title": "What is Amazon Bedrock?",
  "domain": "bedrock",
  "duration_minutes": 8,
  "difficulty": "beginner | intermediate | advanced",
  "order": 1,
  "file": "/lessons/bedrock/BED-L001.html",
  "description": "string",
  "prerequisites": [],
  "next_lesson": "BED-L002",
  "tags": ["bedrock", "foundation-models"],
  "author": "mo-bekheet",
  "last_updated": "2025-03",
  "knowledge_checks": 1
}
```

---

### Data Flow

```
GitHub Repo (content: questions, flashcards, lessons)
    ↓
raw.githubusercontent.com (fetch at runtime)
    ↓
Next.js App (render + transform)
    ↓
Clerk (auth) + Supabase (progress)
    ↓
User sees personalized, tracked experience
```

Zero backend. Zero cost. PR merged = content live.

---

## 10. Tech Stack

### Full Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG from JSON, Vercel deploy, great DX |
| Styling | Tailwind CSS | Fast, dark mode, consistent |
| Animations | Framer Motion | Flashcard flip, transitions |
| Auth | Clerk | Google + GitHub OAuth, free 10k MAU |
| Database | Supabase | PostgreSQL, free tier, realtime ready |
| State | Zustand | Lightweight exam + progress state |
| Charts | Recharts | Radar, pie, heatmap |
| Mind Maps | React Flow | Interactive node graphs |
| Icons | Phosphor Icons | 6000+ icons, consistent style |
| Themes | next-themes | Light/Dark/Auto, SSR-safe |
| Date Utils | date-fns | Streak calc, roadmap dates |
| Search | Fuse.js | Client-side fuzzy search in JSON |
| Lesson Renderer | iframe + postMessage | Sandboxed interactive HTML lessons |
| Confetti | react-confetti | Exam pass celebration |
| Support | Ko-fi Widget | Embedded donation |
| Deploy | Vercel | Free, instant GitHub deploys |

### Install

```bash
npx create-next-app@latest aws-genai-pro-exam-portal \
  --typescript --tailwind --app --src-dir

npm install \
  @clerk/nextjs \
  @supabase/supabase-js \
  framer-motion \
  zustand \
  recharts \
  reactflow \
  @phosphor-icons/react \
  next-themes \
  date-fns \
  fuse.js \
  react-confetti
```

### Total Cost: $0

| Service | Free Tier |
|---|---|
| Vercel | Unlimited open source |
| Clerk | 10,000 MAU |
| Supabase | 500MB + 50k requests/month |
| GitHub | Public repo |
| Ko-fi | No platform fees |

---

## 11. Design System

### Themes

| Theme | Trigger |
|---|---|
| Dark | Manual or default |
| Light | Manual |
| Auto | Follows OS `prefers-color-scheme` |

---

### Color Palette

```css
--primary:       #6366f1;   /* Indigo brand */
--primary-dark:  #4f46e5;
--primary-light: #a5b4fc;
--success:       #22c55e;
--warning:       #f59e0b;
--danger:        #ef4444;
--info:          #38bdf8;

/* Dark */
--bg-primary:    #0a0f1e;
--bg-secondary:  #111827;
--bg-card:       #1e293b;
--border:        #334155;
--text-primary:  #f1f5f9;
--text-muted:    #94a3b8;

/* Light */
--bg-primary:    #ffffff;
--bg-secondary:  #f8fafc;
--bg-card:       #ffffff;
--border:        #e2e8f0;
--text-primary:  #0f172a;
--text-muted:    #64748b;
```

---

### Typography

```
Plus Jakarta Sans   → Headlines, navigation, UI
Inter               → Body text, question content
JetBrains Mono      → IDs, code, timer, stats numbers
```

---

### Answer Option States

```css
Default:   border: 1px solid var(--border);
Hover:     border-color: #6366f1; bg: rgba(99,102,241,0.08);
Correct:   border-left: 4px solid #22c55e; bg: rgba(34,197,94,0.08);
Incorrect: border-left: 4px solid #ef4444; bg: rgba(239,68,68,0.08);
```

---

### Difficulty Badges

```css
Easy:   bg #dcfce7 / color #16a34a
Medium: bg #fef3c7 / color #d97706
Hard:   bg #fee2e2 / color #dc2626
border-radius: 20px; font-family: monospace; font-size: 12px;
```

---

### Animations

| Animation | Spec |
|---|---|
| Page transition | fade + slide up, 150ms |
| Flashcard flip | rotateY 3D, 300ms |
| Answer reveal | expand down, 200ms |
| Progress bars | count up on mount, 600ms |
| Timer warning | pulse red under 10min |
| Exam pass | react-confetti |

---

### Tailwind Config

```js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50: '#eef2ff', 500: '#6366f1', 600: '#4f46e5', 900: '#1e1b4b' },
        surface:  { light: '#f8fafc', dark: '#0a0f1e' }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: { card: '12px', btn: '8px' }
    }
  }
}
```

---

## 12. Component Architecture

```
src/
├── app/
│   ├── page.tsx                    # Landing (public)
│   ├── sign-in/page.tsx            # Clerk auth
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Sidebar + Navbar
│   │   ├── page.tsx                # Dashboard
│   │   ├── lessons/page.tsx
│   │   ├── lessons/[id]/page.tsx   # Lesson viewer
│   │   ├── flashcards/page.tsx
│   │   ├── mind-maps/page.tsx
│   │   ├── study-guide/page.tsx
│   │   ├── roadmap/page.tsx
│   │   ├── question-bank/page.tsx
│   │   ├── mock-exam/page.tsx
│   │   ├── compare/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── progress/page.tsx
│   │   └── support/page.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                         # Button, Card, Badge, Modal
│   ├── layout/                     # Navbar, Sidebar, ThemeToggle
│   ├── lesson/
│   │   ├── LessonViewer.tsx        # iframe renderer + postMessage listener
│   │   ├── LessonCard.tsx          # Browse card
│   │   └── LessonProgress.tsx      # Completion indicator
│   ├── flashcard/
│   │   ├── FlipCard.tsx            # 3D flip
│   │   ├── CardBrowser.tsx
│   │   └── CardFilter.tsx
│   ├── question/
│   │   ├── QuestionCard.tsx
│   │   ├── OptionItem.tsx
│   │   ├── Explanation.tsx
│   │   ├── ActionBar.tsx
│   │   └── ReportModal.tsx
│   ├── exam/
│   │   ├── ExamSetup.tsx
│   │   ├── ExamHeader.tsx
│   │   ├── Timer.tsx
│   │   ├── QuestionNavigator.tsx
│   │   ├── ExamResults.tsx
│   │   └── ExamReview.tsx
│   ├── progress/
│   │   ├── StreakCalendar.tsx
│   │   ├── DomainRadar.tsx
│   │   ├── DomainBar.tsx
│   │   ├── ExamHistory.tsx
│   │   └── MasteryPie.tsx
│   ├── roadmap/
│   │   ├── WeekCard.tsx
│   │   └── DayTask.tsx
│   └── mindmap/
│       ├── DomainMindMap.tsx
│       └── MindMapNode.tsx
│
├── lib/
│   ├── supabase.ts
│   ├── scoring.ts
│   ├── streak.ts
│   ├── shuffle.ts
│   ├── roadmap.ts
│   └── search.ts
│
└── data/                           # Fetched from GitHub at runtime
    ├── lessons/                    # lessons.json (metadata index)
    ├── flashcards/
    ├── questions/
    ├── compare/
    └── resources.json
```

---

## 13. Stitch UI Prompts

Run in this order: Style Guide → Landing → Lessons Browser → Question Bank → Mock Exam → Dashboard

---

### Screen 0 — Style Guide

```
Create a design system style guide for "AWS GenAI Pro Study Hub".
Show Dark (default) and Light theme side by side.

Include:
- Color swatches: #6366f1 indigo, #22c55e success,
  #f59e0b warning, #ef4444 danger, #38bdf8 info
- Typography: Plus Jakarta Sans headlines,
  Inter body, JetBrains Mono for IDs/code/numbers
- Buttons: primary indigo filled, ghost outline, danger red tint
- Difficulty badges: Easy green, Medium amber, Hard red pill shapes
- Answer option card states:
  default / hover indigo border / correct green 4px left border /
  incorrect red 4px left border
- Card: dark bg #1e293b, 1px border #334155, 12px radius
- Domain progress bar: red <40%, amber <70%, green >70%
Material Design 3 inspired. Modern. Zero decoration.
```

---

### Screen 1 — Landing Page

```
Design a modern, dark landing page for "AWS GenAI Pro Study Hub".
Tone: confident, free, community-driven, zero bloat.

Sticky navbar:
- Logo: "🪨 AWS GenAI Study Hub"
- Right: theme toggle + "⭐ GitHub" + "Sign In" button

Hero section (centered, generous space):
Headline (large, bold): "Ace the AWS AI Practitioner Exam — Free, Forever"
Subheading: "The community-driven study hub to master GenAI on AWS.
Flashcards, mock exams, and practical roadmaps — everything you
need to pass, with zero paywalls."
Two buttons: "Start Studying Free →" (indigo, large) + "View on GitHub" (ghost)
Trust row: "No credit card required · Open Source · Community Maintained"

Feature grid (2x3, icon + title + description):
🃏 Spaced-Repetition Flashcards
🧪 Realistic Mock Exams
🧠 Visual Mind Maps
❓ Extensive Question Bank
📊 Progress Tracking
🗺️ Structured Study Roadmap

How it works (3 steps, horizontal):
1 Sign in instantly — Google or GitHub, no credit card
2 Study your way — roadmap, flashcards, or straight to exams
3 Track your readiness — domain scores, streaks, weak areas

Community stats bar:
"342 Questions · 10 Contributors · Free Forever · MIT License"

Footer: GitHub · Ko-fi "☕ Support the project" · MIT badge

Colors: #0a0f1e bg, #1e293b cards, #6366f1 accent
Font: Plus Jakarta Sans + JetBrains Mono for numbers
```

---

### Screen 2 — Lessons Browser

```
Design a lessons browse page. Dark theme. Clean grid layout.

Page header:
- Title: "Lessons"
- Subtitle: "Interactive lessons to master each exam domain"
- Filter tabs: All / Bedrock / Foundations / Lifecycle / Responsible AI / Security

Lesson card grid (3 columns desktop, 1 mobile):
Each card shows:
- Domain color tag (left border 4px)
- Lesson ID in monospace: "BED-L001"
- Title: "What is Amazon Bedrock?"
- Description: one line
- Duration: "⏱ 8 min"
- Difficulty badge: Beginner green
- Author: avatar + "mo-bekheet"
- Completion state: empty circle or green checkmark

Progress bar at top:
"5 / 18 lessons completed"

Colors: #0a0f1e bg, #1e293b cards, indigo accent
```

---

### Screen 3 — Lesson Viewer

```
Design a lesson reading experience. Clean, focused.
Dark theme with comfortable reading width (max 760px centered).

Top bar (sticky):
- Back arrow + "Lessons"
- Lesson title: "What is Amazon Bedrock?"
- Domain badge + difficulty + duration
- Progress indicator: "Lesson 2 of 6 in Bedrock"

Lesson content area:
- Large readable font (Inter 17px, 1.7 line height)
- Concept cards with 4px left indigo border
- Analogy box with subtle indigo background
- Expandable "click to reveal" sections
- Architecture diagram in monospace code block
- Exam tip box (indigo tinted)
- Warning box (amber tinted)
- Inline knowledge check quiz:
  question + 4 option cards + answer reveal with explanation
- Smooth, calm reading experience

Bottom navigation:
← Previous Lesson    Next Lesson →

Style: editorial, focused, like reading a premium textbook
```

---

### Screen 4 — Question Bank (certiq-style)

```
Design a focused question practice interface. Dark theme.
Similar to certiq.com — clean, distraction-free.

Left sidebar:
- Search input
- Domain checkboxes with question counts
- Difficulty: Easy / Medium / Hard toggles
- Status: All / Flagged / Attempted
- Tags as small chips

Top bar: question count + active filters + progress

Main card (78% width):
- Q023 monospace ID + Bedrock indigo badge + Hard red badge
- Question stem: 18px, 1.7 line height, scenario-based
- 4 full-width answer cards A B C D
After answer:
- Correct: green 4px left border + checkmark
- Explanation card: why correct
- Distractor accordion: why B fails / why C fails / why D fails

Action row: ⚑ Flag  🔖 Save  👍 Like  ⚠️ Report

Dark: #0a0f1e / #1e293b / #334155
```

---

### Screen 5 — Mock Exam

```
Design a timed mock exam. Dark. Minimal. Focused.

Fixed header:
- "Mock Exam — AIP-C01" left
- "01:23:45" JetBrains Mono center, red + pulse under 10min
- "23 / 65" + Submit button right

Question area (max 760px centered):
- Domain chip + difficulty dot
- Question 18px Inter
- 4 answer cards, no feedback until submit
- Flag toggle bottom left

Right panel: 65-square navigator
White / indigo / amber / ring highlight

Results: score circle + domain heatmap + review button

Dark: #0a0f1e / #1e293b
```

---

### Screen 6 — Dashboard

```
Design a student progress dashboard. Modern. Data-focused.
Light and Dark theme support. Material Design 3.

Top: "Good morning, Ahmed 👋" + "📅 47 days to AIP-C01" badge

Streak: "🔥 12 Day Streak" + "Last studied: today"

Stats row (4 cards with large numbers):
342 Questions Answered
74% Average Score
12 Day Streak
Security — Weakest Domain

Domain bars (5 rows, color coded):
AI/ML Foundations    80% green
Bedrock and Services 45% amber
App Lifecycle        30% red
Responsible AI       60% amber
Security             41% red

Quick actions: Continue Lessons / Start Mock Exam / Weak Areas / Roadmap

Exam history table (last 3 rows)

Fonts: Plus Jakarta Sans + JetBrains Mono for all numbers
```

---

## 14. Database Schema

```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id        TEXT UNIQUE NOT NULL,
  username        TEXT,
  email           TEXT,
  exam_date       DATE,
  streak_count    INT DEFAULT 0,
  last_study_date DATE,
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE lesson_progress (
  user_id      UUID REFERENCES users(id),
  lesson_id    TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  time_spent   INT DEFAULT 0,
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE flashcard_progress (
  user_id    UUID REFERENCES users(id),
  card_id    TEXT NOT NULL,
  status     TEXT DEFAULT 'new',
  last_seen  TIMESTAMP,
  times_seen INT DEFAULT 0,
  PRIMARY KEY (user_id, card_id)
);

CREATE TABLE question_interactions (
  user_id     UUID REFERENCES users(id),
  question_id TEXT NOT NULL,
  is_saved    BOOLEAN DEFAULT FALSE,
  is_flagged  BOOLEAN DEFAULT FALSE,
  is_liked    BOOLEAN DEFAULT FALSE,
  user_answer TEXT,
  is_correct  BOOLEAN,
  answered_at TIMESTAMP,
  PRIMARY KEY (user_id, question_id)
);

CREATE TABLE question_reports (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),
  question_id TEXT NOT NULL,
  reason      TEXT NOT NULL,
  note        TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE exam_results (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES users(id),
  exam_id    TEXT NOT NULL,
  mode       TEXT NOT NULL,
  score      FLOAT NOT NULL,
  time_taken INT,
  answers    JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE domain_scores (
  user_id      UUID REFERENCES users(id),
  domain_name  TEXT NOT NULL,
  correct      INT DEFAULT 0,
  total        INT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, domain_name)
);

CREATE TABLE streak_log (
  user_id         UUID REFERENCES users(id),
  study_date      DATE NOT NULL,
  minutes_studied INT DEFAULT 0,
  activity_type   TEXT,
  PRIMARY KEY (user_id, study_date)
);

CREATE TABLE roadmap_progress (
  user_id      UUID REFERENCES users(id),
  day_number   INT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  PRIMARY KEY (user_id, day_number)
);
```

---

## 15. Contributing

### Who Can Contribute

Anyone. You don't need to know React or Next.js. If you can write JSON or HTML, you can contribute.

### What You Can Contribute

| Contribution | File Type | Location |
|---|---|---|
| Practice questions | JSON | `/questions/[domain].json` |
| Flashcards | JSON | `/flashcards/[topic].json` |
| Lessons | HTML | `/lessons/[domain]/[id].html` |
| Study guides | Markdown | `/study-guides/[topic].md` |
| Service comparisons | JSON | `/compare/[id].json` |
| Resources / links | JSON | `/resources.json` |

### Question Rules (non-negotiable)

1. **Scenario stem** — "A company needs..." not "What is..."
2. **Four options** — at least two plausible enough to trap someone
3. **`distractors` field** — why each wrong answer fails
4. **`source` field** — AWS docs URL, re:Invent talk, or Skill Builder
5. **Correct domain and difficulty tags**

Questions missing `distractors` are closed without merge.

### Lesson Rules

1. Use the HTML template from Section 6
2. Include correct `<meta>` tags
3. At least one `knowledge-check` component
4. At least one `exam-tip` box
5. `postMessage` call on knowledge check completion

### PR Title Format

```
Add question: bedrock-hard — PrivateLink vs NAT for Bedrock access
Add flashcard: BED-006 — Provisioned Throughput gotcha
Add lesson: BED-L002 — Bedrock Inference Modes
Fix: Q023 — corrected distractor explanation for option B
```

---

## 16. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Content stays thin at launch | Medium | Ship with 50 questions and 3 lessons. Quality beats quantity. |
| AWS DMCA for Skill Builder content | Low | Only paraphrased/original questions. Source = credit, not copy. |
| Tutorials Dojo ships AIP-C01 | High eventually | They charge. This is free and open. Different game. |
| Questions with errors | Medium | Community PRs, issue reporting, version-tagged IDs |
| Auth friction reduces early adoption | Low | Clerk social login is 2 clicks — as low as it gets |

---

## What Done Looks Like

A stranger with no context can:
1. Land on the page and understand what it is in 5 seconds
2. Sign in with Google in 2 clicks
3. Start a lesson or mock exam in under 30 seconds
4. Finish and know exactly where they are weak
5. See how to contribute without asking anyone

**If all five happen — ship it.**

---

*This PRD is a living document. Update it when assumptions break — not when you get new feature ideas.*

*Built with ❤️ by the community · Free forever · Open source*