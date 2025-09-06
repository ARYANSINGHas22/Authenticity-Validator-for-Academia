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
      className="w-full card"
      style={{ padding: "20px", borderRadius: "10px", background: "#fff",height:"100%" }}
    >
      <h2 className="text-lg font-semibold mb-4">
        <i className="fa-solid fa-arrow-up-from-bracket"></i> Bulk Certificate Upload
      </h2>

      <div className="mb-4" style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9" }}>
        <label className="font-bold">Upload Multiple Certificates</label>
        <br />
        <input
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.csv,.zip"
          onChange={(e) => setFiles(e.target.files)}
          className="block w-full mt-2 p-2 border border-gray-300 rounded cursor-pointer"
        />
        <p className="text-gray-500 mt-1 text-sm">
          Supported formats: PDF, Images, CSV, ZIP files
        </p>
      </div>

      <button
        onClick={handleBulkUpload}
        className="w-full py-2 bg-blue-800 text-white rounded"
      >
        Process Bulk Upload
      </button>
    </div>
  );
};

export default BulkUpload;
