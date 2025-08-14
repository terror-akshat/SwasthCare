# 🏥 SwasthCare — Hospital Management System

**Live Demo:** [SwasthCare Frontend](https://grand-mooncake-4b0873.netlify.app/)  
**Test Login:**  
- **Admin:** `user1 / 123456`  
- **Master:** `master1 / 123456`

A full-stack hospital management system to streamline patient care and hospital operations with **role-based access** (Admin, Master), **OPD/IPD**, **Ward/Bed management**, **Billing**, **document uploads**, and **Redis-powered caching** for faster API responses.

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
- **Optimized API responses** using **Redis caching** for frequently accessed patient data — reducing DB queries by up to **88%**

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

### Performance
- **Redis** for caching GET endpoints and improving read performance  
- **Jest** for backend unit & API testing

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
- **Database:** MongoDB Atlas (Mongoose)  
- **Caching:** Redis (in-memory caching for high-speed data retrieval)  
- **Auth:** JWT (access token)  
- **Uploads:** Cloudinary / dedicated upload routes  
- **Testing:** Jest (unit + integration testing)  
- **Deployment:** Netlify (frontend) + Node host / Docker (backend)

---

## 📈 Performance Benchmark

| Endpoint         | Without Redis | With Redis | Improvement |
|------------------|--------------|-----------|-------------|
| `/get-patient`   | 50 ms        | 6 ms      | **~88% faster** |
| API Avg Latency  | 78 ms        | 59 ms     | **~24% faster** |
