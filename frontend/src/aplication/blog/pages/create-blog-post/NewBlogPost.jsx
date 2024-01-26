// NewBlogPost.jsx
import "./NewBlogPost.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlogPost } from "../../api-helpers/helpers";
import { NewBlogNavbar } from "../../components/new-blog-navbar/NewBlogNavbar";
import ContentBlocksManager from "../../components/content-blocks-manager/ContentBlocksManager";
import TagsManager from "../../components/tags-manager/TagsManager";
import useTagsManager from "../../customHooks/useTagsManager";
import useContentBlocks from "../../customHooks/useContentBlocks";
import useFileHandler from "../../customHooks/useFileHandler";
import { validateNewBlogPost } from "../../utils/validation";

const NewBlogPost = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isVerified } = useSelector((state) => state.auth);
  const getCurrentDate = () => {
    const current = new Date();
    return current.toISOString().slice(0, 10);
  };

  const [errors, setErrors] = useState({});

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    date: getCurrentDate(),
    tags: "",
  });

  const { files, previewSources, handleFileChange, handleDeletePreview } =
    useFileHandler();
  const {
    contentBlocks,
    addContentBlock,
    deleteContentBlock,
    updateContentBlock,
    moveContentBlock,
  } = useContentBlocks();
  const { tags, newTag, handleNewTagChange, handleAddTag, handleDeleteTag } =
    useTagsManager(inputs.tags);

  useEffect(() => {
    setInputs((prevState) => ({ ...prevState, tags }));
  }, [tags]);

  const handleTextAreaKeyDown = (e) => {
    if (e.keyCode === 10) {
      e.preventDefault();
    }
  };
  const handleTextAreaChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  };

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

  const handleResponse = (data) => {
    if (data.error) {
      setErrors({ form: data.error });
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formErrors = validateNewBlogPost(inputs, files, isLoggedIn, isVerified);
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    contentBlocks.forEach((block, index) => {
      if (block.type === "image" && block.file) {
        formData.append("contentBlocksImages", block.file);
        formData.append(`contentBlocks[${index}][type]`, block.type);
      } else if (block.type === "text") {
        formData.append(`contentBlocks[${index}][text]`, block.text);
        formData.append(`contentBlocks[${index}][type]`, "text");
      }
    });

    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("date", inputs.date);
    formData.append("tags", inputs.tags);

    try {
      const response = await createBlogPost(formData);
      if (!response) {
        throw new Error("Something went wrong.");
      }
      handleResponse(response);
    } catch (err) {
      setErrors({ form: err.message });
    }
  };

  return (
    <>
      <NewBlogNavbar />
      <form onSubmit={handleSubmit} className="myForm-container">
        <h1 className="myForm-title">Create a new blog post</h1>
        <div>
          {Object.keys(errors).map((key) => (
            <span key={key} className="myForm-error">
              {errors[key]}
            </span>
          ))}
        </div>
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
            Header Image
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
          {previewSources.map((src, index) => (
            <div className="imgPrevUpdate-imgContainer" key={index}>
              <img
                src={src}
                alt="Previzualizare"
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
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className=" myForm-input-textArea"
            value={inputs.description}
            onChange={handleChange}
            onKeyDown={handleTextAreaKeyDown}
            onKeyUp={handleTextAreaChange}
          />
        </div>
        <hr />
        <div className="myForm-field">
          <ContentBlocksManager
            contentBlocks={contentBlocks}
            handleContentBlockChange={(e, index) =>
              updateContentBlock(index, { text: e.target.value })
            }
            handleContentBlockFileChange={(e, index) =>
              updateContentBlock(index, { file: e.target.files[0] })
            }
            handleDeleteContentBlock={deleteContentBlock}
            moveBlockUp={(index) => moveContentBlock(index, "up")}
            moveBlockDown={(index) => moveContentBlock(index, "down")}
          />
          <button onClick={() => addContentBlock("image")}>Add Image</button>
          <button onClick={() => addContentBlock("text")}>Add Text</button>
        </div>
        <TagsManager
          tags={tags}
          newTag={newTag}
          handleNewTagChange={handleNewTagChange}
          handleAddTag={handleAddTag}
          handleDeleteTag={handleDeleteTag}
        />
        <button type="submit" className="myForm-button">
          Create
        </button>
      </form>
    </>
  );
};

export default NewBlogPost;
