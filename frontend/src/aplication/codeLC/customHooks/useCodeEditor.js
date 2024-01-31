// useCodeEditor.js
import { useState } from 'react';

const useCodeEditor = (initialHtml, initialCss, initialJs) => {
  const [code, setCode] = useState({
    html: initialHtml,
    css: initialCss,
    js: initialJs,
  });

  const handleCodeChange = (language, newCode) => {
    setCode(prev => ({
      ...prev,
      [language]: newCode
    }));
  };
  
  const setAllCode = (newCode) => {
    setCode(newCode);
  };

  return {
    code,
    handleCodeChange,
    setAllCode, 
  };
};

export default useCodeEditor;