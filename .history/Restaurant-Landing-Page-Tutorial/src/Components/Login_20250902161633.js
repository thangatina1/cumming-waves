import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        setSuccess("Login successful! Welcome " + data.name);
        // You can store token or user info here if needed
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="register-container swimmer-register-card">
      <h2 className="primary-heading" style={{marginBottom: '1.5rem'}}>Swimmer Login</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <table className="register-table">
          <tbody>
            <tr>
              <td><label htmlFor="email">Email</label></td>
              <td><input id="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="password">Password</label></td>
              <td><input id="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="primary-button" style={{marginTop: '1.5rem'}}>Login</button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: 10 }}>{success}</div>}
      </form>
    </div>
  );
};

export default Login;
