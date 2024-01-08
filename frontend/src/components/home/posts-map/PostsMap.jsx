//PostsMap.jsx
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Card from "../post-card/PostCard";
import { useDispatch } from 'react-redux';
import { deletePost } from "../../../redux/features/posts/postSlice";

// Componentă separată pentru heading
const SectionHeading = memo(({ title }) => (
  <div className="section-heading">
    <h2 className="display-4">{title} <i className="fal fa-play small"></i></h2>
  </div>
));

// Componentă pentru randarea listei de postări
const PostList = memo(({ posts, onPostDelete  }) => (
  <div className="row">
    {posts.map((post) => (
      <div className="col-md-4" key={post._id}>
        <Card
          title={post.title}
          htmlCode={post.htmlCode}
          cssCode={post.cssCode}
          jsCode={post.jsCode}
          id={post._id}
          onPostDelete={onPostDelete}
        />
      </div>
    ))}
  </div>
));

// Componenta principală refăcută cu lazy loading
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

export const PostsMap = memo(({ posts, title, onPostDelete }) => {
  const dispatch = useDispatch();
  const loadMoreRef = useRef(null);
  const visiblePosts = useLazyLoad(posts, loadMoreRef);

  const handlePostDelete = useCallback((id) => {
    dispatch(deletePost(id));
    if (onPostDelete) {
      onPostDelete();
    }
  }, [dispatch, onPostDelete]); 

  return (
    <div className="content-section">
      {title && <SectionHeading title={title} />}
      <PostList posts={visiblePosts} onPostDelete={handlePostDelete} />
      <div ref={loadMoreRef} style={{ height: '20px', margin: '10px 0' }}>
      </div>
    </div>
  );
});