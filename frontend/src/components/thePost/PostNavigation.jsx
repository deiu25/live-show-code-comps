import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import livecodeshowlogo1 from "../../assets/logo/livecodeshowlogo1.png";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as SaveTitle } from "../../assets/icons/check-circle.svg";
import { ReactComponent as Save } from "../../assets/icons/save-project.svg";
import {
  ShowOnLogin,
  ShowOnLogout,
} from "../../auth/components/protect/hiddenLink";

export const PostNavigation = ({
  title,
  isEditingTitle,
  handleTitleEdit,
  projectTitle,
  setProjectTitle,
  handleTitleSave,
  handleSavePost,
  error
}) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const goProfile = () => {
      navigate("/profile");
  };

  const handleProjectTitleChange = (e) => {
      setProjectTitle(e.target.value);
  };

    return (
        <div className="new-proj-nav">
          <div className="new-proj-nav-left">
            <div className="new-proj-nav-left-logo">
            <Link to='/' className=''>
            <img src={livecodeshowlogo1} alt='logo' className='editor-nav-logo' />
           </Link>
            </div>
            <div className="new-proj-nav-title">
              {!isEditingTitle ? (
                <>
                  <h5 className="new-proj-title">{title}</h5>
                  <div onClick={handleTitleEdit} className="new-proj-nav-title-icon" aria-label="Edit title">
                    <Edit />
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={handleProjectTitleChange}
                    autoFocus
                    aria-label="Project title"
                  />
                  <div className="new-proj-nav-title-icon" onClick={handleTitleSave}>
                    <SaveTitle />
                  </div>
                </>
              )}
              <button className="save-proj-button" onClick={handleSavePost}>
                <Save /> Save
              </button>
              {error && (
                <div className="create-proj-error-message">{error}</div>
              )}
            </div>
          </div>
          <div className="new-proj-nav-right">
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
      );
};
