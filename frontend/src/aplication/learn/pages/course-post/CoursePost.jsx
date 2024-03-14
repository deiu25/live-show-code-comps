import React from "react";
import { Link } from "react-router-dom";
import { shortenText } from "../../../customHooks/shortenText";

const CoursePost = ({ post, user, useDeleteCoursePost }) => {

  const shortenedTitle = shortenText(post.title, 15);
  const shortenedDescription = shortenText(post.description, 58);

  const confirmDelete = useDeleteCoursePost();
  const isAdmin = user?.role === "admin";
  const isUserLoggedIn = user !== null;
  const isUserCreatorOfPost = user?._id === post.user._id;

  return (
    <>
      <Link to={`/javascriptCourse/${post._id}`} className="chapter-card-link">
        <div className="chapter-card">
          {isUserLoggedIn && isUserCreatorOfPost && isAdmin && (
            <div className="card-buttons">
              <button
                className="card-button delete"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  confirmDelete(post._id);
                }}
              >
                Delete
              </button>
            </div>
          )}
          <h3 className="js-card-title">{shortenedTitle}</h3>
          <p>{shortenedDescription}</p>
        </div>
      </Link>
    </>
  );
};

export default CoursePost;
