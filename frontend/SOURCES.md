# 📚 SOURCES.md – Research & Data Assumptions

## 📌 1. SAP Data (Fuel & Procurement)

### Research:
SAP systems commonly export data via:
- IDoc formats
- OData services
- CSV/Flat file exports

### Real-world observation:
- Column names vary by configuration
- Units are inconsistent (liters, gallons, kg)
- Plant codes require lookup tables

### Our approach:
Used CSV-based SAP export simulation.

### What would break in real world:
- Missing master data mapping tables
- Inconsistent unit standards across regions

---

## 📌 2. Utility Data (Electricity)

### Research:
Utility companies typically provide:
- PDF bills
- Customer portal CSV exports
- Smart meter APIs (advanced cases)

### Real-world observation:
- Billing cycles ≠ calendar months
- Units: kWh, MWh
- Tariff structures vary

### Our approach:
Used simplified CSV export format.

---

## 📌 3. Corporate Travel Data

### Research:
Platforms like Concur / Navan provide:
- REST APIs for trips
- Structured JSON responses

### Real-world observation:
- Flights often only provide airport codes
- Distance must be inferred
- Different travel types have different emission factors

### Our approach:
Assumed structured API-like dataset.

---

## 📌 Summary Insight
Real ESG data is:
- fragmented
- inconsistent
- multi-source
- requires normalization before reporting

This prototype simulates that complexity in a simplified system.
