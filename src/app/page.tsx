import Link from "next/link";

import { getRecentsPosts } from "./lib/post";

export default async function Home(): Promise<React.JSX.Element> {
  const posts = await getRecentsPosts(5);
  return (
    <main className="mx-auto max-w-2xl px-8 py-16">
      <section className="border-b border-[var(--color-border)] pb-20">
        <h1 className="text-8xl font-bold tracking-tight text-[var(--color-accent)] leading-none">
          zilog
        </h1>
        <p className="mt-6 text-xl text-[var(--color-muted)]">
          zi의 개발 블로그
        </p>
      </section>

      {/* 최근 포스트 */}
      <section className="mt-12">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-muted)] mb-6">
          최근 포스트
        </h2>
        <ul>
          {posts.map((post) => (
            <li
              key={post.slug}
              className="border-b border-[var(--color-border)] py-4"
            >
              <Link
                href={`/posts/${post.slug}`}
                className="font-medium hover:text-[var(--color-accent)] transition-colors"
              >
                {post.metadata.title}
              </Link>
              <span className="ml-3 text-sm text-[var(--color-muted)]">
                {post.metadata.date}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href="/posts"
          className="mt-8 inline-block text-sm text-[var(--color-accent)] hover:underline underline-offset-4"
        >
          모든 포스트 보기 →
        </Link>
      </section>
    </main>
  );
}
