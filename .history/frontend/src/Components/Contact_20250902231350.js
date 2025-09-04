import React from "react";
import FindDirections from "./FindDirections";


const Contact = () => {
  return (
    <div className="contact-page-wrapper" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: 40, minHeight: 500 }}>
      {/* Left side: Contact form and headings */}
      <div style={{ flexBasis: '20%', maxWidth: '20%', minWidth: 120 }}>
        <h2 className="primary-heading" style={{ fontSize: '1.3rem', marginBottom: 8 }}>Have Question In Mind?</h2>
        <h2 className="primary-heading" style={{ fontSize: '1.3rem', marginBottom: 18 }}>Let Us Help You</h2>
        <div className="contact-form-container" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input type="text" placeholder="yourmail@gmail.com" style={{ marginBottom: 12 }} />
          <button className="secondary-button" style={{ alignSelf: 'flex-start', marginTop: 8 }}>Submit</button>
        </div>
      </div>
  {/* Right side: FindDirections */}
  <div style={{ flexBasis: '80%', maxWidth: '80%', minWidth: 340 }}>
        <FindDirections />
      </div>
  
  );
};

export default Contact;
