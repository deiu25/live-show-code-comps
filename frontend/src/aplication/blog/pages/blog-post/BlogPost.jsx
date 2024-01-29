import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogPost } from "../../api-helpers/helpers";
import "./BlogPost.css";
import { BlogPostNavbar } from "../../components/blog-post-navbar/BlogPostNavbar";

export const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

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
          <header className="post-header">
            <h1 className="post-h1">
              <div className="post-headline-1">{post.title}</div>
              {/* <div className="post-headline-2">& Blues</div> */}
            </h1>
            <p className="post-subheading">
              {/* Music that makes you live experiences */}
            </p>
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
        </article>

        <article className="post-article">
          {post.contentBlocks.map((block, index) => (
            <section key={index} className="content-block">
              {block.type === "image" && (
                <img src={block.image.url} alt="Content" className="post-img" />
              )}
              {block.type === "text" && (
                <p className="post-text">{block.text}</p>
              )}
              {block.type === "code" && (
                <pre className="post-code">
                  {block.code.language && <p>{block.code.language}</p>}
                  <code>{block.code.code}</code>
                </pre>
              )}
              <hr className="post-hr" />
            </section>
          ))}
        </article>
      </div>
    </>
  );
};
