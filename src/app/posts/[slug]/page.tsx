  import { MDXRemote } from "next-mdx-remote/rsc";
  import type { PluggableList } from "unified";
  import remarkGfm from "remark-gfm";
  import rehypePrettyCode from "rehype-pretty-code";
  import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getPostBySlug } from "@/app/lib/post";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
    const { data, content } = getPostBySlug(slug);
  
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
        <h1>{data.title}</h1>
        <MDXRemote source={content} options={options} />
      </article>
    );
  }
