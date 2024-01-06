// CodeEditorContainer.js
import React, { useEffect, useState } from "react";
import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";

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
import { Link } from "react-router-dom";

export const CodeEditorContainer = ({
  initialHtml,
  initialCss,
  initialJs,
  onHtmlChange,
  onCssChange,
  onJsChange,
}) => {
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [jsCode, setJsCode] = useState(initialJs);

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

  useEffect(() => {
    setHtmlCode(initialHtml);
    setCssCode(initialCss);
    setJsCode(initialJs);
  }, [initialHtml, initialCss, initialJs]);

  const handleHtmlChange = (value) => {
    setHtmlCode(value);
    onHtmlChange(value);
  };

  // onChange pentru CodeMirror

  const handleCssChange = (value) => {
    setCssCode(value);
    onCssChange(value);
  };

  const handleJsChange = (value) => {
    setJsCode(value);
    onJsChange(value);
  };

  return (
    <SplitPane
      sizes={horizontalSizes}
      onChange={(sizes) => setHorizontalSizes(sizes)}
    >
      <SplitPane
        split="vertical"
        sizes={verticalSizes}
        onChange={(sizes) => setVerticalSizes(sizes)}
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
              extensions={[html()]}
              onChange={(value) => {
                handleHtmlChange(value);
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
                handleCssChange(value);
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
                handleJsChange(value);
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
  );
};
