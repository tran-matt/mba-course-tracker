import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import HowardLogo from "../assets/howardlogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token); // Save token to localStorage
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background-color">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={HowardLogo} alt="University Logo" className="h-12 w-12" />
        </div>

        {/* Page Title */}
        <h2 className="text-center text-3xl font-bold text-primary mb-6">Login</h2>

        {/* Error Message */}
        {error && <div className="text-center text-sm text-secondary mb-4">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-muted">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-hover-color focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-sm text-muted hover:text-secondary">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
