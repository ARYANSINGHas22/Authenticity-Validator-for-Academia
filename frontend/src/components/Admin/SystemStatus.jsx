// components/Admin/SystemStatus.jsx
import React from "react";

const SystemStatus = ({ systemStatus }) => {
  return (
    <div className="card" style={{
      width: "100%",
      padding: "30px",
      borderRadius: "10px",
      background: "#fff",
      marginBottom: "40px",
    }}>
      <h2><i className="fa-solid fa-server"></i> System Status</h2>
      <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f9f9f9", textAlign: "left" }}>
            <th style={{ padding: "10px" }}>Service</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {systemStatus.map((sys, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{sys.name}</td>
              <td>
                <span style={{
                  color: "#fff",
                  background: sys.color,
                  padding: "4px 8px",
                  borderRadius: "5px",
                }}>{sys.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <a href="#" style={{ color: "#0033cc", textAlign: "center", textDecoration: "none" }}>View System Logs</a>
    </div>
  );
};

export default SystemStatus;
