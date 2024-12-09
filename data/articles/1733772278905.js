
import ArticleTemplate from '@/app/components/ArticleTemplate';

export default function Article() {
  const article = {"title":"Makaronia","content":"Me kima","author":"Stef","imageUrl":"https://placehold.co/600x400","id":"1733772278905","publishedDate":"2024-12-09T19:24:38.905Z"};
  return <ArticleTemplate {...article} />;
}
    