import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as Edit } from "./edit.svg";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import nightOwlStyle from "react-syntax-highlighter/dist/esm/styles/prism/night-owl";
import { BlogPostNavbar } from "../../../blog/components/blog-post-navbar/BlogPostNavbar";
import { getCoursePost } from "../../../../redux/features/courses/coursesService";
import { useAuthAdminStatus } from "../../../customHooks/useAuthAdminStatus";
import useFileHandler from "../../../blog/customHooks/useFileHandler";

export const EditCoursePost = ({ user: postUser }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedBlockIndex, setCopiedBlockIndex] = useState(null);
  const { isAdmin, isUserLoggedIn } = useAuthAdminStatus(postUser);

  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState({});

  const { previewSources, handleFileChange } = useFileHandler();

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

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
    if (previewSources.length > 0) {
      setEditedContent((prevState) => ({
        ...prevState,
        headerImage: previewSources[0],
      }));
    }
  }, [previewSources]);

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getCoursePost(id);
      if (fetchedPost) {
        setItem(fetchedPost);
        // Ensure that headerImage is initialized properly
        setEditedContent({
          title: fetchedPost.title,
          description: fetchedPost.description,
          headerImage: fetchedPost.headerImage ? fetchedPost.headerImage : [],
          contentBlocks: fetchedPost.contentBlocks,
        });
      }
    };
    fetchPost();
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const handleContentChange = (content, index, type) => {
    const updatedContentBlocks = [...editedContent.contentBlocks];
    if (type === "text") {
      updatedContentBlocks[index].text = content;
    } else if (type === "code") {
      updatedContentBlocks[index].code = content;
    } else if (type === "image") {
      // Aici presupunem că `content` este un fișier de imagine încărcat
      const newPreviewUrl = URL.createObjectURL(content);
      // Actualizează blocul specific cu noua imagine de previzualizare
      updatedContentBlocks[index].image = {
        ...updatedContentBlocks[index].image,
        url: newPreviewUrl,
      };
    }
    setEditedContent({ ...editedContent, contentBlocks: updatedContentBlocks });
  };

  return (
    <>
      <BlogPostNavbar />
      <div className="post-body">
        {isUserLoggedIn && isAdmin && (
          <div className="edit-post-div">
            <button onClick={toggleEditMode} className="edit-post-button">
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
                // Afișați imaginea de previzualizare dacă este în modul de editare și există o previzualizare
                previewSources.length > 0 ? (
                  <img
                    src={previewSources[0]}
                    alt="Header Preview"
                    className="post-img"
                  />
                ) : (
                  // Dacă nu există o previzualizare, păstrați logica existentă de afișare a imaginii originale
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
                // Dacă nu suntem în modul de editare, afișați imaginea originală de header
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
