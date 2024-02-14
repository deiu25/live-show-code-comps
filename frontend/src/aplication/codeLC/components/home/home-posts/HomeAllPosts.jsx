// HomeAllPosts.jsx
import React, { useRef } from "react";
import { PostsMap } from "../posts-map/PostsMap";
import { usePosts } from "../posts-map/usePosts";
import useLazyLoad from "../../../customHooks/useLazyLoad";


export const HomeAllPosts = () => {
  const posts = usePosts((state) => state.posts?.data ?? []);
  const loadMoreRef = useRef(null);
  const visiblePosts = useLazyLoad(posts, loadMoreRef);

  return (
    <>
      {/* <PostsHeader /> */}
      <PostsMap posts={visiblePosts} title="All Posts" loadMoreRef={loadMoreRef} />
    </>
  );
};