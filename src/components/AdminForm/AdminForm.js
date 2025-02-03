import React, { useState, useRef, useEffect } from "react";
import Toolbar from "../Toolbar/toolbar";
function AdminForm({ onSubmit, onCancel }) {
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
  });

  const editorRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorInput = () => {
    setNewArticle((prev) => ({
      ...prev,
      content: editorRef.current?.innerHTML || "",
    }));
  };

  const handleAddImage = () => {
    const imageUrl = prompt("Enter image URL:");
    if (imageUrl && editorRef.current) {
      editorRef.current.focus();
      document.execCommand("insertImage", false, imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newArticle);
  };

  // Initialize editor content and focus
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = newArticle.content;
      editorRef.current.focus(); // Ensure the editor is focused
      placeCaretAtEnd(editorRef.current); // Move the cursor to the end of the content
    }
  }, [newArticle.content]);

  // Helper function to place the cursor at the end of the content
  const placeCaretAtEnd = (element) => {
    if (element) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false); // Collapse the range to the end
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-[100%] mx-auto bg-white p-5"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Article</h2>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={newArticle.title}
            onChange={handleInputChange}
            placeholder="Article Title"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Rich Text Editor Section */}
        <div className="mb-4">
          <Toolbar editorRef={editorRef} onAddImage={handleAddImage} />
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            className="w-full px-3 py-2 border rounded-md min-h-[200px] overflow-y-auto text-left"
            style={{ textAlign: "left", direction: "ltr", outline: "none" }} // Ensure left-to-right typing and remove outline
            dangerouslySetInnerHTML={{ __html: newArticle.content }}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="author"
            value={newArticle.author}
            onChange={handleInputChange}
            placeholder="Author Name"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-6">
          <input
            type="url"
            name="imageUrl"
            value={newArticle.imageUrl}
            onChange={handleInputChange}
            placeholder="Cover Image URL (optional)"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add Article
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminForm;
