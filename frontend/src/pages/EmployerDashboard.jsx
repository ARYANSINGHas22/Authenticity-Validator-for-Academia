// // import React, { useState } from "react";
// // import BulkUpload from "../components/BulkUpload";
// // import VerificationCertificate from "../components/VerifyCertificates";
// // import VerificationHistory from "../components/VerificationHistory";
// // import "../App.css";
// // import LogoutButton from "../components/LogoutButton";

// // const EmployerDashboard = () => {
// //   const [activeTab, setActiveTab] = useState("verify");

// //   const [verificationHistory, setVerificationHistory] = useState([
// //     {
// //       found: true,
// //       data: {
// //         cert_id: "CERT-2025-001",
// //         student_name: "Alice Johnson",
// //       },
// //     },
// //     {
// //       found: false,
// //       message: "Certificate not found",
// //     },
// //     {
// //       found: true,
// //       data: {
// //         cert_id: "CERT-2025-002",
// //         student_name: "Bob Smith",
// //       },
// //     },
// //   ]);

// //   const [popupQueue, setPopupQueue] = useState([]);
// //   const [popupResult, setPopupResult] = useState(null);

// //   const handleNewResult = (result) => {
// //     setVerificationHistory((prev) => [result, ...prev]);
// //     setPopupResult(result);
// //   };

// //   const handleClosePopup = () => {
// //     if (popupQueue.length > 0) {
// //       const [next, ...rest] = popupQueue;
// //       setPopupResult(next);
// //       setPopupQueue(rest);
// //     } else {
// //       setPopupResult(null);
// //     }
// //   };

// //   const handleBulkUpload = (entries) => {
// //     if (!entries || entries.length === 0) return;
// //     setVerificationHistory((prev) => [...entries, ...prev]);
// //     setPopupQueue(entries.slice(1));
// //     setPopupResult(entries[0]);
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       {/* Header */}
// //       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
// //         <h1 style={{ margin: 0 }}>Employer Dashboard</h1>
// //         <LogoutButton />
// //       </div>

// //       {/* Tab Toggle Buttons */}
// //       <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
// //         <button
// //           className={`tab-button ${activeTab === "verify" ? "active" : ""}`}
// //           onClick={() => setActiveTab("verify")}
// //         >
// //           Verify Certificates
// //         </button>
// //         <button
// //           className={`tab-button ${activeTab === "bulk" ? "active" : ""}`}
// //           onClick={() => setActiveTab("bulk")}
// //         >
// //           Bulk Upload
// //         </button>
// //         <button
// //           className={`tab-button ${activeTab === "history" ? "active" : ""}`}
// //           onClick={() => setActiveTab("history")}
// //         >
// //           Verification History
// //         </button>
// //       </div>

// //       {/* Conditional Rendering */}
// //       <div>
// //         {activeTab === "verify" && <VerificationCertificate onResult={handleNewResult} />}
// //         {activeTab === "bulk" && <BulkUpload addMultipleToHistory={handleBulkUpload} />}
// //         {activeTab === "history" && <VerificationHistory history={verificationHistory} />}
// //       </div>

// //       {/* Modal for Verification Result */}
// //       {popupResult && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             backgroundColor: "rgba(0, 0, 0, 0.7)",
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //             zIndex: 9999,
// //             padding: "20px",
// //           }}
// //           onClick={(e) => {
// //             if (e.target === e.currentTarget) handleClosePopup();
// //           }}
// //         >
// //           <div
// //             style={{
// //               background: "#fff",
// //               padding: "30px",
// //               borderRadius: "10px",
// //               width: "400px",
// //               maxWidth: "90%",
// //               boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
// //               textAlign: "center",
// //             }}
// //           >
// //             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
// //               <h3>Verification Result</h3>
// //               <button
// //                 onClick={handleClosePopup}
// //                 style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#999" }}
// //               >
// //                 ×
// //               </button>
// //             </div>

// //             {popupResult.found ? (
// //               <div style={{ color: "black" }}>
// //                 <p><strong>Name:</strong> {popupResult.data.student_name}</p>
// //                 <p><strong>ID:</strong> {popupResult.data.cert_id}</p>
// //                 <p style={{ backgroundColor: "green", color: "white", borderRadius: "15px", padding: "10px" }}>
// //                   Certificate Verified!
// //                 </p>
// //               </div>
// //             ) : (
// //               <div style={{ color: "red" }}>
// //                 <p style={{ fontWeight: "bold", fontSize: "16px" }}>❌ Verification Failed</p>
// //                 <p>{popupResult.message || "Certificate not found"}</p>
// //               </div>
// //             )}

