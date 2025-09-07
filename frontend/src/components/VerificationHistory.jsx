
import React, { useState } from "react";
import axios from "axios";

const VerificationHistory = ({ history }) => {
  return (
    <div className="card " style={{marginTop:"2%"}}>
      <h2 className="dashboard-history m-3"><i class="fa-solid fa-arrow-rotate-left"></i>Verification History</h2>
      <div className="history-list">
        {history.length === 0 && (
          <p className="no-history">No verification done yet.</p>
        )}
        {history.map((item, index) => (
          <div
            key={index}
            className={`history-item ${item.found ? "verified" : "not-verified"}`}
          >
            {item.found ? (
              <div className="card" style={{padding:"1%"}}>
                <p style={{fontWeight: "bold" }}>Candidate Name: {item.data.student_name}</p>
                <p>Certificate ID: {item.data.cert_id}</p>
                 <p style={{color:"white", background:"rgb(8, 27, 158)", width:"12%",  borderRadius: "10px" , textAlign:"center" ,padding:"1%"}}>Certificate Verified!</p>
              </div>
            ) : (
              <div className="card" style={{padding:"1%"}}>
              <p style={{color:"white", background:"red", width:"12%",  borderRadius: "10px" , textAlign:"center" ,padding:"1%"}}>{item.message || "Certificate not found"}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default VerificationHistory;
