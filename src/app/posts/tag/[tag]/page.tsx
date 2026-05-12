import { getAllTags, getPostsByTag } from "@/app/lib/post";
import type { Tag } from "@/app/types/models";

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

import Link from "next/link";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: Tag }>;
}) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  return (
    <div className="py-16">
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
