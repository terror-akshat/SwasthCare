# 🏥 SwasthCare — Hospital Management System

**Live Demo:** https://grand-mooncake-4b0873.netlify.app/  
**Test Login:**  
- **Admin:** `user1 / 123456`  
- **Master:** `master1 / 123456`

A full-stack hospital management system to streamline patient care and hospital operations with **role-based access** (Admin, Master), **OPD/IPD**, **Ward/Bed management**, **Billing**, and **document uploads**.

---

## ✨ Features

### Authentication & Authorization
- JWT-based login with token verification
- Role-based routing: `ProtectedRoute` (Admin+) and `MasterRoute` (Master only)
- Unauthorized access redirection

### Patient Management
- Create & update patient profiles
- OPD & IPD records
- Upload patient history, lab reports, medical documents
- View patient history & lab reports

### Bed & Ward Management
- Assign/shift/discharge beds
- **Master only:** Create wards, maintain real-time available bed counts

### Billing
- Auto-generate treatment & stay bills
- View printable bill

### Print & Reports
- Printable OPD records
- Full report history + detailed lab reports

### Error Handling
- 404/Not Found
- Access denied / Unauthorized

---

## 👤 Roles & Permissions

| Action / Module              | Admin | Master |
|-----------------------------|:-----:|:------:|
| Create/Update Patients      |  ✅   |   ✅   |
| OPD/IPD Forms               |  ✅   |   ✅   |
| Upload Reports/Documents    |  ✅   |   ✅   |
| Bed Assign/Shift/Discharge  |  ✅   |   ✅   |
| Create Wards                |  ❌   |   ✅   |
| Update Ward Bed Counts      |  ❌   |   ✅   |
| Billing (Generate/View)     |  ✅   |   ✅   |

---

## 🧱 Tech Stack

- **Frontend:** React, React Router, Axios, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT (access token)
- **Uploads:** Cloudinary / dedicated upload routes
- **Deployment:** Netlify (frontend) + any Node host (backend)
