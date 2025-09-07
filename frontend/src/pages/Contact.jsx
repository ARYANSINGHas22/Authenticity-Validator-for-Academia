import React, { useState } from "react";

// Icon Components
const Icons = {
  Shield: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12,22S2,17 2,10V5L12,2L22,5V10C22,17 12,22 12,22Z" />
    </svg>
  ),
  Mail: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Phone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Location: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Facebook: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
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
        name: "",
        company: "",
        phone: "",
        email: "",
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
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          background: 'rgb(8, 27, 158)',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '60px 20px'
        }}
      >
        <div>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            margin: '0 0 1rem 0',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Contact us
          </h1>
          <p style={{
            fontSize: '1.2rem',
            margin: 0,
            opacity: 0.9,
            maxWidth: '600px'
          }}>
            CertValidator is ready to provide the right solution<br />
            according to your needs
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="main-content" style={{
        display: 'flex',
        minHeight: 'calc(100vh - 300px)',
        backgroundColor: '#f8fafc'
      }}>
        {/* Left Side - Contact Info */}
        <div className="contact-left" style={{
          flex: '1',
          backgroundColor: 'white',
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ maxWidth: '400px' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Get in touch
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '3rem',
              lineHeight: '1.6'
            }}>
              CertValidator viverra lectus placerat sem efficitur molestie
              vehicula odio leo etiam nam.
            </p>

            {/* Contact Items */}
            <div style={{ marginBottom: '3rem' }}>
              {/* Head Office */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '2.5rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(8, 27, 158)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  color: 'white',
                  flexShrink: 0
                }}>
                  <Icons.Location />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Head Office
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    margin: '0 0 0.25rem 0',
                    lineHeight: '1.4'
                  }}>
                    Jalan Cempaka Wangi No 22
                  </p>
                  <p style={{
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    Jakarta - Indonesia
                  </p>
                </div>
              </div>

              {/* Email Us */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '2.5rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(8, 27, 158)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  color: 'white',
                  flexShrink: 0
                }}>
                  <Icons.Mail />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Email Us
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    margin: '0 0 0.25rem 0',
                    lineHeight: '1.4'
                  }}>
                    support@yourdomain.ltd
                  </p>
                  <p style={{
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    hello@yourdomain.ltd
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '2.5rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(8, 27, 158)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  color: 'white',
                  flexShrink: 0
                }}>
                  <Icons.Phone />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Call Us
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    margin: '0 0 0.25rem 0',
                    lineHeight: '1.4'
                  }}>
                    Phone : +6221.2002.2012
                  </p>
                  <p style={{
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    Fax : +6221.2002.2013
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Follow our social media
              </h3>
              <div className="social-icons" style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { Icon: Icons.Facebook, color: '#1877f2' },
                  { Icon: Icons.Instagram, color: '#e4405f' },
                  { Icon: Icons.Twitter, color: '#1da1f2' },
                  { Icon: Icons.Linkedin, color: '#0077b5' }
                ].map(({ Icon, color }, index) => (
                  <div
                    key={index}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Icon />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="contact-right" style={{
          flex: '1',
          padding: '60px 40px',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '2rem'
            }}>
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Name and Company Row */}
              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      outline: 'none',
                      backgroundColor: 'white',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgb(8, 27, 158)'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company"
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      outline: 'none',
                      backgroundColor: 'white',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgb(8, 27, 158)'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>

              {/* Phone and Email Row */}
              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      outline: 'none',
                      backgroundColor: 'white',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgb(8, 27, 158)'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      outline: 'none',
                      backgroundColor: 'white',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgb(8, 27, 158)'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  required
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: 'white',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgb(8, 27, 158)'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  required
                  disabled={isLoading}
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: 'white',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    minHeight: '120px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgb(8, 27, 158)'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.875rem 1.5rem',
                  backgroundColor: isLoading ? '#9ca3af' : 'rgb(8, 27, 158)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  marginTop: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = 'rgba(8, 27, 158, 0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = 'rgb(8, 27, 158)';
                  }
                }}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '3rem 2rem 2rem 2rem'
      }}>
        <div className="footer-grid" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem'
        }}>
          {/* Logo and Head Office */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgb(8, 27, 158)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icons.Shield />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                CertValidator
              </h3>
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
                Head Office
              </h4>
              <p style={{ color: '#9ca3af', margin: '0 0 0.5rem 0', lineHeight: '1.5' }}>
                Loka Digital Tower, Grand Building
              </p>
              <p style={{ color: '#9ca3af', margin: '0 0 0.5rem 0', lineHeight: '1.5' }}>
                JlnCempaka Wangi No 22
              </p>
              <p style={{ color: '#9ca3af', margin: '0 0 1rem 0', lineHeight: '1.5' }}>
                Jakarta - Indonesia
              </p>
              <p style={{ color: 'rgb(8, 27, 158)', margin: 0, fontSize: '0.875rem' }}>
                📍 Branch Location
              </p>
            </div>
          </div>

          {/* Get Started */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
              Get Started
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'rgb(8, 27, 158)'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                Business Payment
              </a>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'rgb(8, 27, 158)'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                Growing businesses
              </a>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'rgb(8, 27, 158)'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                Enterprise
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
              Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'rgb(8, 27, 158)'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                Help Center
              </a>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'rgb(8, 27, 158)'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                My Account
              </a>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'rgb(8, 27, 158)'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                Ticket Support
              </a>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'rgb(8, 27, 158)'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                Contact us
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid #374151',
          paddingTop: '2rem',
          marginTop: '3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.875rem' }}>
            Copyright © 2023 CertValidator. All rights reserved. Powered by MaxCreative.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = 'rgb(8, 27, 158)'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
              Term of use
            </a>
            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = 'rgb(8, 27, 158)'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
              Privacy
            </a>
          </div>
        </div>
      </footer>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .main-content {
            flex-direction: column !important;
          }
          
          .contact-left, .contact-right {
            padding: 40px 30px !important;
          }
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }
          
          .hero-section {
            padding: 40px 20px !important;
          }
          
          .contact-left, .contact-right {
            padding: 30px 20px !important;
          }
          
          .form-grid {
            grid-template-columns: 1fr !important;
          }
          
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          
          .footer-bottom {
            flex-direction: column !important;
            text-align: center;
          }
          
          .social-icons {
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 2rem !important;
          }
          
          h2 {
            font-size: 1.5rem !important;
          }
          
          .contact-left, .contact-right {
            padding: 20px 15px !important;
          }
          
          .hero-section p {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;