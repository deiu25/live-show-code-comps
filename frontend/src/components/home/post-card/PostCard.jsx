// PostCard.jsx
import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./PostCard.css";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../redux/features/posts/postSlice";
import { confirmAlert } from "react-confirm-alert";

function PostCard({ id, title, htmlCode, cssCode, jsCode, onPostDelete }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    onPostDelete(id); 
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
        <button onClick={() => confirmDelete(id)} className="btn btn-danger">Delete</button>
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
  onPostDelete: PropTypes.func,
};

export default React.memo(PostCard);
