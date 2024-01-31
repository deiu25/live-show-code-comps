// BlogCard.js
import React from "react";
import "./BlogCard.css";
import { useDeleteBlogPost } from "../../customHooks/useDeleteBlogPost";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const BlogCard = ({ id, title, description, headerImage }) => {
  const blogPost = useSelector((state) => state.blogPosts.post);
  console.log("blogPost", blogPost);
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const isAdmin = user?.role === "admin";
  console.log(isAdmin);

  const confirmDelete = useDeleteBlogPost();

  return (
    <li className="blog-cards_item">
      <div className="blog-card">
        <div className="blog-card_image">
          <img src={headerImage} alt="headerImage" className="blog-img"></img>
        </div>
        <div className="blog-card_content">
          <h2 className="blog-card_title">{title}</h2>
          <p className="blog-card_text">{description}</p>
          <Link to={`/blog/${id}`} className="blog-card_link">
            <button className="blog-btn blog-card_btn">Read More</button>
          </Link>

            <button className="blog-btn blog-card_btn">Edit</button>


            <button
              onClick={(e) => {
                e.stopPropagation();
                confirmDelete(id);
              }}
              className="blog-btn blog-card_btn"
            >
              Delete
            </button>

        </div>
      </div>
    </li>
  );
};
