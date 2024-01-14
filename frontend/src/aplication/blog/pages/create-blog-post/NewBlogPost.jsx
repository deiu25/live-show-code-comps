import "./NewBlogPost.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import QuillEditor from "../../helpers/QuillEditor";
import {
  clearForm,
  saveBlogPost,
  setContent,
  setHeaderImage,
  setTitle,
} from "../../../../redux/features/blog/blogSlice";

const NewBlogPost = () => {
  const dispatch = useDispatch();
  const { title, content } = useSelector((state) => state.blogPosts);

  const handleTitleChange = (event) => {
    dispatch(setTitle(event.target.value));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Presupunem că avem o acțiune Redux pentru a seta imaginea, numită `setHeaderImage`
      dispatch(setHeaderImage(file));
    }
  };

  const handleEditorChange = (value) => {
    dispatch(setContent(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(saveBlogPost({ title, content }));
    dispatch(clearForm());
  };

  return (
    <form onSubmit={handleSubmit} className="myForm-container">
      <div className="myForm-field">
        <label htmlFor="title" className="myForm-label">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          className="myForm-input"
          onChange={handleTitleChange}
        />
      </div>
      <div className="myForm-field">
        <label htmlFor="headerImage" className="myForm-label">
          Header Image:
        </label>
        <input
          type="file"
          id="headerImage"
          name="headerImage"
          className="myForm-input"
          onChange={handleImageChange}
        />
      </div>
      <div className="myForm-quillEditor myForm-quillEditor-large">
        <QuillEditor value={content} onChange={handleEditorChange} />
      </div>
      <button type="submit" className="myForm-button">
        Submit Post
      </button>
    </form>
  );
};

export default NewBlogPost;
