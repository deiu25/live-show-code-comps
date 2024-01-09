//PostsMap.jsx
import React, { memo } from "react";
import Card from "../post-card/PostCard";

// Componentă separată pentru heading
const SectionHeading = memo(({ title }) => (
  <div className="section-heading">
    <h2 className="display-4">{title} <i className="fal fa-play small"></i></h2>
  </div>
));

// Componentă pentru randarea listei de postări
const PostList = memo(({ posts, onPostDelete  }) => (
  <div className="row">
    {posts.map((post) => (
      <div className="col-md-4" key={post._id}>
        <Card
          title={post.title}
          htmlCode={post.htmlCode}
          cssCode={post.cssCode}
          jsCode={post.jsCode}
          id={post._id}
          onPostDelete={onPostDelete}
        />
      </div>
    ))}
  </div>
));
  
export const PostsMap = memo(({ posts, title, loadMoreRef }) => {

  return (
    <div className="content-section">
      {title && <SectionHeading title={title} />}
      <PostList posts={posts} />
      <div ref={loadMoreRef} style={{ height: '20px', margin: '10px 0' }}>
      </div>
    </div>
  );
});