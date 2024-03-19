//ThePost.jsx
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostNavigation } from "../../components/thePost/PostNavigation";

import useProjectTitle from "../../customHooks/useProjectTitle";
import {
  fetchPostById,
  updatePost,
} from "../../../../redux/features/posts/postSlice";
import { CodeEditorContainer } from "../../components/thePost/CodeEditorContainer";

export const ThePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { post } = useSelector((state) => state.posts);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [error, setError] = useState("");

  const [editorLayout, setEditorLayout] = useState(
    window.innerWidth > 768 ? "vertical" : "horizontal"
  );
  const toggleEditorLayout = () => {
    setEditorLayout((prevLayout) =>
      prevLayout === "horizontal" ? "vertical" : "horizontal"
    );
  };


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

  useEffect(() => {
    const handleResize = () => {
      const newLayout = window.innerWidth > 768 ? "vertical" : "horizontal";
      setEditorLayout(newLayout);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="new-proj-container-wrapper">
      <PostNavigation
        title={title || "Untitled"}
        isEditingTitle={isEditingTitle}
        handleTitleEdit={handleTitleEdit}
        projectTitle={tempTitle}
        setProjectTitle={setProjectTitle}
        handleTitleSave={handleTitleSave}
        handleSavePost={handleSavePost}
        error={error}
        toggleEditorLayout={toggleEditorLayout}
      />
      <div className="new-proj-container">
        <CodeEditorContainer
          initialHtml={code.html}
          initialCss={code.css}
          initialJs={code.js}
          onHtmlChange={(value) => updateCode("html", value)}
          onCssChange={(value) => updateCode("css", value)}
          onJsChange={(value) => updateCode("js", value)}
          layoutDirection={editorLayout}
        />
      </div>
    </div>
  );
};
