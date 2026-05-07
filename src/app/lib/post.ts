import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { Post, PostFrontmatter } from "../types/models";

const postsDirectory = path.join(process.cwd(), "src/app/content/posts");

export async function getPostBySlug(slug: string): Promise<Post> {
  "use cache";
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) {
    throw new Error(`포스트를 찾을 수 없습니다: ${slug}`);
  }
  const fileContents = fs.readFileSync(mdxPath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  return {
    slug,
    frontmatter: frontmatter as PostFrontmatter,
    content,
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
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))
    .slice(0, limit);
}

// tag 타입 구체화 필요
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.frontmatter.tags?.includes(tag));
}
