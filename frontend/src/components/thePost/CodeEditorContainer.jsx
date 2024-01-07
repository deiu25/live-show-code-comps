import React, { useEffect, useState, useMemo } from "react";
import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

import { ReactComponent as HtmlIcon } from "../../assets/icons/html.svg";
import { ReactComponent as CssIcon } from "../../assets/icons/css.svg";
import { ReactComponent as JsIcon } from "../../assets/icons/js.svg";

import { CodeEditorToolbar } from "./CodeEditorToolbar";
import EditorComponent from "./EditorComponent";

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

  const iframeSrc = useMemo(() => {
    const blob = new Blob(
      [
        `<html><head><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}</script></body></html>`,
      ],
      { type: "text/html" }
    );
    return URL.createObjectURL(blob);
  }, [htmlCode, cssCode, jsCode]);

  const handleCodeChange = (language, newCode) => {
    if (language === "html") {
      setHtmlCode(newCode);
      onHtmlChange(newCode);
    } else if (language === "css") {
      setCssCode(newCode);
      onCssChange(newCode);
    } else if (language === "js") {
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
        minSize={50}
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
          language="js"
          icon={JsIcon}
          value={jsCode}
          onChange={(newCode) => handleCodeChange("js", newCode)}
        />
      </SplitPane>

      <div>
        <CodeEditorToolbar />
        <div className="output-section">
          <iframe
            title="preview"
            src={iframeSrc}
            overflow="auto"
            className="output-iframe"
          />
        </div>
      </div>
    </SplitPane>
  );
};