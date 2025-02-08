import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; 
import HowardLogo from "../assets/howardlogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* External Link to Howard University School of Business */}
      <a
        href="https://business.howard.edu/"
        target="_blank"
        rel="noopener noreferrer"
        className="navbar-logo"
      >
        <img src={HowardLogo} alt="University Logo" className="logo" />
        <span className="navbar-logo-text">Howard University School of Business</span>
      </a>

      <div className="navbar-links">
        {!token ? (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
