import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const profilePicStyle = {
  width: 60,
  height: 60,
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid #0077b6',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
};

const ParentHome = ({ parent, swimmers }) => {
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await fetch("http://127.0.0.1:8000/parent-signout", { method: "POST" });
    } catch (e) {}
    navigate("/");
  };

  return (
    <div className="register-container swimmer-register-card" style={{position: 'relative'}}>
      {/* Parent profile picture in top right */}
      <div style={{position: 'absolute', top: 20, right: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <img
          src={parent.profilePic || 'https://randomuser.me/api/portraits/lego/1.jpg'}
          alt="Parent Profile"
          style={{...profilePicStyle, width: 70, height: 70, border: '3px solid #0077b6'}}
        />
        <button
          className="primary-button"
          style={{marginTop: 10, padding: '0.4rem 1.2rem', fontSize: '1rem'}}
          onClick={handleSignOut}
          disabled={signingOut}
        >
          {signingOut ? "Signing Out..." : "Sign Out"}
        </button>
      </div>
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
