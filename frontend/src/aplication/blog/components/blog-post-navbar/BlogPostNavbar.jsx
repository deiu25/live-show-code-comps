import React from "react";
import "../new-blog-navbar/NewBlogNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import livecodeshowlogo1 from "../../../../assets/logo/livecodeshowlogo1.png";
import {
  ShowOnLogin,
  ShowOnLogout,
} from "../../../auth/components/protect/hiddenLink";
import { useSelector } from "react-redux";

export const BlogPostNavbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const goProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="editor-nav">
      <Link to="/" className="">
        <img src={livecodeshowlogo1} alt="logo" className="editor-nav-logo" />
      </Link>
      <div className="editor-nav-right">
        <div className="editor-nav-buttons">
        </div>
        <div className="editor-nav-user">
          <ShowOnLogout>
            <Link to="/login">
              {" "}
              <button>Auth</button>
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
