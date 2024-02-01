// BlogPosts.js
import React, { useEffect } from "react";
import "./BlogPosts.css";
import { BlogCard } from "../../components/blog-card/BlogCard";
import { fetchBlogPosts } from "../../../../redux/features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";


export const BlogPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.blogPosts.items);
  
  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  return (
    <div className="blog-main">
      <h1 className="blog-h1">Responsive Card Grid Layout</h1>
      <ul className="blog-cards">
        {posts.map((post) => (
          <BlogCard
            key={post._id}
            id={post._id}
            user={post.user}
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
