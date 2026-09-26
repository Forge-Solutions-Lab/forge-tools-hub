# 🔍 Universal AI Code Review Workflow (Forge Standard)

> มาตรฐานและกระบวนการตรวจทานโค้ด (Code Review) แบบ 2 แกน — สำหรับใช้เป็น Instruction ให้ AI Reviewer หรือวิศวกรในทีมตรวจ Pull Request

---

## 1. แกนการตรวจทานโค้ด (Two-Axis Review Paradigm)

ทุกการ Review ต้องตรวจทานครอบคลุม 2 มิติเสมอ:
1. **Spec & Correctness (ความถูกต้องตามข้อกำหนด):** โค้ดทำงานตรงตาม Requirement ครอบคลุม Edge Cases และมี Logic ที่ปลอดภัยหรือไม่
2. **Readability & Architecture (ความสะอาดและสถาปัตยกรรม):** โค้ดอ่านเข้าใจง่าย แยก Layer ชัดเจน ตรงตาม Code Style และไม่มีหนี้ทางเทคนิค (Technical Debt)

---

## 2. Checklists ประจำส่วนต่างๆ

### 2.1 Backend Standards Checklist
- [ ] **Layered Architecture:** แยก `Controller / Route ➔ Service (Business Logic) ➔ Repository / Data Layer` ชัดเจน
- [ ] **No SQL in Handlers:** ไม่มี Raw Query ปะปนใน Controller หรือ Route Handlers
- [ ] **Input Validation:** ตรวจสอบและ Sanitization ข้อมูลนำเข้าทุกจุด (API Body, Query Params, Headers, Uploads)
- [ ] **Error Masking:** ซ่อน Internal Stack Traces หรือ Database Error ไม่ให้หลุดไปถึง Client

### 2.2 Frontend Standards Checklist
- [ ] **Logic vs Presentation:** แยก Business Logic & Data Fetching ออกจาก UI Rendering (ใช้ Custom Hooks หรือ ViewModel)
- [ ] **Design System Tokens:** ใช้ CSS Variables / Theme Tokens ร่วมกัน ห้าม Hardcode สีหรือ Spacing แปลกแยก
- [ ] **State Integrity:** ไม่มี State ซ้ำซ้อน (Derived State ต้องคำนวณผ่าน `useMemo` หรือตัวแปรธรรมดา)
- [ ] **Accessibility & UX:** รองรับ Keyboard Navigation, Loading States, Empty States, และ Error Boundaries

### 2.3 Quality & Reliability Checklist
- [ ] **No Secrets in Code:** ตรวจสอบว่าไม่มี Token, Key หรือ Credentials หลุดมาใน Diff
- [ ] **Unit / Integration Tests:** มีการทดสอบครอบคลุมเงื่อนไขหลักและ Edge Cases
- [ ] **Performance:** หลีกเลี่ยง N+1 Query, Memory Leaks หรือ Infinite Loops

---

## 3. ระดับความรุนแรงของข้อผิดพลาด (Severity Levels)

| ระดับ (Severity) | คำอธิบาย | เงื่อนไขการ Merge |
|---|---|---|
| 🔴 **Critical** | ช่องโหว่ความปลอดภัย, Data Loss, Crash, Breaking Change ที่ไม่ตั้งใจ | **ห้าม Merge เด็ดขาด (Blocker)** |
| 🟠 **High** | ผิดสเปก, ขาด Error Handling สำคัญ, Architecture ผิด Layer | **ต้องแก้ไขก่อน Merge** |
| 🟡 **Medium** | ขาด Test Coverage, Naming ไม่ชัดเจน, โค้ดซ้ำซ้อน | แก้ไขใน PR นี้หรือเปิด Ticket ตาม |
| 🟢 **Low / Nit** | ข้อเสนอแนะเชิงความสวยงาม, Micro-optimization | ไม่บล็อกการ Merge |

---

## 4. โครงสร้างผลการ Review มาตรฐาน (Output Format)

```markdown
### 📋 Code Review Summary
- **Verdict:** [PASS / REQUEST_CHANGES]
- **Summary:** ภาพรวมคุณภาพของโค้ดใน PR นี้

#### 🟢 Strengths
- จุดเด่นของ Solution และสิ่งที่ทำได้ดี

#### 🔴 Issues & Required Fixes
- `path/to/file.ts:L45` [High]: คำอธิบายปัญหา พร้อมเหตุผล และโค้ดตัวอย่างที่แนะนำให้ปรับปรุง
```
