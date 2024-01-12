// useLikes.js
import { useDispatch, useSelector } from 'react-redux';
import { getLikesForPost, likePost } from '../redux/features/posts/postSlice';
import { useCallback, useEffect, useMemo } from 'react';
import { createSelector } from 'reselect';

// Memoized selector using Reselect
const createLikesSelector = () =>
  createSelector(
    [(state) => state.posts.likesMap, (_, id) => id, (state) => state.auth.user._id],
    (likesMap, id, userId) => {
      const postLikes = (likesMap && likesMap[id]) || { likesCount: 0, users: [] };
      const currentUserLike = postLikes.users.find((user) => user._id === userId);
      return {
        likes: postLikes,
        userWhoLiked: currentUserLike,
      };
    }
  );

export function useLikes(id) {
  const dispatch = useDispatch();

  const selectLikes = useMemo(createLikesSelector, []);
  const { likes, userWhoLiked } = useSelector((state) => selectLikes(state, id));

  useEffect(() => {
    dispatch(getLikesForPost(id));
  }, [dispatch, id]);

  const handleLike = useCallback(async () => {
    try {
      await dispatch(likePost(id)).unwrap();
      dispatch(getLikesForPost(id));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, id]);

  return { likes, userWhoLiked, handleLike };
}