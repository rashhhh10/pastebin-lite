import { redis } from "@/lib/redis";
import crypto from "crypto";

export async function POST(req) {
  const body = await req.json();

  if (!body.content || body.content.trim() === "") {
    return new Response(
      JSON.stringify({ error: "Invalid content" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const id = crypto.randomBytes(6).toString("hex");
  const now = Date.now();

  const paste = {
    content: body.content,
    created_at: now,
    expires_at: body.ttl_seconds
      ? now + body.ttl_seconds * 1000
      : null,
    max_views: body.max_views ?? null,
    views: 0
  };

  await redis.set(`paste:${id}`, paste);

  return Response.json({
    id,
    url: `${process.env.BASE_URL}/p/${id}`
  });
}
