import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogPost } from "../../api-helpers/helpers";
import "./BlogPost.css";

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
    <div className="blog-post">
      <h1 className="blog-post-title">{post.title}</h1>
      {post.headerImage.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt="Header"
          className="blog-post-header-image"
        />
      ))}
        <p className="blog-post-description">{post.description}</p>
      <div className="blog-post-content">
        {post.contentBlocks.map((block, index) => (
          <section key={index} className="content-block">
            {block.type === "image" && (
              <img
                src={block.image.url}
                alt="Content"
                className="content-image"
              />
            )}
            {block.type === "text" && (
              <p className="content-text">{block.text}</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};
