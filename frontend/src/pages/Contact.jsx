import React, { useState } from "react";

// Icon Components
const Icons = {
  Shield: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12,22S2,17 2,10V5L12,2L22,5V10C22,17 12,22 12,22Z" />
    </svg>
  ),
  Mail: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Phone: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Message sent successfully! We will get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#f8f9fa",
          padding: "60px 20px 80px", // ✅ adjusted spacing for global navbar
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#212529",
              marginBottom: "24px",
              lineHeight: "1.2",
            }}
          >
            Get In Touch
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: "#6c757d",
              lineHeight: "1.6",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            Have questions about certificate validation? Need enterprise solutions? Our team is here to help you secure
            academic integrity.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        style={{
          backgroundColor: "white",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#212529",
              marginBottom: "48px",
            }}
          >
            Send us a Message
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: "24px",
            }}
          >
            {/* First Name and Last Name */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#212529",
                    marginBottom: "8px",
                  }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    padding: "16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                    backgroundColor: isLoading ? "#f9fafb" : "white",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgb(8, 27, 158)")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#212529",
                    marginBottom: "8px",
                  }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  required
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    padding: "16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                    backgroundColor: isLoading ? "#f9fafb" : "white",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgb(8, 27, 158)")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#212529",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
                required
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                  backgroundColor: isLoading ? "#f9fafb" : "white",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgb(8, 27, 158)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Organization */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#212529",
                  marginBottom: "8px",
                }}
              >
                Organization
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="University or Company Name"
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                  backgroundColor: isLoading ? "#f9fafb" : "white",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgb(8, 27, 158)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Subject */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#212529",
                  marginBottom: "8px",
                }}
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="How can we help you?"
                required
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                  backgroundColor: isLoading ? "#f9fafb" : "white",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgb(8, 27, 158)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Message */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#212529",
                  marginBottom: "8px",
                }}
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your needs..."
                required
                disabled={isLoading}
                rows="6"
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                  backgroundColor: isLoading ? "#f9fafb" : "white",
                  boxSizing: "border-box",
                  resize: "vertical",
                  minHeight: "120px",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgb(8, 27, 158)")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "16px 32px",
                backgroundColor: isLoading ? "#9ca3af" : "rgb(8, 27, 158)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "600",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                marginTop: "16px",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = "rgba(8, 27, 158, 0.8)";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = "rgb(8, 27, 158)";
                  e.target.style.transform = "translateY(0)";
                }
              }}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* Contact Information Section */}
      <section
        style={{
          backgroundColor: "#f8f9fa",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* CTA Banner */}
          <div
            style={{
              backgroundColor: "rgb(8, 27, 158)",
              borderRadius: "16px",
              padding: "48px",
              marginBottom: "64px",
              color: "white",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "16px",
                color: "white",
              }}
            >
              Ready to Secure Academic Integrity?
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "rgba(255, 255, 255, 0.9)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Join hundreds of institutions worldwide in the fight against academic fraud. Our solutions are customized
              to meet your specific verification needs.
            </p>
          </div>

          {/* Contact Methods */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {/* Email */}
            <div
              style={{
                backgroundColor: "white",
                padding: "32px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "rgb(8, 27, 158)",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <Icons.Mail />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#212529",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Email
                  </h3>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#212529",
                      margin: "0 0 8px 0",
                    }}
                  >
                    support@certvalidator.com
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6c757d",
                      margin: 0,
                    }}
                  >
                    Send us an email anytime
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div
              style={{
                backgroundColor: "white",
                padding: "32px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "rgb(8, 27, 158)",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <Icons.Phone />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#212529",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Phone
                  </h3>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#212529",
                      margin: "0 0 8px 0",
                    }}
                  >
                    +1 (555) 123-4567
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6c757d",
                      margin: 0,
                    }}
                  >
                    Mon–Fri, 9am–6pm EST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#212529",
          color: "white",
          padding: "48px 20px 24px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "rgb(8, 27, 158)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icons.Shield />
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              CertValidator
            </h3>
          </div>
          <p
            style={{
              color: "#adb5bd",
              fontSize: "14px",
              margin: 0,
            }}
          >
            © 2025 CertValidator. Securing educational integrity worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
