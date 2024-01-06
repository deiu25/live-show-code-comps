import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./NewProject.css";

import { useDispatch, useSelector } from "react-redux";
import { savePost } from "../../redux/features/posts/postSlice";
import { PostNavigation } from "../../components/thePost/PostNavigation";
import { CodeEditorContainer } from "../../components/thePost/CodeEditorContainer";
import useProjectTitle from "../../customHooks/useProjectTitle";

export const NewProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [error, setError] = useState("");

  const [code, setCode] = useState({ html: "", css: "", js: "" });

  const {
    title,
    tempTitle,
    isEditingTitle,
    setProjectTitle,
    handleTitleEdit,
    handleTitleSave,
  } = useProjectTitle();

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
    const post = {
      title: title || "Untitled",
      content,
    };

    console.log(post);
    dispatch(savePost(post));
    navigate("/");
  };

  const updateCode = (type, value) => {
    setCode((prevCode) => ({
      ...prevCode,
      [type]: value,
    }));
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
          code={code}
          setCode={setCode}
          title={title}
          onHtmlChange={(value) => updateCode('html', value)}
          onCssChange={(value) => updateCode('css', value)}
          onJsChange={(value) => updateCode('js', value)}
        />
      </div>
    </div>
  );
};
