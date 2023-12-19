import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "./NewProject.css";
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

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from "../../auth/redux/features/auth/authSlice";
import { addNewPost } from "../../post-redux/features/postSlice";

export const NewProject = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);


  const [horizontalSizes, setHorizontalSizes] = useState(["60%", "40%"]);
  const [verticalSizes, setVerticalSizes] = useState(["33%", "34%", "33%"]);

  // Styling for each pane
  const layoutCSS = {
    height: "100%",
  };

  // State to hold the code for HTML, CSS, and JavaScript
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  const [title, setTitle] = useState("");
  const [isTitle, setIsTitle] = useState("");

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


  const handleSubmit = async () => {
    if (!title || !htmlCode || !cssCode || !jsCode) {
      console.error('All fields are required');
      return;
    }

    const newPost = {
      title,
      html: htmlCode,
      css: cssCode,
      javascript: jsCode,
      user: user._id,
    };

    dispatch(addNewPost(newPost));
  };

  return (
    <div className="container-full">
      <div className="new-proj-container">
        <div className="new-proj-nav">
          <div className="new-proj-nav-left">
            <div className="new-proj-nav-left-logo">
              <Link to="/">Live Show Code</Link>
            </div>
            <div className="new-proj-nav-title">
              <input
                type="text"
                placeholder="Untitled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="new-proj-nav-title-icon">
                <Edit />
              </div>

              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>
          <div className="new-proj-nav-right">
            <button>Run</button>
            <button>Acc</button>
            <button>Options</button>
          </div>
        </div>
        <SplitPane
          sizes={horizontalSizes}
        >
          <SplitPane
            split="vertical"
            sizes={verticalSizes}
            onChange={sizes => setVerticalSizes(sizes)}
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
                  extensions={[javascript({ jsx: true })]}
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
                  extensions={[javascript({ jsx: true })]}
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
                  extensions={[javascript({ jsx: true })]}
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
                <Link to="/"><Home /></Link>
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
