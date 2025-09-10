import React from "react";

// Icon Components with white fill and black stroke, no background circle
const Icons = {
  User: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Lock: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Download: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Share: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  Arrow: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,18 15,12 9,6" />
    </svg>
  ),
};

const gradient = "linear-gradient(135deg, hsl(226, 70%, 55%) 0%, hsl(280, 65%, 60%) 100%)";

const Footer = () => (
  <footer style={{
    background: "#212529",
    color: "#adb5bd",
    padding: "50px 0 20px 0",
    fontFamily: "sans-serif"
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '30px'
    }}>
      <div style={{ flex: '2', minWidth: '250px' }}>
        <h5 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '15px' }}>Authenticity Validator</h5>
        <p style={{ lineHeight: '1.6', fontSize: '14px' }}>
          A secure platform for verifying digital documents and preventing fraud.
        </p>
      </div>

      <div style={{ flex: '1', minWidth: '150px' }}>
        <h5 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '15px' }}>Quick Links</h5>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
          <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#adb5bd', textDecoration: 'none' }}>Home</a></li>
          <li style={{ marginBottom: '10px' }}><a href="about" style={{ color: '#adb5bd', textDecoration: 'none' }}>About Us</a></li>
          <li><a href="contact" style={{ color: '#adb5bd', textDecoration: 'none' }}>Contact</a></li>
        </ul>
      </div>

      <div style={{ flex: '1', minWidth: '150px' }}>
        <h5 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '15px' }}>Legal</h5>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
          <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#adb5bd', textDecoration: 'none' }}>Privacy Policy</a></li>
          <li><a href="#" style={{ color: '#adb5bd', textDecoration: 'none' }}>Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div style={{
      textAlign: 'center',
      paddingTop: '30px',
      marginTop: '40px',
      borderTop: '1px solid #343a40',
      fontSize: '14px'
    }}>
      <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Authenticity Validator. All Rights Reserved.</p>
    </div>
  </footer>
);

const Feature = () => (
  <>
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
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px"
          }}>
            {/* Left side text */}
            <div style={{ flex: "0 0 300px", textAlign: "left" }}>
              <h2 style={{
                fontSize: "48px",
                fontWeight: "700",
                color: "#212529",
                lineHeight: "1.2",
                margin: 0
              }}>
                Getting started<br />
                is quick and<br />
                easy
              </h2>
            </div>

            {/* Right side steps with icons */}
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px"
            }}>
              {[
                { Icon: Icons.User, label: "Register Yourself" },
                { Icon: Icons.Lock, label: "Login Securely" },
                { Icon: Icons.Download, label: "Upload Documents" },
                { Icon: Icons.Share, label: "Get Documents Verified" }
              ].map(({ Icon, label }, index) => (
                <React.Fragment key={index}>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    flex: 1
                  }}>
                    {/* Icon with no background */}
                    <Icon />
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#212529",
                      margin: "12px 0 0 0"
                    }}>
                      {label}
                    </h3>
                  </div>
                  {index < 3 && (
                    <div style={{
                      color: "#6c757d",
                      margin: "0 8px"
                    }}>
                      <Icons.Arrow />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section (unchanged) */}
      <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "20px" }}>
        Why Choose Our Platform?
      </h1>
      <p style={{ fontSize: "20px", lineHeight: "1.6", fontWeight: "400" }}>
        Leading-edge technology meets user-friendly design for the most reliable certificate verification experience.
      </p>

      {/* Cards row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "0 20px",
      }}>
        {[
          { iconClass: "fa-file", title: "Instant Verification", desc: "Upload certificates and get verification results in seconds" },
          { iconClass: "fa-lock", title: "Secure & Trusted", desc: "Bank-grade security with blockchain-backed authenticity" },
          { iconClass: "fa-bolt", title: "Fast Processing", desc: "AI-powered detection of tampering and fraud attempts" }
        ].map(({ iconClass, title, desc }, i) => (
          <div key={i} style={{
            flex: 1,
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "8px 8px 24px rgba(0,0,0,0.3)",
            minHeight: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: gradient,
            color: "#fff"
          }}>
            <i style={{ fontSize: "50px", marginBottom: "10px" }} className={`fa-solid ${iconClass}`}></i>
            <h4 style={{ marginBottom: "10px" }}>{title}</h4>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </>
);

export default Feature;
