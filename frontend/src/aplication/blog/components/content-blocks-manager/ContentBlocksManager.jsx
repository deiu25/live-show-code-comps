// ContentBlocksManager.jsx
import React from 'react';

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
          <button onClick={() => moveBlockUp(index)}>Move Up</button>
          <button onClick={() => moveBlockDown(index)}>Move Down</button>
          <button onClick={() => handleDeleteContentBlock(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContentBlocksManager;
