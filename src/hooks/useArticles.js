"use client";
import { useState, useEffect } from "react";

export function useArticles(initialArticles) {
  const [articles, setArticles] = useState(initialArticles);

  useEffect(() => {
    const eventSource = new EventSource("/api/articles/stream");

    eventSource.onmessage = (event) => {
      const update = JSON.parse(event.data);

      setArticles((currentArticles) => {
        switch (update.type) {
          case "create":
            return [update.article, ...currentArticles];
          case "update":
            return currentArticles.map((article) =>
              article.id === update.article.id ? update.article : article
            );
          case "delete":
            return currentArticles.filter(
              (article) => article.id !== update.article.id
            );
          default:
            return currentArticles;
        }
      });
    };

    return () => eventSource.close();
  }, []);

  return articles;
}
