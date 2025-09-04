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
      // Parent login endpoint (simulate: find parent by email/password)
      const res = await fetch("http://127.0.0.1:27017/parent-login-mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      // For demo, simulate parent fetch from DB
      // Replace with real backend call in production
      if (email === "alice@example.com" && password === "alicepass") {
        const parentData = {
          name: "Alice Johnson",
          email: "alice@example.com",
          phone: "555-1200",
          address: "123 Main St",
          city: "Cumming",
          state: "GA",
          zip: "30040"
        };
        const swimmersData = [
          { _id: 1, name: "Sophie Johnson", age: 12, email: "sophie@example.com" },
          { _id: 2, name: "Ben Johnson", age: 9, email: "ben@example.com" }
        ];
        setParent(parentData);
        setSwimmers(swimmersData);
      } else if (email === "bob@example.com" && password === "bobpass") {
        const parentData = {
          name: "Bob Smith",
          email: "bob@example.com",
          phone: "555-1201",
          address: "101 Main St",
          city: "Cumming",
          state: "GA",
          zip: "30041"
        };
        const swimmersData = [
          { _id: 3, name: "Ella Smith", age: 10, email: "ella@example.com" }
        ];
        setParent(parentData);
        setSwimmers(swimmersData);
      } else {
        setError("Invalid parent credentials.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  if (parent) {
    return <ParentHome parent={parent} swimmers={swimmers} />;
  }

  return (
    <div className="register-container swimmer-register-card">
      <h2 className="primary-heading" style={{marginBottom: '1.5rem'}}>Parent Login</h2>
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
      </form>
    </div>
  );
};

export default Login;
