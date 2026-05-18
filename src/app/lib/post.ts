import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { compareDesc } from "date-fns";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

import type { PaginatedPosts, Post, Tag } from "../types/models";

const postsDirectory = path.join(process.cwd(), "src/app/content/posts");
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const postMetadataSchema = z.object({
  title: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "날짜는 YYYY-MM-DD 형식이어야 합니다"),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
});

export async function getPostBySlug(slug: string): Promise<Post> {
  "use cache";
  if (!SLUG_REGEX.test(slug)) {
    throw new Error(`유효하지 않은 슬러그: ${slug}`);
  }
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  try {
    await access(mdxPath);
  } catch {
    throw new Error(`포스트를 찾을 수 없습니다: ${slug}`);
  }
  const fileContents = await readFile(mdxPath, "utf8");
  const { data, content } = matter(fileContents);
  const metadata = postMetadataSchema.parse(data);
  const stats = readingTime(content);

  return {
    slug,
    metadata,
    content,
    readingTime: Math.ceil(stats.minutes),
  };
}

export async function getPosts(): Promise<Post[]> {
  "use cache";
  const files = await readdir(postsDirectory);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => getPostBySlug(file.replace(/\.mdx$/, ""))),
  );
  return posts.sort((a, b) =>
    compareDesc(new Date(a.metadata.date), new Date(b.metadata.date)),
  );
}

export async function getRecentsPosts(limit: number): Promise<Post[]> {
  const posts = await getPosts();
  return posts.slice(0, limit);
}

export async function getAllTags(): Promise<Tag[]> {
  const posts = await getPosts();
  const tags = posts.flatMap((post) => post.metadata.tags);
  return [...new Set(tags)];
}

export async function getPostsByTag(tag: Tag): Promise<Post[]> {
  const posts = await getPosts();
  const normalizedTag = tag.toLowerCase();
  return posts.filter((post) =>
    post.metadata.tags.some((t) => t.toLowerCase() === normalizedTag),
  );
}

export async function getAdjacentPosts(
  slug: string,
): Promise<{ prev: Post | null; next: Post | null }> {
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export async function getPostsPaginated(
  page: number,
  limit = 10,
): Promise<PaginatedPosts> {
  const posts = await getPosts();
  const postCount = posts.length;
  const pageCount = Math.ceil(postCount / limit);
  const postsOnPage = posts.slice((page - 1) * limit, page * limit);

  return {
    posts: postsOnPage,
    postCount,
    pageCount,
    page,
  };
}
