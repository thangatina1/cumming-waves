import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Try Out",
      text: "Join the Cumming Waves Swim Team and take the plunge towards a season of fun, friends, and fast times - tryouts now open for swimmers of all ages and skill levels!",
    },
    {
      image: ChooseMeals,
      title: "Training Groups",
      text: "Our training groups are designed to challenge and support swimmers of all levels, from beginner to elite, with expert coaching and a focus on technique, endurance, and teamwork.",
    },
    {
      image: DeliveryMeals,
      title: "Compete",
      text: "Compete against the best and push yourself to new heights in local, regional, and national swim meets, with the Cumming Waves Swim Team.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        {/* <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p> */}
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
