import React, { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ShowOnLogin,
  ShowOnLogout,
} from "../../../auth/components/protect/hiddenLink";
import { updateTheme } from "../../../../redux/features/auth/authSlice";
import useWindowWidth from "../../customHooks/useWindowWidth";
import ThemeDropdown from "../dropdown/ThemeDropdown";
import ThemeButtons from "../theme-buttons/ThemeButtons";

export const HomeSidebar = ({
  onTabChange,
  currentTab,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const windowWidth = useWindowWidth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleThemeDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleChangeTheme = (theme) => {
    localStorage.setItem("theme", theme);
    dispatch(updateTheme({ theme }));
    document.body.className = theme;
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
          className={`sidebar-switch ${
            windowWidth < 768
              ? isSidebarOpen
                ? "fas far fa-chevron-double-up"
                : "fas far fa-chevron-double-down"
              : isSidebarOpen
              ? "far fa-chevron-double-left"
              : "far fa-chevron-double-right"
          }`}
          onClick={toggleSidebar}
        />
      ) : (
        <div
          className={`sidebar-switch ${
            windowWidth < 768
              ? isSidebarOpen
                ? "fas far fa-chevron-double-up"
                : "fas far fa-chevron-double-down"
              : isSidebarOpen
              ? "far fa-chevron-double-left"
              : "far fa-chevron-double-right"
          }`}
          onClick={toggleSidebar}
        />
      )}
      <div className="nav flex-column">
        <div key="logo" className="nav-item">
          <ShowOnLogout>
            <button
              className="anchor-btn"
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
        </div>
      </div>

      <ul className="nav flex-column">
        <li
          key="home"
          className={`nav-item ${currentTab === "home" ? "active" : ""}`}
        >
          <button className="anchor-btn" onClick={() => onTabChange("home")}>
            <i className="fas fa-home"></i>
            {isSidebarOpen && <span className="nav-text"> Home</span>}
          </button>
        </li>
        <li
          key="posts"
          className={`nav-item ${currentTab === "posts" ? "active" : ""}`}
        >
          <button className="anchor-btn" onClick={() => onTabChange("posts")}>
            <i className="fas fa-tasks"></i>
            {isSidebarOpen && <span className="nav-text"> Snippets</span>}
          </button>
        </li>
        <li
          key="blog"
          className={`nav-item ${currentTab === "blog" ? "active" : ""}`}
        >
          <button className="anchor-btn" onClick={() => onTabChange("blog")}>
            <i className="fas fa-blog"></i>
            {isSidebarOpen && <span className="nav-text"> Blog</span>}
          </button>
        </li>
        <li
          key="learn"
          className={`nav-item ${currentTab === "learn" ? "active" : ""}`}
        >
          <button className="anchor-btn" onClick={() => onTabChange("learn")}>
            <i className="fas fa-book"></i>
            {isSidebarOpen && <span className="nav-text"> Learn</span>}
          </button>
        </li>
        <li
          key="about"
          className={`nav-item ${currentTab === "about" ? "active" : ""}`}
        >
          <button className="anchor-btn" onClick={() => onTabChange("about")}>
            <i className="fas fa-info-circle"></i>
            {isSidebarOpen && <span className="nav-text"> About</span>}
          </button>
        </li>
        {/* theme */}
        {windowWidth < 768 ? (
          <ThemeDropdown
            handleChangeTheme={handleChangeTheme}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleThemeDropdown}
          />
        ) : (
          <ThemeButtons handleChangeTheme={handleChangeTheme} />
        )}
        {isAdmin && (
          <div className="add-section-buttons">
            <li key="addPost" className="nav-item">
              <button
                className="anchor-btn"
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
                className="anchor-btn"
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
                className="anchor-btn"
                onClick={() => {
                  navigate("/NewCourse");
                }}
              >
                <i className="fas fa-plus"></i>
                {isSidebarOpen && <span className="nav-text"> Add Course</span>}
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
          <p>&copy; 2023 Syntax Seeker.</p>
        )}
      </div>
    </div>
  );
};
