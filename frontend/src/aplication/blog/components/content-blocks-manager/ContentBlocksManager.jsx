// ContentBlocksManager.jsx
import React from "react";
import { ReactComponent as UpSvg } from "../../assets/icons/arrow-up-svg.svg";
import { ReactComponent as DownSvg } from "../../assets/icons/arrow-down-svg.svg";
import { ReactComponent as MinusSvg } from "../../assets/icons/minus-svg.svg";

const ContentBlocksManager = ({
  contentBlocks,
  handleContentBlockChange,
  handleContentBlockFileChange,
  handleCodeBlockChange,
  handlePreSubtitleChange,
  handlePostSubtitleChange,
  handlePreCodeDescriptionChange,
  handlePostCodeDescriptionChange,
  handleDeleteContentBlock,
  moveBlockUp,
  moveBlockDown,
}) => {

  const handleKeyDown = (e, index, type) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      const newValue = e.target.value + "\n";
      if (type === "text") {
        handleContentBlockChange(
          { target: { name: "text", value: newValue } },
          index
        );
      }
    }
  };

  return (
    <div className="content-blocks">
      {contentBlocks.map((block, index) => (
        <div key={index}>
          {block.type === "image" ? (
            <>
              <label htmlFor="subtitle" className="myForm-label">
                Image Subtitle:
              </label>
              <input
                type="text"
                className="myForm-input"
                value={block.subtitle || ""}
                name="subtitle"
                onChange={(e) => handleCodeBlockChange(e, index)}
              />
              <input
                type="file"
                onChange={(e) => handleContentBlockFileChange(e, index)}
              />
            </>
          ) : block.type === "code" ? (
            <div className="myForm-field">
              <label htmlFor="preSubtitle" className="myForm-label">
                Pre Code Subtitle:
              </label>
              <input
                type="text"
                className="myForm-input"
                value={block.preSubtitle || ""}
                name="preSubtitle"
                onChange={(e) => handlePreSubtitleChange(e, index)}
              />
              <label htmlFor="preDescription" className="myForm-label">
                Pre Code Description:
              </label>
              <textarea
                className="myForm-input-textArea"
                value={block.preDescription}
                name="preDescription"
                onChange={(e) => handlePreCodeDescriptionChange(e, index)}
              />
              <label htmlFor="code" className="myForm-label">
                Code
              </label>
              <label htmlFor="language" className="myForm-label">
                Language
              </label>
              <select
                className="myForm-input-select"
                value={block.language}
                name="language"
                onChange={(e) => handleCodeBlockChange(e, index)}
              >
                <option value="plaintext">plaintext</option>
                <option value="javascript">javascript</option>
                <option value="css">css</option>
                <option value="html">html</option>
                <option value="react">react</option>
                <option value="csharp">csharp</option>
                <option value="cpp">cpp</option>
                <option value="java">java</option>
                <option value="php">php</option>
                <option value="ruby">ruby</option>
                <option value="redux">redux</option>
                <option value="rust">rust</option>
                <option value="sql">sql</option>
                <option value="node">node</option>
                <option value="angular">angular</option>
                <option value="typescript">typescript</option>
              </select>
              <textarea
                className="myForm-input-textArea"
                value={block.code}
                name="code"
                onChange={(e) => handleCodeBlockChange(e, index)}
              />
              <label htmlFor="postSubtitle" className="myForm-label">
                Post Code Subtitle:
              </label>
              <input
                type="text"
                className="myForm-input"
                value={block.postSubtitle  || ""}
                name="postSubtitle"
                onChange={(e) => handlePostSubtitleChange(e, index)}
              />
              <label htmlFor="postDescription" className="myForm-label">
                Post Code Description:
              </label>
              <textarea
                className="myForm-input-textArea"
                value={block.postDescription}
                name="postDescription"
                onChange={(e) => handlePostCodeDescriptionChange(e, index)}
              />
            </div>
          ) : (
            <>
              <label htmlFor="subtitle" className="myForm-label">
                Textarea Subtitle:
              </label>
              <input
                type="text"
                className="myForm-input"
                value={block.subtitle || ""}
                name="subtitle"
                onChange={(e) => handleCodeBlockChange(e, index)}
              />
              <textarea
                className="myForm-input-textArea"
                value={block.text}
                name="text"
                onKeyDown={(e) => handleKeyDown(e, index, "text")}
                onChange={(e) => handleContentBlockChange(e, index)}
              />
            </>
          )}
          <button className="sett-button" onClick={() => moveBlockUp(index)}>
            <UpSvg />
          </button>
          <button className="sett-button" onClick={() => moveBlockDown(index)}>
            <DownSvg />
          </button>
          <button
            className="sett-button"
            onClick={() => handleDeleteContentBlock(index)}
          >
            <MinusSvg />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContentBlocksManager;
