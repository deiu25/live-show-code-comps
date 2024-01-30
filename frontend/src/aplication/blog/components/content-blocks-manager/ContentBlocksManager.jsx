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
  handleDeleteContentBlock,
  moveBlockUp,
  moveBlockDown,
}) => {
  return (
    <div className="content-blocks">
      {contentBlocks.map((block, index) => (
        <div key={index}>
          {block.type === "image" ? (
            <input
              type="file"
              onChange={(e) => handleContentBlockFileChange(e, index)}
            />
          ) : block.type === "code" ? (
            <div className="myForm-field">
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
            </div>
          ) : (
            <textarea
              className="myForm-input-textArea"
              value={block.text}
              name="text"
              onChange={(e) => handleContentBlockChange(e, index)}
            />
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
