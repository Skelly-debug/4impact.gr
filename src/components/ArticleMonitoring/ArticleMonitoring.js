"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Trash2, Edit, Plus, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import DOMPurify from "dompurify";
import AdminForm from "../AdminForm/AdminForm";

// --- Utility Functions ---
const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('el-GR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// --- Custom Hook for Logic ---
const useArticles = (session) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const showFeedback = useCallback((message, type = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 5000);
  }, []);

  const fetchArticles = useCallback(async () => {
    if (!session) return;
    try {
      const response = await fetch("/api/articles");
      if (!response.ok) throw new Error("Failed to fetch articles");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error(error);
      showFeedback("Error loading articles", "error");
    } finally {
      setIsLoading(false);
    }
  }, [session, showFeedback]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const addArticle = async (newData) => {
    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add article");
      
      setArticles((prev) => [data, ...prev]);
      showFeedback("Article added successfully!", "success");
      return true; // Success signal
    } catch (error) {
      showFeedback(error.message, "error");
      return false;
    }
  };

  const updateArticle = async (id, updatedData) => {
    try {
      const response = await fetch("/api/articles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedData, id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update article");

      setArticles((prev) => prev.map((art) => (art.id === data.id ? data : art)));
      showFeedback("Article updated successfully!", "success");
      return true;
    } catch (error) {
      showFeedback(error.message, "error");
      return false;
    }
  };

  const deleteArticle = async (articleId) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const response = await fetch(`/api/articles?id=${articleId}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete");

      setArticles((prev) => prev.filter((a) => a.id !== articleId));
      showFeedback("Article deleted successfully!", "success");
    } catch (error) {
      showFeedback(error.message, "error");
    }
  };

  return { articles, isLoading, feedback, addArticle, updateArticle, deleteArticle };
};

// --- Sub-Components ---

const FeedbackToast = ({ message, type }) => {
  if (!message) return null;
  return (
    <div className={`fixed top-24 right-4 z-50 px-6 py-3 rounded-lg shadow-lg backdrop-blur-md border border-white/20 ${
      type === 'success' 
        ? 'bg-green-500/90 text-white' 
        : 'bg-red-500/90 text-white'
    }`}>
      {message}
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-h-[90vh] w-full max-w-4xl overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1 hover:bg-gray-100/50 rounded-full transition"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
        {children}
      </div>
    </div>
  );
};

const ArticleItem = ({ article, onEdit, onDelete }) => (
  // GLASS EFFECT: Inner Cards (semi-transparent white)
  <div className="border border-white/40 rounded-xl p-4 hover:shadow-lg transition bg-white/70 backdrop-blur-sm">
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1 flex items-start gap-4">
        {article.thumbnail && (
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-24 h-24 object-cover rounded-lg shadow-sm"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg truncate text-gray-900">{article.title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            By {article.author} • {formatDate(article.publishedDate)}
          </p>
          
          {article.previewText && (
            <p className="text-sm text-gray-700 mb-2 italic line-clamp-1">
              "{article.previewText}"
            </p>
          )}
          
          <div
            className="text-sm text-gray-600 line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.content),
            }}
          />
        </div>
      </div>
      
      <div className="flex space-x-2 shrink-0">
        <button
          onClick={() => onEdit(article)}
          className="p-2 border border-blue-200/50 rounded-lg bg-blue-50/50 hover:bg-blue-100 text-blue-600 transition backdrop-blur-sm"
          title="Edit"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(article.id)}
          className="p-2 border border-red-200/50 rounded-lg bg-red-50/50 hover:bg-red-100 text-red-600 transition backdrop-blur-sm"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

// --- Main Component ---
const ArticleMonitoring = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() { redirect("/auth"); },
  });

  const { 
    articles, 
    isLoading, 
    feedback, 
    addArticle, 
    updateArticle, 
    deleteArticle 
  } = useArticles(session);

  const [modalState, setModalState] = useState({ type: null, article: null });

  const closeModal = () => setModalState({ type: null, article: null });
  const openAddModal = () => setModalState({ type: 'add', article: null });
  const openEditModal = (article) => setModalState({ type: 'edit', article });

  const handleFormSubmit = async (formData) => {
    let success = false;
    if (modalState.type === 'add') {
      success = await addArticle(formData);
    } else if (modalState.type === 'edit') {
      success = await updateArticle(modalState.article.id, formData);
    }
    
    if (success) closeModal();
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen text-xl text-white">Loading...</div>;
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="max-w-[98%] mx-auto mt-8 pt-[6rem]">
      <FeedbackToast message={feedback.message} type={feedback.type} />

      {/* GLASS EFFECT: Main Container */}
      <div className="w-full bg-white/40 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5">
        
        {/* Header - Semi transparent */}
        <div className="p-5 border-b border-white/20 flex justify-between items-center bg-white/20">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Article Management</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/90 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 backdrop-blur-sm"
            >
              <Plus className="h-4 w-4" /> Add Article
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/auth" })}
              className="px-4 py-2 bg-white/50 text-red-600 border border-red-200/50 rounded-lg hover:bg-red-50 transition backdrop-blur-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content List - Transparent background to show blur */}
        <div className="p-5 min-h-[500px]">
          {isLoading ? (
            <p className="text-center text-gray-600 py-12 font-medium">Loading articles...</p>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg font-medium">No articles found</p>
              <button onClick={openAddModal} className="mt-2 text-blue-700 font-semibold hover:underline">
                Create your first article
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <ArticleItem
                  key={article.id}
                  article={article}
                  onEdit={openEditModal}
                  onDelete={deleteArticle}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Unified Modal */}
      <Modal isOpen={!!modalState.type} onClose={closeModal}>
        <AdminForm
          initialArticle={modalState.article}
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default ArticleMonitoring;