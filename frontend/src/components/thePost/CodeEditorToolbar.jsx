import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Terminal } from "../../assets/icons/terminal.svg";
import { ReactComponent as Assets } from "../../assets/icons/assets.svg";
import { ReactComponent as Coments } from "../../assets/icons/coments.svg";
import { ReactComponent as Shortcut } from "../../assets/icons/shortcut.svg";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { ReactComponent as Errors } from "../../assets/icons/errors.svg";
import { ReactComponent as Warnings } from "../../assets/icons/warnings.svg";
// import { ReactComponent as Like } from "../../assets/icons/like-icon.svg";
// import { ReactComponent as Dislike } from "../../assets/icons/dislike-icon.svg";
// import { useLikes } from "../../customHooks/useLikes";

export const CodeEditorToolbar = ({ id }) => {
  
  // const { likes, userWhoLiked, handleLike } = useLikes(id);
  // const onLikeClick = () => {
  //   handleLike();
  // };
  
  return (
    <div className="output-footer-bar">
      <div className="output-footer-bar-left">
        <Terminal />
        <Assets />
        {/* {userWhoLiked ? (
          <Dislike onClick={onLikeClick} />
        ) : (
          <Like onClick={onLikeClick} />
        )}
        <span>{likes.likesCount}</span> */}
        <Coments />
        <Shortcut />
      </div>
      <div className="output-footer-bar-center">
        <Link to="/">
          <Home />
        </Link>
      </div>
      <div className="output-footer-bar-right">
        <Errors />
        <p>0</p>
        <Warnings />
        <p>0</p>
      </div>
    </div>
  );
};
