import fs from "node:fs";
import path from "node:path";
import { compareDesc } from "date-fns";
import matter from "gray-matter";
import readingTime from "reading-time";

import type { PaginatedPosts, Post, PostMetadata, Tag } from "../types/models";

const postsDirectory = path.join(process.cwd(), "src/app/content/posts");
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function getPostBySlug(slug: string): Promise<Post> {
  "use cache";
  if (!SLUG_REGEX.test(slug)) {
    throw new Error(`유효하지 않은 슬러그: ${slug}`);
  }
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) {
    throw new Error(`포스트를 찾을 수 없습니다: ${slug}`);
  }
  const fileContents = fs.readFileSync(mdxPath, "utf8");
  const { data: metadata, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    metadata: metadata as PostMetadata,
    content,
    readingTime: Math.ceil(stats.minutes),
  };
}

export async function getPosts(): Promise<Post[]> {
  "use cache";
  const files = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    files.map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      return getPostBySlug(slug);
    }),
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
  const tags = posts.flatMap((post) => post.metadata.tags ?? []);
  return [...new Set(tags)];
}

export async function getPostsByTag(tag: Tag): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.metadata.tags?.includes(tag));
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
