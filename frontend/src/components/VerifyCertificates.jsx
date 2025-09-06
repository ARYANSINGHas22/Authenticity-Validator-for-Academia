import React, { useState } from "react";

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
      <h2>
        <i className="fa-solid fa-magnifying-glass"></i> Single Certificate
        Verification
      </h2>
      <br />
      <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: "bold" }}>Certificate ID</label>
          <input
            placeholder="Enter certificate ID"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: "bold" }}>Student Name</label>
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
        style={inputFileStyle}
      />
      <div style={{ marginTop: "20px" }}>
        <button style={buttonStyle} onClick={handleVerify}>
          <i className="fa-solid fa-file"></i> Verify Certificate
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const inputFileStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "100%",
  cursor: "pointer",
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

export default VerifyCertificates;
