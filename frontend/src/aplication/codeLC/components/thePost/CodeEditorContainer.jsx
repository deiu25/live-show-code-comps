import React, { useEffect, useState } from "react";
import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

import { ReactComponent as HtmlIcon } from "../../assets/icons/html.svg";
import { ReactComponent as CssIcon } from "../../assets/icons/css.svg";
import { ReactComponent as JsIcon } from "../../assets/icons/js.svg";

import { CodeEditorToolbar } from "./CodeEditorToolbar";
import EditorComponent from "./EditorComponent";
import { useIframeUrl } from "../../customHooks/useIframeUrl";

export const CodeEditorContainer = ({
  title,
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

  const markupUrl = useIframeUrl(htmlCode, cssCode, jsCode);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(markupUrl);
    };
  }, [markupUrl]);

  // Split pane sizes
  const [horizontalSizes, setHorizontalSizes] = useState(["60%", "40%"]);
  const [verticalSizes, setVerticalSizes] = useState(["33%", "34%", "33%"]);

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
    <SplitPane
      sizes={horizontalSizes}
      onChange={(sizes) => setHorizontalSizes(sizes)}
    >
      <SplitPane
        split="vertical"
        sizes={verticalSizes}
        onChange={(sizes) => setVerticalSizes(sizes)}
        minsize={50}
      >
        <EditorComponent
          language="html"
          icon={HtmlIcon}
          value={htmlCode}
          onChange={(newCode) => handleCodeChange("html", newCode)}
        />
        <EditorComponent
          language="css"
          icon={CssIcon}
          value={cssCode}
          onChange={(newCode) => handleCodeChange("css", newCode)}
        />
        <EditorComponent
          language="javascript"
          icon={JsIcon}
          value={jsCode}
          onChange={(newCode) => handleCodeChange("js", newCode)}
        />
      </SplitPane>

      <div>
      <CodeEditorToolbar />
        <div className="output-section">
        <div>
          <iframe title={title} src={markupUrl}></iframe>
          </div>
        </div>
      </div>
    </SplitPane>
  );
};