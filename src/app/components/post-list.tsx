import { notFound } from "next/navigation";

import { getPostsPaginated } from "../lib/post";
import { Pagination } from "./pagination";
import { PostCard } from "./post-card";

export default async function PostList({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);
  const { posts, pageCount } = await getPostsPaginated(currentPage);

  if (pageCount > 0 && currentPage > pageCount) notFound();

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(({ metadata, slug, readingTime }) => (
          <PostCard
            {...metadata}
            slug={slug}
            key={slug}
            readingTime={readingTime}
          />
        ))}
      </ul>
      <Pagination currentPage={currentPage} pageCount={pageCount} />
    </>
  );
}
