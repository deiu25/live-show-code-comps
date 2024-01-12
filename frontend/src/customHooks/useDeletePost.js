import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { deletePost, fetchPosts } from '../redux/features/posts/postSlice';

const useDeletePost = () => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await dispatch(deletePost(id));
    dispatch(fetchPosts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => handleDelete(id),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  return confirmDelete;
};

export default useDeletePost;