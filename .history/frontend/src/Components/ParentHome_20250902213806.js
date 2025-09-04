import React, { useState } from "react";
import { MdErrorOutline, MdCheckCircleOutline, MdRemoveRedEye } from "react-icons/md";
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

  const [showLog, setShowLog] = useState(null); // swimmer _id or null
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null); // 'card' or 'paypal'
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [paypalEmail, setPaypalEmail] = useState('');

  // Calculate account-level balance (sum of all due payments for all swimmers)
  const accountBalance = swimmers && swimmers.length > 0
    ? swimmers.reduce((acc, swimmer) => {
        if (swimmer.payment_log) {
          return acc + swimmer.payment_log.filter(entry => entry.status === 'Due').length * 185;
        }
        return acc;
      }, 0)
    : 0;

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
      {/* Account-level balance summary */}
      <div style={{
        marginBottom: '1.2rem',
        fontSize: '1.1rem',
        fontWeight: 500,
        color: accountBalance > 0 ? 'red' : 'green',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <span>
          Account Balance: {accountBalance > 0 ? `-$${accountBalance}` : '$0 (All Paid)'}
        </span>
        <button
          className="primary-button"
          style={{
            background: accountBalance > 0 ? '#0077b6' : '#ccc',
            color: 'white',
            fontWeight: 600,
            padding: '0.4rem 1.2rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: 6,
            cursor: accountBalance > 0 ? 'pointer' : 'not-allowed',
            opacity: accountBalance > 0 ? 1 : 0.6
          }}
          disabled={accountBalance === 0}
          onClick={() => {
            if (accountBalance > 0) {
              setShowPaymentOptions(true);
            }
          }}
        >
          Pay Now
        </button>
      </div>

      {/* Payment Options Modal/Section */}
      {showPaymentOptions && (
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: '2rem',
          marginBottom: '1.5rem',
          maxWidth: 420,
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
            <span style={{fontWeight: 600, fontSize: '1.15rem'}}>
              {selectedPayment === 'card' ? 'Credit / Debit Card Payment' : selectedPayment === 'paypal' ? 'PayPal Payment' : 'Choose Payment Method'}
            </span>
            <button onClick={() => { setShowPaymentOptions(false); setSelectedPayment(null); }} style={{background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#888'}}>✕</button>
          </div>
          {/* Payment method selection or form */}
          {!selectedPayment && (
            <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
              <button style={{
                background: '#fff',
                border: '1.5px solid #0077b6',
                color: '#0077b6',
                borderRadius: 6,
                padding: '0.7rem 1.2rem',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}
                onClick={() => setSelectedPayment('card')}
              >
                💳 Credit / Debit Card
              </button>
              <button style={{
                background: '#fff',
                border: '1.5px solid #0077b6',
                color: '#0077b6',
                borderRadius: 6,
                padding: '0.7rem 1.2rem',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}
                onClick={() => setSelectedPayment('paypal')}
              >
                <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" style={{height: 22, marginRight: 6}} />
                PayPal
              </button>
            </div>
          )}
          {/* Credit/Debit Card Form */}
          {selectedPayment === 'card' && (
            <form style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8}} onSubmit={e => {e.preventDefault(); alert('Card payment submitted! (Demo)');}}>
              <input
                type="text"
                placeholder="Card Number"
                value={cardDetails.number}
                onChange={e => setCardDetails({...cardDetails, number: e.target.value})}
                maxLength={19}
                style={{padding: '0.6rem', borderRadius: 5, border: '1px solid #bbb', fontSize: '1rem'}}
                required
              />
              <input
                type="text"
                placeholder="Name on Card"
                value={cardDetails.name}
                onChange={e => setCardDetails({...cardDetails, name: e.target.value})}
                style={{padding: '0.6rem', borderRadius: 5, border: '1px solid #bbb', fontSize: '1rem'}}
                required
              />
              <div style={{display: 'flex', gap: 10}}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})}
                  maxLength={5}
                  style={{flex: 1, padding: '0.6rem', borderRadius: 5, border: '1px solid #bbb', fontSize: '1rem'}}
                  required
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={e => setCardDetails({...cardDetails, cvc: e.target.value})}
                  maxLength={4}
                  style={{flex: 1, padding: '0.6rem', borderRadius: 5, border: '1px solid #bbb', fontSize: '1rem'}}
                  required
                />
              </div>
              <div style={{display: 'flex', gap: 10, marginTop: 8}}>
                <button type="button" onClick={() => setSelectedPayment(null)} style={{flex: 1, background: '#eee', color: '#333', border: 'none', borderRadius: 5, padding: '0.6rem', fontWeight: 600, cursor: 'pointer'}}>Cancel</button>
                <button type="submit" style={{flex: 1, background: '#0077b6', color: 'white', border: 'none', borderRadius: 5, padding: '0.6rem', fontWeight: 600, cursor: 'pointer'}}>Pay</button>
              </div>
            </form>
          )}
          {/* PayPal Form */}
          {selectedPayment === 'paypal' && (
            <form style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8}} onSubmit={e => {e.preventDefault(); alert('PayPal payment submitted! (Demo)');}}>
              <input
                type="email"
                placeholder="PayPal Email"
                value={paypalEmail}
                onChange={e => setPaypalEmail(e.target.value)}
                style={{padding: '0.6rem', borderRadius: 5, border: '1px solid #bbb', fontSize: '1rem'}}
                required
              />
              <div style={{display: 'flex', gap: 10, marginTop: 8}}>
                <button type="button" onClick={() => setSelectedPayment(null)} style={{flex: 1, background: '#eee', color: '#333', border: 'none', borderRadius: 5, padding: '0.6rem', fontWeight: 600, cursor: 'pointer'}}>Cancel</button>
                <button type="submit" style={{flex: 1, background: '#0077b6', color: 'white', border: 'none', borderRadius: 5, padding: '0.6rem', fontWeight: 600, cursor: 'pointer'}}>Pay</button>
              </div>
            </form>
          )}
        </div>
      )}
      <h3 style={{marginBottom: '1rem'}}>Your Swimmers:</h3>
      <table className="register-table">
        <thead>
          <tr>
            <th>Swimmer</th>
            <th>Age</th>
            <th>Email</th>
            <th>Training Group</th>
            <th>Payment Log</th>
          </tr>
        </thead>
        <tbody>
          {swimmers.map(swimmer => {
            const hasDue = swimmer.payment_log && swimmer.payment_log.some(entry => entry.status === 'Due');
            return (
              <React.Fragment key={swimmer._id}>
                <tr>
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
                  <td>{swimmer.training_group || 'Not Assigned'}</td>
                  <td>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        verticalAlign: 'middle'
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() => setShowLog(showLog === swimmer._id ? null : swimmer._id)}
                        title={showLog === swimmer._id ? 'Hide Log' : 'View Log'}
                      >
                        <MdRemoveRedEye style={{fontSize: '1.3rem', color: '#0077b6'}} />
                      </span>
                      <span style={{margin: '0 6px', color: '#bbb', fontSize: '1.3rem', lineHeight: 1}}>|</span>
                      {hasDue
                        ? <MdErrorOutline title="Payment Due" style={{color: 'red', fontSize: '1.3rem'}} />
                        : <MdCheckCircleOutline title="All Paid" style={{color: 'green', fontSize: '1.3rem'}} />
                      }
                    </span>
                  </td>
                </tr>
                {showLog === swimmer._id && (
                  <tr>
                    <td colSpan={5}>
                      <div style={{margin: '0.5rem 0 1rem 2rem'}}>
                        <strong>Payment Log:</strong>
                        <table style={{marginTop: 6, minWidth: 320}}>
                          <thead>
                            <tr>
                              <th>Month</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {swimmer.payment_log && swimmer.payment_log.map((entry, idx) => (
                              <tr key={idx}>
                                <td>{entry.month}</td>
                                <td style={{color: entry.status === 'Paid' ? 'green' : 'red', fontWeight: 500}}>
                                  {entry.status === 'Paid' ? '$185' : '(-$185)'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ParentHome;
