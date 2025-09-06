import React, { useState } from "react";
import VerifyCertificates from "../components/VerifyCertificates";
import BulkUpload from "../components/BulkUpload";
import VerificationHistory from "../components/VerificationHistory";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Employer Dashboard</h1>
      <button onClick={() => navigate("/employer/verify")}>
        Verify Certificates
      </button>
      <button onClick={() => navigate("/employer/bulk")}>
        Bulk Upload
      </button>
      <button onClick={() => navigate("/employer/history")}>
        Verification History
      </button>
    </div>
  );
};

export default EmployerDashboard;
