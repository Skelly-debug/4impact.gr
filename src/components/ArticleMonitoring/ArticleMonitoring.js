"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import DOMPurify from "dompurify";
import AdminForm from "../AdminForm/AdminForm";

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
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchArticles = async () => {
      if (!session) return;

      try {
        const response = await fetch("/api/articles");

        if (!response.ok) throw new Error("Failed to fetch articles");

        const data = await response.json();
        setArticles(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        showFeedback("Error loading articles", "error");
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [session]);

  const showFeedback = (message, type = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => {
      setFeedback({ message: '', type: '' });
    }, 5000);
  };

  const handleDeleteArticle = async (articleId) => {
    if (!confirm("Are you sure you want to delete this article?")) {
      return;
    }

    try {
      const response = await fetch(`/api/articles?id=${articleId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete article");
      }

      setArticles((current) =>
        current.filter((article) => article.id !== articleId)
      );
      
      showFeedback("Article deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting article:", error);
      showFeedback(error.message || "Error deleting article", "error");
    }
  };

  const handleUpdateArticle = async (updatedData) => {
    try {
      // Make sure we include the ID from the editing article
      const articleToUpdate = {
        ...updatedData,
        id: editingArticle.id, // Explicitly pass the ID
      };

      const response = await fetch("/api/articles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleToUpdate),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update article");
      }

      setArticles(
        articles.map((article) =>
          article.id === data.id ? data : article
        )
      );

      setEditingArticle(null);
      showFeedback("Article updated successfully!", "success");
    } catch (error) {
      console.error("Error updating article:", error);
      showFeedback(error.message || "Error updating article", "error");
    }
  };

  const handleAddArticle = async (newArticleData) => {
    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticleData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add article");
      }

      setArticles((prev) => [data, ...prev]);
      setIsAddModalOpen(false);
      showFeedback("Article added successfully!", "success");
    } catch (error) {
      console.error("Error adding article:", error);
      showFeedback(error.message || "Error adding article", "error");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  if (status === "unauthenticated") return null;

  return (
    <div className="max-w-[98%] mx-auto mt-8 pt-[6rem]">
      {/* Feedback Message */}
      {feedback.message && (
        <div
          className={`fixed top-24 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
            feedback.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="w-full bg-white shadow-md rounded-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Article Management</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              <Plus className="h-4 w-4" />
              Add Article
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/auth" })}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="p-4">
          {isLoading ? (
            <p className="text-center text-gray-500 py-8">Loading articles...</p>
          ) : articles.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No articles found</p>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        {/* Thumbnail */}
                        {article.thumbnail && (
                          <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-24 h-24 object-cover rounded"
                          />
                        )}
                        
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{article.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            By {article.author} • {formatDate(article.publishedDate)}
                          </p>
                          
                          {/* Preview Text */}
                          {article.previewText && (
                            <p className="text-sm text-gray-700 mb-2 italic">
                              "{article.previewText}"
                            </p>
                          )}
                          
                          {/* Content Preview */}
                          <div
                            className="text-sm text-gray-600 line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(article.content),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingArticle(article)}
                        className="p-2 border rounded hover:bg-blue-50 transition"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="p-2 border rounded hover:bg-red-50 transition"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-h-[90vh] w-full max-w-4xl overflow-y-auto">
            <AdminForm
              initialArticle={editingArticle}
              onSubmit={handleUpdateArticle}
              onCancel={() => setEditingArticle(null)}
            />
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-h-[90vh] w-full max-w-4xl overflow-y-auto">
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