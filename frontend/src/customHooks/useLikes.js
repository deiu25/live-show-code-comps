// useLikes.js
import { useDispatch, useSelector } from 'react-redux';
import { getLikesForPost, likePost } from '../redux/features/posts/postSlice';
import { useEffect } from 'react';


export function useLikes(id) {
  const dispatch = useDispatch();

  const { likes, userWhoLiked } = useSelector((state) => {
    const postLikes = (state.posts.likesMap && state.posts.likesMap[id]) || { likesCount: 0, users: [] };
    const currentUserLike = postLikes.users.find((user) => user._id === state.auth.user._id);
    return {
      likes: postLikes,
      userWhoLiked: currentUserLike,
    };
  });

  useEffect(() => {
    dispatch(getLikesForPost(id));
  }, [dispatch, id]);

  const handleLike = async () => {
    try {
      await dispatch(likePost(id)).unwrap();
      dispatch(getLikesForPost(id));
    } catch (err) {
      console.log(err);
    }
  };

  return { likes, userWhoLiked, handleLike };
}