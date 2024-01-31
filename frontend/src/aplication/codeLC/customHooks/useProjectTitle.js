import { useEffect, useState } from 'react';

function useProjectTitle(initialTitle = '') {
  const [title, setTitle] = useState(initialTitle);
  const [tempTitle, setProjectTitle] = useState(initialTitle);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    setTitle(initialTitle);
    setProjectTitle(initialTitle);
  }, [initialTitle]);

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setTitle(tempTitle);
    setIsEditingTitle(false);
  };

  return {
    title,
    tempTitle,
    isEditingTitle,
    setProjectTitle,
    setIsEditingTitle,
    handleTitleEdit,
    handleTitleSave,
  };
}

export default useProjectTitle;