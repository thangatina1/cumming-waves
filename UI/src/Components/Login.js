import React, { useState } from "react";
import ParentHome from "./ParentHome";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [parent, setParent] = useState(null);
  const [swimmers, setSwimmers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setParent(null);
    setSwimmers([]);
    try {
      const res = await fetch("http://127.0.0.1:8000/parent-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid parent credentials.");
        return;
      }
      setParent(data.parent);
      setSwimmers(data.swimmers);
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  if (parent) {
    return <ParentHome parent={parent} swimmers={swimmers} />;
  }

  return (
    <div className="login-container">
      <h2 className="primary-heading" style={{marginBottom: 24}}>Parent Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        <button className="primary-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
