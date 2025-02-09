import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/api/auth/forgot-password", { email });
      setMessage(response.data.message); // Success message from backend
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background-color">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-center text-3xl font-bold text-primary mb-6">Forgot Password</h2>

        {message && <div className="text-green-500 text-center mb-4">{message}</div>}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted">Enter your email</label>
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

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-hover-color focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-4">
          <button onClick={() => navigate("/login")} className="text-sm text-muted hover:text-secondary">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
