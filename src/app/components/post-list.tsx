import { notFound } from "next/navigation";

import { getPostsPaginated } from "../lib/post";
import { Pagination } from "./pagination";
import { PostCard } from "./post-card";

export default async function PostList({ page }: { page: number }) {
  const { posts, pageCount } = await getPostsPaginated(page);

  if (pageCount > 0 && page > pageCount) notFound();

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
      <Pagination currentPage={page} pageCount={pageCount} />
    </>
  );
}
