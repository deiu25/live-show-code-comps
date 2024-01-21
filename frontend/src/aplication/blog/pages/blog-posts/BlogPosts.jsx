// BlogPosts.js
import React, { useState, useEffect } from "react";
import "./BlogPosts.css";
import { BlogCard } from "../../components/blog-card/BlogCard";
import { getBlogPosts } from "../../api-helpers/helpers";

export const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getBlogPosts();
      if (fetchedPosts) {
        setPosts(fetchedPosts);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-main">
      <h1 className="blog-h1">Responsive Card Grid Layout</h1>
      <ul className="blog-cards">
        {posts.map((post) => (
          <BlogCard
            key={post._id}
            id={post._id}
            title={post.title}
            text={post.description}
            headerImage={
              post.headerImage.length > 0 ? post.headerImage[0].url : ""
            }
          />
        ))}
      </ul>
    </div>
  );
};
