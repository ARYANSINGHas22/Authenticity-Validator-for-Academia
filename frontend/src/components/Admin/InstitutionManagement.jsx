import React, { useState, useEffect } from "react";
import axios from "axios";

const InstitutionManagement = ({ searchTerm, setSearchTerm }) => {
  const [institutionData, setInstitutionData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editInstitutionId, setEditInstitutionId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
  });
  const [errors, setErrors] = useState({});

  // ✅ Fetch institutions from backend
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/institutions");
        setInstitutionData(res.data);
      } catch (err) {
        console.error("Error fetching institutions:", err);
      }
    };
    fetchInstitutions();
  }, []);

  // Filter institutions by search term
  const filteredInstitutions = institutionData.filter((inst) =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Institution name is required";
    if (!formData.type) newErrors.type = "Institution type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditing) {
        // Update institution
        const res = await axios.put(
          `http://localhost:5000/api/institutions/${editInstitutionId}`,
          formData
        );
        if (res.data.success) {
          setInstitutionData((prev) =>
            prev.map((inst) =>
              inst.id === editInstitutionId ? { ...inst, ...formData } : inst
            )
          );
          alert("Institution updated successfully!");
        }
      } else {
        // Add institution
        const res = await axios.post("http://localhost:5000/api/institutions", formData);
        if (res.data.success) {
          setInstitutionData((prev) => [...prev, res.data.institution]);
          alert(`${res.data.institution.name} added successfully!`);
        }
      }

      // Reset form & modal
      setFormData({ name: "", type: "" });
      setErrors({});
      setShowModal(false);
      setIsEditing(false);
      setEditInstitutionId(null);
    } catch (err) {
      console.error(err);
      alert("Error saving institution");
    }
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({ name: "", type: "" });
    setErrors({});
    setShowModal(false);
    setIsEditing(false);
    setEditInstitutionId(null);
  };

  // Edit institution
  const handleEdit = (institution) => {
    setFormData({ name: institution.name, type: institution.type });
    setEditInstitutionId(institution.id);
    setIsEditing(true);
    setShowModal(true);
  };

  // Suspend institution
  const handleSuspend = async (id) => {
    if (window.confirm("Suspend this institution?")) {
      try {
        await axios.put(`http://localhost:5000/api/institutions/${id}/suspend`);
        setInstitutionData((prev) =>
          prev.map((inst) =>
            inst.id === id ? { ...inst, status: "Suspended" } : inst
          )
        );
      } catch (err) {
        console.error(err);
        alert("Error suspending institution");
      }
    }
  };

  // Unsuspend institution
  const handleUnsuspend = async (id) => {
    if (window.confirm("Unsuspend this institution?")) {
      try {
        await axios.put(`http://localhost:5000/api/institutions/${id}/unsuspend`);
        setInstitutionData((prev) =>
          prev.map((inst) =>
            inst.id === id ? { ...inst, status: "Active" } : inst
          )
        );
      } catch (err) {
        console.error(err);
        alert("Error unsuspending institution");
      }
    }
  };

  return (
    <>
      <div
        className="card"
        style={{
          width: "100%",
          padding: "30px",
          borderRadius: "10px",
          background: "#fff",
          marginBottom: "40px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2>
          <i className="fa-solid fa-building-columns"></i> Institution Management
        </h2>

        {/* Search + Add button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Search institutions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              flex: "1",
            }}
          />
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

        {/* Table */}
        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
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
            {filteredInstitutions.map((inst) => (
              <tr key={inst.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{inst.name}</td>
                <td>{inst.type}</td>
                <td>{inst.certificates}</td>
                <td>
                  <span
                    style={{
                      background:
                        inst.status === "Active"
                          ? "#e6fff2"
                          : inst.status === "Suspended"
                          ? "#ffe6e6"
                          : "#fff9e6",
                      color:
                        inst.status === "Active"
                          ? "green"
                          : inst.status === "Suspended"
                          ? "red"
                          : "#b26a00",
                      padding: "4px 8px",
                      borderRadius: "5px",
                    }}
                  >
                    {inst.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(inst)}
                    style={{
                      color: "blue",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>
                  {inst.status === "Suspended" ? (
                    <button
                      onClick={() => handleUnsuspend(inst.id)}
                      style={{
                        color: "green",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Unsuspend
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSuspend(inst.id)}
                      style={{
                        color: "red",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Suspend
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredInstitutions.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{ padding: "10px", textAlign: "center", color: "#999" }}
                >
                  No institutions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
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
            padding: "20px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCancel();
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              width: "500px",
              maxWidth: "90%",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ margin: 0 }}>
                {isEditing ? "Edit Institution" : "Add New Institution"}
              </h3>
              <button
                onClick={handleCancel}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
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
                  }}
                  placeholder="Enter institution name"
                />
                {errors.name && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.name}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
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
                  }}
                >
                  <option value="">Select type...</option>
                  <option value="University">University</option>
                  <option value="College">College</option>
                  <option value="School">School</option>
                  <option value="Institute">Institute</option>
                </select>
                {errors.type && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.type}
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                  marginTop: "30px",
                }}
              >
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: "10px 20px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    background: "#f9f9f9",
                    color: "#333",
                    cursor: "pointer",
                  }}
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
                  }}
                >
                  {isEditing ? "Save Changes" : "Add Institution"}
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
