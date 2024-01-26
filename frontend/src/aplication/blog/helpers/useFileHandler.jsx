// useFileHandler.js
import { useState, useCallback } from 'react';

const useFileHandler = (initialFiles = []) => {
  const [files, setFiles] = useState(initialFiles);
  const [previewSources, setPreviewSources] = useState([]);

  const handleFileChange = useCallback((event) => {
    const newFiles = Array.from(event.target.files);
    setFiles(newFiles);
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPreviewSources(newPreviews);
  }, []);

  const handleDeletePreview = useCallback((index) => {
    setPreviewSources(prev => prev.filter((_, i) => i !== index));
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  return { files, previewSources, handleFileChange, handleDeletePreview };
};

export default useFileHandler;
