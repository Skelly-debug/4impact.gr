
import ArticleTemplate from '@/app/components/ArticleTemplate';

export default function Article() {
  const article = {"title":"Allo Ena Gia to Kalo","content":"Testtest","author":"Stefos","imageUrl":"https://placehold.co/600x400","id":"1733772916265","publishedDate":"2024-12-09T19:35:16.265Z"};
  return <ArticleTemplate {...article} />;
}
    