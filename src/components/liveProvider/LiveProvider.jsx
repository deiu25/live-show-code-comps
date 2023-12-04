import React, { useState } from "react";
import { Typography } from "@mui/material";

import { Carousel } from "react-responsive-carousel";
import MediaQuery from "react-responsive";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./LiveProvider.css";
import Button from "../buttons/BlueGlow";

const LiveProvider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const components = [
    {
      component: <Button>Apasă-mă!</Button>,
      sourceCode: `
        import React from 'react';
        import './Button.css';
  
        const Button = ({ children, onClick }) => {
            return (
                <button type="submit" className="glow-blue-btn" onClick={onClick}>
                    {children}
                </button>
            );
        }
  
        export default Button;
      `,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + components.length) % components.length
    );
  };

  const currentComponent = components[currentIndex];
  if (!currentComponent) {
    return null;
  }

  return (
    <div className="DD-slider">
      <div className="DD-controls">
        <div className="DD-up">
          <i onClick={handleNext} className="fa fa-chevron-up"></i>
        </div>
        <div className="DD-down">
          <i onClick={handlePrev} className="fa fa-chevron-down"></i>
        </div>
      </div>

      <div className="DD-wrapper">
        <div className="DD-left">
          <div>
            <Typography variant="h2">Componenta {currentIndex + 1}</Typography>
            <Typography variant="h4">Surce Code</Typography>
            <div className="DD-divider">
              <Typography variant="body1" className="typo-design">
                <pre>
                  <code className="code-design">
                    {currentComponent.sourceCode}
                  </code>
                </pre>
              </Typography>
            </div>
          </div>
        </div>
        <MediaQuery maxDeviceWidth={700}>
          <Carousel
            transitionTime={1000}
            showArrows={false}
            showStatus={true}
            showIndicators={false}
            showThumbs={false}
            emulateTouch
            infiniteLoop
            preventMovementUntilSwipeScrollTolerance={true}
            swipeScrollTolerance={50}
          >
            <div>{currentComponent.component}</div>
          </Carousel>
        </MediaQuery>

        <MediaQuery minDeviceWidth={701}>
          <div className="DD-controls">
            <div className="DD-up">
              <i onClick={handleNext} className="fa fa-chevron-up"></i>
            </div>
            <div className="DD-down">
              <i onClick={handlePrev} className="fa fa-chevron-down"></i>
            </div>
          </div>

          <div className="DD-right">
            <div>{currentComponent.component}</div>
          </div>
        </MediaQuery>
      </div>
    </div>
  );
};

export default LiveProvider;
