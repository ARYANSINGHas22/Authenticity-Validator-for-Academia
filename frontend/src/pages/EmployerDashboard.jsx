import React, { useState } from "react";

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState("verify");
  const [history, setHistory] = useState([
    {
      name: "John Doe",
      certId: "CERT-2023-001",
      university: "MIT",
      date: "2024-01-15",
      status: "verified",
    },
    {
      name: "Jane Smith",
      certId: "CERT-2023-002",
      university: "Stanford",
      date: "2024-01-14",
      status: "flagged",
    },
  ]);

  // Function to add new entry to history
  const addToHistory = (entry) => {
    setHistory([entry, ...history]); // add new entry on top
    setActiveTab("history"); // switch to history tab
  };

  // Function to add multiple entries at once
  const addMultipleToHistory = (entries) => {
    setHistory([...entries.reverse(), ...history]); // add on top
    setActiveTab("history");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "verify":
        return <VerifyCertificates addToHistory={addToHistory} />;
      case "bulk":
        return <BulkUpload addMultipleToHistory={addMultipleToHistory} />;
      case "history":
        return <VerificationHistory history={history} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontWeight: "bold" }}>Employer Dashboard</h1>
      <p style={{ color: "gray", fontSize: "18px" }}>
        Verify certificates and manage verification history
      </p>
      <br />

      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: "20px", width: "100%" }}>
        {["verify", "bulk", "history"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "15px",
              border: "1px solid #ddd",
              borderBottom:
                activeTab === tab ? "1px solid #ddd" : "1px solid #ddd",
              borderRadius: "5px 5px 0 0",
              backgroundColor: activeTab === tab ? "#fff" : "#f5f5f5",
              fontWeight: activeTab === tab ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            {{
              verify: "Verify Certificates",
              bulk: "Bulk Upload",
              history: "Verification History",
            }[tab]}
          </button>
        ))}
      </div>
      <br />

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
};

// Verify Certificates Component
const VerifyCertificates = ({ addToHistory }) => {
  const [certId, setCertId] = useState("");
  const [studentName, setStudentName] = useState("");

  const handleVerify = () => {
    if (!certId || !studentName) {
      alert("Please enter Certificate ID and Student Name!");
      return;
    }

    const newEntry = {
      name: studentName,
      certId: certId,
      university: "Unknown",
      date: new Date().toISOString().split("T")[0],
      status: "verified",
    };

    addToHistory(newEntry);
    setCertId("");
    setStudentName("");
  };

  return (
    <div
      className="card"
      style={{
        width: "100%",
        padding: "30px",
        borderRadius: "10px",
        background: "#fff",
      }}
    >
      <div className="card-body">
        <h2>
          <i className="fa-solid fa-magnifying-glass"></i> Single Certificate
          Verification
        </h2>
        <br />
        <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
          <div style={{ flex: 1 }}>
            <label
              style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}
            >
              Certificate ID
            </label>
            <input
              placeholder="Enter certificate ID"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label
              style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}
            >
              Student Name
            </label>
            <input
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <label style={{ fontWeight: "bold" }}>Upload Certificate Verification</label>
        <br />
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "100%",
            cursor: "pointer",
          }}
        />
        <div style={{ marginTop: "20px" }}>
          <button style={buttonStyle} onClick={handleVerify}>
            <i className="fa-solid fa-file"></i> Verify Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

// Bulk Upload Component
const BulkUpload = ({ addMultipleToHistory }) => {
  const [files, setFiles] = useState([]);

  const handleBulkUpload = () => {
    if (files.length === 0) {
      alert("Please select files to upload!");
      return;
    }

    const newEntries = Array.from(files).map((file, index) => ({
      name: file.name.split(".")[0], // use file name as student name
      certId: `BULK-${Date.now()}-${index}`, // generate unique cert ID
      university: "Unknown",
      date: new Date().toISOString().split("T")[0],
      status: "verified",
    }));

    addMultipleToHistory(newEntries);
    setFiles([]);
  };

  return (
    <div
      className="card"
      style={{ width: "100%", padding: "30px", borderRadius: "10px", background: "#fff" }}
    >
      <div className="card-body">
        <h2>
          <i className="fa-solid fa-arrow-up-from-bracket"></i>&nbsp;&nbsp;Bulk Certificate Upload
        </h2>
        <br />
        <label style={{ fontWeight: "bold" }}>Upload Multiple Certificates</label>
        <br />
        <input
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.csv,.zip"
          onChange={(e) => setFiles(e.target.files)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "100%",
            cursor: "pointer",
          }}
        />
        <p style={{ color: "gray", marginTop: "1%" }}>
          Supported formats: PDF, Images, CSV, ZIP files
        </p>
        <div style={{ marginTop: "20px" }}>
          <button style={buttonStyle} onClick={handleBulkUpload}>
            <i className="fa-solid fa-arrow-up-from-bracket"></i> Process Bulk Upload
          </button>
        </div>
      </div>
    </div>
  );
};

// Verification History Component
const VerificationHistory = ({ history }) => (
  <div
    className="card"
    style={{
      width: "100%",
      padding: "30px",
      borderRadius: "10px",
      background: "#fff",
    }}
  >
    <h2>
      <i className="fa-solid fa-clock-rotate-left"></i> Verification History
    </h2>
    {history.map((entry, index) => (
      <div
        key={index}
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        <div style={{ fontWeight: "bold" }}>{entry.name}</div>
        <div>
          {entry.certId} • {entry.university}
        </div>
        <div>{entry.date}</div>
        <div
          style={{
            display: "inline-block",
            marginTop: "5px",
            padding: "4px 10px",
            borderRadius: "12px",
            backgroundColor: entry.status === "verified" ? "#0026ff" : "#f44336",
            color: "#fff",
            fontSize: "12px",
            textTransform: "capitalize",
          }}
        >
          {entry.status}
        </div>
      </div>
    ))}
  </div>
);

// Shared Styles
const inputStyle = {
  marginRight: "10px",
  padding: "10px",
  width: "100%",
  borderRadius: "5px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
};

const buttonStyle = {
  backgroundColor: "rgb(8, 27, 158)",
  color: "#fff",
  width: "100%",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

export default EmployerDashboard;




