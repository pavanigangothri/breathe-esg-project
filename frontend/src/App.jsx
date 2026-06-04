import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [emissions, setEmissions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // ✅ BASE URL (LIVE BACKEND)
  const BASE_URL = "https://breathe-esg-project.onrender.com/api";

  // ================= FETCH EMISSIONS =================
  const fetchEmissions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/emissions/`);

      // 🟢 DEBUG LOG (IMPORTANT)
      console.log("EMISSIONS DATA:", response.data);

      setEmissions(response.data);
    } catch (error) {
      console.error("Error fetching emissions:", error);
    }
  };

  // ================= FETCH AUDIT LOGS =================
  const fetchAuditLogs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/audit-logs/`);

      // 🟢 DEBUG LOG (OPTIONAL BUT GOOD)
      console.log("AUDIT LOGS DATA:", response.data);

      setAuditLogs(response.data);
    } catch (error) {
      console.error("Audit log error:", error);
    }
  };

  useEffect(() => {
    fetchEmissions();
    fetchAuditLogs();
  }, []);

  // ================= FILE HANDLING =================
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post(`${BASE_URL}/upload-sap/`, formData);

      alert("CSV uploaded successfully");

      fetchEmissions();
      fetchAuditLogs();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // ================= STATUS UPDATE =================
  const updateStatus = async (id, status) => {
    try {
      await axios.post(
        `${BASE_URL}/emissions/${id}/update-status/`,
        { status }
      );

      fetchEmissions();
      fetchAuditLogs();
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  // ================= STATS =================
  const totalRecords = emissions.length;

  const approvedRecords = emissions.filter(
    (item) => item.status === "APPROVED"
  ).length;

  const failedRecords = emissions.filter(
    (item) => item.status === "FAILED"
  ).length;

  const warningRecords = emissions.filter(
    (item) => item.status === "WARNING"
  ).length;

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Breathe ESG Dashboard</h1>

      {/* STATS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", marginBottom: "30px" }}>
        <div style={{ border: "1px solid gray", padding: "20px", borderRadius: "10px", width: "180px" }}>
          <h3>Total</h3>
          <h2>{totalRecords}</h2>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px", borderRadius: "10px", width: "180px" }}>
          <h3>Approved</h3>
          <h2>{approvedRecords}</h2>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px", borderRadius: "10px", width: "180px" }}>
          <h3>Warnings</h3>
          <h2>{warningRecords}</h2>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px", borderRadius: "10px", width: "180px" }}>
          <h3>Failed</h3>
          <h2>{failedRecords}</h2>
        </div>
      </div>

      {/* UPLOAD */}
      <div style={{ border: "1px solid gray", padding: "20px", borderRadius: "10px", marginBottom: "30px", width: "400px" }}>
        <h2>Upload SAP CSV</h2>
        <input type="file" onChange={handleFileChange} />
        <br /><br />
        <button onClick={handleUpload}>Upload</button>
      </div>

      {/* EMISSIONS TABLE */}
      <h2>Emission Records</h2>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Scope</th>
            <th>Value</th>
            <th>Unit</th>
            <th>CO2e</th>
            <th>Status</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>

        <tbody>
          {emissions.map((item) => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>{item.scope}</td>
              <td>{item.activity_value}</td>
              <td>{item.activity_unit}</td>
              <td>{item.co2e_kg}</td>
              <td>{item.status}</td>

              <td>
                <button onClick={() => updateStatus(item.id, "APPROVED")}>
                  Approve
                </button>
              </td>

              <td>
                <button onClick={() => updateStatus(item.id, "REJECTED")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* AUDIT LOGS */}
      <h2 style={{ marginTop: "40px" }}>Audit Logs</h2>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Action</th>
            <th>Timestamp</th>
            <th>Emission ID</th>
          </tr>
        </thead>

        <tbody>
          {auditLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.action}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.emission_id || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;