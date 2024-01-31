import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import MediaQuery from "react-responsive";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./LiveProvider.css";
import ComponentsCode from "../comp code/ComponentsCode";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import nightOwlStyle from "react-syntax-highlighter/dist/esm/styles/prism/night-owl";

const LiveProvider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {

  };

  const handlePrev = () => {

  };

  const currentComponent = ComponentsCode[currentIndex];
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
              <Carousel className="DD-carousel"
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
                <SyntaxHighlighter
                  className="code"
                  language="jsx"
                  style={nightOwlStyle}
                  overflowWrap="break-word"
                  wrapLines={true}
                  lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}

                >
                  {currentComponent.JSXsourceCode}
                </SyntaxHighlighter>
                <SyntaxHighlighter
                  className="code"
                  language="css"
                  style={nightOwlStyle}
                  overflowWrap="break-word"
                  wrapLines={true}
                  lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}

                >
                  {currentComponent.CSSsourceCode}
                </SyntaxHighlighter>
                <SyntaxHighlighter
                  className="code"
                  language="html"
                  style={nightOwlStyle}
                  overflowWrap="break-word"
                  wrapLines={true}
                  lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}

                >
                  {currentComponent.HTMLsourceCode}
                </SyntaxHighlighter>
                <SyntaxHighlighter
                  className="code"
                  language="js"
                  style={nightOwlStyle}
                  overflowWrap="break-word"
                  wrapLines={true}
                  lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}

                >
                  {currentComponent.JSsourceCode}
                </SyntaxHighlighter>
                
              </Carousel>
            </div>
          </div>
        </div>
        <MediaQuery maxDeviceWidth={700}>
          <div>{currentComponent.component}</div>
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
