"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavBar/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";

function BlogClient() {
  const [showTitle, setShowTitle] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 100);

    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
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

    return () => clearTimeout(timer);
  }, []);

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

  // Helper function to strip HTML tags and get plain text
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden">
      <Navbar />
      <div className="relative h-screen">
        <img
          className="absolute w-full h-full object-cover"
          src="images/NEWS.jpg"
          alt="Background Image"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-black/50 z-1"></div>
        <div className="flex justify-center items-center h-full px-4">
          <div className="text-center max-w-4xl">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white text-center relative z-10 transition-all duration-1000 ease-out ${
                showTitle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Blog
            </h1>
          </div>
        </div>
      </div>
      <ScrollIndicator />

      <div className="container mx-auto px-4 py-10 text-black">
        {isLoading ? (
          <div className="text-center text-xl py-20">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-xl py-20">No articles found</div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Thumbnail */}
                  {article.thumbnail && (
                    <div className="md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h2>
                      
                      {/* Preview text */}
                      {article.previewText && (
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {article.previewText}
                        </p>
                      )}
                      
                      {/* If no preview text, show content preview */}
                      {!article.previewText && (
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {stripHtml(article.content).substring(0, 150)}...
                        </p>
                      )}
                    </div>

                    {/* Footer with author and date */}
                    <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                      <span className="font-medium">By {article.author}</span>
                      <span>{formatDate(article.publishedDate)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default BlogClient;