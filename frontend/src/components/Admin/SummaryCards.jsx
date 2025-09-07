components/Admin/SummaryCards.jsx
import React from "react";

const SummaryCards = ({ stats, institutionData }) => {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
      {stats.map((stat, i) => {
        // ✅ If the label is Institutions, append the count
        const label =
          stat.label.toLowerCase().includes("institution")
            ? `${stat.label} (${institutionData.length})`
            : stat.label;

        return (
          <div
            key={i}
            style={{
              flex: "1 1 200px",
              background: stat.color,
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              minWidth: "200px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>{label}</div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: stat.textColor || "#333",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <i className={stat.iconClass}></i> {stat.value.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
