import React, { useState } from "react";
import jsPDF from "jspdf";
import { MdErrorOutline, MdCheckCircleOutline, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const profilePicStyle = {
  width: 80,
  height: 80,
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2.5px solid #0077b6',
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

  // Helper: Generate account statement data as text
  const generateStatementText = () => {
    let text = `Account Statement for ${parent.name}\nEmail: ${parent.email}\nPhone: ${parent.phone}\nAddress: ${parent.address}, ${parent.city}, ${parent.state} ${parent.zip}\n\n`;
    swimmers.forEach(swimmer => {
      text += `Swimmer: ${swimmer.name} (Age: ${swimmer.age}, Group: ${swimmer.training_group || 'N/A'})\n`;
      if (swimmer.payment_log) {
        swimmer.payment_log.forEach(entry => {
          text += `  ${entry.month}: ${entry.status} ${entry.fee ? `$${entry.fee}` : ''}\n`;
        });
      }
      text += '\n';
    });
    text += `Total Account Balance: ${accountBalance > 0 ? `-$${accountBalance}` : '$0 (All Paid)'}`;
    return text;
  };

  // Download statement as PDF
  const downloadStatementPDF = () => {
    const doc = new jsPDF();
    const lines = generateStatementText().split('\n');
    let y = 10;
    lines.forEach(line => {
      doc.text(line, 10, y);
      y += 8;
      if (y > 280) { doc.addPage(); y = 10; }
    });
    doc.save(`Account_Statement_${parent.name.replace(/\s/g, '_')}.pdf`);
  };

  // Modal for viewing statement
  const [showStatement, setShowStatement] = useState(false);

  return (
    <div className="register-container swimmer-register-card" style={{position: 'relative'}}>
      {/* Parent profile picture in top right */}
      <div style={{position: 'absolute', top: 20, right: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <img
          src={parent.profilePic || 'https://randomuser.me/api/portraits/lego/1.jpg'}
          alt="Parent Profile"
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
        gap: '1.5rem',
        flexWrap: 'wrap'
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
        <button
          className="primary-button"
          style={{
            background: '#00b47e',
            color: 'white',
            fontWeight: 600,
            padding: '0.4rem 1.2rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            marginLeft: 8
          }}
          onClick={() => setShowStatement(true)}
        >
          View Account Statement
        </button>
        <button
          className="primary-button"
          style={{
            background: '#0077b6',
            color: 'white',
            fontWeight: 600,
            padding: '0.4rem 1.2rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            marginLeft: 8
          }}
          onClick={downloadStatementPDF}
        >
          Download Statement (PDF)
        </button>
      </div>

      {/* Modal for viewing account statement */}
      {showStatement && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{background: 'white', borderRadius: 10, padding: 32, minWidth: 340, maxWidth: 600, boxShadow: '0 2px 16px rgba(0,0,0,0.13)'}}>
            <h3 style={{marginBottom: 16}}>Account Statement</h3>
            <pre style={{whiteSpace: 'pre-wrap', fontSize: 15, maxHeight: 400, overflowY: 'auto', background: '#f8f9fa', padding: 12, borderRadius: 6}}>{generateStatementText()}</pre>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 18}}>
              <button className="primary-button" style={{background: '#0077b6', color: 'white', fontWeight: 600, border: 'none', borderRadius: 6, padding: '0.4rem 1.2rem', fontSize: '1rem'}} onClick={downloadStatementPDF}>Download PDF</button>
              <button className="primary-button" style={{background: '#eee', color: '#333', fontWeight: 600, border: 'none', borderRadius: 6, padding: '0.4rem 1.2rem', fontSize: '1rem'}} onClick={() => setShowStatement(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

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
                  style={{flex: 2, padding: '0.6rem', borderRadius: 5, border: '1px solid #bbb', fontSize: '1rem'}}
                  required
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={e => setCardDetails({...cardDetails, cvc: e.target.value})}
                  maxLength={4}
                  style={{flex: 1, minWidth: 60, maxWidth: 80, padding: '0.6rem', borderRadius: 5, border: '1px solid #bbb', fontSize: '0.95rem'}}
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
                            {swimmer.payment_log && [...swimmer.payment_log]
                              .sort((a, b) => b.month.localeCompare(a.month))
                              .map((entry, idx) => (
                                <tr key={idx}>
                                  <td>{entry.month}</td>
                                  <td style={{color: entry.status === 'Paid' ? 'green' : 'red', fontWeight: 500}}>
                                    {entry.status === 'Paid' ? (entry.fee ? `$${entry.fee}` : '$185') : (entry.fee ? `(-$${entry.fee})` : '(-$185)')}
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
