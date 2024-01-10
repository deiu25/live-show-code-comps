// PostCard.jsx
import React, { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./PostCard.css";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import {
  deletePost,
  fetchPosts,
  likePost,
} from "../../../redux/features/posts/postSlice";
import { ReactComponent as Coment } from "../../../assets/icons/coments.svg";
import { ReactComponent as Like } from "../../../assets/icons/like-icon.svg";
import { ReactComponent as Shortcut } from "../../../assets/icons/shortcut.svg";
import { ReactComponent as EyeLook } from "../../../assets/icons/eye-look-icon.svg";
import { ReactComponent as Bookmark } from "../../../assets/icons/bookmark-icon.svg";
import { shortenText } from "../../../auth/pages/profile/Profile";

function PostCard({ id, title, htmlCode, cssCode, jsCode, likes }) {
  const dispatch = useDispatch();
  const [showOverlay, setShowOverlay] = useState(true);
  const shortenedTitle = shortenText(title, 20);
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = async () => {
    console.log(`Attempting to like post with id: ${id}`);
    try {
      const response = await dispatch(likePost(id)).unwrap();
      console.log('Post liked successfully:', response);
      // Actualizați starea locală cu noua valoare a like-urilor
      setLikeCount(response.likes);
    } catch (err) {
      console.error("Failed to like the post: ", err);
    }
  };

  useEffect(() => {
    function handleMouseMove() {
      setShowOverlay(true);
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const markupUrl = useMemo(() => {
    const blob = new Blob(
      [
        `<!DOCTYPE html>
      <html>
      <head>
        <style>${cssCode}</style>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      </head>
      <body>
        ${htmlCode}
        <script>${jsCode}</script>
      </body>
      </html>`,
      ],
      { type: "text/html" }
    );
    return URL.createObjectURL(blob);
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(markupUrl);
    };
  }, [markupUrl]);

  const handleDelete = async (id) => {
    await dispatch(deletePost(id));
    dispatch(fetchPosts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          label: "Delete",
          onClick: () => handleDelete(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <div className="card">
      <div
        className="card-body"
        onClick={() => setShowOverlay(false)}
        onMouseMove={() => setShowOverlay(true)}
      >
        <iframe title={title} src={markupUrl} className="iframe"></iframe>
        <div
          className="overlay"
          style={{ display: showOverlay ? "flex" : "flex" }}
        >
          <Link to={`/post/${id}`} className="btn view-btn">
            View
          </Link>
          <button onClick={() => confirmDelete(id)} className="btn btn-danger">
            Delete
          </button>
          <p className="post-card-title text-truncate">
            {showFullTitle ? title : shortenedTitle}
          </p>
          <div className="post-card-icons">
            <div className="number-of" onClick={handleLike}>
              <Like className="soc-icons" />
              <span className="soc-number">{likeCount}</span>
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
