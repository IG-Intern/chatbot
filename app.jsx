import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [basename, setBasename] = useState('');

  useEffect(() => {
    const path = window.location.pathname;
    const basePath = path.substring(0, path.lastIndexOf('/'));
    setBasename(basePath);

    const checkDependencies = () => {
      if (
        window.BlogPost &&
        window.Home &&
        window.PostPage
      ) {
        setIsReady(true);
      }
    };

    checkDependencies();
    const interval = setInterval(checkDependencies, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-4"></div>
        </div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<window.Home />} />
        <Route path="/post/:slug" element={<window.PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('renderDiv')).render(<App />);