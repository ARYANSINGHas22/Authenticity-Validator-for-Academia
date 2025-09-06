import React, { useState } from "react";
import BulkUpload from "../components/BulkUpload";
import VerificationCertificate from "../components/VerifyCertificates";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const [verificationHistory, setVerificationHistory] = useState([]);

  const handleNewResult = (result) => {
    setVerificationHistory((prev) => [result, ...prev]);
  };

  const handleBulkUpload = (entries) => {
    setVerificationHistory((prev) => [...entries, ...prev]);
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>

      {/* Side by side flex container */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <VerificationCertificate onResult={handleNewResult} />
        </div>
        <div className="flex-1">
          <BulkUpload addMultipleToHistory={handleBulkUpload} />
        </div>
      </div>

      {/* Verification History */}
      <h1 className="text-xl font-semibold mt-6">Verification History</h1>
      <div className="mt-4 space-y-3">
        {verificationHistory.length === 0 && (
          <p className="text-gray-500">No verification done yet.</p>
        )}
        {verificationHistory.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg text-center ${
              item.found ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {item.found ? (
              <div>
                <p className="font-semibold">✅ Certificate Verified!</p>
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
