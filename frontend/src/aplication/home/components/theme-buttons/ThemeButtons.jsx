import React from 'react';

const ThemeButtons = ({ handleChangeTheme }) => {
  return (
<ul className="nav flex-row theme-buttons">
        <li key="light" className="nav-item">
          <button
            className="anchor-btn"
            onClick={() => handleChangeTheme("light")}
          >
            <i className="fas fa-sun"></i>
          </button>
        </li>
        <li key="dark" className="nav-item">
          <button
            className="anchor-btn"
            onClick={() => handleChangeTheme("dark")}
          >
            <i className="fas fa-moon"></i>
          </button>
        </li>
        <li key="rainbow" className="nav-item">
          <button
            className="anchor-btn"
            onClick={() => handleChangeTheme("rainbow")}
          >
            <i className="fas fa-rainbow"></i>
          </button>
        </li>
        <li key="green" className="nav-item">
          <button
            className="anchor-btn"
            onClick={() => handleChangeTheme("green")}
          >
            <i className="fas fa-leaf"></i>
          </button>
        </li>
        <li key="calm" className="nav-item">
          <button
            className="anchor-btn"
            onClick={() => handleChangeTheme("calm")}
          >
            <i className="fas fa-water"></i>
          </button>
        </li>
        <li key="purple" className="nav-item">
          <button
            className="anchor-btn"
            onClick={() => handleChangeTheme("purple")}
          >
            <i className="fas fa-dragon"></i>
          </button>
        </li>
        <li key="orange" className="nav-item">
          <button
            className="anchor-btn"
            onClick={() => handleChangeTheme("orange")}
          >
            <i className="fas fa-fire"></i>
          </button>
        </li>
        <li key="red" className="nav-item">
          <button
            className="anchor-btn"
            onClick={() => handleChangeTheme("red")}
          >
            <i className="fas fa-heart"></i>
          </button>
        </li>
      </ul>
  );
};

export default ThemeButtons;
