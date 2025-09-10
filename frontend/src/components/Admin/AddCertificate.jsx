import React, { useState } from "react";

const AddCertificate = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [certificateId, setCertificateId] = useState("");
  const [file, setFile] = useState(null);
  const [certificates, setCertificates] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!certificateId || !file) {
      alert("Please enter Certificate ID and upload a file!");
      return;
    }

    const newCertificate = {
      id: certificates.length + 1,
      certificateId,
      fileName: file.name,
    };

    setCertificates([...certificates, newCertificate]);

    // Reset
    setCertificateId("");
    setFile(null);
    setShowPopup(false);
  };

  return (
    <div
      className="card"
      style={{
        width: "100%",
        padding: "30px",
        borderRadius: "10px",
        background: "#fff",
        marginBottom: "40px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Heading + Add Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3>
          <i className="fa-solid fa-file"></i> &nbsp; Add Certificates
        </h3>
        <button
          onClick={() => setShowPopup(true)}
          style={{
            padding: "8px 16px",
            background: "#0033cc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Add
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
            }}
          >
            <h3>Add Certificate</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label>Certificate ID: </label>
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter ID"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label>Upload Certificate: </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: "10px 15px",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setShowPopup(false)}
                style={{
                  padding: "10px 15px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Always show table */}
      <table
        style={{
          width: "100%",
          marginTop: "15px",
          background: "white",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#f9f9f9", color: "black" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>#</th>
            <th style={{ padding: "10px", textAlign: "left" }}>
              Certificate ID
            </th>
            <th style={{ padding: "10px", textAlign: "left" }}>File Name</th>
          </tr>
        </thead>
        <tbody>
          {certificates.length === 0 ? (
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  padding: "15px",
                  color: "#888",
                  fontStyle: "italic",
                }}
              >
                No certificates uploaded yet.
              </td>
            </tr>
          ) : (
            certificates.map((cert) => (
              <tr key={cert.id}>
                <td style={{ padding: "10px" }}>{cert.id}</td>
                <td style={{ padding: "10px" }}>{cert.certificateId}</td>
                <td style={{ padding: "10px" }}>{cert.fileName}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddCertificate;
