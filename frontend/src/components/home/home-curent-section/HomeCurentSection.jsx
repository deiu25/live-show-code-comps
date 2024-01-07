import React, { useState, useEffect } from 'react';
import { PostsMap } from '../posts-map/PostsMap';
import { usePosts } from '../posts-map/usePosts';

export const HomeCurentSection = () => {
  const allPosts = usePosts((state) => state.posts?.data ?? []);
  const [visiblePosts, setVisiblePosts] = useState([]);
  
  useEffect(() => {
    const updateVisiblePosts = () => {
      const viewportHeight = window.innerHeight;
      const postHeightEstimate = 100; 
      const numPostsToShow = Math.floor(viewportHeight / postHeightEstimate);
      
      setVisiblePosts(allPosts.slice(0, numPostsToShow));
    };

    updateVisiblePosts();
    
    window.addEventListener('resize', updateVisiblePosts);
    
    return () => {
      window.removeEventListener('resize', updateVisiblePosts);
    };
  }, [allPosts]); 

  return <PostsMap posts={visiblePosts} title="Latest Posts" />;
};