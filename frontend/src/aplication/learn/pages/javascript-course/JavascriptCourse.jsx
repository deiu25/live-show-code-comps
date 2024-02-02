import React, { useEffect } from "react";
import { BlogPostNavbar } from "../../../blog/components/blog-post-navbar/BlogPostNavbar";
import "./JavascriptCourse.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursePosts } from "../../../../redux/features/courses/coursesSlice";
import { Link } from "react-router-dom";
import { useDeleteCoursePost } from "../../custom-hooks/useDeleteCoursePost";

export const JavascriptCourse = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.coursePosts.items);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";
  const isUserLoggedIn = user !== null;

  const confirmDelete = useDeleteCoursePost();

  useEffect(() => {
    dispatch(fetchCoursePosts("javascript"));
  }, [dispatch]);

  return (
    <>
      <BlogPostNavbar />
      <div className="course-body">
        <div className="course-header">
          <div className="course-title">Javascript Quick Course</div>
        </div>
        <div className="course-map">
          {posts && posts.length > 0 ? (
            posts.map((post) => {
              const isUserCreatorOfPost = user?._id === post.user._id;
              return (
                <div key={post._id} className="chapter-card-container">
                  <Link to={`/javascriptCourse/${post._id}`} className="chapter-card-link">
                    <div className="chapter-card">
                      {isUserLoggedIn && isUserCreatorOfPost && isAdmin && (
                        <div className="card-buttons">
                          <button className="card-button edit">Edit</button>
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
            })
          ) : (
            <p>There are no posts available for this course.</p>
          )}
        </div>
      </div>
    </>
  );
};
