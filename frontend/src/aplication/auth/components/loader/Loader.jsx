import React from "react";
import "./Loader.css";
import loaderImg from "../../assets/loader.gif";
import ReactDom from "react-dom";

export const Loader = () => {
  return ReactDom.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="loader" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const Spinner = () => {
  return (
    <div className="center-all">
      <img src={loaderImg} alt="spinner" />
    </div>
  );
};
