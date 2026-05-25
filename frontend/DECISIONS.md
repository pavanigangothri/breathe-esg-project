# 🧠 DECISIONS.md – Design Decisions

## 📌 1. SAP Data Handling
I assumed SAP exports are CSV-based extracts (not full IDoc/BAPI integration) because:
- Real SAP integrations require enterprise access
- CSV is the most realistic prototype approach

Handled:
- inconsistent column names
- mixed units
- missing values

Ignored:
- full SAP OData/BAPI integration due to complexity

---

## 📌 2. Utility Data Approach
I used a simplified CSV-style utility bill format instead of PDF parsing or portal scraping because:
- PDF parsing adds unnecessary complexity for prototype
- CSV reflects common export formats from energy portals

Handled:
- kWh values
- billing periods
- emission factor mapping

---

## 📌 3. Travel Data Approach
Assumed structured API-like input (similar to Concur/Navan exports).

Handled:
- flight distance estimation via airport codes
- hotel nights → emission estimation
- transport categories

Ignored:
- real-time API authentication with travel providers

---

## 📌 4. Why Django + React
- Django: fast backend API development, strong ORM, admin support
- React: clean dashboard UI for analyst workflow

---

## 📌 5. Simplifications
- No authentication system (focus on ingestion logic)
- No async job queue (Celery not used)
- No external SAP/Concur integration

---

## ❓ If I had more time I would ask PM:
- Should we support real SAP IDoc integration?
- Should emissions be recalculated historically if factors change?
- Do analysts need role-based approval flows?
