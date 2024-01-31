// BlogCard.js
import React from "react";
import "./BlogCard.css";
import { useDeleteBlogPost } from "../../customHooks/useDeleteBlogPost";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const BlogCard = ({ id, title, description, headerImage, user: postUser }) => {
  const { user } = useSelector((state) => state.auth);

  const blogPosts = useSelector((state) => state.blogPosts.blogPosts);

  console.log("blogPost", blogPosts);
  console.log(user);

  const isAdmin = user?.role === "admin";
  console.log(isAdmin);

  const confirmDelete = useDeleteBlogPost();

  const isUserLoggedIn = user !== null;
  const isUserCreator = user?._id === postUser?._id;

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
          {isUserLoggedIn && isUserCreator && (
            <>
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
            </>
          )}
        </div>
      </div>
    </li>
  );
};
