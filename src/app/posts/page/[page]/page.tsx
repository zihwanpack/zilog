import { notFound } from "next/navigation";
import { Suspense } from "react";

import PostList from "@/app/components/post-list";
import { getPostsPaginated } from "@/app/lib/post";

export async function generateStaticParams() {
  const { pageCount } = await getPostsPaginated(1);
  const params = Array.from({ length: Math.max(0, pageCount - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
  // output: "export"는 동적 세그먼트에 params가 0개면 빌드 에러를 내므로 더미 경로를 둔다.
  // PostList가 page > pageCount일 때 notFound()를 호출해 정상적으로 404 처리된다.
  return params.length > 0 ? params : [{ page: "2" }];
}

export default async function PostsPageByNumber({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<React.JSX.Element> {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    notFound();
  }

  return (
    <section className="py-16">
      <h1 className="text-xs font-semibold tracking-widest uppercase text-muted mb-8">
        Posts
      </h1>
      <Suspense fallback={<p>로딩 중...</p>}>
        <PostList page={pageNumber} />
      </Suspense>
    </section>
  );
}
