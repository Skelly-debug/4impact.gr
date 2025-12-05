// Toolbar/toolbar.js
"use client";

import React from "react";

const Toolbar = ({ editorRef, onAddLink, onAddImage }) => {
  
  // This handles simple formatting (Bold, Italic, Underline)
  const handleFormat = (command, value = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
    }
  };

  return (
    <div className="flex gap-2 p-2 bg-gray-200 border-b">
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); handleFormat("bold"); }}
        className="px-3 py-1 bg-white border rounded hover:bg-gray-200 font-bold"
      >
        B
      </button>
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); handleFormat("italic"); }}
        className="px-3 py-1 bg-white border rounded hover:bg-gray-200 italic"
      >
        I
      </button>
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); handleFormat("underline"); }}
        className="px-3 py-1 bg-white border rounded hover:bg-gray-200 underline"
      >
        U
      </button>
      
      {/* LINK BUTTON: Uses the prop from AdminForm */}
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault(); // Prevents editor from losing focus
          if (onAddLink) onAddLink();
        }}
        className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
      >
        🔗 Link
      </button>

      {/* IMAGE BUTTON: Uses the prop from AdminForm */}
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          if (onAddImage) onAddImage();
        }}
        className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
      >
        📷 Image
      </button>
    </div>
  );
};

export default Toolbar;