import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "./ThePost.css";

import { ReactComponent as HtmlIcon } from "../../assets/icons/html.svg";
import { ReactComponent as CssIcon } from "../../assets/icons/css.svg";
import { ReactComponent as JsIcon } from "../../assets/icons/js.svg";
import { ReactComponent as SetingsIcon } from "../../assets/icons/setings.svg";
import { ReactComponent as AngleDown } from "../../assets/icons/down.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as Terminal } from "../../assets/icons/terminal.svg";
import { ReactComponent as Assets } from "../../assets/icons/assets.svg";
import { ReactComponent as Coments } from "../../assets/icons/coments.svg";
import { ReactComponent as Shortcut } from "../../assets/icons/shortcut.svg";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { ReactComponent as Errors } from "../../assets/icons/errors.svg";
import { ReactComponent as Warnings } from "../../assets/icons/warnings.svg";
import { ReactComponent as SaveTitle } from "../../assets/icons/check-circle.svg";
import { ReactComponent as Save } from "../../assets/icons/save-project.svg";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import {
  ShowOnLogin,
  ShowOnLogout,
} from "../../auth/components/protect/hiddenLink";
import { fetchPostById } from "../../redux/features/posts/postSlice";

export const ThePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.posts);
  const { post } = useSelector((state) => state.posts);

  const [title, setTitle] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  // Fetch the post data when the component mounts or the id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  // Update the local state when the fetched data changes
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setHtmlCode(data.htmlCode);
      setCssCode(data.cssCode);
      setJsCode(data.jsCode);
      // Update tempTitle here to ensure it has the latest value
      setTempTitle(data.title);
    }
  }, [data]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setHtmlCode(post.htmlCode);
      setCssCode(post.cssCode);
      setJsCode(post.jsCode);
    }
  }, [post]);

  const [tempTitle, setTempTitle] = useState(data?.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const goProfile = () => {
    navigate("/profile");
  };

  const updateHtmlCode = (value) => {
    setHtmlCode(value);
  };

  const updateCssCode = (value) => {
    setCssCode(value);
  };

  const updateJsCode = (value) => {
    setJsCode(value);
  };

  const saveTitle = () => {
  };

  const handleSavePost = () => {
  };

  // Split pane sizes
  const [horizontalSizes, setHorizontalSizes] = useState(["60%", "40%"]);
  const [verticalSizes, setVerticalSizes] = useState(["33%", "34%", "33%"]);

  // Styling for each pane
  const layoutCSS = {
    height: "100%",
  };

  // Function to render the preview iframe with the HTML, CSS and JavaScript code from the editors
  const createMarkup = () => {
    const blob = new Blob(
      [
        `<html><head><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}</script></body></html>`,
      ],
      { type: "text/html" }
    );
    return URL.createObjectURL(blob);
  };

  return (
    <div className="container-full">
      <div className="new-proj-container">
        <div className="new-proj-nav">
          <div className="new-proj-nav-left">
            <div className="new-proj-nav-left-logo">
              <Link to="/" className="logo">
                <p>LiveShow Code</p>
              </Link>
            </div>
            <div className="new-proj-nav-title">
              {!isEditingTitle ? (
                <>
                  <h5 className="new-proj-title">{title || "Untitled"}</h5>
                  <div
                    onClick={handleTitleEdit}
                    className="new-proj-nav-title-icon"
                  >
                    <Edit />
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    autoFocus
                  />
                  <div className="new-proj-nav-title-icon">
                    <SaveTitle />
                  </div>
                </>
              )}
              <button className="save-proj-button" onClick={handleSavePost}>
                <Save /> Save
              </button>
            </div>
          </div>
          <div className="new-proj-nav-right">
            <ShowOnLogout>
              <Link to="/login">
                {" "}
                <button>Auth</button>
              </Link>
            </ShowOnLogout>
            <ShowOnLogin>
              <div className="new-proj-logo-login" onClick={goProfile}>
                <img
                  className="new-proj-acc-logo"
                  src={user ? user.photo : "https://www.gravatar.com/av"}
                  alt="logo"
                />
              </div>
            </ShowOnLogin>
          </div>
        </div>
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
                  onChange={(value) => {
                    updateHtmlCode(value);
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
                  onChange={(value) => {
                    updateCssCode(value);
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
                  onChange={(value) => {
                    updateJsCode(value);
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
