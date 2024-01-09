// useLazyLoad.jsx
import { useState, useCallback, useEffect } from "react";

const useLazyLoad = (posts, loadMoreRef) => {
  const [visiblePosts, setVisiblePosts] = useState([]);

  const loadMorePosts = useCallback(() => {
    setVisiblePosts(prevPosts => [
      ...prevPosts,
      ...posts.slice(prevPosts.length, prevPosts.length + 6)
    ]);
  }, [posts]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMorePosts();
      }
    }, { threshold: 1.0 });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loadMorePosts, loadMoreRef]);

  useEffect(() => {
    setVisiblePosts(posts.slice(0, 6));
  }, [posts]);

  return visiblePosts;
};

export default useLazyLoad;