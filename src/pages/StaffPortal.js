// ✅ StaffPortal.js (Protected Staff Dashboard)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function StaffPortal() {
  const navigate = useNavigate();
  const [staffInfo, setStaffInfo] = useState(null);

  useEffect(() => {
    // ✅ Check if staff is logged in
    const token = localStorage.getItem("staffToken");
    const staff = localStorage.getItem("staffInfo");

    if (!token || !staff) {
      // 🚨 Not logged in → redirect to login
      navigate("/staff-login");
    } else {
      setStaffInfo(JSON.parse(staff));
    }
  }, [navigate]);

  if (!staffInfo) {
    return <p className="text-center mt-5">Checking authentication...</p>;
  }

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="fw-bold text-center text-primary mb-4">
          👨‍💼 Welcome {staffInfo.full_name}
        </h2>

        {/* Dashboard Stats */}
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-3 text-center">
              <h5>Total Applications</h5>
              <h3 className="fw-bold text-primary">120</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-3 text-center">
              <h5>Pending</h5>
              <h3 className="fw-bold text-warning">45</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-3 text-center">
              <h5>Approved</h5>
              <h3 className="fw-bold text-success">60</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-3 text-center">
              <h5>Funds Allocated</h5>
              <h3 className="fw-bold text-dark">KES 1.2M</h3>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="card shadow-lg border-0 rounded-3">
          <div className="card-body">
            <h4 className="fw-bold text-secondary mb-3">Applications</h4>
            <table className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>ID Number</th>
                  <th>Status</th>
                  <th>Amount Allocated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>12345678</td>
                  <td><span className="badge bg-warning">Pending</span></td>
                  <td>-</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2">Approve</button>
                    <button className="btn btn-danger btn-sm me-2">Reject</button>
                    <button className="btn btn-info btn-sm">Allocate</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>87654321</td>
                  <td><span className="badge bg-success">Approved</span></td>
                  <td>KES 15,000</td>
                  <td>
                    <button className="btn btn-info btn-sm">Update Allocation</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StaffPortal;
