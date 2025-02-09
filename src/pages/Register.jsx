import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    graduationYear: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "graduationYear") {
      const currentYear = new Date().getFullYear();
      // Allow only numeric values and validate range
      if (/^\d*$/.test(value) && (value === "" || (value >= currentYear && value <= 2500))) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await API.post("/api/auth/register", {
        ...formData,
        graduationYear: parseInt(formData.graduationYear, 10),
      });

      if (response.status === 201) {
        setSuccess(true);
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Page Title */}
        <h2 className="register-title">Register</h2>
        <p className="register-subtitle">
          Already have an account?{" "}
          <a href="/login" className="login-link">Login</a>
        </p>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Registration successful!</div>}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter a password"
            />
          </div>

          <div className="input-group">
            <label htmlFor="graduationYear">Graduation Year</label>
            <input
              type="text"
              id="graduationYear"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              required
              placeholder="Enter your graduation year"
            />
          </div>

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
