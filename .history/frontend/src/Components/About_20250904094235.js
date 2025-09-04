import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

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
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Cumming Waves Swim Team
        </h1>
        {/* <p className="primar */}
          About Us

Cumming Waves Swim Team has been making waves in the competitive swimming scene for over 32 years.
Founded in 1987 , our team has a rich history of producing talented swimmers who have gone on to achieve great success at the local, regional, and national levels.

Excellence: We strive for excellence in everything we do, both in and out of the pool.
Teamwork: We believe that swimming is a team sport and that together, we can achieve great things.
Sportsmanship: We promote good sportsmanship and respect for our opponents, officials, and teammates.
Fun: We believe that swimming should be enjoyable and that our swimmers should have fun while competing and training.
Join Our Team

If you're looking for a competitive swim team that values excellence, teamwork, and sportsmanship, then Cumming Waves Swim Team is the place for you. We welcome swimmers of all ages and skill levels to join our team and become a part of our swimming family.
        
        <p className="primary-text">
          {/* Swimming is a lifelong sport that promotes physical fitness, mental toughness, and camaraderie. Whether you're a competitive athlete or a recreational swimmer, the water has the power to transform and inspire you. */}
        </p>
        {/* <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default About;
