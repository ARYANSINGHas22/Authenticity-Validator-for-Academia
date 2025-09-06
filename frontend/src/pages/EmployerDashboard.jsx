import React, { useState } from "react";
import BulkUpload from "../components/BulkUpload";
import VerificationCertificate from "../components/VerifyCertificates";
import "../App.css";

const EmployerDashboard = () => {
// Dummy data in Verification History
  const [verificationHistory, setVerificationHistory] = useState([
    {
      found: true,
      data: {
        cert_id: "CERT-2025-001",
        student_name: "Alice Johnson",
      },
    },
    {
      found: false,
      message: "Certificate not found",
    },
    {
      found: true,
      data: {
        cert_id: "CERT-2025-002",
        student_name: "Bob Smith",
      },
    },
  ]);


  const handleNewResult = (result) => {
    setVerificationHistory((prev) => [result, ...prev]);
  };

  const handleBulkUpload = (entries) => {
    setVerificationHistory((prev) => [...entries, ...prev]);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Employer Dashboard</h1>

      {/* Side by side components */}
      <div className="dashboard-row">
        <div className="dashboard-column">
          <VerificationCertificate onResult={handleNewResult} />
        </div>
        <div className="dashboard-column">
          <BulkUpload addMultipleToHistory={handleBulkUpload} />
        </div>
      </div>

      {/* Verification History */}
      <h1 className="dashboard-history-title">Verification History</h1>
      <div className="history-list">
        {verificationHistory.length === 0 && (
          <p className="no-history">No verification done yet.</p>
        )}
        {verificationHistory.map((item, index) => (
          <div
            key={index}
            className={`history-item ${
              item.found ? "verified" : "not-verified"
            }`}
          >
            {item.found ? (
              <div>
                <p>✅ Certificate Verified!</p>
                <p>Certificate ID: {item.data.cert_id}</p>
                <p>Candidate Name: {item.data.student_name}</p>
              </div>
            ) : (
              <p>❌ {item.message || "Certificate not found"}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;
