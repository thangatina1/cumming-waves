import React, { useState } from "react";
import "../Styles/CoachLogin.css";

const CoachLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: Accept any credentials
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    // Redirect to coach home (simulate login)
    window.location.href = "/coach-home";
  };

  return (
    <div className="login-container">
      <h2 className="primary-heading" style={{marginBottom: 24}}>Coach Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div style={{color: 'red', marginBottom: 8}}>{error}</div>}
        <button className="primary-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default CoachLogin;
