import React, { useState } from "react";
import axios from "axios";

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
          margin-top: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .verification-history-card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.03);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }
        
        .header-section {
        //  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: black;
          padding: 1.5rem 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .header-icon {
          font-size: 1.5rem;
          opacity: 0.9;
        }
        
        .header-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.025em;
        }
        
        .history-content {
          padding: 2rem;
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          color: #6b7280;
        }
        
        .empty-icon {
          font-size: 3rem;
          color: #d1d5db;
          margin-bottom: 1rem;
        }
        
        .empty-message {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 0.5rem 0;
        }
        
        .empty-subtitle {
          margin: 0;
          font-size: 0.875rem;
        }
        
        .history-grid {
          display: grid;
          gap: 1.5rem;
        }
        
        .history-record {
          border-radius: 8px;
          overflow: hidden;
        }
        
        .record-card {
          border: 1px solid;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.2s ease-in-out;
        }
        
        .record-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .verified-card {
          border-color: #10b981;
          background: #f0fdf4;
        }
        
        .unverified-card {
          border-color: #ef4444;
          background: #fef2f2;
        }
        
        .status-badge {
          padding: 1rem 1.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        
        .verified-badge {
          background: #10b981;
          color: white;
        }
        
        .unverified-badge {
          background: #ef4444;
          color: white;
        }
        
        .record-details {
          padding: 1.5rem;
          background: white;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .detail-row:last-of-type {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .detail-label {
          font-weight: 600;
          color: #374151;
          font-size: 0.875rem;
        }
        
        .detail-value {
          font-weight: 500;
          color: #111827;
          text-align: right;
          max-width: 60%;
          word-break: break-all;
        }
        
        .certificate-id {
          font-family: 'Courier New', monospace;
          background: #f9fafb;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
        }
        
        .error-message {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: #dc2626;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        
        .error-message i {
          color: #f59e0b;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }
        
        .verification-timestamp {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid #f3f4f6;
        }
        
        .verification-timestamp i {
          font-size: 0.75rem;
        }
        
        @media (max-width: 768px) {
          .verification-history-container {
            margin-top: 1rem;
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
            gap: 0.5rem;
          }
          
          .detail-value {
            max-width: 100%;
            text-align: left;
          }
          
          .record-details {
            padding: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .header-section {
            padding: 1rem;
          }
          
          .history-content {
            padding: 1rem;
          }
          
          .empty-state {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VerificationHistory;