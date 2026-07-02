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

  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted py-12">아직 작성된 포스트가 없습니다.</p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(({ metadata, slug, readingTime }) => (
          <li key={slug}>
            <PostCard {...metadata} slug={slug} readingTime={readingTime} />
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} pageCount={pageCount} />
    </>
  );
}
