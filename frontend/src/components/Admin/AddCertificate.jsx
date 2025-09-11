import React, { useState, useEffect } from "react";

const gradient = "linear-gradient(135deg, #4169e1 0%, #9932cc 100%)";

const AddCertificate = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [certificateId, setCertificateId] = useState("");
  const [file, setFile] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");

  // ⬇️ Fetch existing certificates when component loads
  useEffect(() => {
    fetch("http://localhost:5000/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCertificates(data.certificates);
        }
      })
      .catch((err) => console.error("Error fetching certificates:", err));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!certificateId || !file) {
      alert("Please enter Certificate ID and upload a file!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result.split(",")[1];

      try {
        const response = await fetch("http://localhost:5000/api/certificates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            certificateId,
            studentName: "John Doe", // optional, you can replace
            fileBase64: base64Data,
            fileName: file.name,
          }),
        });

        const data = await response.json();
        if (data.success) {
          alert("✅ Certificate uploaded!");
          setCertificates((prev) => [...prev, data.certificate]); // ⬅️ Append new cert
          setCertificateId("");
          setFile(null);
          setShowPopup(false);
        } else {
          alert("❌ Upload failed: " + data.message);
        }
      } catch (error) {
        console.error("Error uploading certificate:", error);
        alert("Error uploading certificate.");
      }
    };
  };

  // ⬇️ Filter certificates based on search input
  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.certi_id.toLowerCase().includes(search.toLowerCase()) ||
      cert.C_name.toLowerCase().includes(search.toLowerCase()) ||
      cert.sha_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        width: "100%",
        padding: "30px",
        borderRadius: "16px",
        background: "#fff",
        marginBottom: "40px",
        boxShadow: "0 10px 30px rgb(0 0 0 / 0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            fontWeight: "700",
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#334155",
          }}
        >
          <i className="fa-solid fa-file" style={{ color: "#6366f1" }}></i>{" "}
          Manage Certificates
        </h3>
        <button
          onClick={() => setShowPopup(true)}
          style={{
            padding: "10px 16px",
            background: gradient,
            color: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 6px 14px rgb(65 105 225 / 0.6)",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "filter 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.filter = "brightness(0.9)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.filter = "brightness(1)")
          }
          type="button"
        >
          + Add
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by ID, Name, or SHA..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1.5px solid #cbd5e1",
          marginBottom: "20px",
        }}
      />

      {/* Popup Form */}
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
          onClick={(e) =>
            e.target === e.currentTarget && setShowPopup(false)
          }
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "16px",
              width: "400px",
              boxShadow: "0 10px 30px rgb(0 0 0 / 0.15)",
              position: "relative",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
                fontWeight: "700",
                fontSize: "1.5rem",
                color: "#334155",
              }}
            >
              Add Certificate
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  Certificate ID:
                </label>
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter Certificate ID"
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "1rem",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  Upload Certificate:
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "16px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  style={{
                    padding: "10px 20px",
                    background: "#e5e7eb",
                    border: "none",
                    borderRadius: "8px",
                    color: "#374151",
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    background: gradient,
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificates List */}
      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
          fontSize: "1rem",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#eef2ff" }}>
            <th style={{ padding: "14px", borderBottom: "2px solid #c7d2fe" }}>
              #
            </th>
            <th style={{ padding: "14px", borderBottom: "2px solid #c7d2fe" }}>
              Certificate ID
            </th>
            <th style={{ padding: "14px", borderBottom: "2px solid #c7d2fe" }}>
              Student Name
            </th>
            <th style={{ padding: "14px", borderBottom: "2px solid #c7d2fe" }}>
              SHA
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCertificates.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#94a3b8",
                  fontStyle: "italic",
                }}
              >
                No certificates found.
              </td>
            </tr>
          ) : (
            filteredCertificates.map((cert) => (
              <tr key={cert.id} style={{ borderBottom: "1px solid #e0e7ff" }}>
                <td style={{ padding: "14px" }}>{cert.id}</td>
                <td style={{ padding: "14px" }}>{cert.certi_id}</td>
                <td style={{ padding: "14px" }}>{cert.C_name}</td>
                <td style={{ padding: "14px" }}>{cert.sha_id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddCertificate;
