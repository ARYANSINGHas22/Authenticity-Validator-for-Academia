// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import VerifyCertificates from "./components/VerifyCertificates";
import BulkUpload from "./components/BulkUpload";
import VerificationHistory from "./components/VerificationHistory";

function AppWrapper() {
  const location = useLocation();
  const hideNavbarOn = ["/login", "/signup"];

  return (
    <>
      {/* Navbar visible except login/signup */}
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employer" element={<EmployerDashboard />} />
        <Route path="/employer/verify" element={<VerifyCertificates />} />
        <Route path="/employer/bulk" element={<BulkUpload />} />
        <Route path="/employer/history" element={<VerificationHistory />} />

        {/* Protected Example */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <h1>General Dashboard</h1>
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
