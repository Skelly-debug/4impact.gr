"use client";

import React from "react";

const Toolbar = ({ editorRef }) => {
  const handleFormat = (command, value = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
    }
  };

  const handleAddImage = () => {
    const imageUrl = prompt("Enter image URL:");
    if (imageUrl) handleFormat("insertImage", imageUrl);
  };

  const handleAddLink = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    const url = prompt("Enter URL:", "https://");
    const displayText = prompt("Display text:", selectedText || "Link");

    if (url && displayText) {
      const link = document.createElement("a");
      link.href = url;
      link.textContent = displayText;
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(link);
    }
  };

  return (
    <div className="flex gap-2 p-2 bg-gray-100 border-b">
      <button
        type="button"
        onClick={() => handleFormat("bold")}
        className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => handleFormat("italic")}
        className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => handleFormat("underline")}
        className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
      >
        <u>U</u>
      </button>
      <button
        type="button"
        onClick={handleAddLink}
        className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
      >
        🔗Link
      </button>
      <button
        type="button"
        onClick={handleAddImage}
        className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
      >
        📷 Add Image
      </button>
    </div>
  );
};

export default Toolbar;
