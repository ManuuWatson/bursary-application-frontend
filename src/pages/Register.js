import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "../components/Header";
import Footer from "../components/Footer";

function Register() {
  const [full_name, setFullName] = useState('');
  const [id_number, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register/', {
        full_name,
        id_number,
        password,
      });

      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Registration failed';

      alert(errorMessage);
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      {/* ✅ Header added */}
      <Header />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-10">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <h2 className="text-center mb-3 fw-bold text-primary">Create an Account</h2>
                <p className="text-center text-muted mb-4">
                  Fill in the details below to get started.
                </p>
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter your full name"
                      value={full_name}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">ID Number</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter your ID number"
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
                  <button type="submit" className="btn btn-success btn-lg w-100 mb-3">
                    Register
                  </button>
                </form>
                <div className="text-center">
                  <small className="text-muted">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none fw-semibold text-primary">
                      Login here
                    </Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Footer added */}
      <Footer />
    </>
  );
}

export default Register;
