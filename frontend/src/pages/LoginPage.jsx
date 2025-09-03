import React from "react";
import LoginForm from "../components/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      
      <div className="d-flex flex-column align-items-center text-center gap-2">
        <i className="fa-solid fa-shield" style={{ fontSize: "60px", color: "rgb(8, 27, 158)" }}></i>
        <h1>  Login to Your Account</h1>
        <p>Secure access to certificate verification</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      </div>
      <br></br>

      {/* Bootstrap Card for Login Form */}
      <div className="card shadow p-4" style={{ width: "400px" ,borderRadius: "10px" }}>
        <div className="card-body">         
          <LoginForm />
        </div>
      </div>
    </div>

  );
};

export default LoginPage;
