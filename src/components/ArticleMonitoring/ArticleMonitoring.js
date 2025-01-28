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
      redirect("/auth/signin");
    },
  });

  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!session) return;

      try {
        const response = await fetch("/api/articles", {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  const handleDeleteArticle = async (articleId) => {
    try {
      // Optimistically update UI
      setArticles((currentArticles) =>
        currentArticles.filter((article) => article.id !== articleId)
      );

      const response = await fetch(`/api/articles?id=${articleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Failed to delete article. Status: ${response.status}`,
          errorText
        );

        // Fetch updated articles
        const fetchResponse = await fetch("/api/articles");
        const currentArticles = await fetchResponse.json();
        setArticles(currentArticles);

        throw new Error(`Failed to delete article: ${errorText}`);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleUpdateArticle = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/articles", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingArticle.id,
          ...editingArticle,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Full error response:", errorText);
        throw new Error(`Failed to update article. Status: ${response.status}`);
      }

      const updatedArticle = await response.json();

      setArticles(
        articles.map((article) =>
          article.id === updatedArticle.id ? updatedArticle : article
        )
      );

      setEditingArticle(null);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };
  const handleAddArticle = async (newArticle) => {
    // Log the starting point and input data
    console.log("Starting handleAddArticle with data:", newArticle);

    try {
      // Log the request we're about to make
      console.log("Making POST request to /api/articles");

      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken || ""}`,
        },
        body: JSON.stringify(newArticle),
      });

      // Log the initial response
      console.log("Received response:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries([...response.headers]),
      });

      if (!response.ok) {
        // Try to read the response body
        const errorText = await response.text();
        console.log("Error response body:", errorText);

        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage =
            errorData.message || errorData.error || "Unknown server error";
        } catch {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }

        throw new Error(errorMessage);
      }

      console.log("Response was OK, parsing JSON");
      const addedArticle = await response.json();
      console.log("Successfully parsed response:", addedArticle);

      setArticles((prevArticles) => [addedArticle, ...prevArticles]);
      setIsAddModalOpen(false);
    } catch (error) {
      // Detailed error logging
      const errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        type: error instanceof TypeError ? "Network error" : "General error",
        status: error.status,
      };

      console.error("Detailed error information:", errorDetails);
      console.error("Error occurred in handleAddArticle:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[98%] mx-auto pt-[6rem]">
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
                    {/* Sanitize and render HTML content */}
                    <div
                      className="mt-2"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          article.content.length > 50
                            ? `${article.content.slice(0, 50)}...`
                            : article.content,
                          {
                            ALLOWED_TAGS: [
                              "p",
                              "h1",
                              "h2",
                              "h3",
                              "h4",
                              "h5",
                              "h6",
                              "br",
                              "strong",
                              "em",
                              "u",
                              "a",
                              "img",
                              "iframe",
                              "ul",
                              "ol",
                              "li",
                            ],
                            ALLOWED_ATTR: [
                              "src",
                              "href",
                              "width",
                              "height",
                              "frameborder",
                              "allowfullscreen",
                              "target",
                            ],
                          }
                        ),
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
            <form
              onSubmit={(e) => handleUpdateArticle(e, editingArticle.id)}
              className="space-y-4"
            >
              <input
                type="text"
                value={editingArticle.title}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    title: e.target.value,
                  })
                }
                placeholder="Article Title"
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                value={editingArticle.content}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    content: e.target.value,
                  })
                }
                placeholder="Article Content (HTML allowed)"
                className="w-full p-2 border rounded h-[30vh]"
                required
              />
              <input
                type="text"
                value={editingArticle.author}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    author: e.target.value,
                  })
                }
                placeholder="Author Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="url"
                value={editingArticle.imageUrl || ""}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    imageUrl: e.target.value,
                  })
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
