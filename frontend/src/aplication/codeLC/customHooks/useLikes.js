// useLikes.js
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import { createSelector } from "reselect";
import { getLikesForPost, likePost } from "../../../redux/features/posts/postSlice";

// Memoized selector using Reselect
const createLikesSelector = () =>
  createSelector(
    [(state) => state.posts.likesMap, (_, id) => id],
    (likesMap, id) => {
      const postLikes = (likesMap && likesMap[id]) || {
        likesCount: 0,
        users: [],
      };
      return {
        likes: postLikes,
        userWhoLiked: null,
      };
    }
  );

export function useLikes(id) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const selectLikes = useMemo(createLikesSelector, []);
  const { likes, userWhoLiked: initialUserWhoLiked } = useSelector((state) =>
    selectLikes(state, id)
  );
  const userWhoLiked = user
    ? likes.users.find((userLike) => userLike._id === user._id)
    : null;

  useEffect(() => {
    dispatch(getLikesForPost(id));
  }, [dispatch, id]);

  const handleLike = useCallback(async () => {
    if (!user) {
      alert("You must be logged in to like a post");
      return;
    }
    try {
      await dispatch(likePost(id)).unwrap();
      dispatch(getLikesForPost(id));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, id, user]);

  return { likes, userWhoLiked, handleLike };
}