// //             <button
// //               onClick={handleClosePopup}
// //               style={{
// //                 marginTop: "20px",
// //                 padding: "10px 20px",
// //                 background: "#0033cc",
// //                 color: "#fff",
// //                 border: "none",
// //                 borderRadius: "4px",
// //                 cursor: "pointer",
// //               }}
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EmployerDashboard;



// import React, { useState } from "react";
// import BulkUpload from "../components/BulkUpload";
// import VerificationCertificate from "../components/VerifyCertificates";
// import VerificationHistory from "../components/VerificationHistory";
// import "../App.css";
// import LogoutButton from "../components/LogoutButton";

// const EmployerDashboard = () => {
//   const [activeTab, setActiveTab] = useState("verify");

//   const [verificationHistory, setVerificationHistory] = useState([
//     {
//       found: true,
//       data: {
//         cert_id: "CERT-2025-001",
//         student_name: "Alice Johnson",
//       },
//     },
//     {
//       found: false,
//       message: "Certificate not found",
//     },
//     {
//       found: true,
//       data: {
//         cert_id: "CERT-2025-002",
//         student_name: "Bob Smith",
//       },
//     },
//   ]);

//   const [popupQueue, setPopupQueue] = useState([]);
//   const [popupResult, setPopupResult] = useState(null);

//   const handleNewResult = (result) => {
//     setVerificationHistory((prev) => [result, ...prev]);
//     setPopupResult(result);
//   };

//   const handleClosePopup = () => {
//     if (popupQueue.length > 0) {
//       const [next, ...rest] = popupQueue;
//       setPopupResult(next);
//       setPopupQueue(rest);
//     } else {
//       setPopupResult(null);
//     }
//   };

//   const handleBulkUpload = (entries) => {
//     if (!entries || entries.length === 0) return;
//     setVerificationHistory((prev) => [...entries, ...prev]);
//     setPopupQueue(entries.slice(1));
//     setPopupResult(entries[0]);
//   };

//   return (
//     <div className="dashboard-container" style={{ width: "100%" }}>
//       {/* Header */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//         <h1 style={{ margin: 0 }}>Employer Dashboard</h1>
//         <LogoutButton />
//       </div>

//       {/* Tab Toggle Buttons */}
//       <div className="tab-wrapper">
//         <button
//           className={`tab-button ${activeTab === "verify" ? "active" : ""}`}
//           onClick={() => setActiveTab("verify")}
//         >
//           Verify Certificates
//         </button>
//         <button
//           className={`tab-button ${activeTab === "bulk" ? "active" : ""}`}
//           onClick={() => setActiveTab("bulk")}
//         >
//           Bulk Upload
//         </button>
//         <button
//           className={`tab-button ${activeTab === "history" ? "active" : ""}`}
//           onClick={() => setActiveTab("history")}
//         >
//           Verification History
//         </button>
//       </div>

//       {/* Conditional Rendering */}
//       <div>
//         {activeTab === "verify" && <VerificationCertificate onResult={handleNewResult} />}
//         {activeTab === "bulk" && <BulkUpload addMultipleToHistory={handleBulkUpload} />}
//         {activeTab === "history" && <VerificationHistory history={verificationHistory} />}
//       </div>

//       {/* Modal for Verification Result */}
//       {popupResult && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.7)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//             padding: "20px",
//           }}
//           onClick={(e) => {
//             if (e.target === e.currentTarget) handleClosePopup();
//           }}
//         >
//           <div
//             style={{
//               background: "#fff",
//               padding: "30px",
//               borderRadius: "10px",
//               width: "400px",
//               maxWidth: "90%",
//               boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
//               textAlign: "center",
//             }}
//           >
//             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//               <h3>Verification Result</h3>
//               <button
//                 onClick={handleClosePopup}
//                 style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#999" }}
//               >
//                 ×
//               </button>
//             </div>

//             {popupResult.found ? (
//               <div style={{ color: "black" }}>
//                 <p><strong>Name:</strong> {popupResult.data.student_name}</p>
//                 <p><strong>ID:</strong> {popupResult.data.cert_id}</p>
//                 <p style={{ backgroundColor: "green", color: "white", borderRadius: "15px", padding: "10px" }}>
//                   Certificate Verified!
//                 </p>
//               </div>
//             ) : (
//               <div style={{ color: "red" }}>
//                 <p style={{ fontWeight: "bold", fontSize: "16px" }}>❌ Verification Failed</p>
//                 <p>{popupResult.message || "Certificate not found"}</p>
//               </div>
//             )}

//             <button
//               onClick={handleClosePopup}
//               style={{
//                 marginTop: "20px",
//                 padding: "10px 20px",
//                 background: "#0033cc",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Tab Styling */}
//       <style>{`
//         .tab-wrapper {
//           display: flex;
//           width: 100%;
//           background-color: #f4f4f8;
//           border-radius: 10px;
//           overflow: hidden;
//            padding: 15px ;
//         }

