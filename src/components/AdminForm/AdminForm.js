import React, { useState, useRef, useEffect } from "react";
import Toolbar from "../Toolbar/toolbar";

function AdminForm({ onSubmit, onCancel, initialArticle = null }) {
  const [newArticle, setNewArticle] = useState({
    id: initialArticle?.id || null, // Preserve the ID
    title: initialArticle?.title || "",
    content: initialArticle?.content || "",
    previewText: initialArticle?.previewText || "",
    author: initialArticle?.author || "",
    heroImage: initialArticle?.heroImage || "",
    thumbnail: initialArticle?.thumbnail || "",
    imageUrl: initialArticle?.imageUrl || "", // Keep for backward compatibility
  });

  const [errors, setErrors] = useState({});
  const editorRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleEditorInput = () => {
    setNewArticle((prev) => ({
      ...prev,
      content: editorRef.current?.innerHTML || "",
    }));
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: null }));
    }
  };

  const handleAddImage = () => {
    const imageUrl = prompt("Enter image URL:");
    if (imageUrl && editorRef.current) {
      editorRef.current.focus();
      document.execCommand("insertImage", false, imageUrl);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!newArticle.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!newArticle.content.trim() || newArticle.content === '<br>') {
      newErrors.content = "Content is required";
    }
    
    if (!newArticle.previewText.trim()) {
      newErrors.previewText = "Preview text is required";
    }
    
    if (!newArticle.author.trim()) {
      newErrors.author = "Author name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit(newArticle);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = newArticle.content;
      editorRef.current.focus();
      placeCaretAtEnd(editorRef.current);
    }
  }, []);

  const placeCaretAtEnd = (element) => {
    if (element) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-full mx-auto bg-white p-5 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {initialArticle ? 'Edit Article' : 'Add New Article'}
        </h2>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Article Title *
          </label>
          <input
            type="text"
            name="title"
            value={newArticle.title}
            onChange={handleInputChange}
            placeholder="Enter article title"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Preview Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview Text * (shown on blog listing page)
          </label>
          <textarea
            name="previewText"
            value={newArticle.previewText}
            onChange={handleInputChange}
            placeholder="Write a short preview (1-2 sentences)"
            rows="3"
            maxLength="200"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.previewText ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <p className="text-xs text-gray-500 mt-1">
            {newArticle.previewText.length}/200 characters
          </p>
          {errors.previewText && (
            <p className="text-red-500 text-sm mt-1">{errors.previewText}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author Name *
          </label>
          <input
            type="text"
            name="author"
            value={newArticle.author}
            onChange={handleInputChange}
            placeholder="Author name"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.author ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
          )}
        </div>

        {/* Hero Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Image URL (displayed at top of article)
          </label>
          <input
            type="url"
            name="heroImage"
            value={newArticle.heroImage}
            onChange={handleInputChange}
            placeholder="https://example.com/hero-image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {newArticle.heroImage && (
            <div className="mt-2">
              <img 
                src={newArticle.heroImage} 
                alt="Hero preview" 
                className="max-h-32 rounded border"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail URL (displayed on blog listing page)
          </label>
          <input
            type="url"
            name="thumbnail"
            value={newArticle.thumbnail}
            onChange={handleInputChange}
            placeholder="https://example.com/thumbnail.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {newArticle.thumbnail && (
            <div className="mt-2">
              <img 
                src={newArticle.thumbnail} 
                alt="Thumbnail preview" 
                className="max-h-32 rounded border"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Article Content *
          </label>
          <Toolbar editorRef={editorRef} onAddImage={handleAddImage} />
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            className={`w-full px-3 py-2 border rounded-md min-h-[300px] overflow-y-auto text-left ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            }`}
            style={{ 
              textAlign: "left", 
              direction: "ltr", 
              outline: "none",
              lineHeight: "1.6"
            }}
            dangerouslySetInnerHTML={{ __html: newArticle.content }}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            {initialArticle ? 'Update Article' : 'Add Article'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminForm;