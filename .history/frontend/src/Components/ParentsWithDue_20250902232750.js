import React, { useEffect, useState } from "react";
import axios from "axios";

const ParentsWithDue = () => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/parents-with-due")
      .then(res => {
        setParents(res.data.parents || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch parents with due.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div className="register-container swimmer-register-card">
      <h2 className="primary-heading" style={{marginBottom: '1.5rem'}}>Parents With Due Payments</h2>
      {parents.length === 0 ? (
        <div>All accounts are paid up!</div>
      ) : (
        <table className="register-table">
          <thead>
            <tr>
              <th>Parent Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Due Amount</th>
            </tr>
          </thead>
          <tbody>
            {parents.map((parent, idx) => (
              <tr key={idx}>
                <td>{parent.name}</td>
                <td>{parent.email}</td>
                <td>{parent.phone}</td>
                <td style={{color: 'red', fontWeight: 600}}>${parent.due || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ParentsWithDue;
