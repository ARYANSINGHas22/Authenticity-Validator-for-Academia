// components/Admin/InstitutionManagement.jsx
import React from "react";

const InstitutionManagement = ({ institutionData, searchTerm, setSearchTerm }) => {
  const filteredInstitutions = institutionData.filter(inst =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card" style={{
      width: "100%",
      padding: "30px",
      borderRadius: "10px",
      background: "#fff",
      marginBottom: "40px",
    }}>
      <h2><i className="fa-solid fa-building-columns"></i> Institution Management</h2>

      <div style={{ display: "flex", alignItems: "center", marginTop: "10px", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search institutions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px" }}
        />
        <button style={{ padding: "8px 12px", cursor: "pointer", border: "none", borderRadius: "4px", color: "#fff", background: "#0033cc" }}>
          <i className="fa-solid fa-magnifying-glass" style={{ marginRight: "5px" }}></i> Search
        </button>
        <button style={{
          padding: "8px 12px",
          background: "#0033cc",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}>+ Add Institution</button>
      </div>

      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f9f9f9", textAlign: "left" }}>
            <th style={{ padding: "10px" }}>Institution Name</th>
            <th>Type</th>
            <th>Certificates</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInstitutions.map((inst, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{inst.name}</td>
              <td>{inst.type}</td>
              <td>{inst.certificates.toLocaleString()}</td>
              <td>
                <span style={{
                  background: inst.status === "Active" ? "#e6fff2" : "#fff9e6",
                  color: inst.status === "Active" ? "green" : "#b26a00",
                  padding: "4px 8px",
                  borderRadius: "5px",
                }}>{inst.status}</span>
              </td>
              <td>
                <a href="#" style={{ color: "#0033cc", marginRight: "10px", textDecoration: "none" }}>Edit</a>
                <a href="#" style={{ color: "red", textDecoration: "none" }}>Suspend</a>
              </td>
            </tr>
          ))}
          {filteredInstitutions.length === 0 && (
            <tr>
              <td colSpan="5" style={{ padding: "10px", textAlign: "center", color: "#999" }}>
                No institutions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InstitutionManagement;
