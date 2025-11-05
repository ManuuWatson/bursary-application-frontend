// ✅ StudentDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [course, setCourse] = useState("");
  const [reason, setReason] = useState("");
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const token = localStorage.getItem("token");

  // ---- Fetch Student Profile + Applications ----
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, appsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/student/protected/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/api/student/applications/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUserData(profileRes.data);
        setApplications(appsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [token]);

  // ---- Handle Apply ----
  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/student/apply/",
        { course, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Application submitted successfully!");

      // refresh applications list
      const res = await axios.get("http://localhost:8000/api/student/applications/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);

      setCourse("");
      setReason("");
      setActivePage("status"); // go to status page after applying
    } catch (err) {
      console.error("Failed to submit application", err);
      alert("❌ Failed to submit application!");
    }
  };

  // ---- Dashboard counts ----
  const totalApplications = applications.length;
  const pendingApplications = applications.filter((a) => a.status === "pending").length;
  const approvedApplications = applications.filter((a) => a.status === "approved").length;
  const totalAllocated = applications
    .filter((a) => a.amount_allocated)
    .reduce((sum, a) => sum + parseFloat(a.amount_allocated), 0);

  // ---- Render Content ----
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <h4 className="mb-4">📊 Dashboard Overview</h4>
            <div className="row g-4">
              <DashboardCard title="Total Applications" value={totalApplications} color="primary" />
              <DashboardCard title="Amount Allocated" value={`KES ${totalAllocated}`} color="success" />
              <DashboardCard title="Pending" value={pendingApplications} color="warning" />
              <DashboardCard title="Approved" value={approvedApplications} color="info" />
            </div>

            {/* Student Info */}
            <div className="card shadow-sm border-0 mt-4">
              <div className="card-body">
                <h5>👤 Student Information</h5>
                <p><strong>Name:</strong> {userData?.full_name}</p>
                <p><strong>ID Number:</strong> {userData?.id_number}</p>
              </div>
            </div>
          </>
        );

      case "apply":
        return (
          <div>
            <h4 className="mb-4">📝 Apply for Application</h4>
            <form className="card p-3 shadow-sm border-0" onSubmit={handleApply}>
              <div className="mb-3">
                <label className="form-label">Course</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Reason</label>
                <textarea
                  className="form-control"
                  placeholder="Enter reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
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
                  <th>Course</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.length > 0 ? (
                  applications.map((app, idx) => (
                    <tr key={app.id}>
                      <td>{idx + 1}</td>
                      <td>{app.course}</td>
                      <td>{app.reason}</td>
                      <td>
                        <span
                          className={`badge ${
                            app.status === "approved"
                              ? "bg-success"
                              : app.status === "pending"
                              ? "bg-warning"
                              : "bg-danger"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td>{app.amount_allocated ? `KES ${app.amount_allocated}` : "-"}</td>
                      <td>{new Date(app.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );

      case "payment":
        return (
          <div>
            <h4 className="mb-4">💳 Payments</h4>
            <p className="text-muted">💡 Payments will be linked once staff allocates funds.</p>
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
        {/* Navigation */}
        <ul className="nav flex-column flex-grow-1 mt-3">
          <SidebarButton label="📊 Dashboard" onClick={() => setActivePage("dashboard")} />
          <li className="nav-item mb-2">
            <button
              className="btn btn-link text-white text-start w-100 px-0"
              onClick={() => setShowSubmenu(!showSubmenu)}
            >
              📝 Applications {showSubmenu ? "▲" : "▼"}
            </button>
            {showSubmenu && (
              <ul className="nav flex-column ms-3">
                <SidebarButton label="➤ Apply" onClick={() => setActivePage("apply")} small />
                <SidebarButton label="➤ Status" onClick={() => setActivePage("status")} small />
                <SidebarButton label="➤ Payment" onClick={() => setActivePage("payment")} small />
              </ul>
            )}
          </li>
          <SidebarButton label="📢 Notifications" onClick={() => setActivePage("notifications")} />
        </ul>

        {/* Logout */}
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

// Reusable Sidebar Button
const SidebarButton = ({ label, onClick, small }) => (
  <li className="nav-item mb-2">
    <button
      className={`btn btn-link text-white text-start w-100 px-0 ${small ? "small" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  </li>
);

// Reusable Dashboard Card
const DashboardCard = ({ title, value, color }) => (
  <div className="col-md-3">
    <div className="card shadow-sm text-center border-0">
      <div className="card-body">
        <h6 className="text-muted">{title}</h6>
        <h3 className={`fw-bold text-${color}`}>{value}</h3>
      </div>
    </div>
  </div>
);

export default StudentDashboard;
