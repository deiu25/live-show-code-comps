import React, { useState } from "react";
import classNames from 'classnames';
import { Link } from "react-router-dom";

export const HomeSidebar = ({ onTabChange, currentTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarClass = classNames({
    'col-md-3': isSidebarOpen,
    'col-md-1': !isSidebarOpen,
    'sidebar': true
  });

  const logoClass = classNames({
    'logo': true,
    'logo-small': !isSidebarOpen
  });

  return (
    <div className={sidebarClass} id="sidebar">
      <div className="anchor far fa-chevron-double-left" onClick={toggleSidebar} />
      {!user && (<div className="auth">
        <Link to="/login">Auth</Link>
      </div>)}
      {user && (<div className="user">
      <div className={logoClass} />
        <img src={user.avatar} />
        <p>{user.name}</p>
      </div>)}
      
      <ul className="nav flex-column">
        <li key="home" className={`nav-item ${currentTab === "home" ? "active" : ""}`}>
          <a className="nav-link" onClick={() => onTabChange("home")}>
            <i className="fas fa-home"></i>
            {isSidebarOpen && <span className="nav-text"> Home</span>}
          </a>
        </li>
        <li key="posts" className={`nav-item ${currentTab === "posts" ? "active" : ""}`}>
          <a className="nav-link" onClick={() => onTabChange("posts")}>
            <i className="fas fa-tasks"></i>
            {isSidebarOpen && <span className="nav-text"> Posts</span>}
          </a>
        </li>
        <li key="about" className={`nav-item ${currentTab === "about" ? "active" : ""}`}>
          <a className="nav-link" onClick={() => onTabChange("about")}>
            <i className="fas fa-info-circle"></i>
            {isSidebarOpen && <span className="nav-text"> About</span>}
          </a>
        </li>
      </ul>
      <i className="far fa-ellipsis-v"></i>
      <div className="copyright">
        <p>© 2023</p>
      </div>
    </div>
  );
};