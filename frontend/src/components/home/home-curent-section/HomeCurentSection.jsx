// HomeCurentSection.jsx
import React from "react";
import { HomeHeader } from "../home-header/HomeHeader";
import { PostsMap } from "../posts-map/PostsMap";
import { usePosts } from "../posts-map/usePosts";

export const HomeCurentSection = () => {
  const posts = usePosts((state) => state.posts?.data?.slice(-6) ?? []);

  return (
    <>
      <HomeHeader />
      <PostsMap posts={posts} title="Latest Posts" />
    </>
  );
};