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

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export const NewProject = () => {
  const [horizontalSizes, setHorizontalSizes] = useState(["23%", "11%"]);
  const [verticalSizes, setVerticalSizes] = useState(["33%", "34%", "33%"]);

  // Styling for each pane
  const layoutCSS = {
    height: "100%",
    overflow: "auto", // Allows scrolling if content exceeds the panel size
  };

  // State to hold the code for HTML, CSS, and JavaScript
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

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
    <div className="new-proj-container">
      <SplitPane
        split="horizontal"
        sizes={horizontalSizes}
        onChange={setHorizontalSizes}
      >
        <SplitPane
          split="vertical"
          sizes={verticalSizes}
          onChange={setVerticalSizes}
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
                height="600px"
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
                height="600px"
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
                height="600px"
                theme={"dark"}
                extensions={[javascript({ jsx: true })]}
                onChange={(value, viewUpdate) => {
                  setJsCode(value);
                }}
              />
            </div>
          </div>
        </SplitPane>

        <Pane initialSize="50%" minSize="20%">
          <div>
            <div className="output-section">
              <iframe
                title="preview"
                src={createMarkup()}
                overflow="auto"
                style={{  height: "100%", width: "100%" }}
              />
            </div>
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
          </div>
        </Pane>
      </SplitPane>
    </div>
  );
};
