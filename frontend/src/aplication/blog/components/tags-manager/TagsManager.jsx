// TagsManager.jsx
import React from "react";
import { Tag } from "../tag/Tag";

const TagsManager = ({
  tags,
  newTag,
  handleNewTagChange,
  handleAddTag,
  handleDeleteTag,
}) => {
  return (
    <>
      <div className="myForm-field tag-label-btn">
        <label htmlFor="tags" className="myForm-label">
          Tags:
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="myForm-input"
          value={newTag}
          onChange={handleNewTagChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAddTag();
            }
          }}
        />
        <button type="button" className="add-tag-button" onClick={handleAddTag}>
          Add
        </button>
      </div>
      <div className="myForm-tags">
        {tags &&
          tags
            .split(" ")
            .map((tag, index) => (
              <Tag key={index} tag={tag} onDelete={handleDeleteTag} />
            ))}
      </div>
    </>
  );
};

export default TagsManager;
