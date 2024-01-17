import "./NewBlogPost.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import QuillEditor from "../../helpers/QuillEditor";

import { useNavigate } from "react-router-dom";
import { createBlogPost } from "../../api-helpers/helpers";
import { NewBlogNavbar } from "../../new-blog-navbar/NewBlogNavbar";


const NewBlogPost = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isVerified } = useSelector((state) => state.auth);
  const getCurrentDate = () => {
    const current = new Date();
    return current.toISOString().slice(0, 10); 
  };
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    date: getCurrentDate(),
  });
  const [file, setFile] = useState(null);
  const [previewSource, setPreviewSource] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (e.target.value) {
      setErrors((prevState) => ({
        ...prevState,
        [e.target.name]: null,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFile(Array.from(e.target.files));
    setPreviewSource(
      e.target.files.length > 0
        ? Array.from(e.target.files).map((file) => URL.createObjectURL(file))
        : []
    );
  };

  const handleDeletePreview = (index) => {
    setPreviewSource((prev) => prev.filter((src, i) => i !== index));
    setFile((prev) => prev.filter((file, i) => i !== index));
  };

  const onEditorChange = (value) => {
    setEditorContent(value);
  };

  const onResReceived = (data) => {
    console.log(data);
    if (data.error) {
      setErrors({ form: data.error });
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isLoggedIn || !isVerified) {
      setErrors({ form: "You must be logged in and have a verified email to post." });
      return;
    }

    if (!file) {
      setErrors({ form: "File is required." });
      return;
    }

    let formErrors = {};

    for (let key in inputs) {
      if (!inputs[key]) {
        formErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } field is required.`;
      }
    }

    if (!file) {
      formErrors.file = "File is required.";
    }

    if (
      !inputs.title ||
      !inputs.description ||
      !inputs.date
    ) {
      setErrors({ form: "Please fill in all required fields." });
      return;
    }

    if (!editorContent) {
      setErrors({ form: "Content is required." });
      return;
    }

    console.log("Inputs:", inputs);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    file.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("content", editorContent);
    for (let key in inputs) {
      formData.append(key, inputs[key]);
    }

    try {
      console.log(file);
      const response = await createBlogPost(formData);
      if (!response) {
        throw new Error("An error occurred while submitting the form.");
      }
      onResReceived(response);
    } catch (err) {
      console.log(err);
      setErrors({ form: err.message });
    }
  };
  
  return (
    <>
    <NewBlogNavbar />
    <form onSubmit={handleSubmit} className="myForm-container">
      <h1 className="myForm-title">Create New Blog Post</h1>
      {errors.form && <span className="myForm-error">{errors.form}</span>}
      <div className="myForm-field">
        <label htmlFor="title" className="myForm-label">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="myForm-input"
          value={inputs.title}
          onChange={handleChange}
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
          onChange={handleFileChange}
          multiple
        />
      </div>
      <div className="imgPrevUpdate">
        {previewSource.map((src, index) => (
          <div className="imgPrevUpdate-imgContainer" key={index}>
            <img
              src={src}
              alt="Preview"
              className="imgPrevUpdate-img"
            />
            <button
              type="button"
              className="imgPrevUpdate-deleteBtn"
              onClick={() => handleDeletePreview(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="myForm-field">
        <label htmlFor="description" className="myForm-label">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          className="myForm-input"
          value={inputs.description}
          onChange={handleChange}
        />
      </div>
      <div className="myForm-quillEditor myForm-quillEditor-large">
      <QuillEditor value={editorContent} onChange={onEditorChange} />
      </div>
      <button type="submit" className="myForm-button">
        Submit Post
      </button>
    </form>
    </>
  );
};

export default NewBlogPost;