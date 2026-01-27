import { redis } from "../../lib/redis";

import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const paste = await redis.get(`paste:${params.id}`);
  if (!paste) notFound();

  return (
    <pre style={{ padding: 20, whiteSpace: "pre-wrap" }}>
      {paste.content}
    </pre>
  );
}
