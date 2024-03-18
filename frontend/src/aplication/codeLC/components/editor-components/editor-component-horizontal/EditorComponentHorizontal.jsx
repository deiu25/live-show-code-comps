import React, { useMemo } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

import { ReactComponent as HtmlIcon } from "../../../assets/icons/html.svg";
import { ReactComponent as CssIcon } from "../../../assets/icons/css.svg";
import { ReactComponent as JsIcon } from "../../assets/icons/js.svg";
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

  const scrollToOutput = () => {
    const outputSection = document.querySelector('.output-section');
    if (outputSection) {
      outputSection.scrollIntoView({ behavior: 'smooth' });
    }
  };  

  return (
    <div>
      <div className="code-editor-head-horizontal">
        <div className="language-icons-btn">
          <HtmlIcon onClick={() => setActiveLanguage("html")} />
          <CssIcon onClick={() => setActiveLanguage("css")} />
          <JsIcon onClick={() => setActiveLanguage("javascript")} />
        </div>
        <button className="scroll-to-output-btn" onClick={scrollToOutput}>Jump to Output</button>
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
            width="99vw"
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
