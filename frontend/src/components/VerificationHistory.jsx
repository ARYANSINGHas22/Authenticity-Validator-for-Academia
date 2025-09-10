import React from "react";

const VerificationHistory = ({ history }) => {
  return (
    <div className="verification-history-container">
      <div className="verification-history-card">
        <div className="header-section">
          <div className="header-icon">
            <i className="fa-solid fa-arrow-rotate-left"></i>
          </div>
          <h2 className="header-title">Verification History</h2>
        </div>
        <div className="history-content">
          {history.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fa-solid fa-file-circle-question"></i>
              </div>
              <p className="empty-message">No verification records found</p>
              <p className="empty-subtitle">Verification history will appear here once certificates are verified</p>
            </div>
          ) : (
            <div className="history-grid">
              {history.map((item, index) => (
                <div key={index} className="history-record">
                  {item.found ? (
                    <div className="record-card verified-card">
                      <div className="status-badge verified-badge">
                        <i className="fa-solid fa-circle-check"></i>
                        Certificate Verified
                      </div>
                      <div className="record-details">
                        <div className="detail-row">
                          <span className="detail-label">Candidate Name:</span>
                          <span className="detail-value">{item.data?.student_name}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Certificate ID:</span>
                          <span className="detail-value certificate-id">{item.data?.cert_id}</span>
                        </div>
                        <div className="verification-timestamp">
                          <i className="fa-solid fa-clock"></i>
                          <span>Verified on {new Date().toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="record-card unverified-card">
                      <div className="status-badge unverified-badge">
                        <i className="fa-solid fa-circle-xmark"></i>
                        Verification Failed
                      </div>
                      <div className="record-details">
                        <div className="error-message">
                          <i className="fa-solid fa-triangle-exclamation"></i>
                          <span>{item.message || "Certificate not found in our records"}</span>
                        </div>
                        <div className="verification-timestamp">
                          <i className="fa-solid fa-clock"></i>
                          <span>Attempted on {new Date().toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .verification-history-container {
          margin-top: 2.5rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #374151;
        }

        .verification-history-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(100, 116, 139, 0.15);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .header-section {
          background: linear-gradient(135deg, hsl(226, 70%, 55%) 0%, hsl(280, 65%, 60%) 100%);
          color: white;
          padding: 1.75rem 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 600;
          font-size: 1.75rem;
          box-shadow: inset 0 -8px 15px rgb(0 0 0 / 0.1);
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }

        .header-icon {
          font-size: 1.8rem;
        }

        .header-title {
          margin: 0;
          letter-spacing: -0.025em;
        }

        .history-content {
          padding: 2.5rem 2rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          color: #6b7280;
        }

        .empty-icon {
          font-size: 4rem;
          color: #e0e7ff;
          margin-bottom: 1rem;
        }

        .empty-message {
          font-size: 1.25rem;
          font-weight: 700;
          color: #475569;
          margin: 0 0 0.5rem 0;
        }

        .empty-subtitle {
          margin: 0;
          font-size: 1rem;
          color: #64748b;
        }

        .history-grid {
          display: grid;
          gap: 1.75rem;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }

        .history-record {
          border-radius: 12px;
          overflow: hidden;
        }

        .record-card {
          border: 1px solid;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          background: white;
          box-shadow: 0 6px 12px rgb(0 0 0 / 0.02);
        }

        .record-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 40px rgb(0 0 0 / 0.15);
          border-color: transparent;
        }

        .verified-card {
          border-color: #22c55e;
          background: #ecfdf5;
        }

        .unverified-card {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .status-badge {
          padding: 1rem 2rem;
          font-weight: 700;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.05);
        }

        .verified-badge {
          background: #22c55e;
          color: white;
        }

        .unverified-badge {
          background: #ef4444;
          color: white;
        }

        .record-details {
          padding: 1.75rem 2rem;
          background: white;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #f3f4f6;
          font-size: 1rem;
        }

        .detail-row:last-of-type {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .detail-label {
          font-weight: 700;
          color: #334155;
        }

        .detail-value {
          font-weight: 600;
          color: #1e293b;
          max-width: 60%;
          word-break: break-word;
          text-align: right;
          font-family: 'Courier New', monospace;
          font-size: 0.95rem;
          background: #f9fafb;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
        }

        .error-message {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          color: #b91c1c;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .error-message i {
          color: #f59e0b;
          margin-top: 0.2rem;
          flex-shrink: 0;
          font-size: 1.3rem;
        }

        .verification-timestamp {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #64748b;
          font-size: 0.85rem;
          padding-top: 1.25rem;
          border-top: 1px solid #e2e8f0;
        }

        .verification-timestamp i {
          font-size: 1rem;
          color: #94a3b8;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .verification-history-container {
            margin-top: 1.5rem;
          }
          .header-section {
            padding: 1rem 1.5rem;
          }
          .header-title {
            font-size: 1.25rem;
          }
          .history-content {
            padding: 1.5rem;
          }
          .detail-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          .detail-value {
            max-width: 100%;
            text-align: left;
          }
          .record-details {
            padding: 1rem 1.5rem;
          }
          .history-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .header-section {
            padding: 0.75rem 1rem;
          }
          .history-content {
            padding: 1rem;
          }
          .empty-state {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VerificationHistory;
