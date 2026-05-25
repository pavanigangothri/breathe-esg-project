# ⚖️ TRADEOFFS.md – What Was Not Built

## 1. Authentication System
Not implemented because the focus was on data ingestion and normalization logic, not user management.

---

## 2. Background Processing (Celery / Queues)
All processing is synchronous.
Skipped to reduce complexity and focus on core workflow.

---

## 3. Real SAP / Concur API Integration
Used simulated CSV/API structure instead of real enterprise systems because:
- Requires enterprise credentials
- Outside scope of prototype

---

## 4. Advanced Role-Based Access Control
Only basic role concept assumed (Analyst/Admin).
Full RBAC system was not implemented.

---

## 5. PDF Utility Bill Parsing
Ignored because CSV representation is sufficient to demonstrate ingestion logic.

---

## Summary
These tradeoffs were made intentionally to focus on:
- Data modeling
- Normalization logic
- Audit workflow design
