import React, { useState } from "react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import {
  ShowOnLogin,
  ShowOnLogout,
} from "../../../auth/components/protect/hiddenLink";
import { useSelector } from "react-redux";

export const HomeSidebar = ({ onTabChange, currentTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarClass = classNames({
    "col-md-3": isSidebarOpen,
    "col-md-1": !isSidebarOpen,
    sidebar: true,
  });

  const logoClass = classNames({
    logo: true,
    "logo-small": !isSidebarOpen,
  });

  const goProfile = () => {
    navigate("/profile");
  };

  const isAdmin = user?.role === "admin";

  return (
    <div className={sidebarClass} id="sidebar">
      {isSidebarOpen ? (
        <div
          className="anchor far fa-chevron-double-left"
          onClick={toggleSidebar}
        />
      ) : (
        <div
          className="anchor far fa-chevron-double-right"
          onClick={toggleSidebar}
        />
      )}
      <ShowOnLogout>
        <Link to="/login">
          <i className="far fa-user"></i>
          {isSidebarOpen && <span className="nav-text"> Auth</span>}
        </Link>
      </ShowOnLogout>
      <ShowOnLogin>
        <div className={logoClass} onClick={goProfile}>
          <img
            className="sidebar-acc-logo"
            src={user ? user.photo : "https://www.gravatar.com/av"}
            alt="logo"
          />
        </div>
      </ShowOnLogin>

      <ul className="nav flex-column">
        <li
          key="home"
          className={`nav-item ${currentTab === "home" ? "active" : ""}`}
        >
          <a className="nav-link" onClick={() => onTabChange("home")}>
            <i className="fas fa-home"></i>
            {isSidebarOpen && <span className="nav-text"> Home</span>}
          </a>
        </li>
        <li
          key="posts"
          className={`nav-item ${currentTab === "posts" ? "active" : ""}`}
        >
          <a className="nav-link" onClick={() => onTabChange("posts")}>
            <i className="fas fa-tasks"></i>
            {isSidebarOpen && <span className="nav-text"> Posts</span>}
          </a>
        </li>
        <li
          key="about"
          className={`nav-item ${currentTab === "about" ? "active" : ""}`}
        >
          <a className="nav-link" onClick={() => onTabChange("about")}>
            <i className="fas fa-info-circle"></i>
            {isSidebarOpen && <span className="nav-text"> About</span>}
          </a>
        </li>
      </ul>
      {isAdmin && (
        <ul className="nav flex-column">
          <li key="addPost" className="nav-item">
            <Link className="nav-link" to="/NewProject">
              <i className="fas fa-plus"></i>
              {isSidebarOpen && <span className="nav-text"> Add Post</span>}
            </Link>
          </li>
        </ul>
      )}
      <div className="copyright">
        {isSidebarOpen ? (
          <p>
            &copy; 2023 SyntaxSeeker. All rights reserved. Built by
            SyntaxSeeker.
          </p>
        ) : (
          <p>
            &copy; 2023 Syntax Seeker. All rights reserved. Built by Syntax
            Seeker.
          </p>
        )}
      </div>
    </div>
  );
};
