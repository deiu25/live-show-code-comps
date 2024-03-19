//NewProject.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewProject.css";
import { useDispatch, useSelector } from "react-redux";
import { PostNavigation } from "../../components/thePost/PostNavigation";
import { CodeEditorContainer } from "../../components/thePost/CodeEditorContainer";
import useProjectTitle from "../../customHooks/useProjectTitle";
import { savePost } from "../../../../redux/features/posts/postSlice";

export const NewProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [error, setError] = useState("");
  const [code, setCode] = useState({ html: "", css: "", js: "" });

  const [editorLayout, setEditorLayout] = useState(
    window.innerWidth > 768 ? "vertical" : "horizontal"
  );
  const toggleEditorLayout = () => {
    setEditorLayout((prevLayout) =>
      prevLayout === "horizontal" ? "vertical" : "horizontal"
    );
  };

  const {
    title,
    tempTitle,
    isEditingTitle,
    setProjectTitle,
    handleTitleEdit,
    handleTitleSave,
  } = useProjectTitle();

  useEffect(() => {
    const handleResize = () => {
      const newLayout = window.innerWidth > 768 ? "vertical" : "horizontal";
      setEditorLayout(newLayout);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleErrors = useCallback(() => {
    if (!isLoggedIn) {
      return "You must be logged in to save a snippet";
    }
    if (!code.html.trim() || !code.css.trim()) {
      return "Both HTML and CSS code must be filled out to save";
    }
    return "";
  }, [isLoggedIn, code.html, code.css]);

  const handleSavePost = useCallback(() => {
    const errorMsg = handleErrors();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    dispatch(
      savePost({
        title: title || "Untitled",
        content: {
          htmlCode: code.html,
          cssCode: code.css,
          jsCode: code.js,
        },
      })
    );
    navigate("/");
  }, [dispatch, navigate, code, title, handleErrors]);

  const updateCode = (type, value) => {
    setCode((prevCode) => ({
      ...prevCode,
      [type]: value,
    }));
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
          code={code}
          setCode={setCode}
          title={title}
          onHtmlChange={(value) => updateCode("html", value)}
          onCssChange={(value) => updateCode("css", value)}
          onJsChange={(value) => updateCode("js", value)}
          layoutDirection={editorLayout}
        />
      </div>
    </div>
  );
};
