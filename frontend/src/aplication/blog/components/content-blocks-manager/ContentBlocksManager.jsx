// ContentBlocksManager.jsx
import React from 'react';
import { ReactComponent as UpSvg } from "../../assets/icons/arrow-up-svg.svg";
import { ReactComponent as DownSvg } from "../../assets/icons/arrow-down-svg.svg";
import { ReactComponent as MinusSvg } from "../../assets/icons/minus-svg.svg";

const ContentBlocksManager = ({
  contentBlocks,
  handleContentBlockChange,
  handleContentBlockFileChange,
  handleDeleteContentBlock,
  moveBlockUp,
  moveBlockDown
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
          ) : (
            <textarea
              className="myForm-input-textArea"
              value={block.text}
              name="text"
              onChange={(e) => handleContentBlockChange(e, index)}
            />
          )}
          <button className="sett-button" onClick={() => moveBlockUp(index)}><UpSvg /></button>
          <button className="sett-button" onClick={() => moveBlockDown(index)}><DownSvg /></button>
          <button className="sett-button" onClick={() => handleDeleteContentBlock(index)}><MinusSvg /></button>
        </div>
      ))}
    </div>
  );
};

export default ContentBlocksManager;
