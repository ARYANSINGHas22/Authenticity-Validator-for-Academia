import React, { useState, useEffect } from "react";
import axios from "axios";
import SummaryCards from "../components/Admin/SummaryCards";
import InstitutionManagement from "../components/Admin/InstitutionManagement";
import RecentAlerts from "../components/Admin/RecentAlerts";
import SystemStatus from "../components/Admin/SystemStatus";
import LogoutButton from "../components/LogoutButton";
import AddCertificate from "../components/Admin/AddCertificate";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [institutionData, setInstitutionData] = useState([]);
  const [stats, setStats] = useState([]);
  const [systemStatus, setSystemStatus] = useState([]);

const alerts = [
  { type: "Suspicious Certificate Detected", message: 'Fake Harvard diploma submitted by employer "TechCorp Solutions"', time: "2 hours ago", color: "#ffecec" },
  { type: "Unusual Upload Pattern", message: 'Agency "QuickHire" uploaded 50+ certificates in 10 minutes', time: "5 hours ago", color: "#fffbe6" },
  { type: "Blacklist Match", message: "Known fraudulent employer attempted verification", time: "1 day ago", color: "#ffecec" },
];

  // Fetch institutions and summary stats
  const fetchData = () => {
    axios.get("http://localhost:5000/api/institutions")
      .then((res) => setInstitutionData(res.data))
      .catch((err) => console.error("Error fetching institutions:", err));

    axios.get("http://localhost:5000/api/stats")
      .then((res) => {
        const data = res.data;
        setStats([
          { label: "Total Institutions", value: data.totalInstitutions, iconClass: "fa-solid fa-building-columns", color: "#f0f4ff" },
          { label: "Suspended Institutions", value: data.suspendedInstitutions, iconClass: "fa-solid fa-ban", color: "#fff9e6", textColor: "#b26a00" },
          { label: "Total Certificates", value: data.totalCertificates, iconClass: "fa-solid fa-square-check", color: "#e6fffa" },
        ]);
      })
      .catch((err) => console.error("Error fetching stats:", err));
  };

  // Fetch system service status
  const fetchSystemStatus = () => {
    axios.get("http://localhost:5000/api/system-status")
      .then((res) => setSystemStatus(res.data))
      .catch((err) => {
        console.error("Error fetching system status:", err);
        // If backend fails, show all services offline
        setSystemStatus([
          { name: "OCR Processing", status: "Offline", color: "red" },
          { name: "Database", status: "Offline", color: "red" },
          { name: "Blockchain Registry", status: "Offline", color: "red" },
          { name: "Alert System", status: "Offline", color: "red" },
        ]);
      });
  };

  // Initial fetch and polling every 5 seconds
  useEffect(() => {
    fetchData();
    fetchSystemStatus();

    const interval = setInterval(() => {
      fetchData();
      fetchSystemStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
  <LogoutButton />
</div>

      <SummaryCards stats={stats} institutionData={institutionData} />

      <InstitutionManagement
        institutionData={institutionData}
        setInstitutionData={setInstitutionData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <AddCertificate/>
      <br></br>
      <RecentAlerts alerts={alerts} />

      <SystemStatus systemStatus={systemStatus} institutionData={institutionData} />
    </div>
  );
};

export default AdminDashboard;
