import React, { useState } from "react";

const BulkUpload = ({ addMultipleToHistory }) => {
  const [files, setFiles] = useState([]);

  const handleBulkUpload = () => {
    if (files.length === 0) {
      alert("Please select files to upload!");
      return;
    }

    const newEntries = Array.from(files).map((file, index) => ({
      name: file.name.split(".")[0],
      certId: `BULK-${Date.now()}-${index}`,
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
      style={{
        width: "100%",
        padding: "30px",
        borderRadius: "10px",
        background: "#fff",
      }}
    >
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
        style={inputFileStyle}
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
  );
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

export default BulkUpload;
