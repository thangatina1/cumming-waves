import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-background.jpg";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          {/* <img src={BannerBackground} alt="" /> */}
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Dive into Excellence with Our Swimming Club
          </h1>
          <p className="primary-text">
            Join our community of passionate swimmers and coaches, and take your skills to the next level. We provide a supportive and competitive environment to help you achieve your goals.
          </p>
          
          <div className="home-action-buttons">
            <button className="primary-button" onClick={() => navigate("/schedule-tryout") }>
              Schedule Tryout <FiArrowRight />
            </button>
            <button className="primary-button" onClick={() => navigate("/register") }>
              Register Swimmer  <FiArrowRight />
            </button>
          </div>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
