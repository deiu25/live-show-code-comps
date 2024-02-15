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
          headerImage: fetchedPost.headerImage ? fetchedPost.headerImage : [],
          subtitle: fetchedPost.subtitle,
          description: fetchedPost.description,
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
      case "subtitle":
        updatedContentBlocks[index].subtitle = content;
        break;
      case "preDescription":
        updatedContentBlocks[index].preDescription = content;
        break;
      case "postDescription":
        updatedContentBlocks[index].postDescription = content;
        break;
      case "preSubtitle":
        updatedContentBlocks[index].preSubtitle = content;
        break;
      case "postSubtitle":
        updatedContentBlocks[index].postSubtitle = content;
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
    formData.append("subtitle", editedContent.subtitle);

    if (files.length > 0) {
      formData.append("headerImage", files[0]);
    }
    editedContent.contentBlocks.forEach((block, index) => {
      formData.append(`contentBlocks[${index}][type]`, block.type);
      switch (block.type) {
        case "text":
          formData.append(`contentBlocks[${index}][text]`, block.text);
          formData.append(`contentBlocks[${index}][subtitle]`, block.subtitle);
          break;
        case "code":
          formData.append(
            `contentBlocks[${index}][preDescription]`,
            block.preDescription
          );
          formData.append(
            `contentBlocks[${index}][postDescription]`,
            block.postDescription
          );
          formData.append(
            `contentBlocks[${index}][preSubtitle]`,
            block.preSubtitle
          );
          formData.append(
            `contentBlocks[${index}][postSubtitle]`,
            block.postSubtitle
          );
          formData.append(`contentBlocks[${index}][code]`, block.code);
          formData.append(`contentBlocks[${index}][language]`, block.language);
          formData.append(`contentBlocks[${index}][subtitle]`, block.subtitle);
          break;
        case "image":
          if (block.file && block.file instanceof File) {
            formData.append("contentBlocksImages", block.file);
            formData.append(`contentBlocks[${index}][type]`, block.type);
            formData.append(
              `contentBlocks[${index}][subtitle]`,
              block.subtitle
            );
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
            {editMode && (
              <button
                onClick={() => setEditMode(false)}
                className="edit-post-button"
              >
                Cancel
              </button>
            )}
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

            <h6 className="subtitle-h4">
              {editMode ? (
                <div className="card-editable">
                <input
                  type="text"
                  value={editedContent.subtitle}
                  onChange={(e) =>
                    setEditedContent({
                      ...editedContent,
                      subtitle: e.target.value,
                    })
                  }
                  className="post-h1-editable"
                />
                </div>
              ) : (
                <div className="post-headline-2">{item.subtitle}</div>
              )}
            </h6>

            <section className="post-section">
              <section className="post-section">
                {editMode ? (
                  <div className="card-editable">
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
                  </div>
                ) : (
                  item.description.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      <p>{line}</p>
                    </React.Fragment>
                  ))
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
                  <div className="card-editable">
                    <input
                      type="text"
                      value={block.subtitle || ""}
                      onChange={(e) =>
                        handleContentChange(e.target.value, index, "subtitle")
                      }
                      className="post-subtitle-editable"
                    />
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
                  </div>
                ) : (
                  <>
                    {block.subtitle && (
                      <h5 className="subtitle-h4">{block.subtitle}</h5>
                    )}
                    {block.image && block.image.url && (
                      <img
                        src={block.image.url}
                        alt="Content"
                        className="post-img"
                      />
                    )}
                  </>
                ))}

              {block.type === "text" &&
                (editMode ? (
                  <div className="card-editable">
                    <input
                      type="text"
                      value={block.subtitle || ""}
                      onChange={(e) =>
                        handleContentChange(e.target.value, index, "subtitle")
                      }
                      className="post-subtitle-editable"
                    />
                    <textarea
                      value={block.text}
                      onChange={(e) =>
                        handleContentChange(e.target.value, index, "text")
                      }
                      className="post-text-editable"
                    />
                  </div>
                ) : (
                  <>
                    {block.subtitle && (
                      <h5 className="subtitle-h4">{block.subtitle}</h5>
                    )}
                    <section className="post-section">
                      {block.text.split("\n").map((paragraph, idx) => (
                        <p key={idx} className="post-text">
                          {paragraph}
                        </p>
                      ))}
                    </section>
                  </>
                ))}

              {block.type === "code" &&
                (editMode ? (
                  <div className="card-editable">
                    <input
                      type="text"
                      value={block.preSubtitle || ""}
                      onChange={(e) =>
                        handleContentChange(
                          e.target.value,
                          index,
                          "preSubtitle"
                        )
                      }
                      className="post-h1-editable"
                    />
                    <textarea
                      type="text"
                      value={block.preDescription || ""}
                      onChange={(e) =>
                        handleContentChange(
                          e.target.value,
                          index,
                          "preDescription"
                        )
                      }
                      className="post-description-editable"
                    />
                    <textarea
                      value={block.code}
                      onChange={(e) =>
                        handleContentChange(e.target.value, index, "code")
                      }
                      className="post-code-editable"
                    />
                    <input
                      type="text"
                      value={block.postSubtitle || ""}
                      onChange={(e) =>
                        handleContentChange(
                          e.target.value,
                          index,
                          "postSubtitle"
                        )
                      }
                      className="post-h1-editable"
                    />
                    <textarea
                      type="text"
                      value={block.postDescription || ""}
                      onChange={(e) =>
                        handleContentChange(
                          e.target.value,
                          index,
                          "postDescription"
                        )
                      }
                      className="post-description-editable"
                    />
                  </div>
                ) : (
                  <>
                    {block.preSubtitle && (
                      <h5 className="subtitle-h4">{block.preSubtitle}</h5>
                    )}
                    {block.preDescription && (
                      <section className="post-section">
                        {block.preDescription
                          .split("\n")
                          .map((paragraph, idx) => (
                            <p key={idx} className="post-text">
                              {paragraph}
                            </p>
                          ))}
                      </section>
                    )}

                    <br></br>
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
                    <br></br>
                    {block.postSubtitle && (
                      <h5 className="subtitle-h4">{block.postSubtitle}</h5>
                    )}
                    {block.postDescription && (
                      <section className="post-section">
                        {block.postDescription
                          .split("\n")
                          .map((paragraph, idx) => (
                            <p key={idx} className="post-text">
                              {paragraph}
                            </p>
                          ))}
                      </section>
                    )}
                  </>
                ))}
              <hr className="post-hr" />
            </section>
          ))}
        </article>

        {editMode && (
          <div className="edit-post-div">
            <button onClick={savePost} className="edit-post-button">
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="edit-post-button"
            >
              Cancel
            </button>
          </div>
        )}
        
      </div>
    </>
  );
};

