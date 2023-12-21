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
    <div className="card">
      <iframe
        title={title}
        src={createMarkup()}
        className="card-img-top"
        sandbox="allow-scripts"
        height={200}
        width={200}
      ></iframe>
      <div className="card-footer">
        <p className="card-text text-truncate">{title}</p>
      </div>
    </div>
  );
}

export default PostCard;
