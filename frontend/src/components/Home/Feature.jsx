import React from "react";

const Feature = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        margin: "40px auto",
      }}
    >
      {/* Section heading */}
      <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "20px" }}>
        Why Choose Our Platform?
      </h1>
      <p style={{ fontSize: "20px", lineHeight: "1.6", fontWeight: "400" }}>
        Leading-edge technology meets user-friendly design for the most reliable certificate verification experience.
      </p>

      {/* Cards row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
       
       
        <div
  style={{
    flex: 1,
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "8px 8px 24px rgba(0,0,0,0.3)",
    minHeight: "250px",      
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"  // vertically center content inside card
  }}
>
    <i style={{    fontSize: "50px", marginBottom: "10px"}} class="fa-solid fa-file"></i>
  <h4 style={{ marginBottom: "10px" }}>Instant Verification</h4>
  <p>Upload certificates and get verification results in seconds</p>
</div>

 <div
  style={{
    flex: 1,
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "8px 8px 24px rgba(0,0,0,0.3)",
    minHeight: "250px",      
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"  // vertically center content inside card
  }}
>
    <i style={{    fontSize: "50px", marginBottom: "10px"}}  class="fa-solid fa-lock"></i>
  <h4 style={{ marginBottom: "10px" }}>Secure & Trusted</h4>
  <p>Bank-grade security with blockchain-backed authenticity</p>
</div>

 <div
  style={{
    flex: 1,
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "8px 8px 24px rgba(0,0,0,0.3)",
    minHeight: "250px",      
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"  // vertically center content inside card
  }}
>
    <i style={{  fontSize: "50px", marginBottom: "10px"}} class="fa-solid fa-bolt"></i>
  <h4 style={{ marginBottom: "10px" }}>Fast Processing</h4>
  <p>AI-powered detection of tampering and fraud attempts</p>
</div>


       
      </div>
    </div>
  );
};

export default Feature;
