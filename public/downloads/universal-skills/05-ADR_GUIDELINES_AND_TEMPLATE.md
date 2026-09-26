# Universal Architecture Decision Record (ADR) Standard (Forge Standard)

> มาตรฐานการบันทึกการตัดสินใจทางสถาปัตยกรรม (Architecture Decision Records)
> ใช้สำหรับบันทึกเหตุผล บริบท ข้อดีข้อเสีย และผลกระทบของการตัดสินใจเลือกเทคโนโลยีหรือออกแบบระบบ

---

## ADR Document Template (`docs/adr/000X-title.md`)

```markdown
# ADR-000X: <ชื่อการตัดสินใจ เช่น Single Source of Truth for Data Storage>

- **Status**: Proposed | Accepted | Deprecated | Superseded by ADR-XXXX
- **Date**: <YYYY-MM-DD>
- **Author**: <ชื่อผู้จัดทำ>
- **Deciders**: <ทีมหรือวิศวกรที่ร่วมตัดสินใจ>
- **Scope**: `<Component / System Scope>`

---

## 1. Context & Problem Statement (บริบทและปัญหา)
อธิบายว่าเรากำลังเจอปัญหาอะไร ข้อจำกัดคืออะไร และทำไมจึงต้องมีการตัดสินใจในจุดนี้

---

## 2. Considered Options (ทางเลือกที่พิจารณา)
1. **Option 1 (<ชื่อทางเลือก>):** คำอธิบายสั้นๆ + ข้อดี / ข้อจำกัด
2. **Option 2 (<ชื่อทางเลือก>):** คำอธิบายสั้นๆ + ข้อดี / ข้อจำกัด

---

## 3. Decision Outcome (ข้อสรุปและการตัดสินใจ)
เราตัดสินใจเลือก **Option X** เนื่องจาก:
- **เหตุผลข้อที่ 1:** ...
- **เหตุผลข้อที่ 2:** ...

---

## 4. Consequences (ผลกระทบและสิ่งที่จะตามมา)
### Positive Consequences (ผลเชิงบวก)
- ทำให้ระบบรองรับการขยายตัวได้ง่ายขึ้น
- ลดความซับซ้อนของโค้ด

### Negative / Trade-offs (ข้อเสียหรือสิ่งที่ต้องแลก)
- ต้องมีการ Migrate ข้อมูลเดิม
- มีการเรียนรู้เพิ่มเติมสำหรับคนในทีม

---

## 5. Compliance & Verification Rules (กฎการตรวจสอบ)
- โค้ดใหม่ที่เขียนเข้ามาต้องสอดคล้องกับการตัดสินใจนี้
- หากพบการละเมิดใน Code Review ให้ส่งลิงก์ ADR นี้เป็นข้ออ้างอิง
```
