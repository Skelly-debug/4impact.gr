import { sql } from "@vercel/postgres";
import ArticleTemplate from "@/components/ArticleTemplate/ArticleTemplate";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }) {
  // Fetch article from database and alias snake_case columns to camelCase
  const { rows } = await sql`
    SELECT 
      id,
      title,
      content,
      preview_text as "previewText",
      author,
      image_url as "imageUrl",
      hero_image as "heroImage",
      thumbnail,
      published_date as "publishedDate"
    FROM articles
    WHERE id = ${params.id}
  `;

  if (rows.length === 0) {
    notFound();
  }

  return <ArticleTemplate {...rows[0]} />;
}
