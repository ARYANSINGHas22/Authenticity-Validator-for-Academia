// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";   // ✅ import Navbar
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";
// import About from "./pages/About";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Contact from "./pages/Contact";
// import AdminDashboard from "./pages/AdminDashboard";
// import EmployeeDashboard from "./pages/EmployerDashboard";

// // Wrapper so we can hide Navbar on login/signup
// function AppWrapper() {
//   const location = useLocation();
//   const hideNavbarOn = ["/login", "/signup"]; // navbar won't show here

//   return (
//     <>
//       {/* ✅ Navbar always visible except login/signup */}
//       {!hideNavbarOn.includes(location.pathname) && <Navbar />}

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<LoginPage />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/employer" element={<EmployeeDashboard />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppWrapper />
//     </Router>
//   );
// }

// export default App;






// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployerDashboard"; // ✅ make sure file name matches

function AppWrapper() {
  const location = useLocation();
  const hideNavbarOn = ["/login", "/signup"];

  return (
    <>
      {/* Navbar visible except login/signup */}
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employer" element={<EmployeeDashboard />} />

       

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
