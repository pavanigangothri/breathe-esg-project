# 🌍 Breathe ESG – Emissions Ingestion & Audit System

## 📌 Overview
Breathe ESG is a full-stack prototype that ingests emissions and activity data from multiple enterprise sources (SAP, utilities, and corporate travel), normalizes the data, and provides an analyst review workflow before audit approval.

The system focuses on handling real-world messy ESG data, not just CRUD operations.

---

## 🚀 Features
- 📥 SAP CSV data ingestion
- ⚡ Emission data normalization engine
- ⚠️ Data validation (VALID / WARNING / FAILED)
- ✅ Analyst approval / rejection workflow
- 🧾 Audit logging for every action
- 📊 Dashboard for emissions overview
- 🔄 REST API backend (Django REST Framework)
- 🎨 React-based frontend UI

---

## 🏗️ Tech Stack

**Frontend:**
- React.js (Vite)
- Axios

**Backend:**
- Django
- Django REST Framework

**Database:**
- SQLite (development)

**Language:**
- Python, JavaScript

---

## 📂 Project Structure

breathe-esg-project/
│── backend/        # Django backend APIs
│── frontend/       # React frontend UI
│── MODEL.md        # Data model design
│── DECISIONS.md    # Design decisions
│── TRADEOFFS.md    # What was not built and why
│── SOURCES.md      # Research on real-world data formats

---

## 🔗 Live Deployment

- 🌐 Frontend: https://breathe-esg-project.vercel.app/
- ⚙️ Backend: https://breathe-esg-project.onrender.com

---

## ⚙️ How to Run Locally

### 🔧 Backend Setup
cd backend
pip install -r requirements.txt
python manage.py runserver

Backend runs at:
http://127.0.0.1:8000/

---

### 🎨 Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173/

---

## 🔌 API Endpoints

- GET /api/emissions/ → Fetch emissions data
- POST /api/upload-sap/ → Upload SAP CSV file
- POST /api/emissions/<id>/update-status/ → Update approval status
- GET /api/audit-logs/ → Fetch audit trail

---

## 🧠 Key Design Idea

This system is designed around the reality that ESG data is:

- messy
- inconsistent across sources
- requires normalization before analysis
- must be audit-ready for compliance

---

## ⚖️ Tradeoffs

- No authentication system (focus on core ingestion logic)
- No real SAP/Concur API integration (CSV simulation used)
- No background job processing (synchronous processing only)
- Simplified single-organization model

---

## 📊 Data Sources (Simulated)

- SAP exports → CSV-based fuel/procurement data
- Utility data → simplified billing-style CSV format
- Travel data → structured flight/travel records

---

## 👨‍💻 Author

Built as part of a Full Stack Internship Assignment  
Focus: Data ingestion, normalization, and audit workflow design

---

## 📌 Status

✔ Working full-stack prototype  
✔ Backend + frontend integrated  
✔ Fully deployed (Vercel + Render)  
✔ Submission ready 🚀
