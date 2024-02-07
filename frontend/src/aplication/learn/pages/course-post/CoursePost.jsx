import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CoursePost = ({ post, user, useDeleteCoursePost }) => {
  const navigate = useNavigate(); 
  const confirmDelete = useDeleteCoursePost();
  const isAdmin = user?.role === "admin";
  const isUserLoggedIn = user !== null;
  const isUserCreatorOfPost = user?._id === post.user._id;

  const handleEdit = (e, postId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/javascriptCourse/${postId}`); 
  };

  return (
    <div className="chapter-card-container">
      <Link to={`/javascriptCourse/${post._id}`} className="chapter-card-link">
        <div className="chapter-card">
          {isUserLoggedIn && isUserCreatorOfPost && isAdmin && (
            <div className="card-buttons">
              <button 
                className="card-button edit"
                onClick={(e) => handleEdit(e, post._id)} 
              >
                Edit
              </button>
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
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default CoursePost;
