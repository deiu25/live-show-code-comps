import React from "react";
import "../new-blog-navbar/NewBlogNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShowOnLogin, ShowOnLogout } from "../../../auth/components/protect/hiddenLink";
import SpiralAnimation from "../../../home/components/logo/SpiralAnimation";

export const BlogPostNavbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const goProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="editor-nav">
        <div className="nav-logo-blog" onClick={() => navigate("/")}>
            <SpiralAnimation />
        </div>
      <div className="editor-nav-right">
        <div className="editor-nav-buttons">
        </div>
        <div className="editor-nav-user">
          <ShowOnLogout>
            <Link to="/login">
              {" "}
              <button className="login-button">Auth</button>
            </Link>
          </ShowOnLogout>
          <ShowOnLogin>
            <div className="new-proj-logo-login" onClick={goProfile}>
              <img
                className="new-proj-acc-logo"
                src={user ? user.photo : "https://www.gravatar.com/av"}
                alt="logo"
              />
            </div>
          </ShowOnLogin>
        </div>
      </div>
    </div>
  );
};
