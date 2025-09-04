import React from "react";
import { useNavigate } from "react-router-dom";


{/* Publish Swim Meet Details Tile */}
        <div
          style={{
            background: '#fffbe5',
            border: '2px solid #faad14',
            borderRadius: 18,
            padding: '1.5rem 1rem 1.2rem 1rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#ad6800',
            boxShadow: '0 4px 16px rgba(250,173,20,0.10)',
            width: '100%',
            minHeight: 120,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transition: 'box-shadow 0.2s',
            gap: 24
          }}
          onClick={() => alert('Publish Swim Meet Details feature coming soon!')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2917/2917997.png"
            alt="Publish Swim Meet Details Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #ffe7b3', marginRight: 18 }}
          />
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>Publish Swim Meet Details</span>
            <span style={{fontSize: '0.98rem', color: '#ad6800', opacity: 0.7, marginTop: 4, textAlign: 'left'}}>Share upcoming swim meet information with parents</span>
          </div>
        </div>


const CoachHome = () => {
  const navigate = useNavigate();
  return (
    <div className="register-container swimmer-register-card" style={{maxWidth: 500, margin: '0 auto', textAlign: 'center'}}>
      <h2 className="primary-heading" style={{marginBottom: '2rem'}}>Coach Home</h2>
  <div style={{display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'stretch', width: '100%'}}>
        {/* Parents with Due Tile */}
        <div
          style={{
            background: '#ffe5e5',
            border: '2px solid #ff4d4f',
            borderRadius: 18,
            padding: '1.5rem 1rem 1.2rem 1rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#b30000',
            boxShadow: '0 4px 16px rgba(255,77,79,0.10)',
            width: '100%',
            minHeight: 120,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transition: 'box-shadow 0.2s',
            gap: 24
          }}
          onClick={() => navigate('/parents-with-due')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Parents Due Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #ffb3b3', marginRight: 18 }}
          />
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>Parents with Due</span>
            <span style={{fontSize: '0.98rem', color: '#b30000', opacity: 0.7, marginTop: 4, textAlign: 'left'}}>View all parents who have outstanding payments</span>
          </div>
        </div>
        {/* Announce All Parents Tile */}
        <div
          style={{
            background: '#e5f3ff',
            border: '2px solid #1890ff',
            borderRadius: 18,
            padding: '1.5rem 1rem 1.2rem 1rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#0050b3',
            boxShadow: '0 4px 16px rgba(24,144,255,0.10)',
            width: '100%',
            minHeight: 120,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transition: 'box-shadow 0.2s',
            gap: 24
          }}
          onClick={() => alert('Announce All Parents feature coming soon!')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png"
            alt="Announce All Parents Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #b3d8ff', marginRight: 18 }}
          />
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>Announce All Parents</span>
            <span style={{fontSize: '0.98rem', color: '#0050b3', opacity: 0.7, marginTop: 4, textAlign: 'left'}}>Send an announcement to all parents</span>
          </div>
        </div>

        {/* Edit Year Calendar Tile */}
        <div
          style={{
            background: '#e8ffe5',
            border: '2px solid #52c41a',
            borderRadius: 18,
            padding: '1.5rem 1rem 1.2rem 1rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#237804',
            boxShadow: '0 4px 16px rgba(82,196,26,0.10)',
            width: '100%',
            minHeight: 120,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transition: 'box-shadow 0.2s',
            gap: 24
          }}
          onClick={() => alert('Edit Year Calendar feature coming soon!')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
            alt="Edit Year Calendar Thumbnail"
            style={{ width: 70, height: 70, objectFit: 'contain', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #b3ffb3', marginRight: 18 }}
          />
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <span style={{fontSize: '1.15rem', fontWeight: 700, marginBottom: 8}}>Edit the Year Calendar</span>
            <span style={{fontSize: '0.98rem', color: '#237804', opacity: 0.7, marginTop: 4, textAlign: 'left'}}>Update the swim team calendar for the year</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachHome;
