import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogPost } from "../../api-helpers/helpers";
import "./BlogPost.css";
import { BlogPostNavbar } from "../../components/blog-post-navbar/BlogPostNavbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import nightOwlStyle from "react-syntax-highlighter/dist/esm/styles/prism/night-owl";

export const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const [isCopied, setIsCopied] = useState(false);
  const [copiedBlockIndex, setCopiedBlockIndex] = useState(null);

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
        setPost(fetchedPost);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BlogPostNavbar />
      <div className="post-body">
        <div className="post-profile"></div>
        <article className="post-article">
          <section className="content-block">
            <header className="post-header">
              <h1 className="post-h1">
                <div className="post-headline-1">{post.title}</div>
              </h1>
              {post.headerImage.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt="Header"
                  className="post-img"
                />
              ))}
            </header>
            <hr className="post-hr" />
            <section className="post-section">
              <section className="post-section">
                <p>{post.description}</p>
              </section>
            </section>
            <br></br>
            <hr className="post-hr" />
          </section>
        </article>

        <article className="post-article">
          {post.contentBlocks.map((block, index) => (
            <section key={index} className="content-block">
              <hr className="post-hr" />
              {block.type === "image" && (
                <img src={block.image.url} alt="Content" className="post-img" />
              )}
              {block.type === "text" && (
                <p className="post-text">{block.text}</p>
              )}
              {block.type === "code" && (
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
                    language={block.language === 'react' ? 'jsx' : block.code.language}
                    className="post-code"
                    style={nightOwlStyle}
                  >
                    {block.code}
                  </SyntaxHighlighter>
                </div>
              )}
              <hr className="post-hr" />
            </section>
          ))}
        </article>
      </div>
    </>
  );
};
