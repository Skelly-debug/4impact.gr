import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { publishUpdate } from "@/lib/db";

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT 
        id, 
        title, 
        content, 
        preview_text,
        author, 
        image_url as "imageUrl",
        hero_image as "heroImage",
        thumbnail,
        published_date as "publishedDate"
      FROM articles 
      ORDER BY published_date DESC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    const newArticle = await request.json();

    // Validate required fields
    if (!newArticle.title || !newArticle.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const articleToAdd = {
      id: Date.now().toString(),
      publishedDate: new Date().toISOString(),
      title: newArticle.title,
      content: newArticle.content,
      previewText: newArticle.previewText || "",
      author: newArticle.author || "Admin",
      imageUrl: newArticle.imageUrl || null,
      heroImage: newArticle.heroImage || null,
      thumbnail: newArticle.thumbnail || null,
    };

    const { rows } = await sql`
      INSERT INTO articles (
        id, 
        title, 
        content, 
        preview_text,
        author, 
        image_url,
        hero_image,
        thumbnail,
        published_date
      )
      VALUES (
        ${articleToAdd.id},
        ${articleToAdd.title},
        ${articleToAdd.content},
        ${articleToAdd.previewText},
        ${articleToAdd.author},
        ${articleToAdd.imageUrl},
        ${articleToAdd.heroImage},
        ${articleToAdd.thumbnail},
        ${articleToAdd.publishedDate}
      )
      RETURNING 
        id,
        title,
        content,
        preview_text as "previewText",
        author,
        image_url as "imageUrl",
        hero_image as "heroImage",
        thumbnail,
        published_date as "publishedDate"
    `;

    // Publish real-time update
    await publishUpdate("create", rows[0]);

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("Error adding article:", error);
    return NextResponse.json(
      { error: "Failed to add article: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const updatedArticle = await request.json();

    if (!updatedArticle.id || !updatedArticle.title || !updatedArticle.content) {
      return NextResponse.json(
        { error: "ID, title, and content are required" },
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE articles 
      SET 
        title = ${updatedArticle.title},
        content = ${updatedArticle.content},
        preview_text = ${updatedArticle.previewText || ""},
        author = ${updatedArticle.author || "Admin"},
        image_url = ${updatedArticle.imageUrl || null},
        hero_image = ${updatedArticle.heroImage || null},
        thumbnail = ${updatedArticle.thumbnail || null}
      WHERE id = ${updatedArticle.id}
      RETURNING 
        id,
        title,
        content,
        preview_text as "previewText",
        author,
        image_url as "imageUrl",
        hero_image as "heroImage",
        thumbnail,
        published_date as "publishedDate"
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Publish real-time update
    await publishUpdate("update", rows[0]);

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Failed to update article: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get("id");

    if (!articleId) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    const { rows } = await sql`
      DELETE FROM articles 
      WHERE id = ${articleId}
      RETURNING 
        id,
        title,
        content,
        preview_text as "previewText",
        author,
        image_url as "imageUrl",
        hero_image as "heroImage",
        thumbnail,
        published_date as "publishedDate"
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Publish real-time update
    await publishUpdate("delete", rows[0]);

    return NextResponse.json(
      { message: "Article deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Failed to delete article: " + error.message },
      { status: 500 }
    );
  }
}