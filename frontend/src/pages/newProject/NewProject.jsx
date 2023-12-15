import React, { useState } from "react";
import { Link } from "react-router-dom";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "./NewProject.css";
import { ReactComponent as HtmlIcon } from "../../assets/icons/html.svg";
import { ReactComponent as CssIcon } from "../../assets/icons/css.svg";
import { ReactComponent as JsIcon } from "../../assets/icons/js.svg";
import { ReactComponent as SetingsIcon } from "../../assets/icons/setings.svg";
import { ReactComponent as AngleDown } from "../../assets/icons/down.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export const NewProject = () => {
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
            minSize={50}
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
                <button>Console</button>
                <button>Assets</button>
                <button>Comments</button>
                <button>Shortcuts</button>
              </div>
              <div className="output-footer-bar-center">
                <Link to="/">Home</Link>
              </div>
              <div className="output-footer-bar-right">
                <p>0 Errors</p>
                <p>0 Warnings</p>
              </div>
            </div>
            <div className="output-section">
              <iframe
                title="preview"
                src={createMarkup()}
                overflow="auto"
                style={{ height: "83vh", width: "100%", border: "none" }}
              />
            </div>
          </div>
        </SplitPane>
      </div>
    </div>
  );
};
