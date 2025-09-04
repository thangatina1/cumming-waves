
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
  <div className="register-container swimmer-register-card" style={{position: 'relative', width: '100%', textAlign: 'left', padding: '2.5rem 2.5rem 2rem 2.5rem', boxSizing: 'border-box'}}>
      {/* Profile picture and signout in absolute top right, like ParentHome */}
      <div style={{position: 'absolute', top: 20, right: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
      <h2 className="primary-heading" style={{marginBottom: '1.5rem'}}>Welcome, {COACH_PROFILE.name}!</h2>
      <div style={{marginBottom: '1rem'}}>
        <strong>Email:</strong> {COACH_PROFILE.email}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 24,
        alignItems: 'stretch',
        width: '100%',
        paddingBottom: 12,
        minHeight: 220,
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
            flex: '1 1 320px',
            minWidth: 260,
            maxWidth: 420,
            minHeight: 210,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transition: 'box-shadow 0.2s',
            gap: 12,
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
            flex: '1 1 320px',
            minWidth: 260,
            maxWidth: 420,
            minHeight: 210,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transition: 'box-shadow 0.2s',
            gap: 12,
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
            flex: '1 1 320px',
            minWidth: 260,
            maxWidth: 420,
            minHeight: 210,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transition: 'box-shadow 0.2s',
            gap: 12,
          }}
// Repeat the same flex: '1 1 320px', minWidth, maxWidth, minHeight, height: '100%' for all new tiles added previously
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

        {/* Add Swim Meet Tile */}
        <div
          style={{
            background: '#fff0f6',
            border: '2px solid #d72660',
            borderRadius: 18,
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#a61e4d',
            boxShadow: '0 4px 16px rgba(215,38,96,0.10)',
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
          onClick={() => alert('Add Swim Meet feature coming soon!')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2917/2917997.png"
            alt="Add Swim Meet Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #ffd6e0', marginBottom: 18 }}
          />
          <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>Add Swim Meet</span>
          <span style={{fontSize: '0.98rem', color: '#a61e4d', opacity: 0.7, marginTop: 4, textAlign: 'center'}}>Create and publish a new swim meet</span>
        </div>

        {/* Swimmer Analytics Tile */}
        <div
          style={{
            background: '#e6f7ff',
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
          onClick={() => alert('Swimmer Analytics feature coming soon!')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Swimmer Analytics Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #b3d8ff', marginBottom: 18 }}
          />
          <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>Swimmer Analytics</span>
          <span style={{fontSize: '0.98rem', color: '#0050b3', opacity: 0.7, marginTop: 4, textAlign: 'center'}}>View swimmer stats and analytics</span>
        </div>

        {/* Add Team Spirit Wear Tile */}
        <div
          style={{
            background: '#f0fff0',
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
          onClick={() => alert('Add Team Spirit Wear feature coming soon!')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/892/892458.png"
            alt="Team Spirit Wear Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #b3ffb3', marginBottom: 18 }}
          />
          <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>Add Team Spirit Wear</span>
          <span style={{fontSize: '0.98rem', color: '#237804', opacity: 0.7, marginTop: 4, textAlign: 'center'}}>Add and manage team spirit wear</span>
        </div>

        {/* Create New Year Registration Tile */}
        <div
          style={{
            background: '#fffbe6',
            border: '2px solid #faad14',
            borderRadius: 18,
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#ad6800',
            boxShadow: '0 4px 16px rgba(250,173,20,0.10)',
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
          onClick={() => alert('Create New Year Registration feature coming soon!')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
            alt="New Year Registration Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #ffe7b3', marginBottom: 18 }}
          />
          <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>Create New Year Registration</span>
          <span style={{fontSize: '0.98rem', color: '#ad6800', opacity: 0.7, marginTop: 4, textAlign: 'center'}}>Start registration for the new year</span>
        </div>

        {/* View Active vs Inactive Swimmers Tile */}
        <div
          style={{
            background: '#f0f5ff',
            border: '2px solid #2f54eb',
            borderRadius: 18,
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#1d39c4',
            boxShadow: '0 4px 16px rgba(47,84,235,0.10)',
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
          onClick={() => alert('View Active vs Inactive Swimmers feature coming soon!')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
            alt="Active vs Inactive Swimmers Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #b3d8ff', marginBottom: 18 }}
          />
          <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>View Active vs Inactive Swimmers</span>
          <span style={{fontSize: '0.98rem', color: '#1d39c4', opacity: 0.7, marginTop: 4, textAlign: 'center'}}>Compare active and inactive swimmers</span>
        </div>

        {/* AI Assistant Coach Tile */}
        <div
          style={{
            background: '#f9f0ff',
            border: '2px solid #722ed1',
            borderRadius: 18,
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#391085',
            boxShadow: '0 4px 16px rgba(114,46,209,0.10)',
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
          onClick={() => alert('AI Assistant Coach feature coming soon!')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
            alt="AI Assistant Coach Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #d3b3ff', marginBottom: 18 }}
          />
          <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>AI Assistant Coach</span>
          <span style={{fontSize: '0.98rem', color: '#391085', opacity: 0.7, marginTop: 4, textAlign: 'center'}}>Get help from your AI assistant coach</span>
        </div>
      </div>
    </div>
  );
};

export default CoachHome;
