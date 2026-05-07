import Link from "next/link";

import { getRecentsPosts } from "./lib/post";

export default async function Home(): Promise<React.JSX.Element> {
  const posts = await getRecentsPosts(5);
  return (
    <main className="h-full">
      <section>
        <h1>zilog</h1>
        <p>zi의 개발 블로그</p>
      </section>
      <section>
        <h2>최근 포스트</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
