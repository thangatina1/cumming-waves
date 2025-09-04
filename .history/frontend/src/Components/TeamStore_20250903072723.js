import React, { useState } from "react";

const storeItems = [
  { name: "Goggles", image: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png", price: "$18" },
  { name: "Team Cap", image: "https://cdn-icons-png.flaticon.com/512/3062/3062632.png", price: "$12" },
  { name: "Girls Swim Suit", image: "https://cdn-icons-png.flaticon.com/512/3062/3062636.png", price: "$38" },
  { name: "Boys Jammers", image: "https://cdn-icons-png.flaticon.com/512/3062/3062635.png", price: "$32" },
  { name: "Swimmer Bag", image: "https://cdn-icons-png.flaticon.com/512/3062/3062637.png", price: "$28" },
  { name: "Swim Dad T Shirt", image: "https://cdn-icons-png.flaticon.com/512/892/892458.png", price: "$22" },
  { name: "Swim Mom T Shirt", image: "https://cdn-icons-png.flaticon.com/512/892/892458.png", price: "$22" },
  { name: "Caps", image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", price: "$10" },
  { name: "Hoodies", image: "https://cdn-icons-png.flaticon.com/512/892/892458.png", price: "$40" },
  { name: "Bumper Stickers", image: "https://cdn-icons-png.flaticon.com/512/3062/3062633.png", price: "$5" },
];


const TeamStore = () => {
  const [cart, setCart] = useState([]); // {name, image, price, qty}
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({ name: '', email: '', address: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.name === item.name);
      if (found) {
        return prev.map((i) => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((i) => i.name !== name));
  };

  const updateQty = (name, delta) => {
    setCart((prev) => prev.map((i) => i.name === name ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const getTotal = () => {
    return cart.reduce((sum, i) => sum + parseFloat(i.price.replace('$', '')) * i.qty, 0);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => {
      setOrderPlaced(false);
      setShowCheckout(false);
      setCheckoutInfo({ name: '', email: '', address: '' });
    }, 2500);
  };

  return (
    <div className="App" style={{ margin: "40px auto", padding: 24, minHeight: 600 }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: 0 }}>
        {/* Left: Tiles (80%) */}
        <div style={{ width: '80%', paddingRight: 32 }}>
          {/* Welcome ribbon like Coach Home */}
          <div style={{
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%'
          }}>
            <h2 className="primary-heading" style={{
              margin: 0,
              fontWeight: 700,
              fontSize: '2rem',
              color: '#0077b6',
              background: 'linear-gradient(90deg, #e0f7fa 60%, #fff 100%)',
              padding: '0.7rem 2.5rem 0.7rem 1.5rem',
              borderRadius: '1.2rem',
              boxShadow: '0 2px 8px #0077b61a',
              letterSpacing: 1
            }}>Welcome to the Team Store!</h2>
          </div>
          <div style={{ display: "flex", flexDirection: 'row', flexWrap: "wrap", gap: 32, justifyContent: "flex-start", alignItems: 'stretch', width: '100%' }}>
            {storeItems.map((item) => {
              const cartItem = cart.find(i => i.name === item.name);
              const qty = cartItem ? cartItem.qty : 0;
              return (
                <div key={item.name} style={{
                  width: 240,
                  background: "#f8f9fa",
                  border: "2px solid #e0e0e0",
                  borderRadius: 16,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: 'flex-start',
                  minHeight: 320
                }}>
                  <img src={item.image} alt={item.name} style={{ width: 90, height: 90, objectFit: "contain", marginBottom: 18 }} />
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>{item.name}</div>
                  <div style={{ color: "#0077b6", fontWeight: 600, fontSize: "1.05rem", marginBottom: 10 }}>{item.price}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <button onClick={() => updateQty(item.name, -1)} disabled={qty === 0} style={{ padding: '0 10px', borderRadius: 5, border: '1px solid #bbb', background: qty === 0 ? '#eee' : '#f8f9fa', color: '#0077b6', fontWeight: 700, fontSize: 18, cursor: qty === 0 ? 'not-allowed' : 'pointer' }}>-</button>
                    <span style={{ minWidth: 22, textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                    <button onClick={() => updateQty(item.name, 1)} style={{ padding: '0 10px', borderRadius: 5, border: '1px solid #bbb', background: '#f8f9fa', color: '#0077b6', fontWeight: 700, fontSize: 18, cursor: 'pointer' }}>+</button>
                  </div>
                  <button style={{
                    background: "#0077b6",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    padding: "0.5rem 1.2rem",
                    fontWeight: 600,
                    fontSize: "1rem",
                    cursor: "pointer",
                    width: '100%',
                    opacity: qty > 0 ? 0.7 : 1
                  }} onClick={() => addToCart(item)}>{qty > 0 ? 'Add More' : 'Add to Cart'}</button>
                </div>
              );
            })}
          </div>
        </div>
        {/* Right: Cart/Checkout (20%) */}
        <div style={{ width: '20%', minWidth: 320, maxWidth: 400, position: 'relative' }}>
          <div style={{ position: 'sticky', top: 24, zIndex: 10 }}>
            <div style={{ background: '#fff', border: '3.5px solid #0077b6', borderRadius: 18, boxShadow: '0 2px 8px #0077b633', padding: 22, minWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#0077b6', marginBottom: 10 }}>🛒 Cart</div>
              {cart.length === 0 ? (
                <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>Cart is empty</div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, width: '100%' }}>
                      <img src={item.image} alt={item.name} style={{ width: 32, height: 32, borderRadius: 6, background: '#f0f0f0' }} />
                      <span style={{ flex: 1 }}>{item.name}</span>
                      <span style={{ fontWeight: 600 }}>${parseFloat(item.price.replace('$', '')) * item.qty}</span>
                      <button onClick={() => updateQty(item.name, -1)} style={{ marginLeft: 6, padding: '0 8px', borderRadius: 4, border: '1px solid #bbb', background: '#f8f9fa', cursor: 'pointer' }}>-</button>
                      <span style={{ minWidth: 18, textAlign: 'center' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.name, 1)} style={{ marginRight: 6, padding: '0 8px', borderRadius: 4, border: '1px solid #bbb', background: '#f8f9fa', cursor: 'pointer' }}>+</button>
                      <button onClick={() => removeFromCart(item.name)} style={{ color: '#b30000', background: 'none', border: 'none', fontWeight: 700, fontSize: 18, cursor: 'pointer' }} title="Remove">×</button>
                    </div>
                  ))}
                  <div style={{ fontWeight: 600, marginTop: 10, marginBottom: 8 }}>Total: <span style={{ color: '#0077b6' }}>${getTotal().toFixed(2)}</span></div>
                  <button onClick={() => setShowCheckout(true)} style={{ background: '#0077b6', color: 'white', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>Checkout</button>
                </>
              )}
            </div>
            {/* Checkout Modal */}
            {showCheckout && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: 'white', borderRadius: 12, padding: 32, minWidth: 320, boxShadow: '0 2px 16px #0077b655' }}>
                  <h3 style={{ marginBottom: 18, color: '#0077b6' }}>Checkout</h3>
                  {orderPlaced ? (
                    <div style={{ color: '#00b47e', fontWeight: 700, fontSize: 18, textAlign: 'center', margin: 24 }}>Thank you! Your order has been placed.</div>
                  ) : (
                    <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <input type="text" placeholder="Name" value={checkoutInfo.name} onChange={e => setCheckoutInfo({ ...checkoutInfo, name: e.target.value })} required style={{ padding: '0.7rem', borderRadius: 6, border: '1px solid #bbb', fontSize: '1rem' }} />
                      <input type="email" placeholder="Email" value={checkoutInfo.email} onChange={e => setCheckoutInfo({ ...checkoutInfo, email: e.target.value })} required style={{ padding: '0.7rem', borderRadius: 6, border: '1px solid #bbb', fontSize: '1rem' }} />
                      <input type="text" placeholder="Shipping Address" value={checkoutInfo.address} onChange={e => setCheckoutInfo({ ...checkoutInfo, address: e.target.value })} required style={{ padding: '0.7rem', borderRadius: 6, border: '1px solid #bbb', fontSize: '1rem' }} />
                      <div style={{ fontWeight: 600, marginTop: 8 }}>Order Total: <span style={{ color: '#0077b6' }}>${getTotal().toFixed(2)}</span></div>
                      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                        <button type="button" onClick={() => setShowCheckout(false)} style={{ flex: 1, background: '#eee', color: '#333', border: 'none', borderRadius: 6, padding: '0.6rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" style={{ flex: 1, background: '#0077b6', color: 'white', border: 'none', borderRadius: 6, padding: '0.6rem', fontWeight: 600, cursor: 'pointer' }}>Place Order</button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStore;
