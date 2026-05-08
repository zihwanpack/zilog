import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type { Post, PostMetadata, Tag } from "../types/models";

const postsDirectory = path.join(process.cwd(), "src/app/content/posts");

export async function getPostBySlug(slug: string): Promise<Post> {
  "use cache";
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) {
    throw new Error(`포스트를 찾을 수 없습니다: ${slug}`);
  }
  const fileContents = fs.readFileSync(mdxPath, "utf8");
  const { data: metadata, content } = matter(fileContents);
  const stats = readingTime(fileContents);

  return {
    slug,
    metadata: metadata as PostMetadata,
    content,
    readingTime: Math.ceil(stats.minutes),
  };
}

export async function getPosts(): Promise<Post[]> {
  const files = fs.readdirSync(postsDirectory);
  return Promise.all(
    files.map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      return getPostBySlug(slug);
    }),
  );
}

export async function getRecentsPosts(limit: number): Promise<Post[]> {
  const posts = await getPosts();
  return posts
    .sort((a, b) => b.metadata.date.localeCompare(a.metadata.date))
    .slice(0, limit);
}

export async function getAllTags(): Promise<Tag[]> {
  const posts = await getPosts();
  const tags = posts.flatMap((post) => post.metadata.tags ?? []);
  return [...new Set(tags)];
}

export async function getPostsByTag(tag: Tag): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.metadata.tags?.includes(tag));
}
