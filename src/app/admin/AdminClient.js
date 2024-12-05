"use client";

import React from "react";
import Navbar from "@/components/NavBar/Navbar";
import { useState } from "react";

function AdminClient() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      });

      if (!response.ok) {
        throw new Error("Failed to add article");
      }

      const addedArticle = await response.json();

      setArticles((prev) => [addedArticle, ...prev]);

      setNewArticle({
        title: "",
        content: "",
        author: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add article");
    }
  };
  return (
    <div className="font-playfair-display bg-gray-300 min-h-screen text-gray-800">
      <Navbar />
      <div className="h-60 flex items-center justify-center"></div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mb-8"
      >
        {/* Form remains the same as before */}
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Article
        </button>
      </form>
    </div>
  );
}

export default AdminClient;
