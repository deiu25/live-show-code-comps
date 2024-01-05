//custom hook for fetching posts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from "../../../redux/features/posts/postSlice";

export const usePosts = (selectorFunc) => {
  const dispatch = useDispatch();
  const posts = useSelector(selectorFunc);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return posts;
};