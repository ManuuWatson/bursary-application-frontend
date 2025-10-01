import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [showSubmenu, setShowSubmenu] = useState(false); // toggle submenu
  const [activePage, setActivePage] = useState("dashboard"); // track active content

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/student/protected/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch protected data:", error);
      }
    };
    fetchProtectedData();
  }, []);

  // ---- Content to render based on activePage ----
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <h4 className="mb-4">📊 Dashboard Overview</h4>
            <div className="row g-4">
              <div className="col-md-3">
                <div className="card shadow-sm text-center border-0">
                  <div className="card-body">
                    <h6 className="text-muted">Total Applications</h6>
                    <h3 className="fw-bold">
                      {userData?.totalApplications ?? 0}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow-sm text-center border-0">
                  <div className="card-body">
                    <h6 className="text-muted">Amount Allocated</h6>
                    <h3 className="fw-bold text-success">
                      {userData?.amountAllocated ?? 0}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow-sm text-center border-0">
                  <div className="card-body">
                    <h6 className="text-muted">Pending</h6>
                    <h3 className="fw-bold text-warning">
                      {userData?.pendingApplications ?? 0}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow-sm text-center border-0">
                  <div className="card-body">
                    <h6 className="text-muted">Approved</h6>
                    <h3 className="fw-bold text-primary">
                      {userData?.approvedApplications ?? 0}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Info */}
            <div className="card shadow-sm border-0 mt-4">
              <div className="card-body">
                <h5>👤 Student Information</h5>
                <p><strong>Name:</strong> {userData?.name}</p>
                <p><strong>Email:</strong> {userData?.email}</p>
                <p><strong>Student ID:</strong> {userData?.studentId}</p>
              </div>
            </div>
          </>
        );

      case "apply":
        return (
          <div>
            <h4 className="mb-4">📝 Apply for Application</h4>
            <form className="card p-3 shadow-sm border-0">
              <div className="mb-3">
                <label className="form-label">Course</label>
                <input type="text" className="form-control" placeholder="Enter course" />
              </div>
              <div className="mb-3">
                <label className="form-label">Reason</label>
                <textarea className="form-control" placeholder="Enter reason"></textarea>
              </div>
              <button className="btn btn-primary">Submit Application</button>
            </form>
          </div>
        );

      case "status":
        return (
          <div>
            <h4 className="mb-4">📌 Application Status</h4>
            <table className="table table-striped shadow-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Application</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Bursary Request</td>
                  <td><span className="badge bg-warning">Pending</span></td>
                  <td>2025-08-01</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Scholarship Aid</td>
                  <td><span className="badge bg-success">Approved</span></td>
                  <td>2025-07-15</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "payment":
        return (
          <div>
            <h4 className="mb-4">💳 Payments</h4>
            <ul className="list-group shadow-sm">
              <li className="list-group-item">
                Payment of Ksh 5,000 - <span className="text-success">Completed</span>
              </li>
              <li className="list-group-item">
                Payment of Ksh 2,500 - <span className="text-danger">Pending</span>
              </li>
            </ul>
          </div>
        );

      case "notifications":
        return (
          <div>
            <h4 className="mb-4">📢 Notifications</h4>
            <div className="alert alert-info shadow-sm">
              Your bursary application is under review.
            </div>
            <div className="alert alert-success shadow-sm">
              Your scholarship has been approved 🎉
            </div>
          </div>
        );

      default:
        return <h4>Welcome to the Student Portal</h4>;
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3 d-flex flex-column"
        style={{ width: "250px" }}
      >
        {/* Sidebar Message */}
        {userData?.message && (
          <div className="alert alert-info shadow-sm rounded-3 text-dark small">
            {userData.message}
          </div>
        )}

        {/* Navigation */}
        <ul className="nav flex-column flex-grow-1 mt-3">
          <li className="nav-item mb-2">
            <button
              className="btn btn-link text-white text-start w-100 px-0"
              onClick={() => setActivePage("dashboard")}
            >
              📊 Dashboard
            </button>
          </li>

          {/* Applications with submenu */}
          <li className="nav-item mb-2">
            <button
              className="btn btn-link text-white text-start w-100 px-0"
              onClick={() => setShowSubmenu(!showSubmenu)}
            >
              📝 Applications {showSubmenu ? "▲" : "▼"}
            </button>
            {showSubmenu && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item mb-1">
                  <button
                    className="btn btn-link text-white small text-start w-100 px-0"
                    onClick={() => setActivePage("apply")}
                  >
                    ➤ Apply
                  </button>
                </li>
                <li className="nav-item mb-1">
                  <button
                    className="btn btn-link text-white small text-start w-100 px-0"
                    onClick={() => setActivePage("status")}
                  >
                    ➤ Status
                  </button>
                </li>
                <li className="nav-item mb-1">
                  <button
                    className="btn btn-link text-white small text-start w-100 px-0"
                    onClick={() => setActivePage("payment")}
                  >
                    ➤ Payment
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* Notifications */}
          <li className="nav-item mb-2">
            <button
              className="btn btn-link text-white text-start w-100 px-0"
              onClick={() => setActivePage("notifications")}
            >
              📢 Notifications
            </button>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          className="btn btn-outline-danger w-100 mt-auto"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">{renderContent()}</div>
    </div>
  );
};

export default StudentDashboard;
