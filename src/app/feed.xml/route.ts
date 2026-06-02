import { getPosts } from "@/app/lib/post";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zilog.dev";

function escapeCdata(str: string): string {
  return str.replace(/]]>/g, "]]]]><![CDATA[>");
}

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET(): Promise<Response> {
  try {
    const posts = await getPosts();

    const items = posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${escapeCdata(post.metadata.title)}]]></title>
      <link>${escapeXml(`${SITE_URL}/posts/${encodeURIComponent(post.slug)}`)}</link>
      <description><![CDATA[${escapeCdata(post.metadata.description)}]]></description>
      <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
      <guid>${escapeXml(`${SITE_URL}/posts/${encodeURIComponent(post.slug)}`)}</guid>
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
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("RSS 피드 생성 중 오류가 발생했습니다.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
