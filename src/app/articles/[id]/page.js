import fs from "fs";
import path from "path";
import ArticleTemplate from "@/components/ArticleTemplate/ArticleTemplate";

export async function generateStaticParams() {
  const articlesFilePath = path.join(process.cwd(), "data/articles.json");
  const articles = JSON.parse(fs.readFileSync(articlesFilePath, "utf8"));
  return articles.map((article) => ({
    id: article.id,
  }));
}

export default function Article({ params }) {
  const articlesFilePath = path.join(process.cwd(), "data/articles.json");
  const articles = JSON.parse(fs.readFileSync(articlesFilePath, "utf8"));
  const article = articles.find((a) => a.id === params.id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return <ArticleTemplate {...article} />;
}
