import { useState } from "react";

//useContentBlocks.jsx
const useContentBlocks = () => {
  const [contentBlocks, setContentBlocks] = useState([]);

  const addContentBlock = (type) => {
    const newBlock = type === "image" ? { type, file: null } : { type, text: "" };
    setContentBlocks(prevBlocks => [...prevBlocks, newBlock]);
  };

  const deleteContentBlock = (index) => {
    setContentBlocks(prevBlocks => prevBlocks.filter((_, i) => i !== index));
  };

  const updateContentBlock = (index, data) => {
    setContentBlocks(prevBlocks =>
      prevBlocks.map((block, i) => (i === index ? { ...block, ...data } : block))
    );
  };

  const moveContentBlock = (index, direction) => {
    setContentBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      if (direction === "up" && index > 0) {
        [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
      } else if (direction === "down" && index < newBlocks.length - 1) {
        [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      }
      return newBlocks;
    });
  };

  return { contentBlocks, addContentBlock, deleteContentBlock, updateContentBlock, moveContentBlock };
};

export default useContentBlocks;