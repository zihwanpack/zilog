import { getPostsByTag } from "@/app/lib/post";
import type { Tag } from "@/app/types/models";

import Link from "next/link";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: Tag }>;
}) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  return (
    <div className="mx-auto max-w-2xl px-8 py-16">
      <h1>{tag}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.metadata.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
