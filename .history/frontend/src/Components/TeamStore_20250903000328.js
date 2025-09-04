import React from "react";

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

const TeamStore = () => (
  <div style={{ maxWidth: 1100, margin: "40px auto", padding: 24 }}>
    <h2 style={{ textAlign: "center", marginBottom: 32, color: "#0077b6" }}>Team Store</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
      {storeItems.map((item) => (
        <div key={item.name} style={{
          width: 220,
          background: "#f8f9fa",
          border: "2px solid #e0e0e0",
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <img src={item.image} alt={item.name} style={{ width: 90, height: 90, objectFit: "contain", marginBottom: 18 }} />
          <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>{item.name}</div>
          <div style={{ color: "#0077b6", fontWeight: 600, fontSize: "1.05rem", marginBottom: 10 }}>{item.price}</div>
          <button style={{
            background: "#0077b6",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "0.5rem 1.2rem",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer"
          }}>Add to Cart</button>
        </div>
      ))}
    </div>
  </div>
);

export default TeamStore;
