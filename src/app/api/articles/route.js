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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    const updatedArticle = await request.json();

    if (!updatedArticle.title || !updatedArticle.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const articles = JSON.parse(fs.readFileSync(articlesFilePath, "utf8"));
    const articleIndex = articles.findIndex(article => article.id === id);

    if (articleIndex === -1) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Merge existing article with updated data
    const newArticleData = {
      ...articles[articleIndex],
      ...updatedArticle,
      id: id, // Preserve original ID
      publishedDate: articles[articleIndex].publishedDate // Keep original publish date
    };

    articles[articleIndex] = newArticleData;

    fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));

    // Update the article page
    const pageContent = `
import ArticleTemplate from '@/app/components/ArticleTemplate';

export default function Article() {
  const article = ${JSON.stringify(newArticleData)};
  return <ArticleTemplate {...article} />;
}
    `;

    fs.writeFileSync(
      path.join(pagesDirectory, `${id}.js`),
      pageContent
    );

    return NextResponse.json(newArticleData, { status: 200 });
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
    
    // Parse the request body directly
    const articleId = await request.json();

    if (!articleId) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    const articles = JSON.parse(fs.readFileSync(articlesFilePath, "utf8"));
    const initialLength = articles.length;

    const filteredArticles = articles.filter(article => article.id !== articleId);

    if (filteredArticles.length === initialLength) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    fs.writeFileSync(articlesFilePath, JSON.stringify(filteredArticles, null, 2));

    // Remove the article's page file
    const articlePagePath = path.join(pagesDirectory, `${articleId}.js`);
    if (fs.existsSync(articlePagePath)) {
      fs.unlinkSync(articlePagePath);
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
