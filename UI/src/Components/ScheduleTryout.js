import React, { useState } from "react";

const ScheduleTryout = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!age || isNaN(age) || age < 3 || age > 100) {
      setError("Please enter a valid age (3-100).\n");
      return;
    }
    if (!gender) {
      setError("Please select a gender.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!date) {
      setError("Please select a tryout date.");
      return;
    }
    setSuccess(`Tryout scheduled for ${name} on ${date}. We will contact you soon!`);
    setName("");
    setAge("");
    setGender("");
    setEmail("");
    setDate("");
  };

  return (
    <div className="login-container">
      <h2 className="primary-heading" style={{marginBottom: 24}}>Schedule a Tryout</h2>
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
        <select
          id="gender"
          value={gender}
          onChange={e => setGender(e.target.value)}
          required
          style={{padding: '0.8rem 1.2rem', borderRadius: '2rem', border: '1px solid #b0c4de', fontSize: '1.1rem', outline: 'none', marginBottom: 8}}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          id="date"
          type="date"
          placeholder="Tryout Date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: 8 }}>{success}</div>}
        <button className="primary-button" type="submit">Schedule Tryout</button>
      </form>
    </div>
  );
};

export default ScheduleTryout;
