export default function ArticleTemplate({ title, content, publishedDate }) {
  return (
    <article className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-4">
        {new Date(publishedDate).toLocaleDateString()}
      </p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
