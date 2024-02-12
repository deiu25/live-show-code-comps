// NewCourse.jsx
import "./NewCourse.css";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NewBlogNavbar } from "../../../blog/components/new-blog-navbar/NewBlogNavbar";

import { ReactComponent as AddImageIcon } from "../../../blog/assets/icons/add-image-svg.svg";
import { ReactComponent as AddTextIcon } from "../../../blog/assets/icons/add-text-svg.svg";
import { ReactComponent as AddCodeIcon } from "../../../blog/assets/icons/add-code-svg.svg";

import ContentBlocksManager from "../../../blog/components/content-blocks-manager/ContentBlocksManager";
import useContentBlocks from "../../../blog/customHooks/useContentBlocks";
import TagsManager from "../../../blog/components/tags-manager/TagsManager";
import useTagsManager from "../../../blog/customHooks/useTagsManager";
import useFileHandler from "../../../blog/customHooks/useFileHandler";
import { validateNewCourse } from "../../../blog/utils/ValidateNewCourse";
import { createCoursePost } from "../../../../redux/features/courses/coursesService";

const NewCourse = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isVerified } = useSelector((state) => state.auth);
  const getCurrentDate = () => {
    const current = new Date();
    return current.toISOString().slice(0, 10);
  };

  const [errors, setErrors] = useState({});

  const [inputs, setInputs] = useState({
    title: "",
    subtitle: "",
    description: "",
    date: getCurrentDate(),
    tags: "",
    category: "",
  });

  const { files, previewSources, handleFileChange, handleDeletePreview } =
    useFileHandler();
  const handleCodeBlockChange = (e, index) => {
    const { name, value } = e.target;
    updateContentBlock(index, { [name]: value });
  };
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

    const formErrors = validateNewCourse(inputs, files, isLoggedIn, isVerified);

    if (Object.keys(formErrors).length > 0) {
      Object.values(formErrors).forEach((error) => {
        toast.error(error);
      });
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
      }
      if (block.type === "text") {
        formData.append(`contentBlocks[${index}][text]`, block.text);
        formData.append(`contentBlocks[${index}][type]`, "text");
      }
      if (block.type === "code") {
        formData.append(`contentBlocks[${index}][code]`, block.code);
        formData.append(`contentBlocks[${index}][language]`, block.language);
        formData.append(`contentBlocks[${index}][type]`, "code");
      }
    });

    formData.append("title", inputs.title);
    formData.append("subtitle", inputs.subtitle);
    formData.append("description", inputs.description);
    formData.append("date", inputs.date);
    formData.append("category", inputs.category);
    formData.append("tags", inputs.tags);

    try {
      const response = await createCoursePost(formData);
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
      <ToastContainer />
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
          <label htmlFor="subtitle" className="myForm-label">
            Subtitle:
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            className="myForm-input"
            value={inputs.subtitle}
            onChange={handleChange}
          />
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
            handleCodeBlockChange={handleCodeBlockChange}
            handleDeleteContentBlock={deleteContentBlock}
            moveBlockUp={(index) => moveContentBlock(index, "up")}
            moveBlockDown={(index) => moveContentBlock(index, "down")}
          />
          <button
            className="add-button"
            onClick={() => addContentBlock("image")}
          >
            <AddImageIcon />
          </button>
          <button
            className="add-button"
            onClick={() => addContentBlock("text")}
          >
            <AddTextIcon />
          </button>
          <button
            className="add-button"
            onClick={() => addContentBlock("code")}
          >
            <AddCodeIcon />
          </button>
        </div>
        <hr />
        <div className="myForm-field">
          <label htmlFor="category" className="myForm-label">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={inputs.category}
            onChange={handleChange}
            className="myForm-input"
          >
            <option value="">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="react">React</option>
            <option value="node">Node</option>
            <option value="express">Express</option>
            <option value="mongodb">MongoDB</option>
            <option value="typecript">TypeScript</option>
            <option value="angular">Angular</option>
            <option value="vue">Vue</option>
            <option value="react native">React Native</option>
          </select>
        </div>
        <hr />
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

export default NewCourse;
