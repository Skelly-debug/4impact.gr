"use client";

import React, { useState, useEffect, useRef } from "react";
import { Trash2, Edit, Plus } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import DOMPurify from "dompurify";
import AdminForm from "../AdminForm/AdminForm";
import Toolbar from "../Toolbar/toolbar";

const ArticleMonitoring = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const editorRef = useRef(null);

  // Helper function to place cursor at end of content
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

  useEffect(() => {
    const fetchArticles = async () => {
      if (!session) return;

      try {
        const response = await fetch("/api/articles", {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch articles");

        const data = await response.json();
        setArticles(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [session]);

  // Initialize editor content when editing
  useEffect(() => {
    if (editingArticle && editorRef.current) {
      editorRef.current.innerHTML = editingArticle.content;
      placeCaretAtEnd(editorRef.current);
    }
  }, [editingArticle]);

  const handleDeleteArticle = async (articleId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const response = await fetch(`/api/articles?id=${articleId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Delete failed: ${errorText}`);
      }
  
      // Remove article from the state after successful deletion
      setArticles((current) => current.filter((article) => article.id !== articleId));
  
      // Show success message
      alert("Article deleted successfully!");
  
    } catch (error) {
      console.error("Error deleting article:", error);
  
      // Show error message
      alert("Error deleting article: " + error.message);
    }
  };
  

  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/articles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingArticle.id,
          ...editingArticle,
          imageUrl: editingArticle.imageUrl || null,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Update failed: ${errorText}`);
      }
  
      const updatedArticle = await response.json();
      setArticles(
        articles.map((article) =>
          article.id === updatedArticle.id ? updatedArticle : article
        )
      );
  
      // Close the modal
      setEditingArticle(null);
  
      // Show success message
      alert("Article updated successfully!");
  
    } catch (error) {
      console.error("Error updating article:", error);
  
      // Show error message
      alert("Error updating article: " + error.message);
    }
  };
  

  const handleAddArticle = async (newArticle) => {
    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken || ""}`,
        },
        body: JSON.stringify(newArticle),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
  
      const addedArticle = await response.json();
      setArticles((prev) => [addedArticle, ...prev]);
  
      // Close the modal
      setIsAddModalOpen(false);
  
      // Show success message
      alert("Article added successfully!");
  
    } catch (error) {
      console.error("Error adding article:", error);
  
      // Show error message
      alert("Error adding article: " + error.message);
    }
  };
  

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return null;

  return (
    <div className="max-w-[98%] mx-auto mt-8 pt-[6rem]">
      <div className="w-full bg-white shadow-md rounded-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Article Management</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-[0.65rem] bg-blue-500 text-white rounded hover:bg-white hover:text-blue-500 border border-blue-500 transition"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="p-[0.4rem] bg-red-500 text-white rounded hover:bg-white hover:text-red-500 border border-red-500 transition ease-in-out duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="p-4">
          {articles.length === 0 ? (
            <p className="text-center text-gray-500">No articles found</p>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">{article.title}</h3>
                    <p className="text-sm text-gray-600">By {article.author}</p>
                    <div
                      className="mt-2"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(article.content),
                      }}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingArticle(article)}
                      className="p-2 border rounded hover:bg-gray-100 transition"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="p-2 border rounded text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {editingArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-h-[80vh] w-[80vw] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Article</h2>
            <form onSubmit={handleUpdateArticle} className="space-y-4">
              <input
                type="text"
                value={editingArticle.title}
                onChange={(e) =>
                  setEditingArticle((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Article Title"
                className="w-full p-2 border rounded"
                required
              />

              <Toolbar editorRef={editorRef} />

              <div
                ref={editorRef}
                contentEditable
                onInput={(e) =>
                  setEditingArticle((prev) => ({
                    ...prev,
                    content: e.target.innerHTML,
                  }))
                }
                className="w-full p-2 border rounded h-[30vh] overflow-y-auto"
                style={{
                  textAlign: "left",
                  direction: "ltr",
                  outline: "none",
                  lineHeight: "1.5",
                  padding: "0.5rem",
                }}
              />

              <input
                type="text"
                value={editingArticle.author}
                onChange={(e) =>
                  setEditingArticle((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
                placeholder="Author Name"
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="url"
                value={editingArticle.imageUrl || ""}
                onChange={(e) =>
                  setEditingArticle((prev) => ({
                    ...prev,
                    imageUrl: e.target.value,
                  }))
                }
                placeholder="Image URL (optional)"
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-h-[80vh] w-[80vw] overflow-y-auto">
            <AdminForm
              onSubmit={handleAddArticle}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleMonitoring;


