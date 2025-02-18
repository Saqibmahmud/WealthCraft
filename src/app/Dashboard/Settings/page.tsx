'use client'

import React, { useState, useEffect } from 'react';
import AsideDashboard from '../../../../Components/Aside_Dashbar/page';

const SettingsPage = () => {
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    
    const savedFontSize = localStorage.getItem('globalFontSize');
    if (savedFontSize) {
      const size = parseInt(savedFontSize, 10);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}px`;
    }
  }, []);

  const handleFontSizeChange = (event:any) => {
    const newSize = parseInt(event.target.value, 10);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
    localStorage.setItem('globalFontSize', newSize.toString());
  };

  const resetFontSize = () => {
    const defaultSize = 16;
    setFontSize(defaultSize);
    document.documentElement.style.fontSize = `${defaultSize}px`;
    localStorage.setItem('globalFontSize', defaultSize.toString());
  };

  return (

    <div className='flex bg-black'>
        <AsideDashboard/>
    <div className="container mx-auto p-6 flex justify-center items-center min-h-screen">
      <div className="max-w-xl w-full bg-gray-900 text-white shadow-lg p-6 rounded-lg">
        <div className="mb-4">
          <h1 className="text-xl font-bold">Display Settings</h1>
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Text Size</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm">A</span>
              <input
                type="range"
                min="12"
                max="24"
                step="1"
                value={fontSize}
                onChange={handleFontSizeChange}
                className="w-full"
              />
              <span className="text-lg">A</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Current size: {fontSize}px</span>
              <button
                onClick={resetFontSize}
                className="border border-gray-400 text-gray-300 px-3 py-1 rounded hover:bg-gray-700"
              >
                Reset to Default
              </button>
            </div>
          </div>
          {/* Preview section */}
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default SettingsPage;
