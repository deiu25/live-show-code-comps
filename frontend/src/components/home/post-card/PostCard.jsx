// PostCard.jsx
import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./PostCard.css";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import { deletePost, fetchPosts } from "../../../redux/features/posts/postSlice";

function PostCard({ id, title, htmlCode, cssCode, jsCode }) {
  const dispatch = useDispatch();

  const markupUrl = useMemo(() => {
    const blob = new Blob([
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
      </html>`
    ], { type: 'text/html' });
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
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  return (
    <>
      <div className="card-body">
        <iframe title={title} src={markupUrl} className="iframe" />
      </div>
      <div className="post-card-footer">
        <p className="post-card-title text-truncate">{title}</p>
        <Link to={`/post/${id}`} className="btn btn-primary">
          View
        </Link>
        <button onClick={() => confirmDelete(id)} className="btn btn-danger"> Delete </button>
      </div>
    </>
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
