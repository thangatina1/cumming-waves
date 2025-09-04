import React, { useState } from "react";


const profilePicStyle = {
  width: 60,
  height: 60,
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid #0077b6',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
};

const ParentHome = ({ parent, swimmers }) => {
  return (
    <div className="register-container swimmer-register-card" style={{position: 'relative'}}>
      {/* Parent profile picture in top right */}
      <img
        src={parent.profilePic || 'https://randomuser.me/api/portraits/lego/1.jpg'}
        alt="Parent Profile"
        style={{...profilePicStyle, position: 'absolute', top: 20, right: 20, width: 70, height: 70, border: '3px solid #0077b6'}}
      />
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
            <th>Swimmer</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {swimmers.map(swimmer => (
            <tr key={swimmer._id}>
              <td style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <img
                  src={swimmer.profilePic || 'https://randomuser.me/api/portraits/lego/2.jpg'}
                  alt="Swimmer Profile"
                  style={profilePicStyle}
                />
                <span style={{fontWeight: 500}}>{swimmer.name}</span>
              </td>
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
