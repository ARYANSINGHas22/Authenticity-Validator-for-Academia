import React, { useState, useEffect } from "react";
import axios from "axios";

const gradient = "linear-gradient(135deg, hsl(226, 70%, 55%) 0%, hsl(280, 65%, 60%) 100%)";

const InstitutionManagement = ({ searchTerm, setSearchTerm }) => {
  const [institutionData, setInstitutionData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editInstitutionId, setEditInstitutionId] = useState(null);
  const [formData, setFormData] = useState({ name: "", type: "" });
  const [errors, setErrors] = useState({});

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

  const filteredInstitutions = institutionData.filter(inst =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Institution name is required";
    if (!formData.type) newErrors.type = "Institution type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditing) {
        const res = await axios.put(
          `http://localhost:5000/api/institutions/${editInstitutionId}`,
          formData
        );
        if (res.data.success) {
          setInstitutionData(prev =>
            prev.map(inst =>
              inst.id === editInstitutionId ? { ...inst, ...formData } : inst
            )
          );
          alert("Institution updated successfully!");
        }
      } else {
        const res = await axios.post("http://localhost:5000/api/institutions", formData);
        if (res.data.success) {
          setInstitutionData(prev => [...prev, res.data.institution]);
          alert(`${res.data.institution.name} added successfully!`);
        }
      }
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

  const handleCancel = () => {
    setFormData({ name: "", type: "" });
    setErrors({});
    setShowModal(false);
    setIsEditing(false);
    setEditInstitutionId(null);
  };

  const handleEdit = institution => {
    setFormData({ name: institution.name, type: institution.type });
    setEditInstitutionId(institution.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSuspend = async id => {
    if (window.confirm("Suspend this institution?")) {
      try {
        await axios.put(`http://localhost:5000/api/institutions/${id}/suspend`);
        setInstitutionData(prev =>
          prev.map(inst =>
            inst.id === id ? { ...inst, status: "Suspended" } : inst
          )
        );
      } catch {
        alert("Error suspending institution");
      }
    }
  };

  const handleUnsuspend = async id => {
    if (window.confirm("Unsuspend this institution?")) {
      try {
        await axios.put(`http://localhost:5000/api/institutions/${id}/unsuspend`);
        setInstitutionData(prev =>
          prev.map(inst =>
            inst.id === id ? { ...inst, status: "Active" } : inst
          )
        );
      } catch {
        alert("Error unsuspending institution");
      }
    }
  };

  return (
    <>
      <div
        className="container"
        style={{
          width: "100%",
          padding: "30px",
          borderRadius: "16px",
          background: "#fff",
          marginBottom: "40px",
          boxShadow: "0 10px 30px rgb(0 0 0 / 0.1)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#334155", fontWeight: "700" }}>
          <i className="fa-solid fa-building-columns" style={{ marginRight: "10px", color: "#6366f1" }}></i>
          Institution Management
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            gap: "12px",
          }}
        >
          <input
            type="text"
            placeholder="Search institutions..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              flex: 1,
              fontSize: "1rem",
              color: "#334155",
            }}
          />
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: "10px 16px",
              backgroundImage: gradient,
              color: "white",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgb(99 102 241 / 0.6)",
              transition: "filter 0.3s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.filter = "brightness(0.9)")}
            onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
          >
            + Add Institution
          </button>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "1rem",
            color: "#475569",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#e0e7ff" }}>
              {["Institution Name", "Type", "Certificates", "Status", "Actions"].map(header => (
                <th
                  key={header}
                  style={{
                    textAlign: "left",
                    padding: "12px 15px",
                    fontWeight: "700",
                    color: "#3b82f6",
                    borderBottom: "2px solid #c7d2fe",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredInstitutions.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>
                  No institutions found.
                </td>
              </tr>
            )}
            {filteredInstitutions.map(inst => (
              <tr key={inst.id} style={{ borderBottom: "1px solid #cbd5e1" }}>
                <td style={{ padding: "15px" }}>{inst.name}</td>
                <td style={{ padding: "15px" }}>{inst.type}</td>
                <td style={{ padding: "15px", textAlign: "center" }}>{inst.certificates}</td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <span
                    style={{
                      background:
                        inst.status === "Active"
                          ? "#d1fae5"
                          : inst.status === "Suspended"
                          ? "#fee2e2"
                          : "#fef3c7",
                      color:
                        inst.status === "Active"
                          ? "#059669"
                          : inst.status === "Suspended"
                          ? "#b91c1c"
                          : "#a16207",
                      padding: "5px 10px",
                      borderRadius: "9999px",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      userSelect: "none",
                    }}
                  >
                    {inst.status}
                  </span>
                </td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <button
                    onClick={() => handleEdit(inst)}
                    style={{
                      marginRight: "12px",
                      background: "none",
                      border: "none",
                      color: "#2563eb",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#1d4ed8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#2563eb")}
                  >
                    Edit
                  </button>
                  {inst.status === "Suspended" ? (
                    <button
                      onClick={() => handleUnsuspend(inst.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#16a34a",
                        fontWeight: "600",
                        cursor: "pointer",
                        textDecoration: "underline",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#15803d")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#16a34a")}
                    >
                      Unsuspend
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSuspend(inst.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#dc2626",
                        fontWeight: "600",
                        cursor: "pointer",
                        textDecoration: "underline",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#b91c1c")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#dc2626")}
                    >
                      Suspend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          onClick={e => e.target === e.currentTarget && handleCancel()}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              background: "#fff",
              borderRadius: "16px",
              padding: "30px",
              boxShadow: "0 15px 30px rgb(0 0 0 / 0.1)",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontWeight: "700", fontSize: "1.5rem" }}>
                {isEditing ? "Edit Institution" : "Add Institution"}
              </h3>
              <button
                onClick={handleCancel}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "28px",
                  cursor: "pointer",
                  color: "#94a3b8",
                  lineHeight: 1,
                  padding: 0,
                }}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="name" style={{ fontWeight: "600", display: "block", marginBottom: "8px" }}>
                  Institution Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter institution name"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: errors.name ? "2px solid #dc2626" : "1px solid #cbd5e1",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={e => e.target.style.borderColor = gradient}
                  onBlur={e => e.target.style.borderColor = errors.name ? "#dc2626" : "#cbd5e1"}
                />
                {errors.name && <p style={{ color: "#dc2626", marginTop: "6px", fontSize: "0.875rem" }}>{errors.name}</p>}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="type" style={{ fontWeight: "600", display: "block", marginBottom: "8px" }}>
                  Institution Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: errors.type ? "2px solid #dc2626" : "1px solid #cbd5e1",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={e => e.target.style.borderColor = gradient}
                  onBlur={e => e.target.style.borderColor = errors.type ? "#dc2626" : "#cbd5e1"}
                >
                  <option value="">Select type...</option>
                  <option value="University">University</option>
                  <option value="College">College</option>
                  <option value="School">School</option>
                  <option value="Institute">Institute</option>
                </select>
                {errors.type && <p style={{ color: "#dc2626", marginTop: "6px", fontSize: "0.875rem" }}>{errors.type}</p>}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "30px" }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    backgroundColor: "#f9fafb",
                    color: "#475569",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#e0e7ff"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#f9fafb"}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundImage: gradient,
                    color: "white",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgb(99 102 241 / 0.5)",
                    transition: "filter 0.3s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.filter = "brightness(0.9)"}
                  onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
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
