import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignUp.css";

function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", form);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="name-fields">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/">Sign in</Link>
          Already have an account? <Link to="/authors">Authors</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
