import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllTags, getPostsByTag } from "@/app/lib/post";
import type { Tag } from "@/app/types/models";

const TAG_REGEX = /^[\p{L}\p{N}\-_.]+$/u;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: Tag }>;
}) {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `${tag} 태그가 달린 포스트 목록`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: Tag }>;
}) {
  const { tag } = await params;

  if (!TAG_REGEX.test(tag)) notFound();

  const posts = await getPostsByTag(tag);

  if (posts.length === 0) notFound();

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
