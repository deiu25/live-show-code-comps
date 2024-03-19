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
  const [activeTab, setActiveTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [jsCode, setJsCode] = useState(initialJs);

  const markupUrl = useIframeUrl(htmlCode, cssCode, jsCode);

  
  const shouldShowTab = (language) => {
    switch (language) {
      case 'html':
        return !!htmlCode.trim();
      case 'css':
        return !!cssCode.trim();
      case 'javascript':
        return !!jsCode.trim();
      default:
        return false;
    }
  };

  const changeTab = (newActiveTab) => {
    setActiveTab(newActiveTab);
  };

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
    return () => {
      URL.revokeObjectURL(markupUrl);
    };
  }, [markupUrl]);

  // Split pane sizes
  const [sizes, setSizes] = useState(["50%", "50%"]);

  useEffect(() => {
    setHtmlCode(initialHtml);
    setCssCode(initialCss);
    setJsCode(initialJs);
  }, [initialHtml, initialCss, initialJs]);

  const getActiveEditor = () => {
    switch (activeTab) {
      case "html":
        return (
          <EditorComponent
            language="html"
            icon={HtmlIcon}
            value={htmlCode}
            onChange={(newCode) => handleCodeChange("html", newCode)}
            onTabChange={changeTab}
            shouldShowTab={shouldShowTab} 
          />
        );
      case "css":
        return (
          <EditorComponent
            language="css"
            icon={CssIcon}
            value={cssCode}
            onChange={(newCode) => handleCodeChange("css", newCode)}
            onTabChange={changeTab}
            shouldShowTab={shouldShowTab}
          />
        );
      case "js":
        return (
          <EditorComponent
            language="javascript"
            icon={JsIcon}
            value={jsCode}
            onChange={(newCode) => handleCodeChange("js", newCode)}
            onTabChange={changeTab}
            shouldShowTab={shouldShowTab} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <SplitPane
      sizes={sizes}
      onChange={(sizes) => setSizes(sizes)}
    >
      <div className="code-editor-container">
        {getActiveEditor()}
      </div>

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
