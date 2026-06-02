import { Comments } from "@/app/components/comment";
import { MdxContent } from "@/app/components/mdx-content";
import { PostNav } from "@/app/components/post-nav";
import { ReadingProgress } from "@/app/components/reading-progress";
import { Toc } from "@/app/components/toc";
import { getAdjacentPosts, getPosts, getPostBySlug } from "@/app/lib/post";
import { extractHeadings } from "@/app/lib/toc";

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

  return (
    <>
      <ReadingProgress />
      <article className="prose max-w-none py-16">
        <h1>{metadata.title}</h1>
        <Toc headings={headings} />
        <MdxContent content={content} />
        <Comments />
        <PostNav prev={prev} next={next} />
      </article>
    </>
  );
}
