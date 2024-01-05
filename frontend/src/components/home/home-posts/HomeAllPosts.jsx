// HomeAllPosts.jsx
import React from "react";
import { PostsHeader } from "../posts-header/PostsHeader";
import { PostsMap } from "../posts-map/PostsMap";
import { usePosts } from "../posts-map/usePosts";

export const HomeAllPosts = () => {
  const posts = usePosts((state) => state.posts?.data ?? []);

  return (
    <>
      <PostsHeader />
      <PostsMap posts={posts} title="All Posts" />
    </>
  );
};