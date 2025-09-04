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
    <div className="register-container swimmer-register-card">
      <h2 className="primary-heading" style={{marginBottom: '1.5rem'}}>Register New Swimmer</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <table className="register-table">
          <tbody>
            <tr>
              <td><label htmlFor="name">Full Name</label></td>
              <td><input id="name" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="age">Age</label></td>
              <td><input id="age" type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} min="3" max="100" required /></td>
            </tr>
            <tr>
              <td><label htmlFor="email">Email</label></td>
              <td><input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="password">Password</label></td>
              <td><input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="confirmPassword">Confirm Password</label></td>
              <td><input id="confirmPassword" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="primary-button" style={{marginTop: '1.5rem'}}>Register</button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: 10 }}>{success}</div>}
      </form>
    </div>
  );
};

export default Register;
