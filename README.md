# Forge Tools Hub

Centralized AI Tools, Engineering Prompts, and Workflow Registry for Forge Solutions Lab.

---

## Overview

Forge Tools Hub is an internal platform designed for software engineering teams and AI coding assistants. It provides access to curated developer tools, universal coding standards, architecture decision templates, Docker workflows, and team contribution metrics.

---

## Core Capabilities

- **AI Tools & Skills Catalog:** Searchable registry of developer tools, prompts, and skills categorized by workflow, target IDE, and readiness.
- **Universal Engineering Skills:** Curated standards for Clean Architecture, 2-Axis Code Review, Docker automation, Context Handoff, ADR, and PRD templates with 1-click downloads.
- **Interactive MDX Documentation:** Clean, developer-focused documentation with copyable snippets, live previews, and before/after comparisons.
- **Team Activity & Contributor Roster:** Real-time GitHub commit history, 16-week contribution heatmaps, and repository activity tracking.
- **Dynamic Dark/Light Theme:** CSS custom properties-driven interface with zero layout shift.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Custom Properties
- **Content:** next-mdx-remote (RSC)
- **Icons:** Lucide React
- **Data Source:** GitHub REST API (ISR)

---

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Forge-Solutions-Lab/forge-tools-hub.git
cd forge-tools-hub
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```
Set the following variables in `.env.local`:
```env
GITHUB_TOKEN=your_personal_access_token
GITHUB_ORG=Forge-Solutions-Lab
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Adding New Tools

To register a new tool or prompt, add a `.mdx` file to the `content/tools/` directory:

```mdx
---
title: "Tool Title"
description: "Brief summary of the tool or standard"
category: "AI Skills / Prompt"
tags: ["Engineering", "Clean Code"]
works_with: ["Cursor", "Claude Code", "Antigravity"]
install_difficulty: "easy"
github_url: "https://github.com/owner/repo"
added_by: "username"
added_date: "2026-09-26"
status: "recommended"
featured: true
---

## Overview
Content and installation instructions...
```

---

## Organization

Maintained by the engineering team at [Forge Solutions Lab](https://github.com/Forge-Solutions-Lab).
