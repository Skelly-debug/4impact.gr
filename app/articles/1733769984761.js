
import ArticleTemplate from '@/app/components/ArticleTemplate';

export default function Article() {
  const article = {"title":"Test","content":"test","author":"tset","imageUrl":"","id":"1733769984761","publishedDate":"2024-12-09T18:46:24.761Z"};
  return <ArticleTemplate {...article} />;
}
    