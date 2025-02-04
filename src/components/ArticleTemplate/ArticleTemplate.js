"use client";

import { useEffect, useState } from "react";
import Navbar from "../NavBar/Navbar";

export default function ArticleTemplate({
  id,
  title,
  content,
  publishedDate,
  imageUrl,
  author,
}) {
  const [articleData, setArticleData] = useState({
    title,
    content,
    publishedDate,
    imageUrl,
    author,
  });

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? "Unknown Date"
      : parsedDate.toLocaleString();
  };

  useEffect(() => {
    const eventSource = new EventSource("/api/articles/stream");

    eventSource.onmessage = (event) => {
      const update = JSON.parse(event.data);

      if (update.article.id === id) {
        const normalizedArticle = {
          ...update.article,
          publishedDate: update.article.publishedDate
            ? new Date(update.article.publishedDate).toLocaleString()
            : null,
        };

        switch (update.type) {
          case "update":
            setArticleData(normalizedArticle);
            break;
          case "delete":
            window.location.href = "/articles";
            break;
        }
      }
    };

    return () => eventSource.close();
  }, [id]);

  return (
    <div className="font-playfair-display bg-gray-100 min-h-screen overflow-hidden">
      <Navbar />
      <div className="pt-[4.5rem]">
        {articleData.imageUrl ? (
          <div className="w-full">
            <img
              src={articleData.imageUrl}
              alt={articleData.title}
              className="w-full max-h-[70vh] object-cover"
            />
          </div>
        ) : null}
        <article className="max-w-[95%] mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {articleData.title}
          </h1>
          <p className="text-gray-400 mb-8 font-semibold italic">
            {articleData.author} {formatDate(articleData.publishedDate)}
          </p>
          <div
            className="prose text-gray-800 break-words"
            dangerouslySetInnerHTML={{ __html: articleData.content }}
          />
        </article>
      </div>
    </div>
  );
}


