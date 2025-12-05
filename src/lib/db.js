import { sql } from "@vercel/postgres";
import { kv } from "@vercel/kv";

const ARTICLE_UPDATES = "article-updates";

export async function getAllArticles() {
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
    ORDER BY published_date DESC
  `;
  return rows;
}

export async function publishUpdate(type, article) {
  await kv.publish(ARTICLE_UPDATES, JSON.stringify({ type, article }));
}
