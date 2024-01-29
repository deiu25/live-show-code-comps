import React from "react";
import "./Learn.css";
import { ReactComponent as ArrowRight } from "../assets/icons/arrow-right.svg";

const cardStyles = [
  { "--color": "#00afaf" },
  { "--color": "#00bb00" },
  { "--color": "#0f2bff" },
  { "--color": "#ff6a2f" },
];


export const Learn = () => {
  return (
    <div className="learn-card-body">
      <div className="learn-container">
        {cardStyles.map((cardStyle, index) => (
          <div className="learn-card" style={cardStyle} key={index}>
            <button className="learn-button">
              <span className="learn-text">Card {index + 1}</span>
              <div className="learn-icon">
                <ArrowRight className="learn-svg"/>
                </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
