// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleDashboardClick = () => {
    // Get user role from localStorage, context, or wherever you store it
    const userRole = localStorage.getItem('userRole'); // or sessionStorage, context, etc.
    
    if (userRole === 'admin' || userRole === 'administrator') {
      navigate('/admin');
    } else if (userRole === 'employer') {
      navigate('/employer');
    } else {
      // If no role found, redirect to login
      navigate('/login');
    }
  };

  const navButtonStyle = {
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
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "rgb(8, 27, 158)", // ✅ fixed solid blue background
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
      }}
    >
      {/* Logo/Brand */}
      <div
        style={{
          color: "white",
          fontSize: "24px",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "700"
        }}
      >
        CertValidator
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <button
          onClick={handleDashboardClick}
          style={navButtonStyle}
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
          style={navButtonStyle}
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
          style={navButtonStyle}
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
  );
}

export default Navbar;