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
    <div className="font-sans bg-paper text-ink min-h-screen overflow-hidden">
      <Navbar />
      
      {/* Hero Image Section - Only if heroImage exists */}
      {articleData.heroImage && (
        <div className="w-full h-[60vh] relative mt-[4.5rem]">
          <img
            src={articleData.heroImage}
            alt={articleData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"></div>
        </div>
      )}

      {/* Article Content */}
      <article className={`max-w-4xl mx-auto px-6 ${articleData.heroImage ? '-mt-32' : 'mt-24'} mb-16 relative z-10`}>
        <div className="bg-white p-8 md:p-14 border-t-8 border-brand shadow-[0_30px_60px_-30px_rgba(10,17,20,0.35)]">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-ink leading-[1.05]">
            {articleData.title}
          </h1>

          {/* Author and Date */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-ink/15">
            <span className="text-ink/70 font-bold">{articleData.author}</span>
            <span className="text-brand">•</span>
            <span className="text-ink/55">{formatDate(articleData.publishedDate)}</span>
          </div>

          {/* Article Content - Strip out any images that might be in the content */}
          <div
            className="prose prose-lg max-w-none text-ink/85 prose-headings:text-ink prose-headings:font-black prose-headings:tracking-tight prose-a:text-brand-deep hover:prose-a:text-brand-dark prose-strong:text-ink prose-img:rounded-none prose-img:shadow-md"
            dangerouslySetInnerHTML={{ 
              __html: articleData.content 
            }}
          />
        </div>

        {/* Back to Blog Button */}
        <div className="mt-8 text-center">
          <a
            href="/blog"
            className="btn btn-ink"
          >
            ← Πίσω στο Blog
          </a>
        </div>
      </article>

      <Footer />
    </div>
  );
}