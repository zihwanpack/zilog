import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { PluggableList } from "unified";

import { MdxPre } from "./mdx-pre";

const mdxOptions = {
  remarkPlugins: [remarkGfm] satisfies PluggableList,
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCode, { theme: "github-dark" }],
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
  ] satisfies PluggableList,
};

export async function MdxContent({ content }: { content: string }) {
  return (
    <MDXRemote
      source={content}
      options={{ mdxOptions }}
      components={{ pre: MdxPre }}
    />
  );
}
