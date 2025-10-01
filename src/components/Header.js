// ✅ Modern & Responsive Header.js with Dropdown
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  // Check if current route is a child of Student Portal
  const isStudentPortalActive =
    location.pathname === "/register" || location.pathname === "/login";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        {/* Logo / Brand */}
        <Link
          className="navbar-brand fw-bold fs-4 d-flex align-items-center"
          to="/"
        >
          🎓 Bursary Portal
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Home */}
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link custom-link px-3 ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>

            {/* About */}
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link custom-link px-3 ${isActive ? "active" : ""}`
                }
              >
                About
              </NavLink>
            </li>

            {/* Student Portal Dropdown */}
            <li className="nav-item dropdown">
              <a
                href="#"
                className={`nav-link dropdown-toggle custom-link px-3 ${
                  isStudentPortalActive ? "active" : ""
                }`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.preventDefault()}
              >
                Student Portal
              </a>

              <ul className="dropdown-menu shadow-sm border-0 rounded-3">
                <li>
                  <NavLink to="/register" className="dropdown-item">
                    📝 Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="dropdown-item">
                    🔑 Login
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Staff Portal */}
            <li className="nav-item">
              
              <NavLink
                to="/staff-portal"
                className={({ isActive }) =>
                  `nav-link custom-link px-3 ${isActive ? "active" : ""}`
                }
              >
                Staff Portal
              </NavLink>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link custom-link px-3 ${isActive ? "active" : ""}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
