import React from "react";
import { useNavigate } from "react-router-dom";

// Icon Components
const Icons = {
  Shield: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12,22S2,17 2,10V5L12,2L22,5V10C22,17 12,22 12,22Z"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
  ),
  Users: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Award: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="7"/>
      <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
    </svg>
  )
};

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Icons.Shield />,
      title: "Advanced Verification",
      description: "Multi-layered verification system using blockchain technology and digital signatures"
    },
    {
      icon: <Icons.CheckCircle />,
      title: "Instant Validation",
      description: "Real-time certificate validation with instant results and detailed authenticity reports"
    },
    {
      icon: <Icons.Users />,
      title: "Trusted Network",
      description: "Partnered with over 500+ universities and institutions worldwide"
    },
    {
      icon: <Icons.Award />,
      title: "Academic Integrity",
      description: "Ensuring the highest standards of academic credibility and institutional trust"
    }
  ];

  const stats = [
    { number: "500+", label: "Partner Institutions" },
    { number: "1M+", label: "Certificates Verified" },
    { number: "99.9%", label: "Accuracy Rate" }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Header - Consistent with Dashboard */}
      <header style={{
        backgroundColor: "rgb(8, 27, 158)",
        color: "white",
        padding: "20px 0"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
            <h1 style={{
              fontSize: "28px",
              fontWeight: "bold",
              margin: 0,
              letterSpacing: "-0.5px"
            }}>
              CertValidator
            </h1>
          </div>
          <nav style={{
            display: "flex",
            gap: "32px",
            alignItems: "center"
          }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "6px",
                transition: "background-color 0.2s",
                fontWeight: "500"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              Dashboard
            </button>
            <span style={{ fontSize: "16px", fontWeight: "600" }}>About</span>
            <span style={{ fontSize: "16px", fontWeight: "500" }}>Contact</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        backgroundColor: "#f8f9fa",
        padding: "80px 20px",
        textAlign: "center"
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          <h1 style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#212529",
            marginBottom: "24px",
            lineHeight: "1.2"
          }}>
            About CertValidator
          </h1>
          <p style={{
            fontSize: "20px",
            color: "#6c757d",
            lineHeight: "1.6",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            Leading the revolution in academic credential verification with cutting-edge 
            technology and unwavering commitment to educational integrity.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{
        backgroundColor: "white",
        padding: "80px 20px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#212529",
            marginBottom: "32px"
          }}>
            Our Mission
          </h2>
          <div style={{
            fontSize: "18px",
            color: "#6c757d",
            lineHeight: "1.8",
            maxWidth: "800px"
          }}>
            <p style={{ marginBottom: "24px" }}>
              In an era where academic credentials are increasingly valuable and unfortunately, increasingly 
              counterfeited, CertValidator stands as the guardian of educational integrity. We provide 
              institutions, employers, and individuals with the tools they need to verify academic credentials 
              with absolute certainty.
            </p>
            <p style={{ marginBottom: "0" }}>
              Our advanced verification system combines blockchain technology, machine learning algorithms, 
              and comprehensive database cross-referencing to create an impenetrable shield against 
              academic fraud.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        backgroundColor: "#f8f9fa",
        padding: "80px 20px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#212529",
            marginBottom: "64px"
          }}>
            Why Choose CertValidator?
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "48px",
            maxWidth: "1000px",
            margin: "0 auto"
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  padding: "40px 32px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  border: "1px solid #e9ecef",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
                }}
              >
                <div style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "rgb(8, 27, 158)",
                  color: "white",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px auto"
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#212529",
                  marginBottom: "16px"
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: "16px",
                  color: "#6c757d",
                  lineHeight: "1.6",
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        backgroundColor: "rgb(8, 27, 158)",
        color: "white",
        padding: "80px 20px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "64px",
            color: "white"
          }}>
            Trusted Worldwide
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            {stats.map((stat, index) => (
              <div key={index}>
                <div style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "white"
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: "16px",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontWeight: "500"
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section style={{
        backgroundColor: "white",
        padding: "80px 20px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "64px",
            alignItems: "center"
          }}>
            <div>
              <h2 style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#212529",
                marginBottom: "24px"
              }}>
                Cutting-Edge Technology
              </h2>
              <p style={{
                fontSize: "18px",
                color: "#6c757d",
                lineHeight: "1.8",
                marginBottom: "32px"
              }}>
                Our platform leverages the latest advancements in cryptographic security, 
                distributed ledger technology, and artificial intelligence to ensure every 
                verification is accurate, secure, and tamper-proof.
              </p>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px"
              }}>
                {["Blockchain", "Machine Learning", "SHA-256 Hashing", "Digital Signatures"].map((tech, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "rgba(8, 27, 158, 0.1)",
                      color: "rgb(8, 27, 158)",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                      border: "1px solid rgba(8, 27, 158, 0.3)"
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "16px",
              padding: "48px",
              textAlign: "center"
            }}>
              <div style={{
                width: "120px",
                height: "120px",
                backgroundColor: "rgb(8, 27, 158)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
                color: "white"
              }}>
                <Icons.Shield />
              </div>
              <h3 style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#212529",
                marginBottom: "16px"
              }}>
                Secure & Reliable
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#6c757d",
                lineHeight: "1.6"
              }}>
                Bank-level security with 99.9% uptime guarantee and 
                instant global accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: "#f8f9fa",
        padding: "80px 20px",
        textAlign: "center"
      }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#212529",
            marginBottom: "24px"
          }}>
            Ready to Secure Your Credentials?
          </h2>
          <p style={{
            fontSize: "18px",
            color: "#6c757d",
            marginBottom: "40px",
            lineHeight: "1.6"
          }}>
            Join thousands of institutions and individuals who trust CertValidator 
            with their most important academic achievements.
          </p>
          <button
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: "rgb(8, 27, 158)",
              color: "white",
              padding: "16px 32px",
              borderRadius: "12px",
              border: "none",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 16px rgba(8, 27, 158, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(8, 27, 158, 0.8)";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(8, 27, 158, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgb(8, 27, 158)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 16px rgba(8, 27, 158, 0.3)";
            }}
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#212529",
        color: "white",
        padding: "48px 20px 24px 20px",
        textAlign: "center"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "24px"
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              backgroundColor: "rgb(8, 27, 158)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Icons.Shield />
            </div>
            <h3 style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: 0
            }}>
              CertValidator
            </h3>
          </div>
          <p style={{
            color: "#adb5bd",
            fontSize: "14px",
            margin: 0
          }}>
            © 2024 CertValidator. Securing educational integrity worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;