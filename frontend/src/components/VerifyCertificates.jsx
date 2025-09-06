import React, { useState } from "react";
import axios from "axios";

const VerificationCertificate = () => {
  const [file, setFile] = useState(null);
  const [sha256, setSha256] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generate SHA-256 hash of the uploaded file
  const generateSHA = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  // Handle file upload
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null);

    if (selectedFile) {
      const hash = await generateSHA(selectedFile);
      setSha256(hash);
    }
  };

  // Verify certificate by sending SHA to backend
  const handleVerify = async () => {
    if (!sha256) {
      alert("Please upload a certificate first!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/verify", { sha256 });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ found: false, message: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Verify Certificate
        </h1>
        <h2>
        <i className="fa-solid fa-arrow-up-from-bracket"></i>&nbsp;&nbsp;Single Certificate Verification
      </h2>
<br></br>

        {/* File Upload */}
        <div className="card"
      style={{
        width: "100%",
        padding: "30px",
        borderRadius: "10px",
        background: "#fff",
      }}
    >
         <label style={{ fontWeight: "bold" }}>Upload Certificate for Verification</label> <br></br>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
        </div>
       

        {/* Show Generated SHA */}
        {sha256 && (
          <div className="mb-4 p-3 bg-gray-50 border rounded text-sm break-words">
            <span className="font-medium">Generated SHA256:</span>
            <p className="text-gray-600">{sha256}</p>
          </div>
        )}

        {/* Verify Button */}
       <button
  onClick={handleVerify}
  disabled={loading}
  className="btn"
  style={{
    backgroundColor: "rgb(8, 27, 158)",
    color: "#fff",
    width: "100%",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer"
  }}
>
  {loading ? "Verifying..." : "Verify Certificate"}
</button>


        {/* Result Display */}
        {result && (
          <div
            className={`mt-6 p-4 rounded-lg text-center ${
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
    </div>
  );
};

export default VerificationCertificate;

