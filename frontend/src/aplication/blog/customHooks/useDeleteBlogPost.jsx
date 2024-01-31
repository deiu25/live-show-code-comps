import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { deleteBlogPost } from '../../../redux/features/blog/blogSlice';


export const useDeleteBlogPost = () => {
    const dispatch = useDispatch();

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this post?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => dispatch(deleteBlogPost(id))
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    return confirmDelete;
}
