import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Simple password protection - change this to something secure
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password');
  
  if (password !== 'migrate123') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    console.log("Starting migration...");

    // Check current table structure
    const { rows: existingColumns } = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'articles'
      ORDER BY ordinal_position
    `;

    console.log("Existing columns:", existingColumns);

    // Add preview_text column
    await sql`
      ALTER TABLE articles 
      ADD COLUMN IF NOT EXISTS preview_text TEXT DEFAULT ''
    `;
    console.log("Added preview_text column");

    // Add hero_image column
    await sql`
      ALTER TABLE articles 
      ADD COLUMN IF NOT EXISTS hero_image TEXT
    `;
    console.log("Added hero_image column");

    // Add thumbnail column
    await sql`
      ALTER TABLE articles 
      ADD COLUMN IF NOT EXISTS thumbnail TEXT
    `;
    console.log("Added thumbnail column");

    // Get updated table structure
    const { rows: newColumns } = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'articles'
      ORDER BY ordinal_position
    `;

    // Optional: Auto-generate preview text for existing articles
    const { rows: articles } = await sql`
      SELECT id, content 
      FROM articles 
      WHERE preview_text = '' OR preview_text IS NULL
    `;

    if (articles.length > 0) {
      console.log(`Updating ${articles.length} articles with auto-generated preview text...`);
      
      for (const article of articles) {
        // Strip HTML and get first 200 characters
        const plainText = article.content.replace(/<[^>]*>/g, ' ').trim();
        const preview = plainText.substring(0, 200);
        
        await sql`
          UPDATE articles 
          SET preview_text = ${preview}
          WHERE id = ${article.id}
        `;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Migration completed successfully! ✅",
      details: {
        columnsAdded: ["preview_text", "hero_image", "thumbnail"],
        articlesUpdated: articles.length,
        currentColumns: newColumns,
      },
    });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}