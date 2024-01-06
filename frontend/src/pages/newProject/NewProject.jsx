import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./NewProject.css";

import { useDispatch, useSelector } from "react-redux";
import { savePost } from "../../redux/features/posts/postSlice";
import { PostNavigation } from "../../components/thePost/PostNavigation";
import { CodeEditorContainer } from "../../components/thePost/CodeEditorContainer";

export const NewProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [error, setError] = useState("");

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setProjectTitle] = useState("");

  const [title, setTitle] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  // title editing
  const handleTitleEdit = () => {
    setProjectTitle(title);
    setIsEditingTitle(true);
  };
  const handleTitleSave = () => {
    setTitle(tempTitle);
    setIsEditingTitle(false);
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
    const post = {
      title: title || "Untitled",
      content,
    };

    console.log(post);
    dispatch(savePost(post));
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
          initialHtml={htmlCode}
          initialCss={cssCode}
          initialJs={jsCode}
          onHtmlChange={setHtmlCode}
          onCssChange={setCssCode}
          onJsChange={setJsCode}
        />
      </div>
    </div>
  );
};
