import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zilog.dev";
const postsDirectory = path.join(process.cwd(), "src/app/content/posts");
const outputPath = path.join(process.cwd(), "out/feed.xml");

function escapeCdata(str) {
  return str.replace(/]]>/g, "]]]]><![CDATA[>");
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function generateRss() {
  const files = await readdir(postsDirectory);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const fileContents = await readFile(
          path.join(postsDirectory, file),
          "utf8",
        );
        const { data } = matter(fileContents);
        return { slug: file.replace(/\.mdx$/, ""), metadata: data };
      }),
  );

  posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );

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

  await writeFile(outputPath, rss, "utf8");
  console.log(
    `[generate-rss] ${outputPath} 생성 완료 (${posts.length}개 포스트)`,
  );
}

generateRss();
