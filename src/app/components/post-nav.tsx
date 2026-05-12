import Link from "next/link";

import type { Post } from "../types/models";

export function PostNav({
  prev,
  next,
}: {
  prev: Post | null;
  next: Post | null;
}): React.JSX.Element | null {
  if (!prev && !next) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-[var(--color-border)] flex justify-between gap-8">
      {prev ? (
        <Link
          href={`/posts/${prev.slug}`}
          className="group flex flex-col gap-1 max-w-[45%]"
        >
          <span className="text-xs text-[var(--color-muted)] tracking-widest uppercase">
            ← 이전
          </span>
          <span className="text-sm font-medium group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
            {prev.metadata.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/posts/${next.slug}`}
          className="group flex flex-col gap-1 items-end max-w-[45%]"
        >
          <span className="text-xs text-[var(--color-muted)] tracking-widest uppercase">
            다음 →
          </span>
          <span className="text-sm font-medium text-right group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
            {next.metadata.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
