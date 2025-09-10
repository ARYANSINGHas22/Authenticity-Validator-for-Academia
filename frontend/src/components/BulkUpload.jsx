import React, { useState } from "react";
import axios from "axios";

const gradient = "linear-gradient(135deg, hsl(226, 70%, 55%) 0%, hsl(280, 65%, 60%) 100%)";

const BulkUpload = ({ addMultipleToHistory }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Generate SHA256 for each file
  const generateSHA = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleBulkUpload = async () => {
    if (files.length === 0) {
      alert("Please select files to upload!");
      return;
    }
    try {
      setLoading(true);

      // Generate hashes for each file
      const fileHashes = await Promise.all(
        Array.from(files).map(async (file) => {
          const hash = await generateSHA(file);
          return { fileName: file.name, sha256: hash };
        })
      );

      // Send all hashes to backend
      const res = await axios.post("http://localhost:5000/api/verify-bulk", {
        certificates: fileHashes,
      });

      // Add to history (expects array of results)
      if (res.data && Array.isArray(res.data)) {
        addMultipleToHistory(res.data);
      } else {
        alert("Unexpected server response");
      }

      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("Bulk verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full card"
      style={{
        padding: "20px",
        borderRadius: "10px",
        background: "#fff",
        height: "100%",
      }}
    >
      <h2 className="text-lg font-semibold mb-4">
        <i className="fa-solid fa-arrow-up-from-bracket"></i> Bulk Certificate Upload
      </h2>

      <div
        className="mb-4"
        style={{
          padding: "20px",
          borderRadius: "10px",
          background: "#f9f9f9",
        }}
      >
        <label className="font-bold">Upload Multiple Certificates</label>
        <br />
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="block w-full mt-2 p-2 border border-gray-300 rounded cursor-pointer"
        />
        <p className="text-gray-500 mt-1 text-sm">
          Supported formats: PDF, Images, CSV, ZIP
        </p>
      </div>

      <button
        onClick={handleBulkUpload}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px 0",
          background: gradient,
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px",
          fontWeight: "600",
          transition: "filter 0.3s ease",
          filter: loading ? "grayscale(70%)" : "none",
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.filter = "brightness(0.9)";
        }}
        onMouseLeave={(e) => {
          if (!loading) e.currentTarget.style.filter = "none";
        }}
      >
        {loading ? "Processing..." : "Process Bulk Upload"}
      </button>
    </div>
  );
};

export default BulkUpload;
