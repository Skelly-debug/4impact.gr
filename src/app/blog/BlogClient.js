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
    <div className="bg-paper text-ink min-h-screen overflow-hidden">
      <Navbar />
      <div className="hero">
        <img
          className="hero-media"
          src="images/NEWS.jpg"
          alt="Background Image"
        />
        <div className="hero-shade"></div>
        <div className="hero-inner">
          <div className="hero-copy">
            <h1
              className={`hero-title transition-all duration-1000 ease-out ${
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

      <div className="wrap py-20 md:py-28 text-ink">
        {isLoading ? (
          <div className="text-center text-xl py-20">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-xl py-20">No articles found</div>
        ) : (
          <div className="max-w-6xl space-y-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="block bg-white rounded-none border border-ink/10 border-l-8 border-l-ink hover:border-l-brand transition-all duration-300 overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Thumbnail */}
                  {article.thumbnail && (
                    <div className="md:w-80 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3 text-ink group-hover:text-brand-deep transition-colors">
                        {article.title}
                      </h2>
                      
                      {/* Preview text */}
                      {article.previewText && (
                        <p className="text-ink/70 text-lg mb-3 line-clamp-2">
                          {article.previewText}
                        </p>
                      )}
                      
                      {/* If no preview text, show content preview */}
                      {!article.previewText && (
                        <p className="text-ink/70 text-lg mb-3 line-clamp-2">
                          {stripHtml(article.content).substring(0, 150)}...
                        </p>
                      )}
                    </div>

                    {/* Footer with author and date */}
                    <div className="flex justify-between items-center text-sm text-ink/55 mt-6 pt-4 border-t border-ink/10">
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