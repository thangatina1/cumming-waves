
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const profilePicStyle = {
  width: 80,
  height: 80,
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2.5px solid #0077b6',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
};

const COACH_PROFILE = {
  name: 'Coach Admin',
  email: 'coach1@admin.com',
  profilePic: 'https://randomuser.me/api/portraits/men/99.jpg'
};

const CoachHome = () => {
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
    <div className="register-container swimmer-register-card" style={{maxWidth: 900, margin: '32px auto 0 auto', textAlign: 'left', width: '100%', padding: '2.5rem 2.5rem 2rem 2.5rem', boxSizing: 'border-box', position: 'relative'}}>
      {/* Header: Welcome message, profile, and signout all right-aligned */}
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 32, marginBottom: '1.5rem', width: '100%'}}>
        <h2 className="primary-heading" style={{margin: 0, fontWeight: 700, fontSize: '2rem', color: '#0077b6', whiteSpace: 'nowrap'}}>Welcome, {COACH_PROFILE.name}!</h2>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <img
            src={COACH_PROFILE.profilePic}
            alt="Coach Profile"
            style={{...profilePicStyle, width: 90, height: 90, border: '3.5px solid #0077b6'}}
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
      </div>
      <div style={{marginBottom: '1rem', textAlign: 'right'}}>
        <strong>Email:</strong> {COACH_PROFILE.email}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
        alignItems: 'stretch',
        width: '100%',
        overflowX: 'auto',
        paddingBottom: 12,
        scrollbarWidth: 'thin',
        scrollbarColor: '#0077b6 #e0e0e0'
      }}>
        {/* Parents with Due Tile */}
        <div
          style={{
            background: '#ffe5e5',
            border: '2px solid #ff4d4f',
            borderRadius: 18,
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#b30000',
            boxShadow: '0 4px 16px rgba(255,77,79,0.10)',
            width: 260,
            minWidth: 260,
            maxWidth: 260,
            minHeight: 210,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transition: 'box-shadow 0.2s',
            gap: 12,
            flex: '0 0 auto'
          }}
          onClick={() => navigate('/parents-with-due')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Parents Due Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #ffb3b3', marginBottom: 18 }}
          />
          <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>Parents with Due</span>
          <span style={{fontSize: '0.98rem', color: '#b30000', opacity: 0.7, marginTop: 4, textAlign: 'center'}}>View all parents who have outstanding payments</span>
        </div>
        {/* Announce All Parents Tile */}
        <div
          style={{
            background: '#e5f3ff',
            border: '2px solid #1890ff',
            borderRadius: 18,
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#0050b3',
            boxShadow: '0 4px 16px rgba(24,144,255,0.10)',
            width: 260,
            minWidth: 260,
            maxWidth: 260,
            minHeight: 210,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transition: 'box-shadow 0.2s',
            gap: 12,
            flex: '0 0 auto'
          }}
          onClick={() => alert('Announce All Parents feature coming soon!')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png"
            alt="Announce All Parents Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #b3d8ff', marginBottom: 18 }}
          />
          <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>Announce All Parents</span>
          <span style={{fontSize: '0.98rem', color: '#0050b3', opacity: 0.7, marginTop: 4, textAlign: 'center'}}>Send an announcement to all parents</span>
        </div>

        {/* Edit Year Calendar Tile */}
        <div
          style={{
            background: '#e8ffe5',
            border: '2px solid #52c41a',
            borderRadius: 18,
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#237804',
            boxShadow: '0 4px 16px rgba(82,196,26,0.10)',
            width: 260,
            minWidth: 260,
            maxWidth: 260,
            minHeight: 210,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transition: 'box-shadow 0.2s',
            gap: 12,
            flex: '0 0 auto'
          }}
          onClick={() => alert('Edit Year Calendar feature coming soon!')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
            alt="Edit Year Calendar Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #b3ffb3', marginBottom: 18 }}
          />
          <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>Edit the Year Calendar</span>
          <span style={{fontSize: '0.98rem', color: '#237804', opacity: 0.7, marginTop: 4, textAlign: 'center'}}>Update the swim team calendar for the year</span>
        </div>
      </div>
    </div>
  );
};

export default CoachHome;
