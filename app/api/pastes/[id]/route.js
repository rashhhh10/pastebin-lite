import { redis } from "@/lib/redis";


export async function GET(req, { params }) {
  const paste = await redis.get(`paste:${params.id}`);
  if (!paste) {
    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404 }
    );
  }

  const now =
    process.env.TEST_MODE === "1"
      ? Number(req.headers.get("x-test-now-ms"))
      : Date.now();

  if (paste.expires_at && now >= paste.expires_at) {
    return new Response(
      JSON.stringify({ error: "Expired" }),
      { status: 404 }
    );
  }

  if (paste.max_views && paste.views >= paste.max_views) {
    return new Response(
      JSON.stringify({ error: "View limit exceeded" }),
      { status: 404 }
    );
  }

  paste.views += 1;
  await redis.set(`paste:${params.id}`, paste);

  return Response.json({
    content: paste.content,
    remaining_views: paste.max_views
      ? paste.max_views - paste.views
      : null,
    expires_at: paste.expires_at
      ? new Date(paste.expires_at).toISOString()
      : null
  });
}
