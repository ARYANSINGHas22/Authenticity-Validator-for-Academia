
import React, { useState } from "react";
import axios from "axios";

const VerificationCertificate = ({ onResult }) => {
  const [file, setFile] = useState(null);
  const [sha256, setSha256] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <div
      className="w-full card"
      style={{ padding: "20px", borderRadius: "10px", background: "#fff",height:"100%" }}
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
        <br></br><br></br>
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
        className="w-full py-2 bg-blue-800 text-white rounded"
      >
        {loading ? "Verifying..." : "Verify Certificate"}
      </button>

      {result && (
        <div
          className={`mt-4 p-4 rounded text-center ${
            result.found ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {result.found ? (
            <div>
              <p className="font-semibold">✅ Certificate Verified!</p>
              <p>Certificate ID: {result.data.cert_id}</p>
              <p>Candidate Name: {result.data.student_name}</p>
            </div>
          ) : (
            <p>❌ {result.message || "Certificate not found"}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerificationCertificate;
