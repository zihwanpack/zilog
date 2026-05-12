import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import type { PluggableList } from "unified";

import { Comments } from "@/app/components/comment";
import { getPosts, getPostBySlug } from "@/app/lib/post";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata } = await getPostBySlug(slug);

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await params;
  const { metadata, content } = await getPostBySlug(slug);

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm] satisfies PluggableList,
      rehypePlugins: [
        rehypeSlug,
        [rehypePrettyCode, { theme: "github-dark" }],
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ] satisfies PluggableList,
    },
  } satisfies Parameters<typeof MDXRemote>[0]["options"];

  return (
    <article className="prose dark:prose-invert max-w-none py-16">
      <h1>{metadata.title}</h1>
      <MDXRemote source={content} options={options} />
      <Comments />
    </article>
  );
}
