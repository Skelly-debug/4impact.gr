
import ArticleTemplate from '@/app/components/ArticleTemplate';

export default function Article() {
  const article = {"title":"Iframe Test","content":"Iframe Test\n\n<iframe style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/track/77pUSd7tnGELnBipkVNGxw?utm_source=generator\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>","author":"Stef","imageUrl":"https://placehold.co/600x400","id":"1733782654988","publishedDate":"2024-12-09T22:17:34.988Z"};
  return <ArticleTemplate {...article} />;
}
    