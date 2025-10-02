import React, { useState } from "react";
import axios from "axios";

function StaffLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/staff/login/", {
        email,
        password,
      });

      if (response.data.access) {
        // ✅ Save tokens and staff info
        localStorage.setItem("staffToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("staffInfo", JSON.stringify(response.data.staff));

        // ✅ Redirect to staff portal
        window.location.href = "/staff-portal";
      } else {
        setError(response.data.message || "Invalid Email or Password!");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#dfe3e6" }}
    >
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <div className="text-center mb-3">
          <h3>
            <b>Bursary Staff</b> Login
          </h3>
          <p className="text-muted">Sign in to start your session</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <b>Email</b>
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Password</b>
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-warning">
              Forgot Password?
            </button>
            <button type="submit" className="btn btn-success">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffLogin;
