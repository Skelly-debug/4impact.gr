import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const articlesFilePath = path.join(process.cwd(), "data/articles.json");

// Ensure data directory and file exist
function ensureDataFile() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  if (!fs.existsSync(articlesFilePath)) {
    fs.writeFileSync(articlesFilePath, JSON.stringify([], null, 2));
  }
}

export async function GET() {
  try {
    ensureDataFile();
    const articles = JSON.parse(fs.readFileSync(articlesFilePath, "utf8"));
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    ensureDataFile();
    const newArticle = await request.json();

    // Validate article
    if (!newArticle.title || !newArticle.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Read existing articles
    const articles = JSON.parse(fs.readFileSync(articlesFilePath, "utf8"));

    // Create new article with additional metadata
    const articleToAdd = {
      ...newArticle,
      id: Date.now().toString(),
      publishedDate: new Date().toISOString(),
    };

    // Add new article
    articles.unshift(articleToAdd);

    // Write back to file
    fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));

    return NextResponse.json(articleToAdd, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add article" },
      { status: 500 }
    );
  }
}
