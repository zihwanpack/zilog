import Link from "next/link";

import { formatDate } from "../utils/date";

export function PostCard({
  title,
  slug,
  date,
  tags,
  description,
  readingTime,
}: {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  description: string;
  readingTime: number;
}): React.JSX.Element {
  return (
    <li>
      <Link href={`/posts/${slug}`}>{title}</Link>
      <p>{description}</p>
      <time dateTime={date}>{formatDate(date)}</time>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/posts/tag/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
      <time dateTime={`PT${readingTime}M`}>{readingTime}분 소요</time>
    </li>
  );
}
