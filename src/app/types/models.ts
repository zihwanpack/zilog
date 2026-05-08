export type Tag = string;

export type PostMetadata = {
  title: string;
  date: string;
  description: string;
  tags: Tag[];
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
  readingTime: number;
};
