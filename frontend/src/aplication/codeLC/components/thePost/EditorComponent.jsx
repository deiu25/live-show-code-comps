import React, { useMemo } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

import { ReactComponent as HtmlIcon } from "../../assets/icons/html.svg";
import { ReactComponent as CssIcon } from "../../assets/icons/css.svg";
import { ReactComponent as JsIcon } from "../../assets/icons/js.svg";
import { ReactComponent as SetingsIcon } from "../../assets/icons/setings.svg";
import { ReactComponent as AngleDown } from "../../assets/icons/down.svg";

const EditorComponent = ({ language, value, onChange, onTabChange }) => {
  const extensions = useMemo(() => {
    let baseExtensions = [EditorView.lineWrapping];

    switch (language) {
      case "html":
        baseExtensions.push(html());
        break;
      case "css":
        baseExtensions.push(css());
        break;
      case "javascript":
        baseExtensions.push(javascript());
        break;
      default:
        break;
    }

    return baseExtensions;
  }, [language]);

  const getIconStyle = (iconLanguage) => {
    return {
      width: "30px",
      height: "30px",
      cursor: "pointer",
      backgroundColor: language === iconLanguage ? "black" : "transparent",
    };
  };

  return (
    <div className="code-editor-component">
      <div className="code-editor-head">
        <div className="lang-icon">
          <HtmlIcon style={getIconStyle("html")} onClick={() => onTabChange("html")} />
          <CssIcon style={getIconStyle("css")} onClick={() => onTabChange("css")} />
          <JsIcon style={getIconStyle("javascript")} onClick={() => onTabChange("js")} />
        </div>
        <div className="right-tools">
          <SetingsIcon />
          <AngleDown />
        </div>
      </div>
      <div className="code-editor">
        <CodeMirror
          value={value}
          height="100%"
          width="100%"
          theme="dark"
          extensions={extensions}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default EditorComponent;
