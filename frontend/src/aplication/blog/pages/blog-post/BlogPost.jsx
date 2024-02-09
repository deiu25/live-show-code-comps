import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as Edit } from "./edit.svg";
import "./BlogPost.css";
import { BlogPostNavbar } from "../../components/blog-post-navbar/BlogPostNavbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import nightOwlStyle from "react-syntax-highlighter/dist/esm/styles/prism/night-owl";
import { getBlogPost, updateBlogPost } from "../../../../redux/features/blog/blogService";
import { useAuthAdminStatus } from "../../../customHooks/useAuthAdminStatus";
import useFileHandler from "../../customHooks/useFileHandler";

export const BlogPost = ({ user: postUser }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { isAdmin, isUserLoggedIn } = useAuthAdminStatus(postUser);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedBlockIndex, setCopiedBlockIndex] = useState(null);
  const { files, previewSources, handleFileChange } = useFileHandler();

  const copyToClipboard = (code, index) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setIsCopied(true);
        setCopiedBlockIndex(index);
        setTimeout(() => {
          setIsCopied(false);
          setCopiedBlockIndex(null);
        }, 3000);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getBlogPost(id);
      if (fetchedPost) {
        setItem(fetchedPost);
        setEditedContent({
          title: fetchedPost.title,
          description: fetchedPost.description,
          headerImage: fetchedPost.headerImage ? fetchedPost.headerImage : [],
          contentBlocks: fetchedPost.contentBlocks,
        });
      }
    };
    fetchPost();
  }, [id, saveSuccess]);

  useEffect(() => {
    if (previewSources.length > 0) {
      setEditedContent((prevState) => ({
        ...prevState,
        headerImage: previewSources[0],
      }));
    }
  }, [previewSources]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleContentChange = (content, index, type) => {
    const updatedContentBlocks = [...editedContent.contentBlocks];
    switch (type) {
      case "text":
        updatedContentBlocks[index].text = content;
        break;
      case "code":
        updatedContentBlocks[index].code = content;
        break;
      case "image":
        const newPreviewUrl = URL.createObjectURL(content);
        updatedContentBlocks[index].image = { url: newPreviewUrl };
        break;
      default:
        console.error("Unknown content type:", type);
    }
    setEditedContent({ ...editedContent, contentBlocks: updatedContentBlocks });
  };

  const savePost = async () => {
    if (!editMode) return;

    const formData = new FormData();
    formData.append("title", editedContent.title);
    formData.append("description", editedContent.description);

    if (files.length > 0) {
      formData.append("headerImage", files[0]);
    }
    editedContent.contentBlocks.forEach((block, index) => {
      formData.append(`contentBlocks[${index}][type]`, block.type);
      switch (block.type) {
        case "text":
          formData.append(`contentBlocks[${index}][text]`, block.text);
          break;
        case "code":
          formData.append(`contentBlocks[${index}][code]`, block.code);
          formData.append(`contentBlocks[${index}][language]`, block.language);
          break;
        case "image":
          if (block.image && block.image instanceof File) {
            formData.append(`contentBlocks[${index}][image]`, block.image);
          }
          break;
        default:
          console.error("Unknown content type:", block.type);
      }
    });

    try {
      const result = await updateBlogPost(id, formData);
      if (result && result.success) {
        setSaveSuccess(true);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <>
      <BlogPostNavbar />
      <div className="post-body">
        {isUserLoggedIn && isAdmin && (
          <div className="edit-post-div">
            <button
              onClick={() => {
                if (editMode) {
                  savePost();
                } else {
                  toggleEditMode();
                }
              }}
              className="edit-post-button"
            >
              <Edit />
              {editMode ? "Save" : "Edit"}
            </button>
          </div>
        )}
        <div className="post-profile"></div>
        <article className="post-article">
          <section className="content-block">
            <header className="post-header">
              <h1 className="post-h1">
                {editMode ? (
                  <input
                    type="text"
                    value={editedContent.title}
                    onChange={(e) =>
                      setEditedContent({
                        ...editedContent,
                        title: e.target.value,
                      })
                    }
                    className="post-h1-editable"
                  />
                ) : (
                  <div className="post-headline-1">{item.title}</div>
                )}
              </h1>

              {editMode ? (
                previewSources.length > 0 ? (
                  <img
                    src={previewSources[0]}
                    alt="Header Preview"
                    className="post-img"
                  />
                ) : (
                  item.headerImage &&
                  item.headerImage.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt="Header"
                      className="post-img"
                    />
                  ))
                )
              ) : (
                item.headerImage &&
                item.headerImage.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt="Header"
                    className="post-img"
                  />
                ))
              )}

              {editMode && (
                <input
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  className="post-img-editable"
                />
              )}
            </header>

            <hr className="post-hr" />
            <section className="post-section">
              <section className="post-section">
                {editMode ? (
                  <textarea
                    value={editedContent.description}
                    className="post-description-editable"
                    onChange={(e) =>
                      setEditedContent({
                        ...editedContent,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{item.description}</p>
                )}
              </section>
            </section>
            <br></br>
            <hr className="post-hr" />
          </section>
        </article>

        <article className="post-article">
          {editedContent.contentBlocks.map((block, index) => (
            <section key={index} className="content-block">
              <hr className="post-hr" />
              {block.type === "image" &&
                (editMode ? (
                  <>
                    <input
                      type="file"
                      onChange={(e) =>
                        handleContentChange(e.target.files[0], index, "image")
                      }
                      className="post-img-editable"
                    />
                    {editedContent.contentBlocks[index].image &&
                      editedContent.contentBlocks[index].image.url && (
                        <img
                          src={editedContent.contentBlocks[index].image.url}
                          alt="Content"
                          className="post-img"
                        />
                      )}
                  </>
                ) : (
                  <img
                    src={block.image.url}
                    alt="Content"
                    className="post-img"
                  />
                ))}

              <section className="post-section">
                {block.type === "text" &&
                  (editMode ? (
                    <textarea
                      value={block.text}
                      onChange={(e) =>
                        handleContentChange(e.target.value, index, "text")
                      }
                      className="post-text-editable"
                    />
                  ) : (
                    <p className="post-text">{block.text}</p>
                  ))}
              </section>
              {block.type === "code" &&
                (editMode ? (
                  <textarea
                    value={block.code}
                    onChange={(e) =>
                      handleContentChange(e.target.value, index, "code")
                    }
                    className="post-code-editable"
                  />
                ) : (
                  <div className="code-card">
                    <div className="code-header">
                      <div className="code-title">
                        <p className="code-language">{block.language}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(block.code, index)}
                        className="copy-button"
                      >
                        {isCopied && copiedBlockIndex === index
                          ? "Copied!"
                          : "Copy Code"}
                      </button>
                    </div>
                    <SyntaxHighlighter
                      language={block.language}
                      className="post-code"
                      style={nightOwlStyle}
                    >
                      {block.code}
                    </SyntaxHighlighter>
                  </div>
                ))}
              <hr className="post-hr" />
            </section>
          ))}
        </article>
      </div>
    </>
  );
};

