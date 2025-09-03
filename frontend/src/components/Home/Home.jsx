

import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate("/login"); 
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "40px", boxSizing: "border-box", backgroundColor: "rgb(8, 27, 158)" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "70px", borderRadius: "10px" }}>
          <h1 style={{ color: "white", fontSize: "48px", fontFamily: "'Poppins', sans-serif", fontWeight: "700", marginBottom: "20px" }}>
            Authenticity Validator for Academia
          </h1>
          <p style={{ color: "white", fontSize: "30px" }}>
            Prevent fake certificates and ensure academic integrity with our advanced verification system.
            Trusted by universities, employers, and institutions worldwide.
          </p>
          <button
            onClick={handleLogin}
            style={{ padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "white", cursor: "pointer", marginTop: "20px", width: "200px", color: "#111111", fontWeight: "600", boxShadow: "4px 4px 12px rgba(0,0,0,0.2)", transition: "all 0.3s ease" }}
          >
            Login &nbsp;&nbsp;<i className="fa-solid fa-right-long"></i>
          </button>
        </div>

        {/* Column 2 */}
        <div style={{ flex: 1, padding: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
<img 
  src="https://plus.unsplash.com/premium_photo-1677093906217-9420a5f16322?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="Hero" 
  style={{ maxWidth: "90%", borderRadius: "10px" }} 
/>

        </div>
      </div>
    </div>
  );
};

export default Home;


