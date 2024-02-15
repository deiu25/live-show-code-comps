// BlogCard.js
import React from "react";
import "./BlogCard.css";
import { useDeleteBlogPost } from "../../customHooks/useDeleteBlogPost";
import { Link } from "react-router-dom";
import { useAuthAdminStatus } from "../../../customHooks/useAuthAdminStatus";
import { shortenText } from "../../../auth/pages/profile/Profile";

export const BlogCard = ({ id, title, description, headerImage, user: postUser }) => {
  const { isAdmin, isUserLoggedIn, isUserCreator } = useAuthAdminStatus(postUser);

  const shortenedDescription = shortenText(description, 100);

  const confirmDelete = useDeleteBlogPost();

  return (
    <div className="blog-card-body" id="blog-card-body">
      <div className="blog-card spring-fever">
        <div className="blog-card-image">
          <img src={headerImage} alt="headerImage" className="blog-img"></img>
        </div>
        
        <div className="title-content">
          <h3><Link to={`/blog/${id}`}>{title}</Link></h3>
          <div className="intro"> <Link to={`/blog/${id}`}>See More</Link> </div>
        </div>

        <div className="card-info">
          <div className="blog-card-description">{shortenedDescription}</div>
          <Link to={`/blog/${id}`}>Read Article<span className="licon icon-arr icon-black"></span></Link>
        </div>
        <div className="utility-info">
          <ul className="utility-list">
            {isUserLoggedIn && isUserCreator && isAdmin && (
              <>
                <li><span className="licon icon-edit"></span><Link to={`/blog/${id}`}>Edit</Link></li>
                <li><span className="licon icon-delete"></span>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(id);
                  }}
                  className="link-like-button"
                  >Delete</button>
                </li>
              </>
            )}
            <li><span className="licon icon-like"></span><button className="link-like-button">2</button></li>
            <li><span className="licon icon-com"></span><button className="link-like-button">12</button></li>
            <li><span className="licon icon-dat"></span>03 jun 2017</li>
            <li><span className="licon icon-tag"></span><button className="link-like-button">Photos</button>, <button className="link-like-button">Nice</button></li>
          </ul>
        </div>
        <div className="gradient-overlay"></div>
        <div className="color-overlay"></div>
      </div>
    </div>
  );
};
