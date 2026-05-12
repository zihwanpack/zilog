import { getPosts } from "@/app/lib/post";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zilog.dev";

export async function GET(): Promise<Response> {
  const posts = await getPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.metadata.title}]]></title>
      <link>${SITE_URL}/posts/${post.slug}</link>
      <description><![CDATA[${post.metadata.description}]]></description>
      <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
      <guid>${SITE_URL}/posts/${post.slug}</guid>
    </item>`,
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>zilog</title>
    <link>${SITE_URL}</link>
    <description>코드와 생각의 조각들을 문서화합니다.</description>
    <language>ko</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
