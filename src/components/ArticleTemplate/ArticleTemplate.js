"use client";

import Navbar from "../NavBar/Navbar";

export default function ArticleTemplate({
  title,
  content,
  publishedDate,
  imageUrl,
  author,
}) {
  return (
    <div className="font-playfair-display bg-gray-100 min-h-screen overflow-hidden">
      <Navbar />
      <div className="pt-[4.5rem]">
        {imageUrl ? (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={title}
              className="w-full max-h-[70vh] object-cover"
            />
          </div>
        ) : null}
        <article className="max-w-[95%] mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
          <p className="text-gray-400 mb-8 font-semibold italic">
            {author} {new Date(publishedDate).toLocaleDateString()}
          </p>
          <div
            className="prose text-gray-800 break-words"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </div>
  );
}
