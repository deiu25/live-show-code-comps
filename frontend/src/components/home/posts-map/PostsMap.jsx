// PostsMap.jsx
import React from "react";
import Card from "../post-card/PostCard";

export const PostsMap = ({ posts, title }) => {
  return (
    <div className="content-section">
      {title && (
        <div className="section-heading">
          <h2 className="display-4">{title} <i className="fal fa-play small"></i></h2>
        </div>
      )}
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4" key={post._id}>
            <Card
              title={post.title}
              htmlCode={post.htmlCode}
              cssCode={post.cssCode}
              jsCode={post.jsCode}
              id={post._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};