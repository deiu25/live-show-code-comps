import React from 'react';

const ThemeDropdown = ({ handleChangeTheme, isDropdownOpen, toggleDropdown }) => {
  return (
    <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
      <button className="anchor-btn" onClick={toggleDropdown}>
      <i className="fas fa-palette"></i><i className={`fas ${isDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
      </button>
      <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} style={{ display: isDropdownOpen ? 'block' : 'none' }}>
        <button className="dropdown-item" onClick={() => handleChangeTheme("light")}>Light</button>
        <button className="dropdown-item" onClick={() => handleChangeTheme("dark")}>Dark</button>
        <button className="dropdown-item" onClick={() => handleChangeTheme("rainbow")}>Rainbow</button>
        <button className="dropdown-item" onClick={() => handleChangeTheme("green")}>Green</button>
        <button className="dropdown-item" onClick={() => handleChangeTheme("calm")}>Calm</button>
        <button className="dropdown-item" onClick={() => handleChangeTheme("purple")}>Purple</button>
        <button className="dropdown-item" onClick={() => handleChangeTheme("orange")}>Orange</button>
        <button className="dropdown-item" onClick={() => handleChangeTheme("red")}>Red</button>
      </div>
    </div>
  );
};

export default ThemeDropdown;
