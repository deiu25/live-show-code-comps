// PostCard.jsx
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./PostCard.css";
import { ReactComponent as Coment } from "../../../assets/icons/coments.svg";
import { ReactComponent as Like } from "../../../assets/icons/like-icon.svg";
import { ReactComponent as Dislike } from "../../../assets/icons/dislike-icon.svg";
import { ReactComponent as Shortcut } from "../../../assets/icons/shortcut.svg";
import { ReactComponent as EyeLook } from "../../../assets/icons/eye-look-icon.svg";
import { ReactComponent as Bookmark } from "../../../assets/icons/bookmark-icon.svg";
import { useLikes } from "../../../customHooks/useLikes";
import { useIframeUrl } from "../../../customHooks/useIframeUrl";
import useDeletePost from "../../../customHooks/useDeletePost";
import { shortenText } from "../../../../auth/pages/profile/Profile";
import { useAuthAdminStatus } from "../../../../customHooks/useAuthAdminStatus";

function PostCard({ id, title, htmlCode, cssCode, jsCode, user: postUser }) {
  const [showOverlay, setShowOverlay] = useState(true);
  const shortenedTitle = shortenText(title, 20);
  const markupUrl = useIframeUrl(htmlCode, cssCode, jsCode);
  const { likes, userWhoLiked, handleLike } = useLikes(id);
  const confirmDelete = useDeletePost();

  const { isAdmin, isUserLoggedIn, isUserCreator } = useAuthAdminStatus(postUser);

  const handleMouseMove = useCallback(() => {
    setShowOverlay(true);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(markupUrl);
    };
  }, [markupUrl]);

  return (
    <div className="card">
      <div
        className="card-body"
        onClick={() => setShowOverlay(false)}
        onMouseMove={() => setShowOverlay(true)}
      >
        <iframe title={title} src={markupUrl} className="iframe"></iframe>
        <div className={`overlay ${!showOverlay && "overlay-hidden"}`}>
          <Link to={`/post/${id}`} className="btn view-btn">
            View
          </Link>
          {isUserLoggedIn && isUserCreator && isAdmin && (
          <button onClick={() => confirmDelete(id)} className="btn btn-danger">
            Delete
          </button> )}
          <p className="post-card-title text-truncate">
            {shortenedTitle}
          </p>
          <div className="post-card-icons"  onClick={(e) => { e.stopPropagation(); }}>
            <div className="number-of" onClick={handleLike}>
              {userWhoLiked ? (
                <Dislike className="soc-icons" />
              ) : (
                <Like className="soc-icons" />
              )}
              <span className="soc-number">{likes.likesCount}</span>
            </div>
            <div className="number-of">
              <Coment className="soc-icons" />
              <span className="soc-number">0</span>
            </div>
            <div className="number-of">
              <Shortcut className="soc-icons" />
              <span className="soc-number">0</span>
            </div>
            <div className="number-of">
              <EyeLook className="soc-icons" />
              <span className="soc-number">0</span>
            </div>
            <div className="number-of">
              <Bookmark className="soc-icons" />
              <span className="soc-number">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  htmlCode: PropTypes.string.isRequired,
  cssCode: PropTypes.string.isRequired,
  jsCode: PropTypes.string.isRequired,
};

export default React.memo(PostCard);
