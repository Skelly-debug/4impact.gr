import { kv } from "@vercel/kv";

const ARTICLE_UPDATES = "article-updates";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const subscriber = kv.duplicate();

      await subscriber.subscribe(ARTICLE_UPDATES);

      subscriber.on("message", (channel, message) => {
        const data = encoder.encode(`data: ${message}\n\n`);
        controller.enqueue(data);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
