import React from 'react';

const ThemeButtons = ({ handleChangeTheme }) => {
  return (
    <ul className="theme-buttons">
      <li className="theme-button-li li-light">
        <button
          className="theme-button anchor-btn"
          onClick={() => handleChangeTheme("light")}
        >
          <i className="fas fa-sun"></i>
        </button>
      </li>
      <li className="theme-button-li li-dark">
        <button
          className="theme-button anchor-btn"
          onClick={() => handleChangeTheme("dark")}
        >
          <i className="fas fa-moon"></i>
        </button>
      </li>
      <li className="theme-button-li li-rainbow">
        <button
          className="theme-button anchor-btn"
          onClick={() => handleChangeTheme("rainbow")}
        >
          <i className="fas fa-rainbow"></i>
        </button>
      </li>
      <li className="theme-button-li li-green">
        <button
          className="theme-button anchor-btn"
          onClick={() => handleChangeTheme("green")}
        >
          <i className="fas fa-leaf"></i>
        </button>
      </li>
      <li className="theme-button-li li-calm">
        <button
          className="theme-button anchor-btn"
          onClick={() => handleChangeTheme("calm")}
        >
          <i className="fas fa-water"></i>
        </button>
      </li>
      <li className="theme-button-li li-purple">
        <button
          className="theme-button anchor-btn"
          onClick={() => handleChangeTheme("purple")}
        >
          <i className="fas fa-dragon"></i>
        </button>
      </li>
      <li className="theme-button-li li-orange">
        <button
          className="theme-button anchor-btn"
          onClick={() => handleChangeTheme("orange")}
        >
          <i className="fas fa-fire"></i>
        </button>
      </li>
      <li className="theme-button-li li-red">
        <button
          className="theme-button anchor-btn"
          onClick={() => handleChangeTheme("red")}
        >
          <i className="fas fa-heart"></i>
        </button>
      </li>
    </ul>
  );
};

export default ThemeButtons;
