เราจะทำงาน migrate โปรเจ็คนี้แบบ mini task ทีละขั้น
สำคัญ: ทำทีละ Mini Task เท่านั้น ห้ามข้าม ห้ามทำต่อเอง
ทุกครั้งที่จบ Mini Task ต้อง “หยุดและรอฉันสั่งต่อ”

========================
กติกาพื้นฐานของการ migrate (สำคัญมาก)
========================

โครงสร้าง repo:
- โปรเจ็คใหม่ (vNext) อยู่ที่ root (BookingLineOAClient)
- โปรเจ็คเก่าอยู่ที่ ref-old-version/BOTNOI-LIFF
- ห้ามแก้ไฟล์ใน ref-old-version เด็ดขาด (อ่านอย่างเดียว)

Technology constraints:
❌ ห้ามใช้ libraries ต่อไปนี้ ไม่ว่ากรณีใด:
- html2canvas
- libphonenumber-js
- moment
- @angular/material
- @angular/material-moment-adapter

✅ ต้องใช้แทน:
- Tailwind CSS สำหรับ styling ทั้งหมด
- Angular built-in APIs + Web standards
- Date/Time: Date, Intl.DateTimeFormat หรือ Temporal-ready pattern
- Phone formatting: regex / backend-format / simple formatter
- UI: เขียน component เอง + Tailwind utilities (ห้าม Material)

Angular / App constraints:
- Angular 19+
- ใช้ Tailwind CSS เป็นหลัก
- ถ้าเป็น SSR ต้อง guard window/document ด้วย isPlatformBrowser
- เน้น standalone components ถ้าไม่เพิ่มความซับซ้อน
- ต้องรองรับอนาคต:
  - เปิดผ่าน LINE OA (LIFF)
  - เปิดเป็น Website ปกติ (Non-LIFF)

Workflow:
- ทำงานแบบ Mini Task เท่านั้น
- ทุก Mini Task ต้อง:
  1) ng serve ผ่าน
  2) สรุปไฟล์ที่เพิ่ม/แก้
  3) สรุปคำสั่งที่ต้องรัน
  4) ระบุสิ่งที่ยังไม่ migrate
  5) หยุด และรอฉันสั่งต่อ

========================
Mini Task Plan
========================

--------------------------------
Mini Task 1/6: สำรวจโปรเจ็คเก่า + วางแผน migrate
--------------------------------
เป้าหมาย:
- เข้าใจโครงสร้างและ logic ของ ref-old-version/BOTNOI-LIFF
- ระบุ legacy dependency และ code smell
- วางแผน migrate ให้เหมาะกับ LineOA + Website

ขอบเขต:
- วิเคราะห์อย่างเดียว
- ห้ามแก้ไฟล์ legacy
- ห้ามแนะนำ library ต้องห้าม

ผลลัพธ์:
- สร้างไฟล์ MIGRATION_PLAN.md ในโปรเจ็คใหม่ (root)
  โดยต้องมี:
  1) ตาราง mapping page / shared / service
  2) code smell / legacy dependency ที่ต้อง refactor
  3) แนวทาง replacement (Angular + Web API + Tailwind)
  4) ลำดับ migrate ที่แนะนำ (page-first)

เมื่อเสร็จ:
- สรุปสิ่งที่พบ
- หยุด และรอฉันสั่งต่อ

--------------------------------
Mini Task 2/6: Clean dependency + เตรียมโครงสร้างพื้นฐาน
--------------------------------
เป้าหมาย:
- โปรเจ็คใหม่ไม่มี Material / moment / libphonenumber-js
- dependency สะอาด พร้อมใช้ Tailwind

ขอบเขต:
- แก้เฉพาะโปรเจ็คใหม่ (root)

เงื่อนไขความสำเร็จ:
- npm install ผ่าน
- ng serve ผ่าน

เมื่อเสร็จ:
- สรุปไฟล์ที่แก้
- สรุปคำสั่งที่รัน
- หยุด และรอฉันสั่งต่อ

--------------------------------
Mini Task 3/6: ติดตั้งและตั้งค่า Tailwind CSS
--------------------------------
เป้าหมาย:
- ใช้ Tailwind เป็น styling หลัก
- เตรียม base styles สำหรับ LineOA + Website

ต้องมี:
- layout pattern
- form pattern
- button pattern
- dialog/modal pattern
- loading/skeleton pattern

เงื่อนไขความสำเร็จ:
- ใส่ class Tailwind แล้วเห็นผลจริง
- ng serve ผ่าน

เมื่อเสร็จ:
- สรุปไฟล์ที่เพิ่ม/แก้
- หยุด และรอฉันสั่งต่อ

--------------------------------
Mini Task 4/6: Routing + App Mode (LIFF / Website)
--------------------------------
เป้าหมาย:
- แยก logic รองรับ:
  - เปิดจาก LINE (LIFF)
  - เปิดเป็น Website ปกติ
- มี routing placeholder สำหรับ:
  - /pdpa
  - /review
  - /payment-status-success

เงื่อนไข:
- route เข้าได้จริง
- ไม่ผูก logic กับ LIFF ตายตัว

เมื่อเสร็จ:
- สรุปโครงสร้าง routing
- หยุด และรอฉันสั่งต่อ

--------------------------------
Mini Task 5/6: Migrate PDPA Page
--------------------------------
เป้าหมาย:
- ย้าย PDPA page จาก legacy
- ตัด Material / moment ออกหมด
- ใช้ Tailwind + Web API

ขอบเขต:
- ย้ายเฉพาะ PDPA
- shared ย้ายเฉพาะที่จำเป็น

เงื่อนไข:
- route /pdpa เปิดได้
- UI ใช้งานได้จริง
- ng serve ผ่าน

เมื่อเสร็จ:
- สรุปไฟล์ที่เพิ่ม/แก้
- code snippet จุดที่ refactor
- หยุด และรอฉันสั่งต่อ

--------------------------------
Mini Task 6/6: เตรียมต่อยอด Review / Payment / Shared
--------------------------------
เป้าหมาย:
- จัด shared structure ให้พร้อม reuse
- เตรียม pattern สำหรับ page ถัดไป

ผลลัพธ์:
- PARITY_CHECKLIST.md
- คำแนะนำ next steps

เมื่อเสร็จ:
- หยุด และรอฉันสั่งต่อ

========================

เริ่มจาก Mini Task 1 เท่านั้น
อย่าทำ task อื่นก่อน
