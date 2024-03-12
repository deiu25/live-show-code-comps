import React, { useEffect, useState } from "react";
import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

import { ReactComponent as HtmlIcon } from "../../assets/icons/html.svg";
import { ReactComponent as CssIcon } from "../../assets/icons/css.svg";
import { ReactComponent as JsIcon } from "../../assets/icons/js.svg";

import { CodeEditorToolbar } from "./CodeEditorToolbar";
import { useIframeUrl } from "../../customHooks/useIframeUrl";
import EditorComponentHorizontal from "../editor-components/editor-component-horizontal/EditorComponentHorizontal";
import EditorComponentVertical from "../editor-components/editor-component-vertical/EditorComponentVertical";


export const CodeEditorContainer = ({
  title,
  initialHtml,
  initialCss,
  initialJs,
  onHtmlChange,
  onCssChange,
  onJsChange,
  editorLayout,
}) => {
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [jsCode, setJsCode] = useState(initialJs);
  const [activeLanguage, setActiveLanguage] = useState("html");

  const markupUrl = useIframeUrl(htmlCode, cssCode, jsCode);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(markupUrl);
    };
  }, [markupUrl]);

  // Split pane sizes
  const [horizontalSizes, setHorizontalSizes] = useState(["50%", "50%"]);

  const handleCodeChange = (language, newCode) => {
    if (language === "html") {
      setHtmlCode(newCode);
      onHtmlChange(newCode);
    } else if (language === "css") {
      setCssCode(newCode);
      onCssChange(newCode);
    } else if (language === "javascript") {
      setJsCode(newCode);
      onJsChange(newCode);
    }
  };

  useEffect(() => {
    setHtmlCode(initialHtml);
    setCssCode(initialCss);
    setJsCode(initialJs);
  }, [initialHtml, initialCss, initialJs]);

  return (
    <>
      {/* <CodeEditorToolbar /> */}
      {editorLayout === "horizontal" ? (
        <>
          <EditorComponentHorizontal
            language={activeLanguage}
            value={activeLanguage === "html" ? htmlCode : activeLanguage === "css" ? cssCode : jsCode}
            onChange={handleCodeChange}
            setActiveLanguage={setActiveLanguage}
          />
          <div className="output-section">
            <iframe title={title} src={markupUrl}></iframe>
          </div>
        </>
      ) : (
        <SplitPane
          sizes={horizontalSizes}
          onChange={(sizes) => setHorizontalSizes(sizes)}
        >
          <EditorComponentVertical
            language={activeLanguage}
            value={activeLanguage === "html" ? htmlCode : activeLanguage === "css" ? cssCode : jsCode}
            onChange={handleCodeChange}
            setActiveLanguage={setActiveLanguage}
          />
          <div>
            <CodeEditorToolbar />
            <div className="output-section">
              <div>
                <iframe title={title} src={markupUrl}></iframe>
              </div>
            </div>
          </div>
        </SplitPane>
      )}
    </>
  );
};
