import Link from "next/link";

export function Pagination({
  currentPage,
  pageCount,
}: {
  currentPage: number;
  pageCount: number;
}): React.JSX.Element {
  if (pageCount <= 1) {
    return <></>;
  }

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const isFirst = currentPage === 1;
  const isLast = currentPage === pageCount;

  return (
    <nav className="mt-12 flex items-center justify-center gap-6 text-sm">
      {isFirst ? (
        <span className="text-border cursor-not-allowed">
          ← 이전
        </span>
      ) : (
        <Link
          href={`?page=${currentPage - 1}`}
          className="text-muted hover:text-foreground transition-colors"
        >
          ← 이전
        </Link>
      )}

      <ul className="flex items-center gap-3">
        {pages.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <span className="font-bold text-accent">
                {page}
              </span>
            ) : (
              <Link
                href={`?page=${page}`}
                className="text-muted hover:text-foreground transition-colors"
              >
                {page}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {isLast ? (
        <span className="text-border cursor-not-allowed">
          다음 →
        </span>
      ) : (
        <Link
          href={`?page=${currentPage + 1}`}
          className="text-muted hover:text-foreground transition-colors"
        >
          다음 →
        </Link>
      )}
    </nav>
  );
}
