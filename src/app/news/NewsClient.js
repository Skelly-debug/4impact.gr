"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavBar/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { ChevronRight } from "lucide-react";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";

function NewsClient() {
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

  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden">
      <Navbar />
      <div className="relative h-screen">
        <img
          className="absolute w-full h-full object-cover"
          src="images/NEWS.jpg"
          alt="Background Image"
        />
        {/* Overlay with gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-black/50 z-1"></div> 
          {/* Hero Title */}
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

      {/* Article Creation Form */}
      <div className="container mx-auto px-4 py-10 text-black">
        {/* Existing Articles Display */}
        {isLoading ? (
          <div className="text-center text-xl">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-xl py-[20rem]">
            No articles found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 ease-in-out duration-300"
              >
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-[30rem] object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>By {article.author}</span>
                    <span>
                      {new Date(article.publishedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 line-clamp-3">
                    {article.content.length > 50
                      ? article.content.substring(0, 30) + "..."
                      : article.content}
                  </p>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    <Link href={`/articles/${article.id}`}>Read More</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default NewsClient;
