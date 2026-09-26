# Forge Tools Hub

ระบบศูนย์กลางรวบรวมเครื่องมือ AI, ชุดคำสั่ง Prompt, และมาตรฐานวิศวกรรมซอฟต์แวร์ สำหรับทีม **Forge Solutions Lab**

---

## ภาพรวมโปรเจกต์

Forge Tools Hub พัฒนาขึ้นเพื่อเป็นคลังกลางสำหรับวิศวกรซอฟต์แวร์และ AI Coding Assistants (เช่น Antigravity, Cursor, Claude Code) ในการเข้าถึงเครื่องมือ, กฎเกณฑ์การพัฒนาโค้ด (Coding Standards), เทมเพลตการส่งต่องาน (Handoff), และบันทึกกิจกรรมการพัฒนาของทีม

---

## ความสามารถหลัก

- **คลังเครื่องมือ AI และ Prompts (Catalog):** ค้นหาและคัดกรองเครื่องมือตามประเภทงาน, IDE ที่รองรับ (Cursor, Claude, VSCode), และระดับความพร้อมใช้งาน
- **มาตรฐานวิศวกรรมสากล (Universal Engineering Skills):** รวม 7 มาตรฐานหลัก เช่น Clean Architecture, 2-Axis Code Review, Docker Workflow, Handoff Protocol, ADR และ PRD Templates พร้อมปุ่มดาวน์โหลดไฟล์ `.md` และ `.zip` ในคลิกเดียว
- **คู่มือแบบ Interactive MDX:** เอกสารประกอบการใช้งานพร้อมฟังก์ชัน Copy โค้ด, ดู Preview ทันที, และเปรียบเทียบ Before/After
- **ระบบติดตามกิจกรรมทีม (Contributor Roster):** ดึงข้อมูล Commit จริงจาก GitHub องค์กร, แสดงกราฟความถี่ (Heatmap) รายสัปดาห์, และประวัติการแก้ไขโค้ด
- **รองรับ Dark / Light Mode:** สลับธีมแสดงผลอัตโนมัติ ไม่กระตุกหรือเกิดปัญหาจอกระพริบ

---

## เทคโนโลยีที่ใช้

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Custom Properties
- **Content:** next-mdx-remote (RSC)
- **Icons:** Lucide React
- **Data Source:** GitHub REST API

---

## ขั้นตอนการติดตั้งและเริ่มใช้งาน

### 1. Clone โปรเจกต์และติดตั้ง Dependencies
```bash
git clone https://github.com/Forge-Solutions-Lab/forge-tools-hub.git
cd forge-tools-hub
npm install
```

### 2. ตั้งค่า Environment Variables
คัดลอกไฟล์ `.env.example` เป็น `.env.local`:
```bash
cp .env.example .env.local
```

กำหนดค่าตัวแปรใน `.env.local`:
```env
GITHUB_TOKEN=your_personal_access_token_here
GITHUB_ORG=Forge-Solutions-Lab
```

### 3. รันโปรเจกต์สำหรับ Development
```bash
npm run dev
```
เปิดใช้งานผ่านเว็บเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

---

## การเพิ่มเครื่องมือหรือมาตรฐานใหม่

สามารถเพิ่มเครื่องมือหรือ Prompt ใหม่ได้โดยการสร้างไฟล์ `.mdx` ในโฟลเดอร์ `content/tools/`:

```mdx
---
title: "ชื่อเครื่องมือหรือมาตรฐาน"
description: "คำอธิบายสรุปสั้นๆ เกี่ยวกับเครื่องมือ"
category: "AI Skills / Prompt"
tags: ["Engineering", "Clean Code"]
works_with: ["Cursor", "Claude Code", "Antigravity"]
install_difficulty: "easy"
github_url: "https://github.com/owner/repo"
added_by: "ชื่อผู้เพิ่ม"
added_date: "2026-09-26"
status: "recommended"
featured: true
---

## ภาพรวมและการใช้งาน
ใส่เนื้อหา คำแนะนำ และตัวอย่างโค้ดที่นี่...
```

---

## องค์กรและผู้ดูแล

พัฒนาและดูแลโดยทีมวิศวกร [Forge Solutions Lab](https://github.com/Forge-Solutions-Lab)
