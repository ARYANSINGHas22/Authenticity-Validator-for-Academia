import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Simple icon components
const Icons = {
  Upload: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,5 17,10"/>
      <line x1="12" y1="15" x2="12" y2="5"/>
    </svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-15"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
  ),
  XCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  ),
  FileText: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  ),
  X: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12,22S2,17 2,10V5L12,2L22,5V10C22,17 12,22 12,22Z"/>
    </svg>
  ),
  User: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
};

// Utility function: compute SHA-256 hash of uploaded file
async function computeHash(file) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upload");
  const [showModal, setShowModal] = useState(false);
  const [modalTab, setModalTab] = useState("upload");
  const [documents, setDocuments] = useState([]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    
    // Navigate back to login page
    navigate('/login', { replace: true });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const hash = await computeHash(file);
    const newDoc = {
      id: Date.now().toString(),
      name: file.name,
      type: getDocumentType(file.name),
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      date: new Date().toLocaleDateString('en-GB'),
      hash: hash.substring(0, 12) + '...',
      status: "pending",
      verifiedBy: null,
    };
    setDocuments([newDoc, ...documents]);
    setActiveTab("mydocs");
  };

  const getDocumentType = (filename) => {
    const name = filename.toLowerCase();
    if (name.includes('degree') || name.includes('diploma')) return 'Degree Certificate';
    if (name.includes('marksheet') || name.includes('transcript')) return 'Academic Transcript';
    if (name.includes('certificate')) return 'Professional Certificate';
    return 'Document';
  };

  const renderStatus = (status) => {
    const styles = {
      verified: {
        backgroundColor: '#dcfce7',
        color: '#166534',
        border: '1px solid #bbf7d0'
      },
      pending: {
        backgroundColor: '#fef3c7',
        color: '#92400e',
        border: '1px solid #fde68a'
      },
      tampered: {
        backgroundColor: '#fecaca',
        color: '#991b1b',
        border: '1px solid #fca5a5'
      }
    };

    const IconComponent = status === 'verified' ? Icons.CheckCircle : 
                          status === 'pending' ? Icons.Clock : Icons.XCircle;

    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 12px',
        borderRadius: '9999px',
        fontSize: '14px',
        fontWeight: '500',
        ...styles[status]
      }}>
        <IconComponent />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const baseStyles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: {
      backgroundColor: 'rgb(8, 27, 158)',
      color: 'white',
      padding: '20px 0'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'white',
      margin: 0,
      letterSpacing: '-0.5px'
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.9)',
      margin: 0,
      fontSize: '14px'
    },
    headerButtons: {
      display: 'flex',
      gap: '12px'
    },
    navButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      padding: '8px 16px',
      borderRadius: '6px',
      transition: 'background-color 0.2s',
      fontWeight: '500'
    },
    verifyButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    logoutButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      border: '1px solid #ef4444',
      borderRadius: '8px',
      backgroundColor: '#ef4444',
      color: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    mainContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px 16px'
    },
    tabs: {
      display: 'flex',
      gap: '4px',
      backgroundColor: '#f3f4f6',
      padding: '4px',
      borderRadius: '8px',
      marginBottom: '32px',
      maxWidth: '384px'
    },
    tab: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '14px',
      border: 'none',
      backgroundColor: 'transparent'
    },
    activeTab: {
      backgroundColor: 'white',
      color: '#111827',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    },
    inactiveTab: {
      color: '#6b7280'
    },
    uploadCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '32px'
    },
    uploadArea: {
      border: '2px dashed #d1d5db',
      borderRadius: '12px',
      padding: '48px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      textAlign: 'center'
    },
    modal: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '16px'
    },
    modalContent: {
      backgroundColor: 'white',
      width: '100%',
      maxWidth: '768px',
      borderRadius: '12px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
    }
  };

  return (
    <div style={baseStyles.container}>
      {/* Header */}
      <header style={baseStyles.header}>
        <div style={baseStyles.headerContent}>
          <div style={baseStyles.logoSection}>
            <h1 style={baseStyles.title}>CertValidator</h1>
          </div>
          <div style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>Dashboard</span>
            <button
              onClick={() => navigate('/about')}
              style={baseStyles.navButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              About
            </button>
            <span style={{ fontSize: '16px', fontWeight: '500' }}>Contact</span>
            <button
              onClick={() => setShowModal(true)}
              style={baseStyles.verifyButton}
            >
              <Icons.Shield />
              Verify Document
            </button>
            <button
              onClick={handleLogout}
              style={baseStyles.logoutButton}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div style={baseStyles.mainContent}>
        {/* Tabs */}
        <div style={baseStyles.tabs}>
          <button
            style={{
              ...baseStyles.tab,
              ...(activeTab === "upload" ? baseStyles.activeTab : baseStyles.inactiveTab)
            }}
            onClick={() => setActiveTab("upload")}
          >
            <Icons.Upload />
            Upload Document
          </button>
          <button
            style={{
              ...baseStyles.tab,
              ...(activeTab === "mydocs" ? baseStyles.activeTab : baseStyles.inactiveTab)
            }}
            onClick={() => setActiveTab("mydocs")}
          >
            <Icons.FileText />
            My Documents
          </button>
        </div>

        {/* Upload Section */}
        {activeTab === "upload" && (
          <div style={baseStyles.uploadCard}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                backgroundColor: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>+</div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: 0
              }}>Upload New Document</h2>
            </div>
            
            <label 
              style={baseStyles.uploadArea}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'rgb(8, 27, 158)';
                e.target.style.backgroundColor = 'rgba(8, 27, 158, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'rgba(8, 27, 158, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                color: 'rgb(8, 27, 158)'
              }}>
                <Icons.Upload />
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#111827',
                marginBottom: '8px'
              }}>Upload Document</h3>
              <p style={{ color: '#6b7280' }}>
                Drag and drop your PDF here, or click to browse
              </p>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>

            <div style={{
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px'
            }}>
              <h4 style={{ fontWeight: '500', color: '#111827', marginBottom: '8px' }}>How it works:</h4>
              <ol style={{ fontSize: '14px', color: '#6b7280', margin: 0, paddingLeft: '16px' }}>
                <li>Upload your PDF document (degree certificates, marksheets, etc.)</li>
                <li>System calculates SHA-256 hash of your document</li>
                <li>Hash is stored securely with document metadata</li>
                <li>Anyone can verify authenticity by comparing hashes</li>
              </ol>
            </div>
          </div>
        )}

        {/* My Documents Section */}
        {activeTab === "mydocs" && (
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: 0 }}>My Documents</h2>
              <span style={{ color: '#6b7280' }}>{documents.length} documents</span>
            </div>
            
            {documents.length === 0 ? (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                padding: '48px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  color: '#9ca3af'
                }}>
                  <Icons.FileText />
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#111827',
                  marginBottom: '8px'
                }}>No documents uploaded yet</h3>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '24px'
                }}>
                  Upload your first document to get started with verification.
                </p>
                <button
                  onClick={() => setActiveTab("upload")}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'rgb(8, 27, 158)',
                    color: 'white',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Upload Document
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gap: '24px',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
              }}>
                {documents.map((doc) => (
                  <div key={doc.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb',
                    padding: '24px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'start',
                      gap: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'rgba(8, 27, 158, 0.1)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icons.FileText />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{
                          fontWeight: '500',
                          color: '#111827',
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>{doc.name}</h3>
                        <p style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          margin: '2px 0 0 0'
                        }}>{doc.type} • {doc.size}</p>
                      </div>
                      {renderStatus(doc.status)}
                    </div>
                    
                    <div style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      marginBottom: '16px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Upload Date:</span>
                        <span>{doc.date}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Hash:</span>
                        <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{doc.hash}</span>
                      </div>
                      {doc.verifiedBy && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Verified by:</span>
                          <span>{doc.verifiedBy}</span>
                        </div>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => alert('View document!')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '8px 12px',
                          color: '#374151',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          fontSize: '14px',
                          flex: 1,
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}>
                        <Icons.Eye />
                        View
                      </button>
                      <button
                        onClick={() => alert('Download document!')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '8px 12px',
                          color: '#374151',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          fontSize: '14px',
                          flex: 1,
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}>
                        <Icons.Download />
                        Download
                      </button>
                      <button
                        onClick={() => setShowModal(true)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: 'rgb(8, 27, 158)',
                          color: 'white',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Verification Modal */}
        {showModal && (
          <div style={baseStyles.modal}>
            <div style={baseStyles.modalContent}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827',
                  margin: 0
                }}>Verify Document Authenticity</h2>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: '8px',
                    color: '#9ca3af',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <Icons.X />
                </button>
              </div>

              <div style={{ padding: '24px' }}>
                <input
                  type="text"
                  placeholder="Enter the SHA-256 hash of the document"
                  style={{
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    marginBottom: '16px',
                    boxSizing: 'border-box'
                  }}
                />
                <button style={{
                  width: '100%',
                  backgroundColor: 'rgb(8, 27, 158)',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Verify
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;