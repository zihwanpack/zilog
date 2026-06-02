import Image from "next/image";
import Link from "next/link";

import type { Post, PostMetadata } from "../types/models";
import { formatDate } from "../utils/date";

type PostCardProps = PostMetadata & Pick<Post, "slug" | "readingTime">;

export function PostCard({
  title,
  slug,
  date,
  description,
  readingTime,
  cover,
}: PostCardProps): React.JSX.Element {
  return (
    <div className="border border-border group">
      <Link href={`/posts/${slug}`}>
        <div className="aspect-video w-full overflow-hidden bg-border">
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
          <h2 className="font-bold tracking-tight group-hover:text-accent transition-colors">
            {title}
          </h2>
          <p className="mt-1 text-sm text-muted line-clamp-2">{description}</p>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted">
            <time dateTime={date}>{formatDate(date)}</time>
            <span>·</span>
            <span>{readingTime}분 읽기</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
