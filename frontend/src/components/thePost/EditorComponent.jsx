import React, { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

import { ReactComponent as SetingsIcon } from "../../assets/icons/setings.svg";
import { ReactComponent as AngleDown } from "../../assets/icons/down.svg";

const layoutCSS = {
  height: "100%",
};

const EditorComponent = ({ language, icon: Icon, value, onChange }) => {
  const extensions = useMemo(() => {
    switch (language) {
      case "html":
        return [html()];
      case "css":
        return [css()];
      case "javascript":
        return [javascript()];
      default:
        return [];
    }
  }, [language]);

  return (
    <div style={layoutCSS}>
      <div className="code-editor-head">
        <div className="html-icon">
          <Icon />
          <p>{language}</p>
        </div>
        <div className="right-tools">
          <SetingsIcon />
          <AngleDown />
        </div>
      </div>
      <div className="code-editor">
        <CodeMirror
          value={value}
          height="83vh"
          theme="dark"
          extensions={extensions}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default EditorComponent;