//         .tab-button {
//           flex: 1;
//           padding: 15px 20px;
      
//           border: none;
//           outline: none;
//           cursor: pointer;
//           font-size: 16px;
//           font-weight: 500;
//           color: #666666;
//           transition: background-color 0.2s ease;
//         }

//         .tab-button.active {
//           background-color: #ffffff;
//           color: #000000;
//           font-weight: 600;
//         }

//         .tab-button:hover {
//           background-color: #e4e4e4;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default EmployerDashboard;






import React, { useState } from "react";
import BulkUpload from "../components/BulkUpload";
import VerificationCertificate from "../components/VerifyCertificates";
import VerificationHistory from "../components/VerificationHistory";
import LogoutButton from "../components/LogoutButton";

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState("verify");

  const [verificationHistory, setVerificationHistory] = useState([
    {
      found: true,
      data: {
        cert_id: "CERT-2025-001",
        student_name: "Alice Johnson",
      },
    },
    {
      found: false,
      message: "Certificate not found",
    },
    {
      found: true,
      data: {
        cert_id: "CERT-2025-002",
        student_name: "Bob Smith",
      },
    },
  ]);

  const [popupQueue, setPopupQueue] = useState([]);
  const [popupResult, setPopupResult] = useState(null);

  const handleNewResult = (result) => {
    setVerificationHistory((prev) => [result, ...prev]);
    setPopupResult(result);
  };

  const handleClosePopup = () => {
    if (popupQueue.length > 0) {
      const [next, ...rest] = popupQueue;
      setPopupResult(next);
      setPopupQueue(rest);
    } else {
      setPopupResult(null);
    }
  };

  const handleBulkUpload = (entries) => {
    if (!entries || entries.length === 0) return;
    setVerificationHistory((prev) => [...entries, ...prev]);
    setPopupQueue(entries.slice(1));
    setPopupResult(entries[0]);
  };

  return (
    <div className="dashboard-container" style={{ width: "100%" ,  margin: "20px"}}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ margin: 0 }}>Employer Dashboard</h1>
        <LogoutButton />
      </div>

      {/* Tab Toggle Buttons */}
      <div className="tab-wrapper">
        <button
          className={`tab-button ${activeTab === "verify" ? "active" : ""}`}
          onClick={() => setActiveTab("verify")}
        >
          Verify Certificates
        </button>
        <button
          className={`tab-button ${activeTab === "bulk" ? "active" : ""}`}
          onClick={() => setActiveTab("bulk")}
        >
          Bulk Upload
        </button>
        <button
          className={`tab-button ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          Verification History
        </button>
      </div>

      {/* Conditional Rendering */}
      <div style={{ paddingTop: "20px" }}>
        {activeTab === "verify" && <VerificationCertificate onResult={handleNewResult} />}
        {activeTab === "bulk" && <BulkUpload addMultipleToHistory={handleBulkUpload} />}
        {activeTab === "history" && <VerificationHistory history={verificationHistory} />}
      </div>

      {/* Modal for Verification Result */}
      {popupResult && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClosePopup();
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              width: "400px",
              maxWidth: "90%",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3>Verification Result</h3>
              <button
                onClick={handleClosePopup}
                style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#999" }}
              >
                ×
              </button>
            </div>

            {popupResult.found ? (
              <div style={{ color: "black" }}>
                <p><strong>Name:</strong> {popupResult.data.student_name}</p>
                <p><strong>ID:</strong> {popupResult.data.cert_id}</p>
                <p style={{ backgroundColor: "green", color: "white", borderRadius: "15px", padding: "10px" }}>
                  Certificate Verified!
                </p>
              </div>
            ) : (
              <div style={{ color: "red" }}>
                <p style={{ fontWeight: "bold", fontSize: "16px" }}>❌ Verification Failed</p>
                <p>{popupResult.message || "Certificate not found"}</p>
              </div>
            )}

            <button
              onClick={handleClosePopup}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "#0033cc",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Style for Tabs */}
      <style>{`
        .tab-wrapper {
          display: flex;
          width: 100%;
          background-color: #f4f4f8;
          padding:1%;
          border-radius: 12px;
          overflow: hidden;
          margin: 20px;
        }

        .tab-button {
          flex: 1;
          padding: 14px 0;
          border: none;
          background-color: transparent;
          font-size: 16px;
          font-weight: 500;
          color: #7a7a9d;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-button.active {
          background-color: #ffffff;
          color: #1a1a1a;
          font-weight: 600;
           border-radius: 12px;
        }

        .tab-button:first-child {
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
        }

        .tab-button:last-child {
          border-top-right-radius: 12px;
          border-bottom-right-radius: 12px;
        }

      `}</style>
    </div>
  );
};

export default EmployerDashboard;
