
import ArticleTemplate from '@/app/components/ArticleTemplate';

export default function Article() {
  const article = {"title":"Test","content":"Test <img src=\"https://placehold.co/600x400\" alt=\"Girl in a jacket\" width=\"600\" height=\"400\">\n","author":"Stef","imageUrl":"https://placehold.co/600x400","id":"1733997756568","publishedDate":"2024-12-12T10:02:36.568Z"};
  return <ArticleTemplate {...article} />;
}
    