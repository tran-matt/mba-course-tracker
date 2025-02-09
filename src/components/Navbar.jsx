import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <nav className="bg-primary text-accent p-4 shadow-md">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <a
      href="https://business.howard.edu/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3"
    >
      <img src={HowardLogo} alt="University Logo" className="h-10 w-10" />
      <span className="text-lg font-semibold">Howard University School of Business</span>
    </a>

    <div className="space-x-4 sm:flex sm:space-x-0 sm:flex-col sm:space-y-4">
      {!token ? (
        <>
          <Link to="/login" className="text-accent hover:text-secondary">Login</Link>
          <Link to="/register" className="text-accent hover:text-secondary">Register</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard" className="text-accent hover:text-secondary">Dashboard</Link>
          <button
            onClick={handleLogout}
            className="text-accent hover:text-secondary focus:outline-none"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </div>
</nav>

  );
};

export default Navbar;
