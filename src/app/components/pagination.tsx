import Link from "next/link";

export function Pagination({
  currentPage,
  pageCount,
}: {
  currentPage: number;
  pageCount: number;
}): React.JSX.Element | null {
  if (pageCount <= 1) {
    return null;
  }

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const isFirst = currentPage === 1;
  const isLast = currentPage === pageCount;
  const pageHref = (page: number) =>
    page === 1 ? "/posts" : `/posts/page/${page}`;

  return (
    <nav className="mt-12 flex items-center justify-center gap-6 text-sm">
      {isFirst ? (
        <span className="text-border cursor-not-allowed">← 이전</span>
      ) : (
        <Link
          href={pageHref(currentPage - 1)}
          className="text-muted hover:text-foreground transition-colors"
        >
          ← 이전
        </Link>
      )}

      <ul className="flex items-center gap-3">
        {pages.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <span className="font-bold text-accent">{page}</span>
            ) : (
              <Link
                href={pageHref(page)}
                className="text-muted hover:text-foreground transition-colors"
              >
                {page}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {isLast ? (
        <span className="text-border cursor-not-allowed">다음 →</span>
      ) : (
        <Link
          href={pageHref(currentPage + 1)}
          className="text-muted hover:text-foreground transition-colors"
        >
          다음 →
        </Link>
      )}
    </nav>
  );
}
