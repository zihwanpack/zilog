import type { Heading } from "../lib/toc";

export function Toc({ headings }: { headings: Heading[] }): React.JSX.Element | null {
  if (headings.length === 0) return null;

  return (
    <nav className="mb-10 p-4 border border-[var(--color-border)] text-sm">
      <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-muted)] mb-3">
        목차
      </p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.depth - 1) * 12}px` }}>
            <a
              href={`#${h.id}`}
              className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
