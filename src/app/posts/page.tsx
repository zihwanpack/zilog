import { Suspense } from "react";

import PostList from "../components/post-list";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<React.JSX.Element> {
  return (
    <section className="py-16">
      <h1 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-muted)] mb-8">
        Posts
      </h1>
      <Suspense fallback={<p>로딩 중...</p>}>
        <PostList searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
