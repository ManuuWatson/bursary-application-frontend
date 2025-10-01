// ✅ Modern & Responsive Login.js with Header & Footer
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  const [id_number, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        id_number,
        password,
      });

      localStorage.setItem('token', response.data.access);
      navigate('/student-dashboard');
    } catch (error) {
      if (error.response?.status === 401) {
        alert('ID number or password is incorrect');
      } else {
        alert(error.response?.data?.detail || 'Login failed');
      }
      console.error(error);
    }
  };

  return (
    <>
      {/* ✅ Header */}
      <Header />

      <div
        className="d-flex align-items-center justify-content-center vh-100"
        style={{
          backgroundColor: '#ffffff', // ✅ White background
          padding: '20px',
        }}
      >
        <div
          className="card shadow-lg border-0 rounded-4 p-4"
          style={{ maxWidth: '420px', width: '100%' }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Welcome Back</h2>
            <p className="text-muted">Log in to access your account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold">ID Number</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter your ID Number"
                value={id_number}
                onChange={(e) => setIdNumber(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 mb-3 shadow-sm"
            >
              Login
            </button>
          </form>

          <div className="text-center">
            <small className="text-muted">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="text-decoration-none fw-semibold text-primary"
              >
                Register here
              </Link>
            </small>
          </div>
        </div>
      </div>

      {/* ✅ Footer */}
      <Footer />
    </>
  );
}

export default Login;
