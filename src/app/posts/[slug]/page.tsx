import { MDXRemote } from "next-mdx-remote/rsc";
import type { PluggableList } from "unified";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getPostBySlug } from "@/app/lib/post";
import { Comments } from "@/app/components/comment";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter, content } = await getPostBySlug(slug);

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
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1>{frontmatter.title}</h1>
      <MDXRemote source={content} options={options} />
      <Comments />
    </article>
  );
}
