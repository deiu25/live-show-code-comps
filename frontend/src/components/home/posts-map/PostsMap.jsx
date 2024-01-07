import React from "react";
import Card from "../post-card/PostCard";

// Componentă separată pentru heading
const SectionHeading = ({ title }) => (
  <div className="section-heading">
    <h2 className="display-4">{title} <i className="fal fa-play small"></i></h2>
  </div>
);

// Componentă pentru randarea listei de postări
const PostList = ({ posts }) => (
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
);

// Componenta principală refăcută
export const PostsMap = React.memo(({ posts, title }) => {
  return (
    <div className="content-section">
      {title && <SectionHeading title={title} />}
      <PostList posts={posts} />
    </div>
  );
});