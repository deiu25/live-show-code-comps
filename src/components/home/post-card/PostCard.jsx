import React from "react";

function PostCard({ title, description, image, url }) {
  return (
    <div className="card">
      <a href={url}></a>
      <img src={image} alt="Card image" className="card-img-top"/>
      <div className="card-body">
        <p className="card-text text-truncate">{description}</p>
      </div>
    </div>
  );
}

export default PostCard;
