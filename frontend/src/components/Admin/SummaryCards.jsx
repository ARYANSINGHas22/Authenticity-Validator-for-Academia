const SummaryCards = ({ stats, institutionData }) => {
  if (!stats || stats.length === 0) {
    return <p>No stats to display</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {stats.map((stat, i) => {
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
              minHeight: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
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
              {/* Font Awesome Icon */}
              <i className={stat.iconClass}></i>
              {stat.value.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
