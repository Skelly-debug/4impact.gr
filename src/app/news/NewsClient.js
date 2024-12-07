"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";

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
    <div className="font-playfair-display bg-gray-100 min-h-screen overflow-hidden">
      <Navbar />
      <div className="relative h-screen">
        <img
          className="absolute w-full h-full object-cover"
          src="https://placehold.co/1920x1080"
          alt="Background Image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 z-1"></div>
        <div className="flex justify-center items-center h-full">
          <h1
            className={`text-5xl font-bold text-neutral-800 text-center relative text-shadow shadow-black z-10 transition-all duration-1000 ease-out ${
              showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Νέα
          </h1>
        </div>
      </div>

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
                    {article.content}
                  </p>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Read More
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
