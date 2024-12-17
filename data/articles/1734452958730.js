
import ArticleTemplate from '@/app/components/ArticleTemplate';

export default function Article() {
  const article = {"title":"Test","content":"Polla Makaronia re paidia","author":"Stef","imageUrl":"","id":"1734452958730","publishedDate":"2024-12-17T16:29:18.730Z"};
  return <ArticleTemplate {...article} />;
}
    