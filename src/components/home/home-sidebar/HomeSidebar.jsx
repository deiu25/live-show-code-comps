import React from "react";

export const HomeSidebar = ({ onTabChange, currentTab }) => {
  return (
    <div className="col-md-3" id="sidebar">
      <div className="logo"></div>
      <ul className="nav flex-column">
        <li className={`nav-item ${currentTab === "home" ? "" : ""}`}>
          <a className="nav-link" onClick={() => onTabChange("home")}>
            <i className="fal fa-home-alt"></i> Home
          </a>
        </li>
        <li className={`nav-item ${currentTab === "posts" ? "" : ""}`}>
          <a className="nav-link" onClick={() => onTabChange("posts")}>
            <i className="fal fa-tasks"></i> Posts
          </a>
        </li>
        <li className={`nav-item ${currentTab === "about" ? "" : ""}`}>
          <a className="nav-link" onClick={() => onTabChange("about")}>
            <i className="fal fa-info"></i> About
          </a>
        </li>
        <li className={`nav-item ${currentTab === "contact" ? "" : ""}`}>
          <a className="nav-link" onClick={() => onTabChange("contact")}>
            <i className="fal fa-address-card"></i> Contact
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="download.html">
            <i className="fal fa-download"></i> Download
          </a>
        </li>
      </ul>
      <i className="far fa-ellipsis-v"></i>
      <div className="copyright">
        <p>&copy; 2023</p>
      </div>
    </div>
  );
};
