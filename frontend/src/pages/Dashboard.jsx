import React, { useState } from "react";

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
  ),
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <circle cx="12" cy="16" r="1"/>
      <path d="m7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
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

// Auth Component
function AuthModal({ isOpen, onAuthSuccess }) {
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess();
    }, 1000);
  };

  if (!isOpen) return null;

  // SCROLLABLE, VERTICALLY CENTERED MODAL
  const modalStyles = {
    overlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
      width: '100%',
      maxWidth: '400px',
      overflowY: 'auto',
      maxHeight: '90vh' // <--- ENABLE SCROLL IF CONTENT OVERFLOWS
    },
    header: {
      padding: '32px 32px 0 32px',
      textAlign: 'center'
    },
    logo: {
      width: '48px',
      height: '48px',
      backgroundColor: '#2563eb',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px auto',
      color: 'white'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '14px'
    },
    tabs: {
      display: 'flex',
      margin: '24px 32px',
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
      padding: '4px'
    },
    tab: {
      flex: 1,
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    activeTab: {
      backgroundColor: 'white',
      color: '#111827',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    },
    inactiveTab: {
      backgroundColor: 'transparent',
      color: '#6b7280'
    },
    form: {
      padding: '0 32px 32px 32px'
    },
    inputGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '6px'
    },
    inputWrapper: {
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      paddingLeft: '44px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s'
    },
    inputIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    submitButton: {
      width: '100%',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    switchText: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '16px'
    },
    switchLink: {
      color: '#2563eb',
      cursor: 'pointer',
      textDecoration: 'none'
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <div style={modalStyles.logo}>
            <Icons.Shield />
          </div>
          <h1 style={modalStyles.title}>Welcome to Document Verification</h1>
          <p style={modalStyles.subtitle}>
            {authMode === 'login' 
              ? 'Sign in to access your secure dashboard' 
              : 'Create your account to get started'
            }
          </p>
        </div>

        <div style={modalStyles.tabs}>
          <button
            style={{
              ...modalStyles.tab,
              ...(authMode === 'login' ? modalStyles.activeTab : modalStyles.inactiveTab)
            }}
            onClick={() => setAuthMode('login')}
          >
            Sign In
          </button>
          <button
            style={{
              ...modalStyles.tab,
              ...(authMode === 'signup' ? modalStyles.activeTab : modalStyles.inactiveTab)
            }}
            onClick={() => setAuthMode('signup')}
          >
            Sign Up
          </button>
        </div>

        <form style={modalStyles.form} onSubmit={handleSubmit}>
          {authMode === 'signup' && (
            <div style={modalStyles.inputGroup}>
              <label style={modalStyles.label}>Full Name</label>
              <div style={modalStyles.inputWrapper}>
                <div style={modalStyles.inputIcon}>
                  <Icons.User />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  style={modalStyles.input}
                  value={formData.name}
                  onChange={handleInputChange}
                  required={authMode === 'signup'}
                />
              </div>
            </div>
          )}

          <div style={modalStyles.inputGroup}>
            <label style={modalStyles.label}>Email Address</label>
            <div style={modalStyles.inputWrapper}>
              <div style={modalStyles.inputIcon}>
                <Icons.Mail />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                style={modalStyles.input}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div style={modalStyles.inputGroup}>
            <label style={modalStyles.label}>Password</label>
            <div style={modalStyles.inputWrapper}>
              <div style={modalStyles.inputIcon}>
                <Icons.Lock />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                style={modalStyles.input}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {authMode === 'signup' && (
            <div style={modalStyles.inputGroup}>
              <label style={modalStyles.label}>Confirm Password</label>
              <div style={modalStyles.inputWrapper}>
                <div style={modalStyles.inputIcon}>
                  <Icons.Lock />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  style={modalStyles.input}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={authMode === 'signup'}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            style={{
              ...modalStyles.submitButton,
              backgroundColor: loading ? '#9ca3af' : '#2563eb'
            }}
            disabled={loading}
          >
            {loading ? 'Please wait...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  );
}

// Main Dashboard Component
function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [showModal, setShowModal] = useState(false);
  const [modalTab, setModalTab] = useState("upload");
  const [documents, setDocuments] = useState([
    {
      id: '1',
      name: 'Bachelor_Degree_Certificate.pdf',
      type: 'Degree Certificate',
      size: '1.95 MB',
      date: '15/01/2024',
      hash: 'a1b2c3d4e5f6...',
      status: 'verified',
      verifiedBy: 'University Registry'
    },
    {
      id: '2',
      name: 'Final_Semester_Marksheet.pdf',
      type: 'Academic Transcript',
      size: '1.46 MB',
      date: '10/02/2024',
      hash: 'b2c3d4e5f678...',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Professional_Certificate.pdf',
      type: 'Professional Certificate',
      size: '1000 KB',
      date: '20/02/2024',
      hash: 'c3d4e5f67890...',
      status: 'tampered'
    }
  ]);

  // Handle authentication success
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Handle file upload
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

  // Render status badge
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

  // Show auth modal if not authenticated
  if (!isAuthenticated) {
    return <AuthModal isOpen={true} onAuthSuccess={handleAuthSuccess} />;
  }

  // Dashboard styles (unchanged)
  const baseStyles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '16px 0'
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoIcon: {
      padding: '8px',
      borderRadius: '8px',
      backgroundColor: '#dbeafe',
      color: '#2563eb'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      margin: 0
    },
    subtitle: {
      color: '#6b7280',
      margin: 0,
      fontSize: '14px'
    },
    headerButtons: {
      display: 'flex',
      gap: '12px'
    },
    verifyButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      backgroundColor: 'white',
      color: '#374151',
      cursor: 'pointer',
      fontSize: '14px',
      textDecoration: 'none'
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
      textDecoration: 'none'
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
    uploadHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '24px'
    },
    plusIcon: {
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
    },
    uploadTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#111827',
      margin: 0
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
    uploadAreaHover: {
      borderColor: '#3b82f6',
      backgroundColor: '#eff6ff'
    },
    uploadIcon: {
      width: '64px',
      height: '64px',
      backgroundColor: '#dbeafe',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px',
      color: '#2563eb'
    },
    uploadText: {
      fontSize: '18px',
      fontWeight: '500',
      color: '#111827',
      marginBottom: '8px'
    },
    uploadSubtext: {
      color: '#6b7280'
    },
    docGrid: {
      display: 'grid',
      gap: '24px',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
    },
    docCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '24px',
      transition: 'box-shadow 0.2s'
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

  // SCROLLABLE SIGNUP REMAINS OVER ANY OTHER LAYERS
  return (
    <div style={baseStyles.container}>
      {/* Header */}
      <header style={baseStyles.header}>
        <div style={baseStyles.headerContent}>
          <div style={baseStyles.logoSection}>
            <div style={baseStyles.logoIcon}>
              <Icons.Shield />
            </div>
            <div>
              <h1 style={baseStyles.title}>Document Verification</h1>
              <p style={baseStyles.subtitle}>Secure document authentication system</p>
            </div>
          </div>
          <div style={baseStyles.headerButtons}>
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
            <div style={baseStyles.uploadHeader}>
              <div style={baseStyles.plusIcon}>+</div>
              <h2 style={baseStyles.uploadTitle}>Upload New Document</h2>
            </div>
            
            <label 
              style={baseStyles.uploadArea}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, baseStyles.uploadAreaHover);
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <div style={baseStyles.uploadIcon}>
                <Icons.Upload />
              </div>
              <h3 style={baseStyles.uploadText}>Upload Document</h3>
              <p style={baseStyles.uploadSubtext}>
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
            
            <div style={baseStyles.docGrid}>
              {documents.map((doc) => (
                <div key={doc.id} style={baseStyles.docCard}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#dbeafe',
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
                        backgroundColor: '#2563eb',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#dbeafe',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: '#2563eb', fontSize: '14px', fontWeight: 'bold' }}>!</span>
                  </div>
                  <h2 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#111827',
                    margin: 0
                  }}>Verify Document Authenticity</h2>
                </div>
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

              {/* Modal Tabs */}
              <div style={{
                display: 'flex',
                backgroundColor: '#f9fafb',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <button
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    backgroundColor: modalTab === 'upload' ? 'white' : 'transparent',
                    color: modalTab === 'upload' ? '#111827' : '#6b7280',
                    borderBottom: modalTab === 'upload' ? '2px solid #2563eb' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => setModalTab("upload")}
                >
                  Upload Document
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    backgroundColor: modalTab === 'hash' ? 'white' : 'transparent',
                    color: modalTab === 'hash' ? '#111827' : '#6b7280',
                    borderBottom: modalTab === 'hash' ? '2px solid #2563eb' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => setModalTab("hash")}
                >
                  Enter Hash
                </button>
              </div>

              <div style={{ padding: '24px' }}>
                {/* Upload Document Tab */}
                {modalTab === "upload" && (
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#111827',
                      marginBottom: '16px'
                    }}>
                      Upload the document you want to verify
                    </h3>
                    <label style={{
                      cursor: 'pointer',
                      border: '2px dashed #bfdbfe',
                      borderRadius: '12px',
                      padding: '48px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      transition: 'all 0.2s'
                    }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        backgroundColor: '#dbeafe',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        color: '#2563eb'
                      }}>
                        <Icons.Upload />
                      </div>
                      <h4 style={{
                        fontSize: '18px',
                        fontWeight: '500',
                        color: '#111827',
                        marginBottom: '8px'
                      }}>Upload Document</h4>
                      <p style={{ color: '#6b7280', marginBottom: '4px' }}>
                        Drag and drop your PDF here, or click to browse
                      </p>
                      <p style={{ fontSize: '14px', color: '#9ca3af' }}>Maximum file size: 10MB</p>
                      <input type="file" accept="application/pdf" style={{ display: 'none' }} />
                    </label>
                  </div>
                )}

                {/* Enter Hash Tab */}
                {modalTab === "hash" && (
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#111827',
                      marginBottom: '16px'
                    }}>Document Hash (SHA-256)</h3>
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
                      backgroundColor: '#2563eb',
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
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
