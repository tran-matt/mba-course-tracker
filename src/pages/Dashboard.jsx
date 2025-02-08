import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"; // Import external CSS file

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        console.log("Fetching student data...");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data); // Debugging API response
        setStudent(response.data);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError(err.response?.data?.msg || "Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [token]);

  useEffect(() => {
    console.log("Student Data:", student);
    console.log("Loading State:", loading);
    console.log("Error State:", error);
  }, [student, loading, error]);

  if (!token) {
    return <p className="error">No token found. Please log in.</p>;
  }

  return (
    <div className="dashboard-container">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : student ? (
        <div className="dashboard-content">
          <h1 className="dashboard-title">Welcome, {student.name}!</h1>

          <div className="dashboard-sections">
            {/* Progress Bar */}
            <div className="dashboard-card">
              <h2>Progress</h2>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(student.creditsCompleted / 60) * 100}%` }}
                ></div>
              </div>
              <p>{student.creditsCompleted} / 60 credits completed</p>
            </div>

            {/* Completed/In-Progress Courses */}
            <div className="dashboard-card">
              <h2>Completed/In-Progress Courses</h2>
              {student.completedCourses?.length > 0 ? (
                <ul>
                  {student.completedCourses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              ) : (
                <p>None</p>
              )}
            </div>

            {/* Upcoming Semester Courses */}
            <div className="dashboard-card">
              <h2>Upcoming Semester Courses</h2>
              {student.upcomingCourses?.length > 0 ? (
                <ul>
                  {student.upcomingCourses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              ) : (
                <p>None</p>
              )}
            </div>

            {/* Alerts */}
            <div className="dashboard-card">
              <h2>Alerts</h2>
              {student.alerts?.length > 0 ? (
                <ul>
                  {student.alerts.map((alert, index) => (
                    <li key={index}>{alert}</li>
                  ))}
                </ul>
              ) : (
                <p>None</p>
              )}
            </div>

            {/* Quick Links */}
            <div className="dashboard-card">
              <h2>Quick Links</h2>
              <ul>
                <li>
                  <a href="/courses">View Courses</a>
                </li>
                <li>
                  <a href="/progress">Track Progress</a>
                </li>
                <li>
                  <a href="/alerts">View Alerts</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p className="error">Unauthorized. Please log in.</p>
      )}
    </div>
  );
};

export default Dashboard;
