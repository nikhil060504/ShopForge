export function wrapCodeForPreview(code: string): string {
  // strip any imports, exports, and "use client" if present
  let clean = code
    .replace(/import\s+.*?from\s+['"]react['"];?\s*/g, "")
    .replace(/import\s+.*?from\s+['"]next\/.*?['"];?\s*/g, "")
    .replace(/^['"]use client['"];?\s*/m, "")
    .replace(/export\s+default\s+/g, "")
    .trim();

  console.log("Cleaned code for preview:", clean.substring(0, 200));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; padding: 0; overflow-x: hidden; }
    * { box-sizing: border-box; }
  </style>
</head>
<body>
  <div id="root"></div>
  
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  
  <script type="text/babel">
    const { useState, useEffect, useRef } = React;
    
    try {
      ${clean}
      
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<GeneratedPage />);
    } catch (err) {
      console.error('Preview render error:', err);
      window.parent.postMessage({ 
        type: 'iframe-error', 
        message: err.message 
      }, '*');
      document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: ' + err.message + '</div>';
    }
  </script>
  
  <script>
    window.addEventListener('error', (e) => {
      console.error('Preview error:', e.error);
      window.parent.postMessage({ 
        type: 'iframe-error', 
        message: e.error?.message || 'Unknown error' 
      }, '*');
    });
    
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Promise rejection:', e.reason);
      window.parent.postMessage({ 
        type: 'iframe-error', 
        message: e.reason?.message || 'Promise rejected' 
      }, '*');
    });
  </script>
</body>
</html>`;
}






