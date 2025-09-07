import React, { useState } from "react";
import BulkUpload from "../components/BulkUpload";
import VerificationCertificate from "../components/VerifyCertificates";
import VerificationHistory from "../components/VerificationHistory";
import "../App.css";
import LogoutButton from "../components/LogoutButton"; // adjust path

const EmployerDashboard = () => {
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

  const [popupQueue, setPopupQueue] = useState([]); // queue for popups
  const [popupResult, setPopupResult] = useState(null);

  // Single verification result handler
  const handleNewResult = (result) => {
    setVerificationHistory((prev) => [result, ...prev]);
    setPopupResult(result);
  };

  // Close popup and show next in queue if available
  const handleClosePopup = () => {
    if (popupQueue.length > 0) {
      const [next, ...rest] = popupQueue;
      setPopupResult(next);
      setPopupQueue(rest);
    } else {
      setPopupResult(null);
    }
  };

  // Bulk upload handler
  const handleBulkUpload = (entries) => {
    if (!entries || entries.length === 0) return;

    // Add all entries to history
    setVerificationHistory((prev) => [...entries, ...prev]);

    // Add all entries to popup queue and show first popup
    setPopupQueue(entries.slice(1));
    setPopupResult(entries[0]);
  };

  return (
    <div className="dashboard-container">
      {/* Header with Logout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>Employer Dashboard</h1>
        <LogoutButton />
      </div>

      {/* Side by side components */}
      <div className="dashboard-row">
        <div className="dashboard-column">
          <VerificationCertificate onResult={handleNewResult} />
        </div>
        <div className="dashboard-column">
          <BulkUpload addMultipleToHistory={handleBulkUpload} />
        </div>
      </div>

      {/* Modal Popup for Result */}
      {popupResult && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClosePopup();
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              width: "400px",
              maxWidth: "90%",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ margin: 0 }}>Verification Result</h3>
              <button
                onClick={handleClosePopup}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                ×
              </button>
            </div>

            {popupResult.found ? (
              <div
                className="card"
                style={{
                  color: "black",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                <p style={{ marginTop: "3%" }}>
                  <strong>Name:</strong> {popupResult.data.student_name}
                </p>
                <p>
                  <strong>ID:</strong> {popupResult.data.cert_id}
                </p>
                <p
                  style={{
                    color: "white",
                    backgroundColor: "green",
                    borderRadius: "15px",
                    textAlign: "center",
                    padding: "2%",
                    margin: "5%",
                  }}
                >
                  Certificate Verified!
                </p>
              </div>
            ) : (
              <div style={{ color: "red" }}>
                <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                  ❌ Verification Failed
                </p>
                <p>{popupResult.message || "Certificate not found"}</p>
              </div>
            )}

            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleClosePopup}
                style={{
                  padding: "10px 20px",
                  background: "#0033cc",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification History Table */}
      <VerificationHistory history={verificationHistory} />
    </div>
  );
};

export default EmployerDashboard;
