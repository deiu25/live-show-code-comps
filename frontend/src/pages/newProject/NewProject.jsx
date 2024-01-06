import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "./NewProject.css";
import { ReactComponent as HtmlIcon } from "../../assets/icons/html.svg";
import { ReactComponent as CssIcon } from "../../assets/icons/css.svg";
import { ReactComponent as JsIcon } from "../../assets/icons/js.svg";
import { ReactComponent as SetingsIcon } from "../../assets/icons/setings.svg";
import { ReactComponent as AngleDown } from "../../assets/icons/down.svg";
import { ReactComponent as Terminal } from "../../assets/icons/terminal.svg";
import { ReactComponent as Assets } from "../../assets/icons/assets.svg";
import { ReactComponent as Coments } from "../../assets/icons/coments.svg";
import { ReactComponent as Shortcut } from "../../assets/icons/shortcut.svg";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { ReactComponent as Errors } from "../../assets/icons/errors.svg";
import { ReactComponent as Warnings } from "../../assets/icons/warnings.svg";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { useDispatch, useSelector } from "react-redux";
import { savePost } from "../../redux/features/posts/postSlice";
import { PostNavigation } from "../../components/thePost/PostNavigation";

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

  const [horizontalSizes, setHorizontalSizes] = useState(["60%", "40%"]);
  const [verticalSizes, setVerticalSizes] = useState(["33%", "34%", "33%"]);

  // Styling for each pane
  const layoutCSS = {
    height: "100%",
  };

  // Function to render the preview - you might need to implement sandboxing/security measures
  const createMarkup = () => {
    const blob = new Blob(
      [
        `<html><head><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}</script></body></html>`,
      ],
      { type: "text/html" }
    );
    return URL.createObjectURL(blob);
  };

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
        <SplitPane sizes={horizontalSizes}>
          <SplitPane
            split="vertical"
            sizes={verticalSizes}
            onChange={(sizes) => setVerticalSizes(sizes)}
            minsize={50}
          >
            <div style={layoutCSS}>
              <div className="code-editor-head">
                <div className="html-icon">
                  <HtmlIcon />
                  <p>HTML</p>
                </div>
                <div className="right-tools">
                  <SetingsIcon />
                  <AngleDown />
                </div>
              </div>
              <div className="code-editor">
                <CodeMirror
                  value={htmlCode}
                  height="83vh"
                  theme={"dark"}
                  extensions={[html()]}
                  onChange={(value, viewUpdate) => {
                    setHtmlCode(value);
                  }}
                />
              </div>
            </div>
            <div style={layoutCSS}>
              <div className="code-editor-head">
                <div className="html-icon">
                  <CssIcon />
                  <p>CSS</p>
                </div>
                <div className="right-tools">
                  <SetingsIcon />
                  <AngleDown />
                </div>
              </div>
              <div className="code-editor">
                <CodeMirror
                  value={cssCode}
                  height="83vh"
                  theme={"dark"}
                  extensions={[css()]}
                  onChange={(value, viewUpdate) => {
                    setCssCode(value);
                  }}
                />
              </div>
            </div>
            <div style={layoutCSS}>
              <div className="code-editor-head">
                <div className="html-icon">
                  <JsIcon />
                  <p>JS</p>
                </div>
                <div className="right-tools">
                  <SetingsIcon />
                  <AngleDown />
                </div>
              </div>
              <div className="code-editor">
                <CodeMirror
                  value={jsCode}
                  height="83vh"
                  theme={"dark"}
                  extensions={[javascript()]}
                  onChange={(value, viewUpdate) => {
                    setJsCode(value);
                  }}
                />
              </div>
            </div>
          </SplitPane>

          <div>
            <div className="output-footer-bar">
              <div className="output-footer-bar-left">
                <Terminal />
                <Assets />
                <Coments />
                <Shortcut />
              </div>
              <div className="output-footer-bar-center">
                <Link to="/">
                  <Home />
                </Link>
              </div>
              <div className="output-footer-bar-right">
                <Errors />
                <p>0</p>
                <Warnings />
                <p>0</p>
              </div>
            </div>
            <div className="output-section">
              <iframe
                title="preview"
                src={createMarkup()}
                overflow="auto"
                className="output-iframe"
              />
            </div>
          </div>
        </SplitPane>
      </div>
    </div>
  );
};
