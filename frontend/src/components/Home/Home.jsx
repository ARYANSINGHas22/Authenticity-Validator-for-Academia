import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };


  return (
    <div style={{ 
      background: 'linear-gradient(135deg, hsl(226, 70%, 55%) 0%, hsl(280, 65%, 60%) 100%)', 
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Subtle animated background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)`,
        animation: "float 8s ease-in-out infinite",
        zIndex: 1
      }} />

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0",
          boxSizing: "border-box",
          minHeight: "100vh",
          position: "relative",
          zIndex: 2
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          {/* Column 1 - Text Content */}
          <div style={{ 
            flex: 1, 
            padding: "70px 60px", 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "50%",
            position: "relative"
          }}>
            {/* Decorative line */}
            <div style={{
              position: "absolute",
              top: "60px",
              left: "40px",
              width: "4px",
              height: "60px",
              background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)",
              borderRadius: "2px"
            }} />

            <h1
              style={{
                color: "white",
                fontSize: "56px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "800",
                marginBottom: "32px",
                lineHeight: "1.1",
                textShadow: "0 4px 20px rgba(0,0,0,0.1)",
                letterSpacing: "-0.02em"
              }}
            >
              Authenticity Validator for Academia
            </h1>

            <p style={{ 
              color: "rgba(255,255,255,0.9)", 
              fontSize: "22px",
              lineHeight: "1.6",
              marginBottom: "48px",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: "400",
              maxWidth: "85%"
            }}>
              Prevent fake certificates and ensure academic integrity with our
              advanced verification system. Trusted by universities, employers,
              and institutions worldwide.
            </p>

            <button
              onClick={handleLogin}
              style={{
                padding: "20px 40px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "white",
                cursor: "pointer",
                fontSize: "18px",
                color: "#111111",
                fontWeight: "600",
                boxShadow: "0 10px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                alignSelf: "flex-start",
                fontFamily: "'Poppins', sans-serif",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.02)";
                e.target.style.boxShadow = "0 15px 50px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 10px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              Get Started &nbsp;&nbsp;
              <span style={{ 
                fontSize: "16px",
                transition: "transform 0.3s ease"
              }}>→</span>
            </button>
          </div>

          {/* Column 2 - Image */}
          <div
            style={{
              flex: 1,
              padding: "0",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              position: "relative"
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                borderRadius: "50% 0 25% 0",
                boxShadow: "-30px 0 80px rgba(0,0,0,0.25), -10px 0 40px rgba(0,0,0,0.15)",
                marginRight: "0"
              }}
            >
              {/* Subtle overlay for depth */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%, rgba(0,0,0,0.05) 100%)",
                zIndex: 2,
                pointerEvents: "none"
              }} />

              <img
                src="https://plus.unsplash.com/premium_photo-1677093906217-9420a5f16322?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hero"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: "contrast(1.1) brightness(1.05)"
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default Home;