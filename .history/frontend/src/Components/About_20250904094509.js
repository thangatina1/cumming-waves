import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";


import { coaches } from "./CoachProfiles";

const About = () => {
  return (
    <div className="about-section-container about-card">
      <div className="about-background-image-container">
        {/* <img src={AboutBackground} alt="" /> */}
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <h1 className="primary-heading">Cumming Waves Swim Team</h1>
        <div style={{ marginBottom: 16, fontWeight: 600 }}>About Us</div>
        <div style={{ marginBottom: 8 }}>
          Cumming Waves Swim Team has been making waves in the competitive swimming scene for over 32 years.<br />
          Founded in 1987, our team has a rich history of producing talented swimmers who have gone on to achieve great success at the local, regional, and national levels.
        </div>
        <ul style={{ marginBottom: 8 }}>
          <li>Excellence: We strive for excellence in everything we do, both in and out of the pool.</li>
          <li>Teamwork: We believe that swimming is a team sport and that together, we can achieve great things.</li>
          <li>Sportsmanship: We promote good sportsmanship and respect for our opponents, officials, and teammates.</li>
          <li>Fun: We believe that swimming should be enjoyable and that our swimmers should have fun while competing and training.</li>
        </ul>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>Join Our Team</div>
        <div style={{ marginBottom: 24 }}>
          If you're looking for a competitive swim team that values excellence, teamwork, and sportsmanship, then Cumming Waves Swim Team is the place for you. We welcome swimmers of all ages and skill levels to join our team and become a part of our swimming family.
        </div>
        <p className="primary-text">
          {/* Swimming is a lifelong sport that promotes physical fitness, mental toughness, and camaraderie. Whether you're a competitive athlete or a recreational swimmer, the water has the power to transform and inspire you. */}
        </p>
      </div>

      {/* Coach Profiles Section */}
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <h2 className="primary-heading" style={{ fontSize: 28, marginBottom: 24 }}>Meet Our Coaches</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {coaches.map((coach, idx) => (
            <div key={coach.name} style={{ maxWidth: 220, textAlign: "center" }}>
              <img
                src={coach.img}
                alt={coach.name}
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "4px solid #0077b6",
                  marginBottom: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
                }}
              />
              <div style={{ fontWeight: 700, fontSize: 18 }}>{coach.name}</div>
              <div style={{ color: "#0077b6", fontWeight: 500, marginBottom: 6 }}>{coach.title}</div>
              <div style={{ fontSize: 14, color: "#444" }}>{coach.bio}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
