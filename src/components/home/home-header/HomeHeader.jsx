import React from "react";

export const HomeHeader = () => {
  return (
    <div className="header-section">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link" href="category.html">
          React
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="category.html">
            Design
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="category.html">
            Ai
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Category
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#">
              one
            </a>
            <a className="dropdown-item" href="#">
              two
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">
              three
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};
