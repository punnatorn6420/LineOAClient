กติกาพื้นฐานของการ migrate โปรเจ็คนี้ (สำคัญมาก):

โครงสร้าง repo:
- โปรเจ็คใหม่ (vNext) อยู่ที่ root (BookingLineOAClient)
- โปรเจ็คเก่าอยู่ที่ ref-old-version/BOTNOI-LIFF
- ห้ามแก้ไฟล์ใน ref-old-version เด็ดขาด (ใช้เพื่ออ่านอย่างเดียว)

Technology constraints (ต้องปฏิบัติตามทั้งหมด):
❌ ห้ามใช้ libraries ต่อไปนี้ ไม่ว่ากรณีใด:
- html2canvas
- libphonenumber-js
- moment
- @angular/material
- @angular/material-moment-adapter

✅ ต้องใช้แทน:
- Tailwind CSS สำหรับ styling ทั้งหมด
- Angular built-in APIs + Web standards
- Date/Time: ใช้ Date, Intl.DateTimeFormat หรือ Temporal-ready pattern
- Phone formatting: ใช้ regex / backend-format / simple formatter เท่านั้น
- UI: เขียน component เอง หรือใช้ Tailwind utilities (ห้าม Material)

Angular / App constraints:
- Angular version: 19+
- โปรเจ็คใหม่ใช้ Tailwind CSS เป็นหลัก
- ถ้าเป็น SSR ต้อง guard window/document ด้วย isPlatformBrowser
- เน้น standalone components ถ้าไม่เพิ่มความซับซ้อน

Workflow:
- ทำงานแบบ milestone ทีละขั้น
- ทุก milestone ต้อง:
  1) ng serve ผ่าน
  2) สรุปไฟล์ที่เพิ่ม/แก้
  3) สรุปคำสั่งที่ต้องรัน
  4) ระบุสิ่งที่ยังไม่ migrate


ช่วยสำรวจโปรเจ็คเก่าใน ref-old-version/BOTNOI-LIFF โดยมีเงื่อนไข:
- วิเคราะห์เฉพาะโครงสร้างและ logic
- ห้ามแนะนำหรือใช้ library ที่อยู่ในรายการต้องห้าม
- ถ้าพบว่าโค้ดเก่าใช้ moment / material / libphonenumber-js
  ให้เสนอแนวทางใหม่ที่ใช้ Angular + Web API + Tailwind แทน

ส่งผลลัพธ์เป็นไฟล์ MIGRATION_PLAN.md ในโปรเจ็คใหม่ โดยมี:
1) ตาราง mapping page / shared / service
2) รายการ code smell / legacy dependency ที่ต้อง refactor
3) แนวทาง replacement ที่ clean และ modern
4) ลำดับ migrate ที่แนะนำ


ช่วยติดตั้งและตั้งค่า Tailwind CSS ในโปรเจ็คใหม่ (root) โดย:
- ใช้ Tailwind เป็น styling หลัก
- ลบหรือไม่ใช้ Angular Material ใด ๆ
- ตั้ง base styles, utility, responsive breakpoints
- เตรียม class pattern สำหรับ:
  - layout
  - form
  - button
  - dialog / modal
  - loading / skeleton

เงื่อนไข:
- ng serve ต้องผ่าน
- สรุปไฟล์ที่เพิ่ม/แก้


มigrate เฉพาะ PDPA page จากโปรเจ็คเก่า -> โปรเจ็คใหม่ โดย:
- ห้ามใช้ moment / material / libphonenumber-js / html2canvas
- ปรับ UI ทั้งหมดให้ใช้ Tailwind CSS
- ถ้าเจอ logic เกี่ยวกับ date/phone ให้ refactor เป็น Web API
- ใช้ standalone component ถ้าเหมาะสม

เงื่อนไข:
- route /pdpa ต้องเปิดได้
- UI ใช้งานได้จริง (ไม่ต้อง pixel-perfect)
- ng serve ผ่าน

ส่ง:
- รายการไฟล์ที่เพิ่ม/แก้
- code snippet จุดที่ refactor จาก legacy
- วิธีทดสอบ


พยายามปรับทุกอย่างให้เหมาะสมกับโปรเจ็ค LineOA ที่เป็นมาตรฐาน และลองรับ การต่อยอดในอนาคต เพราะว่ามันจะมีแบบเปิดจาก Line กับเปิดเป็น Website