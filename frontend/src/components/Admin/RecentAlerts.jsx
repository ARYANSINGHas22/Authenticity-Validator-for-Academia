// components/Admin/RecentAlerts.jsx
import React from "react";

const RecentAlerts = ({ alerts }) => {
  return (
    <div className="card" style={{
      width: "100%",
      padding: "30px",
      borderRadius: "10px",
      background: "#fff",
      marginBottom: "40px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

    }}>
      <h2><i className="fa-solid fa-triangle-exclamation"></i> Recent Alerts</h2>
      {alerts.map((alert, i) => (
        <div key={i} style={{
          background: alert.color,
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "10px",
        }}>
          <strong>{alert.type}</strong>
          <div>{alert.message}</div>
          <small style={{ color: "#999" }}>{alert.time}</small>
        </div>
      ))}
      <a href="#" style={{ color: "#0033cc", textAlign: "center", textDecoration: "none" }}>View All Alerts</a>
    </div>
  );
};

export default RecentAlerts;




