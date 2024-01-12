// BlogPosts.js
import React from "react";

import "./BlogPosts.css";
import { BlogCard } from "../blog-card/BlogCard";

export const BlogPosts = () => {
  const posts = [
    {
      id: 1,
      title: "Card Grid Layout",
      text: "Demo of pixel perfect pure CSS simple responsive card grid layout",
      imageUrl: "https://picsum.photos/500/300/?image=2",
    },
    {
      id: 2,
      title: "Another Card",
      text: "This is another card with different content",
      imageUrl: "https://picsum.photos/500/300/?image=10",
    },
    {
      id: 3,
      title: "Another Card",
      text: "This is another card with different content",
      imageUrl: "https://picsum.photos/500/300/?image=10",
    },
    {
      id: 4,
      title: "Another Card",
      text: "This is another card with different content",
      imageUrl: "https://picsum.photos/500/300/?image=10",
    },
    {
      id: 5,
      title: "Another Card",
      text: "This is another card with different content",
      imageUrl: "https://picsum.photos/500/300/?image=10",
    },
  ];

  return (
    <div className="blog-main">
      <h1 className="blog-h1">Responsive Card Grid Layout</h1>
      <ul className="blog-cards">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            text={post.text}
            imageUrl={post.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
};
