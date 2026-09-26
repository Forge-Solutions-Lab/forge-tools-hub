# 🐳 Universal Docker Workflow & Deployment Rules (Forge Standard)

> มาตรฐานและกฎการรัน Docker / Docker Compose สำหรับ AI Agents และทีมพัฒนา
> ออกแบบมาเพื่อรองรับคำสั่งสั้นๆ เช่น `"รัน docker"`, `"อัปเดตระบบ"`, หรือ `"restart container"` อย่างปลอดภัยและแม่นยำ

---

## 1. การตรวจจับการเปลี่ยนแปลงอัตโนมัติ (Automated Change Detection)

ก่อนสั่งรันคำสั่ง Docker ทุกครั้ง ระบบหรือ AI จะต้องตรวจสอบ `git status` เพื่อเลือกคำสั่งที่เหมาะสมที่สุด:

### 🔹 Category A: แก้ไข Source Code ทั่วไป
- **Target Files:** `src/**/*`, `app/**/*`, `components/**/*`, `backend/**/*`
- **Recommended Command:**
  ```bash
  docker compose up -d --build --force-recreate
  ```

### 🔹 Category B: แก้ไข Environment & Build Args
- **Target Files:** `.env`, `.env.*`, `Dockerfile`, `package.json`, `requirements.txt`
- **Recommended Command:**
  ```bash
  docker compose build --no-cache && docker compose up -d --force-recreate
  ```

### 🔹 Category C: แก้ไขเฉพาะ Service เดี่ยว
- **Target Files:** เฉพาะโฟลเดอร์ของ Service ใด Service หนึ่ง
- **Recommended Command:**
  ```bash
  docker compose up -d --build --no-deps <service-name>
  ```

---

## 2. กฎเหล็กด้านความปลอดภัยของข้อมูล (Volume Protection)

1. **ห้ามใช้คำสั่งลบ Volume โดยพลการ:**
   - ❌ **ห้ามรัน:** `docker compose down -v` หรือ `docker volume prune -f` เว้นแต่ผู้ใช้จะระบุคำสั่งล้างข้อมูลอย่างชัดเจน
2. **Data Persistence Guarantee:**
   - ข้อมูลใน Container ฐานข้อมูล (`postgres`, `mysql`, `redis`, `minio`, `mongodb`) จะต้องถูกผูกเข้ากับ Named Volume เสมอ เพื่อให้ข้อมูลไม่สูญหายเมื่อ Recreate Container

---

## 3. การตรวจสอบความพร้อมของระบบ (Health Verification)

หลังจากสั่ง Docker Compose แล้ว ต้องตรวจสอบสถานะดังนี้เสมอ:
1. **Container Status Check:**
   ```bash
   docker compose ps
   ```
   (ตรวจสอบว่าทุก Service อยู่ในสถานะ `Up` หรือ `healthy` ไม่มีสถานะ `Exit 1`)
2. **Endpoint Health Check:**
   - ตรวจสอบ HTTP 200 บน Endpoint เช่น `http://localhost:3000` หรือ `http://localhost:8000/health`
3. **Log Inspection เมื่อเกิดปัญหา:**
   ```bash
   docker compose logs --tail=50 <failing-service>
   ```
