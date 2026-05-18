import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import type { PluggableList } from "unified";

import { Comments } from "@/app/components/comment";
import { MdxPre } from "@/app/components/mdx-pre";
import { PostNav } from "@/app/components/post-nav";
import { ReadingProgress } from "@/app/components/reading-progress";
import { Toc } from "@/app/components/toc";
import { getAdjacentPosts, getPosts, getPostBySlug } from "@/app/lib/post";
import { extractHeadings } from "@/app/lib/toc";

export const dynamic = "force-static";

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
  const [{ metadata, content }, { prev, next }] = await Promise.all([
    getPostBySlug(slug),
    getAdjacentPosts(slug),
  ]);
  const headings = extractHeadings(content);

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
    <>
      <ReadingProgress />
      <article className="prose dark:prose-invert max-w-none py-16">
        <h1>{metadata.title}</h1>
        <Toc headings={headings} />
        <MDXRemote source={content} options={options} components={{ pre: MdxPre }} />
        <Comments />
        <PostNav prev={prev} next={next} />
      </article>
    </>
  );
}
