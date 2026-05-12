import Image from "next/image";
import Link from "next/link";

import { formatDate } from "../utils/date";

export function PostCard({
  title,
  slug,
  date,
  tags,
  description,
  readingTime,
  cover,
}: {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  description: string;
  readingTime: number;
  cover?: string;
}): React.JSX.Element {
  return (
    <li className="border border-[var(--color-border)] group">
      <Link href={`/posts/${slug}`}>
        <div className="aspect-video w-full overflow-hidden bg-[var(--color-border)]">
          {cover ? (
            <Image
              src={cover}
              alt={title}
              width={600}
              height={338}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>
        <div className="p-4">
          <h2 className="font-bold tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-muted)] line-clamp-2">
            {description}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-[var(--color-muted)]">
            <time dateTime={date}>{formatDate(date)}</time>
            <span>·</span>
            <span>{readingTime}분 읽기</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
