import Image from "next/image";

import { Comments } from "@/app/components/comment";
import { JsonLd } from "@/app/components/json-ld";
import { MdxContent } from "@/app/components/mdx-content";
import { PostNav } from "@/app/components/post-nav";
import { ReadingProgress } from "@/app/components/reading-progress";
import { Toc } from "@/app/components/toc";
import { getAdjacentPosts, getPostBySlug, getPosts } from "@/app/lib/post";
import { extractHeadings } from "@/app/lib/toc";
import { formatDate } from "@/app/utils/date";

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
  const [{ metadata, content, readingTime }, { prev, next }] = await Promise.all([
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
        <div className="not-prose flex items-center gap-3 text-xs text-muted mt-2 mb-8">
          <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
          <span>·</span>
          <span>{readingTime}분 읽기</span>
        </div>
        {metadata.cover && (
          <div className="not-prose aspect-video w-full overflow-hidden mb-8">
            <Image
              src={metadata.cover}
              alt={metadata.title}
              width={800}
              height={450}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}
        <Toc headings={headings} />
        <MdxContent content={content} />
        <Comments />
        <PostNav prev={prev} next={next} />
      </article>
    </>
  );
}
