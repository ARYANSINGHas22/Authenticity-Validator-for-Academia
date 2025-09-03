import React, { useState } from "react";
import RoleSelect from "./RoleSelect";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({}); // store validation errors

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Role validation
    if (!role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // stop submit if errors

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);
    alert(`Email: ${email}\nPassword: ${password}\nRole: ${role}`);
  };

  const handleGoogleLogin = () => {
    alert("Login with Google clicked!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="needs-validation"
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "15px", width: "300px" }}
    >
      <div className="mb-3">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p>Welcome back! Please login to continue.</p>
        </div>

        {/* Email Field */}
        <label htmlFor="email" className="form-label fw-bold">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : email ? "is-valid" : ""}`}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      {/* Password Field */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-bold">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : password ? "is-valid" : ""}`}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>

      {/* Role Selection */}
      <RoleSelect role={role} setRole={setRole} />
      {errors.role && <div className="text-danger">{errors.role}</div>}

      {/* Buttons */}
      <button
        type="submit"
        className="btn"
        style={{
          padding: "10px",
          cursor: "pointer",
          borderRadius: "20px",
          backgroundColor: "rgb(8, 27, 158)",
          color: "white",
        }}
      >
        Login
      </button>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn btn-outline-dark"
        style={{ padding: "10px", cursor: "pointer", borderRadius: "20px" }}
      >
        <i class="fa-brands fa-google"></i> Login with Google
      </button>
    </form>
  );
};

export default LoginForm;


