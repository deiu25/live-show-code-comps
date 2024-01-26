//NewBlogPost.jsx
import "./NewBlogPost.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlogPost } from "../../api-helpers/helpers";
import { NewBlogNavbar } from "../../components/new-blog-navbar/NewBlogNavbar";
import { Tag } from "../../components/tag/Tag";
import useFileHandler from "../../helpers/useFileHandler";
import useTagHandler from "../../customHooks/useTagHandler";

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
    tags: "",
  });
  const [errors, setErrors] = useState({});
  const [contentBlocks, setContentBlocks] = useState([]);
  const { files, previewSources, handleFileChange, handleDeletePreview } =
    useFileHandler();
  const { tags, addTag, deleteTag } = useTagHandler();
  const [newTag, setNewTag] = useState("");

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

  const addContentBlock = (type) => {
    const newBlock =
      type === "image" ? { type, file: null } : { type, text: "" };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const handleContentBlockChange = (e, index) => {
    const { name, value } = e.target;
    setContentBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[index][name] = value;
      return newBlocks;
    });
  };

  const handleContentBlockFileChange = (e, index) => {
    const { files } = e.target;
    setContentBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[index].file = files[0];
      return newBlocks;
    });
  };

  const handleDeleteContentBlock = (index) => {
    setContentBlocks((prev) => prev.filter((block, i) => i !== index));
  };

  const moveBlockUp = (index) => {
    if (index === 0) return;
    setContentBlocks((prev) => {
      const newBlocks = [...prev];
      [newBlocks[index - 1], newBlocks[index]] = [
        newBlocks[index],
        newBlocks[index - 1],
      ];
      return newBlocks;
    });
  };

  const moveBlockDown = (index) => {
    if (index === contentBlocks.length - 1) return;
    setContentBlocks((prev) => {
      const newBlocks = [...prev];
      [newBlocks[index], newBlocks[index + 1]] = [
        newBlocks[index + 1],
        newBlocks[index],
      ];
      return newBlocks;
    });
  };

  const handleAddTag = () => {
    addTag(newTag);
    setNewTag("");
  };

  const handleTagInputChange = (e) => {
    setNewTag(e.target.value);
  };

  useEffect(() => {
    return () => {
      previewSources.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewSources]);

  const onResReceived = (data) => {
    if (data.error) {
      setErrors({ form: data.error });
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn || !isVerified) {
      setErrors({
        form: "You must be logged in and have a verified email to post.",
      });
      return;
    }

    if (!files) {
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

    if (!files) {
      formErrors.file = "File is required.";
    }

    if (!inputs.title || !inputs.description || !inputs.date || !inputs.tags) {
      setErrors({ form: "Please fill in all required fields." });
      return;
    }

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
        throw new Error("An error occurred while submitting the form.");
      }
      onResReceived(response);
    } catch (err) {
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
          {previewSources.map((src, index) => (
            <div className="imgPrevUpdate-imgContainer" key={index}>
              <img src={src} alt="Preview" className="imgPrevUpdate-img" />
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
            className=" myForm-input-textArea"
            value={inputs.description}
            onChange={handleChange}
            onKeyDown={handleTextAreaKeyDown}
            onKeyUp={handleTextAreaChange}
          />
        </div>
        <hr />
        <div className="myForm-field">
          <div className="content-blocks">
            {contentBlocks.map((block, index) => (
              <div key={index}>
                {block.type === "image" ? (
                  <input
                    type="file"
                    onChange={(e) => handleContentBlockFileChange(e, index)}
                  />
                ) : (
                  <textarea
                    className="myForm-input-textArea"
                    value={block.text}
                    name="text"
                    onChange={(e) => handleContentBlockChange(e, index)}
                  />
                )}
                <button onClick={() => moveBlockUp(index)}>Move Up</button>
                <button onClick={() => moveBlockDown(index)}>Move Down</button>
                <button onClick={() => handleDeleteContentBlock(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => addContentBlock("image")}>Add Image</button>
          <button onClick={() => addContentBlock("text")}>Add Text</button>
        </div>
        <div className="myForm-field tag-label-btn">
          <label htmlFor="tags" className="myForm-label">
            Tags:
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="myForm-input"
            value={newTag}
            onChange={handleTagInputChange}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button
            type="button"
            className="add-tag-button"
            onClick={handleAddTag}
          >
            Add
          </button>
        </div>
        <div className="myForm-tags">
          {tags.map((tag, index) => (
            <Tag key={index} tag={tag} onDelete={deleteTag} />
          ))}
        </div>
        <button type="submit" className="myForm-button">
          Submit Post
        </button>
      </form>
    </>
  );
};

export default NewBlogPost;
