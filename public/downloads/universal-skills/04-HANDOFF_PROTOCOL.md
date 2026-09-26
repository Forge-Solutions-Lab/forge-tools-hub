# Universal Context Handoff Protocol & Template (Forge Standard)

> มาตรฐานการส่งต่องานข้าม Session หรือระหว่างทีม (Zero Context-Drift Protocol)
> ใช้สำหรับสรุป State, แผนสถาปัตยกรรม, งานที่เสร็จแล้ว และงานที่ต้องทำต่อ เพื่อให้เปิด Session ถัดไปแล้วเริ่มงานต่อได้ทันที

---

## Handoff Document Template (`HANDOFF.md`)

```markdown
# Project Handoff & Technical Architecture Document
**Project Name**: <ชื่อโปรเจกต์>  
**Date**: <วันที่อัปเดต เช่น 26 กันยายน 2026>  
**Repository**: `<Git Remote URL>` (Branch: `<active-branch>`)  
**Environment URL**: `<Local หรือ Production URL>`  
**Location in Workspace**: `docs/handoff/HANDOFF.md`

---

## 1. Executive Summary
สรุปเป้าหมายหลักของโปรเจกต์ ปัญหาที่แก้ไข และความสามารถหลักของระบบใน 2-3 ย่อหน้า

---

## 2. System Architecture & Component Map
ผังโครงสร้าง Directory และหน้าที่ของแต่ละโฟลเดอร์หลักในโปรเจกต์:

\`\`\`text
project-root/
├── src/
│   ├── components/      # UI Components
│   ├── services/        # API Clients & Data Services
│   ├── utils/           # Helper functions
│   └── index.css        # Design tokens & styles
├── docs/                # Architecture & PRD docs
└── package.json
\`\`\`

---

## 3. Core Modules & Feature Breakdown
สรุปสถานะการทำงานของแต่ละโมดูลหลักในระบบ:
- **Module 1 (<ชื่อโมดูล>):** หน้าที่, ไฟล์ที่เกี่ยวข้อง, ฟังก์ชันสำคัญ
- **Module 2 (<ชื่อโมดูล>):** หน้าที่, ไฟล์ที่เกี่ยวข้อง, ฟังก์ชันสำคัญ

---

## 4. Build, Test & Deployment Guide
คำสั่งสำคัญที่ต้องใช้รันระบบ:
\`\`\`bash
# 1. ติดตั้ง Dependencies
npm install

# 2. รันโหมด Development
npm run dev

# 3. รันการทดสอบและ Build
npm run test
npm run build
\`\`\`

---

## 5. Recent Changelog (Session Summary)
ประวัติการเปลี่ยนแปลงล่าสุดในรอบการทำงานนี้:
| Timestamp | Scope | Summary of Changes |
|---|---|---|
| **<Date>** | <Component> | <สรุปการแก้ไขที่สำคัญ> |

---

## 6. Next Steps & Pending Tasks (สิ่งที่ต้องทำต่อทันที)
1. **[Priority 1]:** <งานที่ต้องทำเป็นลำดับถัดไป>
2. **[Priority 2]:** <งานที่ค้างอยู่หรือฟีเจอร์ที่ต้องต่อยอด>
```
