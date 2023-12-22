// PostCard.jsx
import React from "react";
import "./PostCard.css";

function PostCard({ title, htmlCode, cssCode, jsCode }) {
  // Functia pentru a crea un URL blob din codul HTML, CSS si JavaScript
  const createMarkup = () => {
    const blob = new Blob(
      [
        `<html><head><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}</script></body></html>`,
      ],
      { type: "text/html" }
    );
    return URL.createObjectURL(blob);
  };

  return (
    <>
      <div className="card-body">
        <iframe title={title} src={createMarkup()} className="iframe"></iframe>
      </div>
      <div className="post-card-footer">
        <p className="post-card-title text-truncate">{title}</p>
      </div>
    </>
  );
}

export default PostCard;
