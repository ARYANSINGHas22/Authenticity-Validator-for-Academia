import React, { useState } from "react";
import SummaryCards from "../components/Admin/SummaryCards";
import InstitutionManagement from "../components/Admin/InstitutionManagement";
import RecentAlerts from "../components/Admin/RecentAlerts";
import SystemStatus from "../components/Admin/SystemStatus";
import LogoutButton from "../components/LogoutButton"; // adjust path


const alerts = [
  { type: "Suspicious Certificate Detected", message: 'Fake Harvard diploma submitted by employer "TechCorp Solutions"', time: "2 hours ago", color: "#ffecec" },
  { type: "Unusual Upload Pattern", message: 'Agency "QuickHire" uploaded 50+ certificates in 10 minutes', time: "5 hours ago", color: "#fffbe6" },
  { type: "Blacklist Match", message: "Known fraudulent employer attempted verification", time: "1 day ago", color: "#ffecec" },
];

const systemStatus = [
  { name: "OCR Processing", status: "Online", color: "green" },
  { name: "Database", status: "Online", color: "green" },
  { name: "Blockchain Registry", status: "Syncing", color: "orange" },
  { name: "Alert System", status: "Online", color: "green" },
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [institutionData, setInstitutionData] = useState([
    { id: 1, name: "Harvard University", type: "University", certificates: 1247, status: "Active" },
    { id: 2, name: "MIT", type: "University", certificates: 892, status: "Active" },
    { id: 3, name: "Stanford University", type: "University", certificates: 1034, status: "Pending Review" },
  ]);

  // Create dynamic stats
  const stats = [
    { label: "Total Institutions", value: institutionData.length, iconClass: "fa-solid fa-building-columns", color: "#f0f4ff" },
    { label: "Certificates Verified", value: 12487, iconClass: "fa-solid fa-square-check", color: "#e6fffa" },
    { label: "Fraud Alerts", value: 23, iconClass: "fa-solid fa-triangle-exclamation", color: "#ffecec", textColor: "#d32f2f" },
    { label: "Blacklist Entries", value: 89, iconClass: "fa-solid fa-ban", color: "#fff9e6", textColor: "#b26a00" },
    { label: "Pending Verifications", value: 135, iconClass: "fa-solid fa-hourglass-half", color: "#e8f0fe", textColor: "#1a73e8" }
  ];

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
      <RecentAlerts alerts={alerts} />
      <SystemStatus systemStatus={systemStatus} institutionData={institutionData} />
    </div>
  );
};

export default AdminDashboard;
