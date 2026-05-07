import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { Post, PostFrontmatter } from "../types/models";

const postsDirectory = path.join(process.cwd(), "src/app/content/posts");

export async function getPostBySlug(slug: string): Promise<Post> {
  "use cache";
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`포스트를 찾을 수 없습니다: ${slug}`);
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
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
