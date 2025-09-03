import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={{ backgroundColor: "rgb(8, 27, 158)", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        {/* Logo/Brand */}
        <div style={{
          color: "white",
          fontSize: "24px",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "700"
        }}>
          CertValidator
        </div>

        {/* Navigation Links */}
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <button
            onClick={() => handleNavigation("/dashboard")}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "16px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "500",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "5px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="fa-solid fa-chart-line" style={{ marginRight: "8px" }}></i>
            Dashboard
          </button>

          <button
            onClick={() => handleNavigation("/about")}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "16px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "500",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "5px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="fa-solid fa-info-circle" style={{ marginRight: "8px" }}></i>
            About
          </button>

          <button
            onClick={() => handleNavigation("/contact")}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "16px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "500",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "5px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="fa-solid fa-envelope" style={{ marginRight: "8px" }}></i>
            Contact
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: "40px", 
        boxSizing: "border-box"
      }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, padding: "70px", borderRadius: "10px" }}>
            <h1 style={{ 
              color: "white", 
              fontSize: "48px", 
              fontFamily: "'Poppins', sans-serif", 
              fontWeight: "700", 
              marginBottom: "20px" 
            }}>
              Authenticity Validator for Academia
            </h1>
            <p style={{ color: "white", fontSize: "30px" }}>
              Prevent fake certificates and ensure academic integrity with our advanced verification system.
              Trusted by universities, employers, and institutions worldwide.
            </p>
            <button
              onClick={handleLogin}
              style={{ 
                padding: "15px 30px", 
                borderRadius: "8px", 
                border: "none", 
                backgroundColor: "white", 
                cursor: "pointer", 
                marginTop: "30px", 
                fontSize: "16px",
                color: "#111111", 
                fontWeight: "600", 
                boxShadow: "4px 4px 12px rgba(0,0,0,0.2)", 
                transition: "all 0.3s ease" 
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "6px 6px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "4px 4px 12px rgba(0,0,0,0.2)";
              }}
            >
              Get Started &nbsp;&nbsp;<i className="fa-solid fa-right-long"></i>
            </button>
          </div>

          {/* Column 2 */}
          <div style={{ 
            flex: 1, 
            padding: "30px", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center" 
          }}>
            <img
              src="https://plus.unsplash.com/premium_photo-1677093906217-9420a5f16322?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero"
              style={{ 
                maxWidth: "90%", 
                borderRadius: "15px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;