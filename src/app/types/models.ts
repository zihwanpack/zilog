export type Tag = string;

export type PostMetadata = {
  title: string;
  date: string;
  description: string;
  tags: Tag[];
  cover?: string;
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
  readingTime: number;
};

export type PaginatedPosts = {
  posts: Post[];
  postCount: number;
  pageCount: number;
  page: number;
};
