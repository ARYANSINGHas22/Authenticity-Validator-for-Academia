import React, { useState } from "react";
import RoleSelect from "./RoleSelect";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
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

    // Confirm password validation (only for signup)
    if (isSignup) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    // Role validation
    
if (!isSignup && !role) {
  newErrors.role = "Please select a role";
}


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const endpoint = isSignup ? "/api/signup" : "/api/login";
      const payload = isSignup 
        ? { email, password, confirmPassword}
        : { email, password, role };

      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('authToken', data.token);
        
        const successMessage = isSignup ? "Account created successfully!" : "Login successful!";
        alert("✅ " + successMessage);
        console.log("User:", data.user);
        
        navigate("/dashboard");
      } else {
        alert("❌ " + data.message);
        setErrors({ submit: data.message });
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong. Try again later.");
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    const action = isSignup ? "Sign up" : "Login";
    alert(`${action} with Google clicked!`);
    // Implement Google OAuth logic here
  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    setErrors({}); // Clear errors when switching modes
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          <p>
            {isSignup 
              ? "Create your account to get started!" 
              : "Welcome back! Please login to continue."
            }
          </p>
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

      {/* Password Field with Toggle */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-bold">
          Password
        </label>
        <div className="input-group">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className={`form-control ${errors.password ? "is-invalid" : password ? "is-valid" : ""}`}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={togglePasswordVisibility}
            disabled={isLoading}
            style={{ borderLeft: "none" }}
          >
            <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>

      {/* Confirm Password Field (only for signup) */}
      {isSignup && (
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label fw-bold">
            Confirm Password
          </label>
          <div className="input-group">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className={`form-control ${errors.confirmPassword ? "is-invalid" : confirmPassword ? "is-valid" : ""}`}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleConfirmPasswordVisibility}
              disabled={isLoading}
              style={{ borderLeft: "none" }}
            >
              <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>
      )}

     
      {/* Role Selection (only for login) */}
{!isSignup && (
  <>
    <RoleSelect role={role} setRole={setRole} disabled={isLoading} />
    {errors.role && <div className="text-danger">{errors.role}</div>}
  </>
)}


      {/* Show submit error if any */}
      {errors.submit && <div className="text-danger">{errors.submit}</div>}

      {/* Submit Button */}
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
        {isLoading 
          ? (isSignup ? "Creating Account..." : "Logging in...") 
          : (isSignup ? "Sign Up" : "Login")
        }
      </button>

      {/* Google Auth Button */}
      <button
        type="button"
        onClick={handleGoogleAuth}
        className="btn btn-outline-dark"
        disabled={isLoading}
        style={{ 
          padding: "10px", 
          cursor: isLoading ? "not-allowed" : "pointer", 
          borderRadius: "20px",
          opacity: isLoading ? 0.6 : 1
        }}
      >
        <i className="fa-brands fa-google"></i> 
        {isSignup ? " Sign up with Google" : " Login with Google"}
      </button>

      {/* Toggle between Login and Signup */}
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
        </p>
        <button
          type="button"
          onClick={toggleAuthMode}
          disabled={isLoading}
          style={{
            background: "none",
            border: "none",
            color: "rgb(8, 27, 158)",
            textDecoration: "underline",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "14px",
            marginTop: "5px",
            opacity: isLoading ? 0.6 : 1
          }}
        >
          {isSignup ? "Login here" : "Sign up here"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;