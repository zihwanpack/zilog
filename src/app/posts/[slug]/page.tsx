import { JsonLd } from "@/app/components/json-ld";
import { Comments } from "@/app/components/comment";
import { MdxContent } from "@/app/components/mdx-content";
import { PostNav } from "@/app/components/post-nav";
import { ReadingProgress } from "@/app/components/reading-progress";
import { Toc } from "@/app/components/toc";
import { getAdjacentPosts, getPosts, getPostBySlug } from "@/app/lib/post";
import { extractHeadings } from "@/app/lib/toc";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zilog.dev";

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
  const url = `${SITE_URL}/posts/${slug}`;
  const ogImage = `${url}/opengraph-image`;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: { canonical: url },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "article",
      url,
      publishedTime: metadata.date,
      tags: metadata.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: metadata.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [{ url: ogImage, alt: metadata.title }],
    },
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
  const url = `${SITE_URL}/posts/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: metadata.title,
    description: metadata.description,
    datePublished: metadata.date,
    url,
    publisher: {
      "@type": "Organization",
      name: "zilog",
      url: SITE_URL,
    },
    ...(metadata.tags.length > 0 && { keywords: metadata.tags.join(", ") }),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
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
