import React, { useState } from "react";

const InstitutionManagement = ({ institutionData, setInstitutionData, searchTerm, setSearchTerm }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    certificates: 0,
    status: "Pending Review"
  });
  const [errors, setErrors] = useState({});

  const filteredInstitutions = institutionData.filter(inst =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const institutionTypes = [
    "University",
    "College",
    "Training Center",
    "Certification Body",
    "Technical Institute",
    "Community College",
    "Professional Institute"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Institution name is required";
    } else if (institutionData.some(inst =>
      inst.name.toLowerCase() === formData.name.toLowerCase()
    )) {
      newErrors.name = "Institution already exists";
    }

    if (!formData.type) {
      newErrors.type = "Institution type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newInstitution = {
      id: Date.now(),
      name: formData.name.trim(),
      type: formData.type,
      certificates: 0,
      status: "Pending Review"
    };

    setInstitutionData(prev => [...prev, newInstitution]);

    setFormData({
      name: "",
      type: "",
      certificates: 0,
      status: "Pending Review"
    });
    setErrors({});
    setShowModal(false);

    alert(`${newInstitution.name} has been added successfully!`);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      type: "",
      certificates: 0,
      status: "Pending Review"
    });
    setErrors({});
    setShowModal(false);
  };

  const handleEdit = (institution) => {
    alert(`Edit functionality for ${institution.name} - This would open an edit modal`);
  };

  const handleSuspend = (institution) => {
    if (window.confirm(`Are you sure you want to suspend ${institution.name}?`)) {
      setInstitutionData(prev =>
        prev.map(inst =>
          inst.name === institution.name
            ? { ...inst, status: "Suspended" }
            : inst
        )
      );
      alert(`${institution.name} has been suspended.`);
    }
  };

  return (
    <>
      <div className="card" style={{
        width: "100%",
        padding: "30px",
        borderRadius: "10px",
        background: "#fff",
        marginBottom: "40px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h2><i className="fa-solid fa-building-columns"></i> Institution Management</h2>

        <div style={{ display: "flex", alignItems: "center", marginTop: "10px", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search institutions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              flex: "1"
            }}
          />
          <button style={{
            padding: "8px 12px",
            cursor: "pointer",
            border: "none",
            borderRadius: "4px",
            color: "#fff",
            background: "#0033cc"
          }}>
            <i className="fa-solid fa-magnifying-glass" style={{ marginRight: "5px" }}></i> Search
          </button>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: "8px 12px",
              background: "#0033cc",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            + Add Institution
          </button>
        </div>

        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9f9f9", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Institution Name</th>
              <th>Type</th>
              <th>Certificates</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstitutions.map((inst, i) => (
              <tr key={inst.id || i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{inst.name}</td>
                <td>{inst.type}</td>
                <td>{inst.certificates.toLocaleString()}</td>
                <td>
                  <span style={{
                    background: inst.status === "Active" ? "#e6fff2" :
                      inst.status === "Suspended" ? "#ffe6e6" : "#fff9e6",
                    color: inst.status === "Active" ? "green" :
                      inst.status === "Suspended" ? "red" : "#b26a00",
                    padding: "4px 8px",
                    borderRadius: "5px",
                  }}>
                    {inst.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(inst)}
                    style={{
                      color: "#0033cc",
                      marginRight: "10px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline"
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleSuspend(inst)}
                    style={{
                      color: "red",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline"
                    }}
                  >
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
            {filteredInstitutions.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: "10px", textAlign: "center", color: "#999" }}>
                  No institutions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          padding: "20px"
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleCancel();
          }
        }}
        >
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            width: "500px",
            maxWidth: "90%",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}>
              <h3 style={{ margin: 0 }}>Add New Institution</h3>
              <button
                onClick={handleCancel}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#999"
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500"
                }}>
                  Institution Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: errors.name ? "1px solid red" : "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter institution name"
                />
                {errors.name && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                    {errors.name}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500"
                }}>
                  Institution Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: errors.type ? "1px solid red" : "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }}
                >
                  <option value="">Select type...</option>
                  {institutionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                    {errors.type}
                  </div>
                )}
              </div>

              <div style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
                marginTop: "30px"
              }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: "10px 20px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    background: "#f9f9f9", // Changed background
                    color: "#333",          // Added text color
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.background = "#eee"}
                  onMouseLeave={(e) => e.target.style.background = "#f9f9f9"}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    background: "#0033cc",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                >
                  Add Institution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default InstitutionManagement;