// useLikes.js
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import { createSelector } from "reselect";
import { getLikesForBlogPost, likeBlogPost } from "../../../redux/features/blog/blogService";

// Memoized selector using Reselect
const createLikesSelector = () =>
  createSelector(
    [(state) => state.blogPosts.likesMap, (_, id) => id],
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

export function useBlogPostLikes(id) {
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
    dispatch(getLikesForBlogPost(id));
  }, [dispatch, id]);

  const handleLike = useCallback(async () => {
    if (!user) {
      alert("You must be logged in to like a post");
      return;
    }
    try {
      await dispatch(likeBlogPost(id)).unwrap();
      dispatch(getLikesForBlogPost(id));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, id, user]);

  return { likes, userWhoLiked, handleLike };
}
