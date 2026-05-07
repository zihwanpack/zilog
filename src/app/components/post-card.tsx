import Link from "next/link";

import { formatDate } from "../utils/date";

export function PostCard({
  title,
  slug,
  date,
  tags,
  description,
}: {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  description: string;
}): React.JSX.Element {
  return (
    <li>
      <Link href={`/posts/${slug}`}>{title}</Link>
      <p>{description}</p>
      <time dateTime={date}>{formatDate(date)}</time>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </li>
  );
}
