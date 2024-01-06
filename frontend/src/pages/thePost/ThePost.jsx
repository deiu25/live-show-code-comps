import "./ThePost.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPostById,
  updatePost,
} from "../../redux/features/posts/postSlice";
import { PostNavigation } from "../../components/thePost/PostNavigation";
import { CodeEditorContainer } from "../../components/thePost/CodeEditorContainer";

export const ThePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { post } = useSelector((state) => state.posts);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  const [projectTitle, setProjectTitle] = useState(post?.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Fetch the post data when the component mounts or the id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setHtmlCode(post.htmlCode);
      setCssCode(post.cssCode);
      setJsCode(post.jsCode);
    } else {
    }
  }, [post]);

  const updateHtmlCode = (value) => {
    setHtmlCode(value);
  };

  const updateCssCode = (value) => {
    setCssCode(value);
  };

  const updateJsCode = (value) => {
    setJsCode(value);
  };

  const handleTitleEdit = () => {
    setProjectTitle(title);
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
    setTitle(projectTitle);
  };

  const handleSavePost = () => {
    if (!isLoggedIn) {
      setError("You must be logged in to save a snippet");
      return;
    }
    if (!htmlCode.trim() || !cssCode.trim()) {
      setError("Both HTML and CSS code must be filled out to save");
      return;
    }

    const content = {
      htmlCode,
      cssCode,
      jsCode,
    };
    const postToUpdate = {
      id,
      title,
      content,
    };

    dispatch(updatePost(postToUpdate));
    navigate("/");
  };

  return (
    <div className="container-full">
      <div className="new-proj-container">
        <PostNavigation
          title={title}
          isEditingTitle={isEditingTitle}
          handleTitleEdit={handleTitleEdit}
          projectTitle={projectTitle}
          setProjectTitle={setProjectTitle}
          handleTitleSave={handleTitleSave}
          handleSavePost={handleSavePost}
          error={error}
        />
        <CodeEditorContainer
          initialHtml={htmlCode}
          initialCss={cssCode}
          initialJs={jsCode}
          onHtmlChange={updateHtmlCode}
          onCssChange={updateCssCode}
          onJsChange={updateJsCode}
        />
      </div>
    </div>
  );
};
