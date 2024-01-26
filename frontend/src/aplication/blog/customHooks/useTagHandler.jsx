import { useState } from 'react';

const useTagHandler = () => {
  const [tags, setTags] = useState([]);

  const addTag = (newTag) => {
    if (!newTag.trim() || tags.includes(newTag)) return;
    setTags([...tags, newTag]);
  };

  const deleteTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  return { tags, addTag, deleteTag };
};

export default useTagHandler;
