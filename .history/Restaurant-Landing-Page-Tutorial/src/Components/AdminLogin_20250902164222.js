import React, { useState } from "react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // For demo, accept username: coach, password: coachpass
    if (username === "coach" && password === "coachpass") {
      setSuccess("Welcome, Coach!");
    } else {
      setError("Invalid coach credentials.");
    }
  };

  return (
    <div className="register-container swimmer-register-card">
      <h2 className="primary-heading" style={{marginBottom: '1.5rem'}}>Coach Login</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <table className="register-table">
          <tbody>
            <tr>
              <td><label htmlFor="username">Coach Username</label></td>
              <td><input id="username" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required /></td>
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

export default AdminLogin;
