# Universal Code Style & Engineering Standards (Forge Standard)

> มาตรฐานการเขียนโค้ดและการออกแบบระบบระดับวิศวกรรมสากล — ใช้เป็นแนวทางบังคับสำหรับวิศวกรทุกคนและ AI Coding Assistant ทุกตัวในทีม
> เอกสารนี้ไม่ผูกมัดกับภาษาใดภาษาหนึ่ง (Language-Agnostic) แต่กำหนด "Engineering DNA" ที่ต้องคงอยู่เสมอ

---

## 1. ปรัชญาการเขียนโค้ด (Coding Philosophy)

- **"Code is written for humans first, computers second"**: โค้ดถูกอ่านมากกว่าถูกเขียนนับสิบเท่า ความชัดเจนและเจตนาต้องมาก่อนความสั้นกระชับเสมอ
- **"Simple beats clever"**: วิธีแก้ปัญหาที่ตรงไปตรงมาและคาดเดาได้ ดีกว่าการใช้ลูกเล่น (Trick) ซับซ้อนที่ต้องเสียเวลาถอดรหัส
- **"Single Responsibility"**: ฟังก์ชัน คลาส หรือโมดูล ควรมีเหตุผลเดียวในการเปลี่ยนแปลง (ถ้าอธิบายหน้าที่แล้วต้องใช้คำว่า "และ" เกินหนึ่งครั้ง ให้พิจารณาแยก)
- **"Separation of Concerns"**: แต่ละส่วนของระบบรับผิดชอบเฉพาะหน้าที่ของตนเอง (เช่น Data Fetching, Business Transformation, API I/O แยกกันชัดเจน)

---

## 2. กฎการตั้งชื่อ (Naming Conventions)

- **Functions / Methods:** ใช้คำกริยาที่บอกการกระทำและผลลัพธ์ชัดเจน (`fetch_active_users`, `validate_order_schema`, `transform_metrics`)
- **Variables / Fields:** ใช้คำนามที่สื่อความหมายในโดเมน ไม่ใช้ประเภทข้อมูล (`account_balance` แทน `dict1` หรือ `temp_data`)
- **Booleans:** ขึ้นต้นด้วย `is_`, `has_`, `can_`, `should_` เสมอ (`is_active`, `has_permission`, `should_retry`)
- **หลีกเลี่ยงชื่อคลุมเครือ:** ห้ามใช้ `data`, `item`, `res`, `obj`, `handle_stuff` ยกเว้นใน lambda หรือ loop สั้นๆ 1-2 บรรทัด

---

## 3. การจัดการ Error และ Logging (Error Handling & Observability)

- **Never Swallow Errors:** ห้าม `catch` แล้วปล่อยว่างเด็ดขาด (`except Exception: pass`) ทุก error ต้องได้รับการ log หรือ re-throw อย่างมีบริบท
- **Rich Error Context:** Error message ต้องตอบได้เสมอว่า "เกิดที่ไหน" และ "เกิดกับข้อมูลชิ้นใด" (เช่น ระบุ Entity ID หรือชื่อ Service)
- **Structured Logging:** ใช้ระบบ Logging (`LOG.info`, `LOG.warning`, `LOG.error`) แทนการใช้ `print()` หรือ `console.log()`
- **No Debug Leftovers:** ลบโค้ดทดสอบ ชิ้นส่วน `print` หรือ dump ก้อน JSON ขนาดใหญ่ออกก่อนเปิด Pull Request

---

## 4. การจัดการ State และ Data Flow (State & Immutability)

- **Unidirectional Data Flow:** ข้อมูลควรไหลไปทิศทางเดียว (`Input ➔ Validate ➔ Transform ➔ Persist/Output`)
- **Pure Functions First:** ตรรกะการคำนวณหรือแปลงข้อมูลควรเป็น Pure Function (ไม่มี Side-effect, ไม่แก้ Object ต้นทาง)
- **Single Source of Truth:** สถานะที่ต้องคงอยู่ (Persistent State) ต้องมีจุดแก้ไขและบันทึกจุดเดียว ห้ามแยกเขียนอิสระหลายแห่ง

---

## 5. ความปลอดภัยและสุขอนามัยของโค้ด (Security & Hygiene)

- **No Hardcoded Secrets:** ห้ามใส่ API Keys, Token, Password หรือ Secret ลงในโค้ด ให้ดึงผ่าน Environment Variables เท่านั้น
- **SQL Injection Prevention:** ใช้ Parameterized Queries หรือ ORM เสมอ ห้ามต่อ String สำหรับ SQL Query เด็ดขาด
- **Graceful Degradation:** ระบบต้องมี Timeout, Retry Policy ที่เหมาะสม และไม่ล่มทั้งระบบเมื่อ External Service จุดใดจุดหนึ่งไม่ตอบสนอง
