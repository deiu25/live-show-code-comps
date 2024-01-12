// BlogCard.js
import React from "react";
import "./BlogCard.css";

export const BlogCard = ({ title, text, imageUrl }) => {
  return (
    <li className="blog-cards_item">
      <div className="blog-card">
        <div className="blog-card_image">
          <img src={imageUrl} alt="" className="blog-img"></img>
        </div>
        <div className="blog-card_content">
          <h2 className="blog-card_title">{title}</h2>
          <p className="blog-card_text">{text}</p>
          <button className="blog-btn blog-card_btn">Read More</button>
        </div>
      </div>
    </li>
  );
};