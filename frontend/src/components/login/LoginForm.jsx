import React, { useState } from "react";
import RoleSelect from "./RoleSelect";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({}); // store validation errors
  const [isLoading, setIsLoading] = useState(false); // loading state
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true); // Start loading

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store user data if needed (e.g., in localStorage or context)
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('authToken', data.token); // if you have a token
        
        alert("✅ Login successful!");
        console.log("User:", data.user);
        
        // Navigate to dashboard ONLY after successful login
        navigate("/dashboard");
      } else {
        alert("❌ " + data.message);
        setErrors({ submit: data.message }); // Show server error
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong. Try again later.");
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleGoogleLogin = () => {
    alert("Login with Google clicked!");
    // Implement Google OAuth logic here
    // After successful Google login, navigate to dashboard
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
          disabled={isLoading}
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
          disabled={isLoading}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>

      {/* Role Selection */}
      <RoleSelect role={role} setRole={setRole} disabled={isLoading} />
      {errors.role && <div className="text-danger">{errors.role}</div>}

      {/* Show submit error if any */}
      {errors.submit && <div className="text-danger">{errors.submit}</div>}

      {/* Login Button - REMOVED onClick that bypassed authentication */}
      <button
        type="submit"
        className="btn"
        disabled={isLoading}
        style={{
          padding: "10px",
          cursor: isLoading ? "not-allowed" : "pointer",
          borderRadius: "20px",
          backgroundColor: isLoading ? "#6c757d" : "rgb(8, 27, 158)",
          color: "white",
          opacity: isLoading ? 0.6 : 1
        }}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn btn-outline-dark"
        disabled={isLoading}
        style={{ 
          padding: "10px", 
          cursor: isLoading ? "not-allowed" : "pointer", 
          borderRadius: "20px",
          opacity: isLoading ? 0.6 : 1
        }}
      >
        <i className="fa-brands fa-google"></i> Login with Google
      </button>
    </form>
  );
};

export default LoginForm;