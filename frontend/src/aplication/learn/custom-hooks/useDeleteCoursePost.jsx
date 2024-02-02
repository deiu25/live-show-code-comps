import { useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { deleteCoursePost, fetchCoursePosts } from "../../../redux/features/courses/coursesSlice";

export const useDeleteCoursePost = () => {
  const dispatch = useDispatch();

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteCoursePost(id)).then(() => {
              dispatch(fetchCoursePosts("javascript"));
            });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return confirmDelete;
};
