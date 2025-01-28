import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { publishUpdate } from "@/lib/db";

export async function GET() {
  try {
    const { rows } =
      await sql`SELECT * FROM articles ORDER BY published_date DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    const newArticle = await request.json();

    if (!newArticle.title || !newArticle.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const articleToAdd = {
      ...newArticle,
      id: Date.now().toString(),
      published_date: new Date().toISOString(),
    };

    const { rows } = await sql`
      INSERT INTO articles (id, title, content, author, image_url, published_date)
      VALUES (
        ${articleToAdd.id},
        ${articleToAdd.title},
        ${articleToAdd.content},
        ${articleToAdd.author},
        ${articleToAdd.imageUrl},
        ${articleToAdd.published_date}
      )
      RETURNING *
    `;

    // Publish real-time update
    await publishUpdate("create", rows[0]);

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add article" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const updatedArticle = await request.json();

    if (
      !updatedArticle.id ||
      !updatedArticle.title ||
      !updatedArticle.content
    ) {
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
        author = ${updatedArticle.author},
        image_url = ${updatedArticle.imageUrl}
      WHERE id = ${updatedArticle.id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Publish real-time update
    await publishUpdate("update", rows[0]);

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update article" },
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
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Publish real-time update
    await publishUpdate("delete", rows[0]);

    return NextResponse.json(
      { message: "Article deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
