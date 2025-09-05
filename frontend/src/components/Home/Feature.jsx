import React from "react";

// Icon Components
const Icons = {
  User: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Fingerprint: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/>
      <path d="M5 19.5C5.5 18 6.5 17 7.5 16.5"/>
      <path d="M8 22a4 4 0 0 1 0-8 4 4 0 0 1 0 8"/>
      <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/>
      <path d="M14 13.12c0 2.38 0 6.38-1 8.88"/>
      <path d="M17 16a3 3 0 0 0-3-3"/>
      <path d="M21 16a7 7 0 0 0-7-7"/>
    </svg>
  ),
  Download: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Share: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,18 15,12 9,6"/>
    </svg>
  )
};

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
      {/* Getting Started Section */}
      <div style={{
        backgroundColor: "#f8f9fa",
        padding: "60px 20px",
        marginBottom: "60px",
        borderRadius: "16px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px"
          }}>
            {/* Left side - Text */}
            <div style={{
              flex: "0 0 300px",
              textAlign: "left"
            }}>
              <h2 style={{
                fontSize: "48px",
                fontWeight: "700",
                color: "#212529",
                lineHeight: "1.2",
                margin: "0"
              }}>
                Getting started<br/>
                is quick and<br/>
                easy
              </h2>
            </div>

            {/* Right side - Steps */}
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px"
            }}>
              {/* Step 1 */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                flex: 1
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#e3f2fd",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px"
                }}>
                  <Icons.User />
                </div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#212529",
                  margin: "0"
                }}>
                  Register Yourself
                </h3>
              </div>

              {/* Arrow */}
              <div style={{
                color: "#6c757d",
                margin: "0 8px"
              }}>
                <Icons.Arrow />
              </div>

              {/* Step 2 */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                flex: 1
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#ffebee",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px"
                }}>
                  <Icons.Fingerprint />
                </div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#212529",
                  margin: "0"
                }}>
                  Login Securely
                </h3>
              </div>

              {/* Arrow */}
              <div style={{
                color: "#6c757d",
                margin: "0 8px"
              }}>
                <Icons.Arrow />
              </div>

              {/* Step 3 */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                flex: 1
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#e8f5e8",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px"
                }}>
                  <Icons.Download />
                </div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#212529",
                  margin: "0"
                }}>
                  Upload Documents
                </h3>
              </div>

              {/* Arrow */}
              <div style={{
                color: "#6c757d",
                margin: "0 8px"
              }}>
                <Icons.Arrow />
              </div>

              {/* Step 4 */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                flex: 1
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#f3e5f5",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px"
                }}>
                  <Icons.Share />
                </div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#212529",
                  margin: "0"
                }}>
                  Get Documents Verified  
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            justifyContent: "center"
          }}
        >
          <i style={{ fontSize: "50px", marginBottom: "10px" }} className="fa-solid fa-file"></i>
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
            justifyContent: "center"
          }}
        >
          <i style={{ fontSize: "50px", marginBottom: "10px" }} className="fa-solid fa-lock"></i>
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
            justifyContent: "center"
          }}
        >
          <i style={{ fontSize: "50px", marginBottom: "10px" }} className="fa-solid fa-bolt"></i>
          <h4 style={{ marginBottom: "10px" }}>Fast Processing</h4>
          <p>AI-powered detection of tampering and fraud attempts</p>
        </div>
      </div>
    </div>
  );
};

export default Feature;