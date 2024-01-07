//ThePost.jsx
import "./ThePost.css";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPostById,
  updatePost,
} from "../../redux/features/posts/postSlice";
import { PostNavigation } from "../../components/thePost/PostNavigation";
import { CodeEditorContainer } from "../../components/thePost/CodeEditorContainer";
import useProjectTitle from "../../customHooks/useProjectTitle";

export const ThePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { post } = useSelector((state) => state.posts);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [error, setError] = useState("");

  const {
    title: initialTitle,
    htmlCode: initialHtml = "",
    cssCode: initialCss = "",
    jsCode: initialJs = "",
  } = post || {};

  const {
    title,
    tempTitle,
    isEditingTitle,
    setProjectTitle,
    handleTitleEdit,
    handleTitleSave,
  } = useProjectTitle(initialTitle);

  const [code, setCode] = useState({
    html: initialHtml,
    css: initialCss,
    js: initialJs,
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  const updateCode = useCallback((language, value) => {
    setCode((prevCode) => ({
      ...prevCode,
      [language]: value,
    }));
  }, []);

  useEffect(() => {
    if (post) {
      setCode({
        html: post.htmlCode || "",
        css: post.cssCode || "",
        js: post.jsCode || "",
      });
    }
  }, [post]);

  const handleSavePost = () => {
    if (!isLoggedIn) {
      setError("You must be logged in to save a snippet");
      return;
    }
    if (!code.html.trim() || !code.css.trim()) {
      setError("Both HTML and CSS code must be filled out to save");
      return;
    }

    const content = {
      htmlCode: code.html,
      cssCode: code.css,
      jsCode: code.js,
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
          title={title || "Untitled"}
          isEditingTitle={isEditingTitle}
          handleTitleEdit={handleTitleEdit}
          projectTitle={tempTitle}
          setProjectTitle={setProjectTitle}
          handleTitleSave={handleTitleSave}
          handleSavePost={handleSavePost}
          error={error}
        />
        <CodeEditorContainer
          initialHtml={code.html}
          initialCss={code.css}
          initialJs={code.js}
          onHtmlChange={(value) => updateCode("html", value)}
          onCssChange={(value) => updateCode("css", value)}
          onJsChange={(value) => updateCode("js", value)}
        />
      </div>
    </div>
  );
};
