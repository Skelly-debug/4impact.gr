import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const articlesFilePath = path.join(process.cwd(), "data/articles.json");
const pagesDirectory = path.join(process.cwd(), "app/articles");

function ensureDataFile() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  if (!fs.existsSync(articlesFilePath)) {
    fs.writeFileSync(articlesFilePath, JSON.stringify([], null, 2));
  }

  if (!fs.existsSync(pagesDirectory)) {
    fs.mkdirSync(pagesDirectory, { recursive: true });
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

    if (!newArticle.title || !newArticle.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const articles = JSON.parse(fs.readFileSync(articlesFilePath, "utf8"));

    const articleToAdd = {
      ...newArticle,
      id: Date.now().toString(),
      publishedDate: new Date().toISOString(),
    };

    articles.unshift(articleToAdd);

    fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));

    // Create a new page for the article
    const pageContent = `
import ArticleTemplate from '@/app/components/ArticleTemplate';

export default function Article() {
  const article = ${JSON.stringify(articleToAdd)};
  return <ArticleTemplate {...article} />;
}
    `;

    fs.writeFileSync(
      path.join(pagesDirectory, `${articleToAdd.id}.js`),
      pageContent
    );

    return NextResponse.json(articleToAdd, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add article" },
      { status: 500 }
    );
  }
}
