// BlogCard.js
import React from "react";
import "./BlogCard.css";
import { useDeleteBlogPost } from "../../customHooks/useDeleteBlogPost";
import { Link } from "react-router-dom";
import { useAuthAdminStatus } from "../../../customHooks/useAuthAdminStatus";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../../../redux/features/blog/blogSlice";
import { ReactComponent as Like } from "../../assets/icons/like-icon.svg";
import { ReactComponent as Message } from "../../assets/icons/message-svg.svg";
import { ReactComponent as Share } from "../../assets/icons/shortcut.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as Date } from "../../assets/icons/date.svg";
import { ReactComponent as ArrRight } from "../../assets/icons/arrow-right.svg";
import { shortenText } from "../../../customHooks/shortenText";

export const BlogCard = ({
  id,
  title,
  description,
  date,
  headerImage,
  user: postUser,
  postId = id,
}) => {
  const { isAdmin, isUserLoggedIn, isUserCreator } =
    useAuthAdminStatus(postUser);
  const { user } = useSelector((state) => state.auth);
  const shortenedDescription = shortenText(description, 100);
  const dateString = date;
  const formattedDate = dateString.slice(0, 10);
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    state.blogPosts.items.find((post) => post._id === postId)
  );

  const confirmDelete = useDeleteBlogPost();

  const handleLike = async () => {
    if (!user) {
      alert("You must be logged in to like a post");
      return;
    }
    try {
      await dispatch(toggleLike({ postId: id })).unwrap();
    } catch (error) {
      console.error(`Error toggling like for post ${id}:`, error);
    }
  };

  return (
    <div className="blog-card-body" id="blog-card-body">
      <div className="blog-card spring-fever">
        <div className="blog-card-image">
          <img src={headerImage} alt="headerImage" className="blog-img"></img>
        </div>

        <div className="title-content">
          <h3>
            <Link to={`/blog/${id}`}>{title}</Link>
          </h3>
          <div className="intro">
            {" "}
            <Link to={`/blog/${id}`}>See More</Link>{" "}
          </div>
        </div>

        <div className="card-info">
          <div className="blog-card-description">{shortenedDescription}</div>
          <Link to={`/blog/${id}`}>
            Read Article<span className="licon"><ArrRight className="licon"></ArrRight></span>
          </Link>
        </div>
        <div className="utility-info">
          <ul className="utility-list">
            {isUserLoggedIn && isUserCreator && isAdmin && (
              <>
                <li>
                  <Edit className="licon"></Edit>
                  <Link to={`/blog/${id}`}>Edit</Link>
                </li>
                <li>
                  <Delete
                    className="licon"
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(id);
                    }}
                  ></Delete>
                  <button
                    className="link-like-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              </>
            )}
            <li>
              <Like className="licon" onClick={handleLike}></Like>
              <span className="link-like-button">{post?.likesCount ?? 0}</span>
            </li>
            {/* <li>
              <Message className="licon"></Message>
              <span className="link-like-button">12</span>
            </li>
            <li>
              <Share className="licon"></Share>
              <span className="link-like-button">07</span>
            </li> */}
            <li>
              <Date className="licon"></Date>
              <span className="link-like-button">{formattedDate}</span>
            </li>
          </ul>
        </div>
        <div className="gradient-overlay"></div>
        <div className="color-overlay"></div>
      </div>
    </div>
  );
};
