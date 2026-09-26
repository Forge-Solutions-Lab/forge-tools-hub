# 🛠️ Forge Tools Hub

> **Centralized AI Tools, Prompts & MCP Servers Registry for Forge Solutions Lab**

Forge Tools Hub คือระบบศูนย์กลางรวบรวมเครื่องมือ AI Developer Tools, Cursor Rules, Claude Prompts, MCP Servers และ Workflow อัตโนมัติ สำหรับทีมวิศวกรของ **Forge Solutions Lab**

---

## ✨ Features

- 🔍 **AI Tools Directory:** คลังรวบรวมเครื่องมือ AI พร้อมระบบค้นหา, คัดกรองตามหมวดหมู่ (Coding, Prompts, MCP, Workflow), IDE ที่รองรับ (Cursor, Claude, VSCode), และระดับความยาก
- 📖 **Interactive MDX Reader:** คู่มือการใช้งานเครื่องมือแบบละเอียด พร้อม Component Interactive เช่น `<BeforeAfter>`, `<QuickInstall>`, `<TagBadge>`, และสารบัญอัตโนมัติ (Table of Contents)
- 👥 **Team Activity & Contributor Roster:**
  - แสดงรายชื่อทีมวิศวกร Forge Solutions Lab พร้อมระบบจัดอันดับตามยอด Commit จริงใน GitHub Org
  - **Commit History & Diff Inspector:** ดูประวัติ Commit เชิงลึกแบบเรียลไทม์ พร้อมตัวกรองรายชื่อโปรเจกต์ และลิงก์ตรงไปยังหน้า GitHub Diff
  - **Contribution Activity Heatmap:** กราฟความถี่การ Commit รายสัปดาห์ 16 สัปดาห์ พร้อมระบุชื่อวัน (`อา.` - `ส.`) และเดือนชัดเจน
  - **Academic Mode Toggle:** ปุ่มสลับแสดงรหัสนักศึกษาของสมาชิกในทีม
- 🌓 **Dynamic Theme Engine:** ระบบ Dark / Light theme อัตโนมัติด้วย CSS Variables ป้องกันอาการจอกระพริบ (Zero FOUC)

---

## 🚀 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Dynamic CSS Custom Properties
- **Content Pipeline:** [next-mdx-remote/rsc](https://github.com/hashicorp/next-mdx-remote) with `gray-matter` & `rehype-highlight`
- **Icons:** [Lucide React](https://lucide.dev/)
- **API Integration:** GitHub REST API with 1-hour ISR (`revalidate: 3600`)

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Forge-Solutions-Lab/forge-tools-hub.git
cd forge-tools-hub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
สร้างไฟล์ `.env.local` โดยคัดลอกจาก `.env.example`:
```bash
cp .env.example .env.local
```

ตั้งค่าตัวแปรใน `.env.local`:
```env
# GitHub Personal Access Token (Classic or Fine-grained)
GITHUB_TOKEN=your_personal_access_token_here

# GitHub Organization
GITHUB_ORG=Forge-Solutions-Lab
```

### 4. Run Development Server
```bash
npm run dev
```

เปิดบราวเซอร์ที่ [http://localhost:3000](http://localhost:3000)

---

## 🤝 Adding New Tools (Contributing)

สามารถเพิ่มเครื่องมือหรือ Prompt ใหม่ได้ง่ายๆ โดยสร้างไฟล์ `.mdx` ในโฟลเดอร์ `content/tools/`:

```mdx
---
title: "Your Tool Name"
description: "Brief summary of the tool"
category: "coding" # coding | prompt | mcp | agent | workflow
author: "Your Name"
github: "https://github.com/Forge-Solutions-Lab"
version: "1.0.0"
difficulty: "beginner" # beginner | intermediate | advanced
tags: ["Next.js", "AI", "Cursor"]
status: "verified" # verified | experimental | deprecated
featured: true
---

## Overview
คำอธิบายการทำงาน...
```

---

## 🏛️ Forge Solutions Lab
Developed and maintained by the engineering team at [Forge Solutions Lab](https://github.com/Forge-Solutions-Lab).
