# 📊 MODEL.md – Data Model Design

## 🧠 Overview
This system is designed to ingest, normalize, and audit ESG emissions data from multiple enterprise sources such as SAP, utilities, and corporate travel platforms.

The main goal is to handle messy real-world data and make it consistent for audit approval.

---

## 🗂️ Core Entities

### 1. EmissionRecord
Represents a normalized emission entry.

Fields:
- id (Primary Key)
- company_id (Multi-tenant support)
- source_type (SAP / UTILITY / TRAVEL)
- activity_type (fuel, electricity, flight, hotel, transport)
- raw_value (original input value)
- normalized_value (converted CO2 equivalent)
- unit (liters, kWh, km, etc.)
- emission_factor_used
- scope (Scope 1 / Scope 2 / Scope 3)
- status (PENDING / APPROVED / REJECTED)
- confidence_flag (VALID / WARNING / FAILED)
- source_reference (file name / API / upload reference)
- created_at
- updated_at

---

### 2. AuditLog
Tracks every action performed on records.

Fields:
- id
- record_id
- action (CREATED / UPDATED / APPROVED / REJECTED)
- performed_by
- timestamp
- notes

---

### 3. User (optional simplified model)
- id
- name
- role (ANALYST / ADMIN)

---

## 🏢 Multi-Tenancy Design
Each record includes `company_id` to isolate data per client organization.

---

## 🔄 Data Flow

1. Raw data is uploaded (CSV/API/manual)
2. Data is parsed into raw records
3. Normalization engine converts values into CO2 equivalent
4. Analyst reviews flagged records
5. Approved records are locked for audit

---

## ⚖️ Design Decisions
- Store both raw + normalized values for traceability
- Keep audit logs immutable
- Separate ingestion from approval workflow

---

## 📌 Key Focus
This model prioritizes:
- Auditability
- Traceability
- Real-world messy data handling
- Multi-source normalization
