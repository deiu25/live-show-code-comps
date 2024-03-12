import React, { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import "./EditorComponentHorizontal.css";
import { EditorView } from "@codemirror/view";
import { ReactComponent as HtmlIcon } from "../../../assets/icons/html.svg";
import { ReactComponent as CssIcon } from "../../../assets/icons/css.svg";
import { ReactComponent as JsIcon } from "../../../assets/icons/js.svg";
// import { ReactComponent as SettingsIcon } from "../../../assets/icons/setings.svg";
// import { ReactComponent as AngleDown } from "../../../assets/icons/down.svg";

const EditorComponentHorizontal = ({
  language,
  value,
  onChange,
  setActiveLanguage,
}) => {
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

  return (
    <div>
      <div className="code-editor-head-horizontal">
        <div className="language-icons-btn">
          <HtmlIcon onClick={() => setActiveLanguage("html")} />
          <CssIcon onClick={() => setActiveLanguage("css")} />
          <JsIcon onClick={() => setActiveLanguage("javascript")} />
        </div>
        {/* <div className="right-tools">
          <SettingsIcon />
          <AngleDown />
        </div> */}
      </div>
      <>
        <div className="code-editor">
          <CodeMirror
            value={value}
            height="80vh"
            width="100vw"
            theme="dark"
            extensions={extensions}
            onChange={onChange}
          />
        </div>
      </>
    </div>
  );
};

export default EditorComponentHorizontal;
