import React, { useEffect } from 'react';
import './SpiralAnimation.css'; 

const words = "SyntaxSeeker";
const ANIMATION_DURATION = 4000;

const SpiralAnimation = () => {
  useEffect(() => {
    let isFirefox = typeof InstallTrigger !== 'undefined';
    let ANGLE = 360;

    const animation = () => {
      ANGLE -= 1;
      document.querySelectorAll(".spiral *").forEach((el, i) => {
        const translateY = Math.sin(ANGLE * (Math.PI / 120)) * 100;
        const scale = Math.cos(ANGLE * (Math.PI / 120)) * 0.5 + 0.5;

        const offset = parseInt(el.dataset.offset);
        const delay = i * (ANIMATION_DURATION / 16) - offset;

        setTimeout(() => {
          el.style.transform = `translateY(${translateY}px) scale(${scale})`;
        }, delay);
      });

      requestAnimationFrame(animation);
    };

    const createElements = () => {
      words.split("").forEach((char, i) => {
        const createElement = (offset, containerId) => {
          const div = document.createElement("div");
          div.innerText = char;
          div.className = "character";
          div.dataset.offset = offset.toString();
          div.style.animationDelay = `-${i * (ANIMATION_DURATION / 16) - offset}ms`;
          document.getElementById(containerId).appendChild(div);
        };

        createElement(0, "spiral");
        createElement((isFirefox ? 1 : -1) * (ANIMATION_DURATION / 2), "spiral2");
      });
    };

    createElements();

    if(isFirefox){
      animation();
    }

    // Cleanup function to prevent memory leaks
    return () => {
      const spiral = document.getElementById("spiral");
      const spiral2 = document.getElementById("spiral2");
      if (spiral) spiral.innerHTML = '';
      if (spiral2) spiral2.innerHTML = '';
    };
  }, []);

  return (
    <React.Fragment>
      <div id="spiral" className="spiral"></div>
      <div id="spiral2" className="spiral"></div>
    </React.Fragment>
  );
};

export default SpiralAnimation;
