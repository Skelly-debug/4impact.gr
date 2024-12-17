import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const articlesFilePath = path.join(process.cwd(), "data/articles.json");
const pagesDirectory = path.join(process.cwd(), "data/articles");

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

export async function PUT(request) {
  try {
    ensureDataFile();
    const updatedArticle = await request.json();

    // Validate required fields
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

    // Read existing articles
    const articles = JSON.parse(fs.readFileSync(articlesFilePath, "utf8"));

    // Find and update the article
    const articleIndex = articles.findIndex(
      (article) => article.id === updatedArticle.id
    );

    if (articleIndex === -1) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Update the article while preserving original publishedDate
    const updatedArticleWithDate = {
      ...articles[articleIndex],
      ...updatedArticle,
      publishedDate: articles[articleIndex].publishedDate,
    };

    articles[articleIndex] = updatedArticleWithDate;

    // Write updated articles back to file
    fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));

    // Update the corresponding page file
    const pageContent = `
import ArticleTemplate from '@/app/components/ArticleTemplate';

export default function Article() {
  const article = ${JSON.stringify(updatedArticleWithDate)};
  return <ArticleTemplate {...article} />;
}
    `;

    fs.writeFileSync(
      path.join(pagesDirectory, `${updatedArticleWithDate.id}.js`),
      pageContent
    );

    return NextResponse.json(updatedArticleWithDate, { status: 200 });
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
    ensureDataFile();
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get("id");

    if (!articleId) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    const articles = JSON.parse(fs.readFileSync(articlesFilePath, "utf8"));
    const updatedArticles = articles.filter(
      (article) => article.id !== articleId
    );

    if (articles.length === updatedArticles.length) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    fs.writeFileSync(
      articlesFilePath,
      JSON.stringify(updatedArticles, null, 2)
    );

    // Remove the corresponding page file
    const pageFilePath = path.join(pagesDirectory, `${articleId}.js`);
    if (fs.existsSync(pageFilePath)) {
      fs.unlinkSync(pageFilePath);
    }

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
