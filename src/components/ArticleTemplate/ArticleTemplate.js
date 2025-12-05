"use client";

import { useEffect, useState } from "react";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

export default function ArticleTemplate({
  id,
  title,
  content,
  publishedDate,
  heroImage,
  author,
}) {
  const [articleData, setArticleData] = useState({
    title,
    content,
    publishedDate,
    heroImage,
    author,
  });

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? "Unknown Date"
      : parsedDate.toLocaleDateString('el-GR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
  };

  useEffect(() => {
    // Poll for updates every 5 seconds (optional)
    // Remove this if you don't need real-time updates
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/articles');
        const articles = await response.json();
        const updatedArticle = articles.find(a => a.id === id);
        
        if (updatedArticle) {
          setArticleData({
            title: updatedArticle.title,
            content: updatedArticle.content,
            publishedDate: updatedArticle.publishedDate,
            heroImage: updatedArticle.heroImage,
            author: updatedArticle.author,
          });
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="font-sans bg-gray-50 min-h-screen overflow-hidden">
      <Navbar />
      
      {/* Hero Image Section - Only if heroImage exists */}
      {articleData.heroImage && (
        <div className="w-full h-[60vh] relative mt-[4.5rem]">
          <img
            src={articleData.heroImage}
            alt={articleData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      )}

      {/* Article Content */}
      <article className={`max-w-4xl mx-auto px-6 ${articleData.heroImage ? '-mt-32' : 'mt-24'} mb-16 relative z-10`}>
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            {articleData.title}
          </h1>

          {/* Author and Date */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
            <span className="text-gray-600 font-medium">{articleData.author}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{formatDate(articleData.publishedDate)}</span>
          </div>

          {/* Article Content - Strip out any images that might be in the content */}
          <div
            className="prose prose-lg max-w-none text-gray-800 
                       prose-headings:text-gray-900 
                       prose-a:text-blue-600 hover:prose-a:text-blue-800
                       prose-strong:text-gray-900
                       prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ 
              __html: articleData.content 
            }}
          />
        </div>

        {/* Back to Blog Button */}
        <div className="mt-8 text-center">
          <a
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            ← Πίσω στο Blog
          </a>
        </div>
      </article>

      <Footer />
    </div>
  );
}