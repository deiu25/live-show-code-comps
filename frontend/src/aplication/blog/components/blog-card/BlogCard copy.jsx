// BlogCard.js
import React from "react";
import "./BlogCard copy.css";
import { useDeleteBlogPost } from "../../customHooks/useDeleteBlogPost";
import { Link } from "react-router-dom";
import { useAuthAdminStatus } from "../../../customHooks/useAuthAdminStatus";

export const BlogCard = ({ id, title, description, headerImage, user: postUser }) => {
  const { isAdmin, isUserLoggedIn, isUserCreator } = useAuthAdminStatus(postUser);

  const confirmDelete = useDeleteBlogPost();

  return (
    <div className="blog-card-body" id="blog-card-body">
      <div className="blog-card spring-fever">
        <div className="blog-card-image">
          <img src={headerImage} alt="headerImage" className="blog-img"></img>
        </div>
        
        <div className="title-content">
          <h3><a href="#">10 inspiring photos</a></h3>
          <div className="intro"> <a href="#">See More</a> </div>
        </div>
        <div className="card-info">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...
          <a href="#">Read Article<span className="licon icon-arr icon-black"></span></a>
        </div>
        <div className="utility-info">
          <ul className="utility-list">
            <li><span className="licon icon-like"></span><a href="#">2</a></li>
            <li><span className="licon icon-com"></span><a href="#">12</a></li>
            <li><span className="licon icon-dat"></span>03 jun 2017</li>
            <li><span className="licon icon-tag"></span><a href="#">Photos</a>, <a href="#">Nice</a></li>
          </ul>
        </div>
        <div className="gradient-overlay"></div>
        <div className="color-overlay"></div>
      </div>
    </div>
  );
};
