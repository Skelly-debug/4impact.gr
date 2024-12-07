import React, { useState } from "react";

function AdminForm({ onSubmit, onCancel }) {
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newArticle);
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
        <div className="mb-4">
          <textarea
            name="content"
            value={newArticle.content}
            onChange={handleInputChange}
            placeholder="Article Content"
            required
            className="w-full px-3 py-2 border rounded-md h-32"
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
            placeholder="Image URL (optional)"
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
