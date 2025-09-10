import React, { useState, useEffect } from "react";
import axios from "axios";

const gradient = "linear-gradient(135deg, hsl(226, 70%, 55%) 0%, hsl(280, 65%, 60%) 100%)";

const VerificationCertificate = ({ onResult }) => {
  const [file, setFile] = useState(null);
  const [sha256, setSha256] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-hide popup after 3 seconds
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setResult(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const generateSHA = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null);
    if (selectedFile) {
      const hash = await generateSHA(selectedFile);
      setSha256(hash);
    }
  };

  const handleVerify = async () => {
    if (!sha256) {
      alert("Please upload a certificate first!");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/verify", { sha256 });
      setResult(res.data);
      if (onResult) onResult(res.data);
    } catch (err) {
      console.error(err);
      const errorResult = { found: false, message: "Server error" };
      setResult(errorResult);
      if (onResult) onResult(errorResult);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="w-full card"
        style={{ padding: "20px", borderRadius: "10px", background: "#fff", height: "100%" }}
      >
        <h2 className="text-lg font-semibold mb-4">
          <i className="fa-solid fa-arrow-up-from-bracket"></i> Single Certificate Verification
        </h2>

        <div
          className="mb-4"
          style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9" }}
        >
          <label className="font-bold">Upload Certificate for Verification</label>
          <br />
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full mt-2 p-2 border border-gray-300 rounded cursor-pointer"
          />
          <br /><br />
        </div>

        {sha256 && (
          <div className="mb-4 p-3 bg-gray-50 border rounded text-sm break-words">
            <span className="font-medium">Generated SHA256:</span>
            <p className="text-gray-600">{sha256}</p>
          </div>
        )}

        <button
          onClick={handleVerify}
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
            filter: loading ? "grayscale(70%)" : "none"
          }}
          onMouseEnter={e => {
            if (!loading) e.currentTarget.style.filter = "brightness(0.9)";
          }}
          onMouseLeave={e => {
            if (!loading) e.currentTarget.style.filter = "none";
          }}
        >
          {loading ? "Verifying..." : "Verify Certificate"}
        </button>
      </div>
    </div>
  );
};

export default VerificationCertificate;
