// PostCard.jsx
import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./PostCard.css";

function PostCard({ id, title, htmlCode, cssCode, jsCode }) {
  const markupUrl = useMemo(() => {
    const blob = new Blob(
      [
        `<html><head><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}</script></body></html>`,
      ],
      { type: "text/html" }
    );
    const url = URL.createObjectURL(blob);
    return url;
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
        <button className="btn btn-danger">Delete</button>
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
