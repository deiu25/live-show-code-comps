import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShowOnLogin, ShowOnLogout } from "../../../auth/components/protect/hiddenLink";


export const HomeSidebar = ({
  onTabChange,
  currentTab,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
          className="sidebar-switch far fa-chevron-double-left"
          onClick={toggleSidebar}
        />
      ) : (
        <div
          className="sidebar-switch far fa-chevron-double-right"
          onClick={toggleSidebar}
        />
      )}
      <ShowOnLogout>
        <button
          className="nav-link anchor-btn"
          onClick={() => {
            navigate("/login");
          }}
        >
          <i className="far fa-user"></i>
          {isSidebarOpen && <span className="nav-text"> Auth</span>}
        </button>
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

      <ul className="nav flex-row theme-buttons">
        <li key="light" className="nav-item">
          <button
            className="nav-link anchor-btn"
            onClick={() => {
              document.body.classList.remove("dark");
            }}
          >
            <i className="fas fa-sun"></i>
          </button>
        </li>
        <li key="dark" className="nav-item">
          <button
            className="nav-link anchor-btn"
            onClick={() => {
              document.body.classList.add("dark");
            }}
          >
            <i className="fas fa-moon"></i>
          </button>
        </li>
        <li key="rainbow" className="nav-item">
          <button
            className="nav-link anchor-btn"
            onClick={() => {
              document.body.classList.remove("dark");
              document.body.classList.add("rainbow");
            }}
          >
            <i className="fas fa-rainbow"></i>
          </button>
        </li>
      </ul>

      <ul className="nav flex-column">
        <li
          key="home"
          className={`nav-item ${currentTab === "home" ? "active" : ""}`}
        >
          <button
            className="nav-link anchor-btn"
            onClick={() => onTabChange("home")}
          >
            <i className="fas fa-home"></i>
            {isSidebarOpen && <span className="nav-text"> Home</span>}
          </button>
        </li>
        <li
          key="posts"
          className={`nav-item ${currentTab === "posts" ? "active" : ""}`}
        >
          <button
            className="nav-link anchor-btn"
            onClick={() => onTabChange("posts")}
          >
            <i className="fas fa-tasks"></i>
            {isSidebarOpen && <span className="nav-text"> Posts</span>}
          </button>
        </li>
        <li
          key="blog"
          className={`nav-item ${currentTab === "blog" ? "active" : ""}`}
        >
          <button
            className="nav-link anchor-btn"
            onClick={() => onTabChange("blog")}
          >
            <i className="fas fa-blog"></i>
            {isSidebarOpen && <span className="nav-text"> Blog</span>}
          </button>
        </li>
        <li
          key="learn"
          className={`nav-item ${currentTab === "learn" ? "active" : ""}`}
        >
          <button
            className="nav-link anchor-btn"
            onClick={() => onTabChange("learn")}
          >
            <i className="fas fa-book"></i>
            {isSidebarOpen && <span className="nav-text"> Learn</span>}
          </button>
        </li>
        <li
          key="about"
          className={`nav-item ${currentTab === "about" ? "active" : ""}`}
        >
          <button
            className="nav-link anchor-btn"
            onClick={() => onTabChange("about")}
          >
            <i className="fas fa-info-circle"></i>
            {isSidebarOpen && <span className="nav-text"> About</span>}
          </button>
        </li>
        {isAdmin && (
          <div className="add-section-buttons">
            <li key="addPost" className="nav-item">
              <button
                className="nav-link anchor-btn"
                onClick={() => {
                  navigate("/NewProject");
                }}
              >
                <i className="fas fa-plus"></i>
                {isSidebarOpen && <span className="nav-text"> Add Post</span>}
              </button>
            </li>
            <li key="addBlogPost" className="nav-item">
              <button
                className="nav-link anchor-btn"
                onClick={() => {
                  navigate("/NewBlogPost");
                }}
              >
                <i className="fas fa-plus"></i>
                {isSidebarOpen && (
                  <span className="nav-text"> Add Blog Post</span>
                )}
              </button>
            </li>
            <li key="addCourse" className="nav-item">
              <button
                className="nav-link anchor-btn"
                onClick={() => {
                  navigate("/NewCourse");
                }}
              >
                <i className="fas fa-plus"></i>
                {isSidebarOpen && (
                  <span className="nav-text"> Add Course</span>
                )}
              </button>
            </li>
          </div>
        )}
      </ul>

      <div className="copyright">
        {isSidebarOpen ? (
          <p>
            &copy; 2023 SyntaxSeeker. All rights reserved. Built by
            SyntaxSeeker.
          </p>
        ) : (
          <p>
            &copy; 2023 Syntax Seeker.
          </p>
        )}
      </div>
    </div>
  );
};
