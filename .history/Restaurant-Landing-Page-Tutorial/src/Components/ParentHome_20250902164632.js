import React, { useState } from "react";

const ParentHome = ({ parent, swimmers }) => {
  return (
    <div className="register-container swimmer-register-card">
      <h2 className="primary-heading" style={{marginBottom: '1.5rem'}}>Welcome, {parent.name}!</h2>
      <div style={{marginBottom: '1rem'}}>
        <strong>Email:</strong> {parent.email}<br/>
        <strong>Phone:</strong> {parent.phone}<br/>
        <strong>Address:</strong> {parent.address}, {parent.city}, {parent.state} {parent.zip}
      </div>
      <h3 style={{marginBottom: '1rem'}}>Your Swimmers:</h3>
      <table className="register-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {swimmers.map(swimmer => (
            <tr key={swimmer._id}>
              <td>{swimmer.name}</td>
              <td>{swimmer.age}</td>
              <td>{swimmer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParentHome;
