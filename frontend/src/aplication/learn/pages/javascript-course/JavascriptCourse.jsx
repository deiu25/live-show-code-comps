import React, { useEffect } from "react";
import { BlogPostNavbar } from "../../../blog/components/blog-post-navbar/BlogPostNavbar";
import "./JavascriptCourse.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursePosts } from "../../../../redux/features/courses/coursesSlice";

export const JavascriptCourse = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.coursePosts.items);

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
            posts.map((post) => (
              <div className="chapter-card" key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
            ))
          ) : (
            <p>There are no posts available for this course.</p>
          )}
        </div>
      </div>
    </>
  );
};
