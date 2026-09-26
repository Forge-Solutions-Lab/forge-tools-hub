# 📄 Universal Product Requirements Document (PRD & Spec) Standard (Forge Standard)

> มาตรฐานการเขียนข้อกำหนดความต้องการและสเปกของฟีเจอร์ (PRD & Technical Spec)
> ช่วยให้ทีมพัฒนาและ AI Coding Assistant เข้าใจเป้าหมายตรงกัน และไม่หลุดขอบเขตงาน

---

## 📋 PRD Document Template (`docs/prd/feature-name.md`)

```markdown
# 📄 PRD: <ชื่อฟีเจอร์หรือระบบ>

- **Status**: Draft | In Review | Approved | Implemented
- **Owner**: <ชื่อเจ้าของฟีเจอร์>
- **Target Release**: <Sprint / Milestone>

---

## 1. Problem Statement & Objectives (ปัญหาและเป้าหมาย)
- **ปัญหาเดิม:** ผู้ใช้หรือระบบประสบปัญหาอะไร
- **เป้าหมาย:** ฟีเจอร์นี้สร้างขึ้นเพื่อแก้ปัญหาอะไร และวัดความสำเร็จอย่างไร (Metrics)

---

## 2. User Stories & Core Use Cases (กรณีการใช้งานหลัก)
- **As a** <ประเภทผู้ใช้>, **I want to** <ความต้องการ>, **So that** <ประโยชน์ที่ได้รับ>
- **Use Case 1:** ขั้นตอนการใช้งานตั้งแต่เริ่มต้นจนเสร็จสิ้น
- **Use Case 2:** กรณีเกิดข้อผิดพลาด (Unhappy Path)

---

## 3. Technical Requirements & Architecture (ข้อกำหนดเชิงเทคนิค)
- **Data Models / Schema:** โครงสร้างข้อมูลที่ต้องจัดเก็บหรือแก้ไข
- **API Endpoints:** รูปแบบ Request / Response ที่ต้องพัฒนา
- **State Management & Caching:** กลไกการจัดการ State และแคช

---

## 4. Non-Functional Requirements (ข้อกำหนดด้านคุณภาพ)
- **Performance:** Response Time ต้องต่ำกว่า 200ms
- **Security:** ต้องผ่านการตรวจสอบสิทธิ์ (AuthN/AuthZ) ทุก Endpoint
- **Accessibility:** รองรับ Dark Mode และ Keyboard Navigation

---

## 5. Acceptance Criteria (เกณฑ์การตรวจรับงาน)
- [ ] 1. <เงื่อนไขที่ 1 ผ่านการทดสอบ>
- [ ] 2. <เงื่อนไขที่ 2 ผ่านการทดสอบ>
- [ ] 3. <มี Unit / Integration Tests ครอบคลุม>
```
