// useIframeUrl.js
import { useEffect, useMemo } from 'react';

export function useIframeUrl(htmlCode, cssCode, jsCode) {
  const markupUrl = useMemo(() => {
    const blob = new Blob([
      `<!DOCTYPE html>
      <html>
      <head>
        <style>${cssCode}</style>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      </head>
      <body>
        ${htmlCode}
        <script>${jsCode}</script>
      </body>
      </html>`,
    ], { type: 'text/html' });

    return URL.createObjectURL(blob);
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(markupUrl);
    };
  }, [markupUrl]);

  return markupUrl;
}