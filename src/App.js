import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import StaffPortal from "./pages/StaffPortal";
import StaffLogin from "./pages/stafflogin";  // 
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Auth Pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Staff Login */}
        <Route path="/staff-login" element={<StaffLogin />} />

        {/* Protected Staff Portal */}
        <Route
          path="/staff-portal"
          element={
            <PrivateRoute>
              <StaffPortal />
            </PrivateRoute>
          }
        />

        {/* Student Dashboard */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
