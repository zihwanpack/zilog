"use client";
import Fuse from "fuse.js";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Post } from "../types/models";

const fuseOptions = {
  keys: ["metadata.title", "metadata.description", "metadata.tags"],
  threshold: 0.4,
};

export function Search({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => new Fuse(posts, fuseOptions), [posts]);

  const results = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : [];

  return (
    <section className="mt-12">
      <h2 className="text-xs font-semibold tracking-widest uppercase text-muted mb-6">
        검색
      </h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="포스트 검색..."
        className="w-full bg-transparent border-b border-border pb-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
      />
      {query.trim() && (
        <ul className="mt-6">
          {results.length === 0 ? (
            <p className="text-sm text-muted">검색 결과가 없습니다.</p>
          ) : (
            results.map((post) => (
              <li
                key={post.slug}
                className="border-b border-border py-4"
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="font-medium hover:text-accent transition-colors"
                >
                  {post.metadata.title}
                </Link>
                <span className="ml-3 text-sm text-muted">
                  {post.metadata.date}
                </span>
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
}
