import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";   // ✅ import Navbar
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import Contact from "./pages/Contact";

// Wrapper so we can hide Navbar on login/signup
function AppWrapper() {
  const location = useLocation();
  const hideNavbarOn = ["/login", "/signup"]; // navbar won't show here

  return (
    <>
      {/* ✅ Navbar always visible except login/signup */}
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
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
