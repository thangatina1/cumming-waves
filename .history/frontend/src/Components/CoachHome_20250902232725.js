import React from "react";
import { useNavigate } from "react-router-dom";

const CoachHome = () => {
  const navigate = useNavigate();
  return (
    <div className="register-container swimmer-register-card" style={{maxWidth: 500, margin: '0 auto', textAlign: 'center'}}>
      <h2 className="primary-heading" style={{marginBottom: '2rem'}}>Coach Home</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
        <div
          style={{
            background: '#ffe5e5',
            border: '2px solid #ff4d4f',
            borderRadius: 10,
            padding: '2rem 1rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.2rem',
            color: '#b30000',
            boxShadow: '0 2px 8px rgba(255,77,79,0.08)'
          }}
          onClick={() => navigate('/parents-with-due')}
        >
          Parents with Due
        </div>
        {/* Add more tiles here for other coach features if needed */}
      </div>
    </div>
  );
};

export default CoachHome;
