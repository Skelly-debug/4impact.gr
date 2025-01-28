import { sql } from "@vercel/postgres";
import ArticleTemplate from "@/app/components/ArticleTemplate";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }) {
  // Fetch article from database
  const { rows } = await sql`
    SELECT * FROM articles WHERE id = ${params.id}
  `;

  if (rows.length === 0) {
    notFound();
  }

  return <ArticleTemplate {...rows[0]} />;
}
