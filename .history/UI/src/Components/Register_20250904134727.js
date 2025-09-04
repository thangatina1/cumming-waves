import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name.trim()) {
      setError("Please enter the swimmer's name.");
      return;
    }
    if (!age || isNaN(age) || age < 3 || age > 100) {
      setError("Please enter a valid age (3-100).");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSuccess(`Registration successful! Welcome, ${name}.`);
    setName("");
    setAge("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-container">
      <h2 className="primary-heading" style={{marginBottom: 24}}>Register New Swimmer</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          id="age"
          type="number"
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
          min="3"
          max="100"
          required
        />
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: 8 }}>{success}</div>}
        <button className="primary-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
