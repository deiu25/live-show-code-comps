// HomeCurentSection.jsx
import React, { useEffect } from "react";
import Card from "../post-card/PostCard";
import { HomeHeader } from "../home-header/HomeHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../redux/features/posts/postSlice";

export const HomeCurentSection = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.posts)?.data ?? [];
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <HomeHeader />
      <div className="content-section">
        <div className="section-heading">
          <h2 className="display-4">
            Latest Posts <i className="fal fa-play small"></i>
          </h2>
          <a href="videos.html">
            <i className="fal fa-list"></i> All
          </a>
        </div>
        <div className="row">
          {data.map((post) => (
            <div className="col-md-4" key={post._id}>
              <Card
                title={post.title}
                htmlCode={post.htmlCode}
                cssCode={post.cssCode}
                jsCode={post.jsCode}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
