import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <header>
      <nav>
        <div className="logo" onClick={goHome}>
          Syntax Seeker
        </div>
      </nav>
    </header>
  );
};
