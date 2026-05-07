export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};
