import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <main className="py-32">
      <h1 className="text-8xl font-bold tracking-tight text-accent leading-none">
        404
      </h1>
      <p className="mt-6 text-xl text-foreground">
        페이지를 찾을 수 없습니다
      </p>
      <p className="mt-2 text-sm text-muted">
        요청하신 페이지가 삭제되었거나 잘못된 경로일 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-12 inline-block text-sm text-accent hover:underline underline-offset-4"
      >
        ← 홈으로 돌아가기
      </Link>
    </main>
  );
}
