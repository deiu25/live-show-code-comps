import React from "react";
import "./Logo.css";
import { ReactComponent as LogoSvg } from "./lolgo.svg";

export const Logo = () => {
  return (
    <div id="svgWrapper">
        <LogoSvg />
    </div>
  );
};
