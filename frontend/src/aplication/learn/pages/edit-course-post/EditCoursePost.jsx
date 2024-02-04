import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BlogPostNavbar } from "../../../blog/components/blog-post-navbar/BlogPostNavbar";
import { getCoursePost, updateCoursePost } from "../../../../redux/features/courses/coursesService";

export const EditCoursePost = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getCoursePost(id);
      setItem(fetchedPost);
    };
    fetchPost();
  }, [id]);

  const onSubmit = async (data) => {
    const response = await updateCoursePost(id, data);
    if (response.success) {
      alert('Post updated successfully');
      navigate(`/coursePost/${id}`); 
    } else {
      alert('Failed to update the post');
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BlogPostNavbar />
      <form onSubmit={handleSubmit(onSubmit)} className="edit-post-form">
        <label>Title:</label>
        <input name="title" defaultValue={item.title} ref={register({ required: true })} />
        {errors.title && <p>Title is required.</p>}

        <label>Description:</label>
        <textarea name="description" defaultValue={item.description} ref={register({ required: true })}></textarea>
        {errors.description && <p>Description is required.</p>}

        {/* Implement additional fields for images and content blocks as needed */}
        
        <button type="submit">Update Post</button>
      </form>
    </>
  );
};
