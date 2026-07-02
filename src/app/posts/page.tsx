import { Suspense } from "react";

import PostList from "../components/post-list";

export default async function PostsPage(): Promise<React.JSX.Element> {
  return (
    <section className="py-16">
      <h1 className="text-xs font-semibold tracking-widest uppercase text-muted mb-8">
        Posts
      </h1>
      <Suspense fallback={<p>로딩 중...</p>}>
        <PostList page={1} />
      </Suspense>
    </section>
  );
}
