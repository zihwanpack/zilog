import Link from "next/link";

import { Search } from "./components/search";
import { getPosts } from "./lib/post";

export default async function Home(): Promise<React.JSX.Element> {
  const allPosts = await getPosts();
  const recentPosts = allPosts.slice(0, 5);
  return (
    <main className="py-16">
      <Search posts={allPosts} />
      <section className="mt-12">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-muted mb-6">
          최근 포스트
        </h2>
        <ul>
          {recentPosts.map((post) => (
            <li
              key={post.slug}
              className="flex items-center justify-between border-b border-border py-4"
            >
              <Link
                href={`/posts/${post.slug}`}
                className="font-medium hover:text-accent transition-colors"
              >
                {post.metadata.title}
              </Link>
              <span className="text-sm text-muted shrink-0 ml-4">
                {post.metadata.date}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href="/posts"
          className="mt-8 inline-block text-sm text-accent hover:underline underline-offset-4"
        >
          모든 포스트 보기 →
        </Link>
      </section>
    </main>
  );
}
