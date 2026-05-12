import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <main className="mx-auto max-w-2xl px-8 py-32">
      <h1 className="text-8xl font-bold tracking-tight text-[var(--color-accent)] leading-none">
        404
      </h1>
      <p className="mt-6 text-xl text-[var(--color-foreground)]">
        페이지를 찾을 수 없습니다
      </p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        요청하신 페이지가 삭제되었거나 잘못된 경로일 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-12 inline-block text-sm text-[var(--color-accent)] hover:underline underline-offset-4"
      >
        ← 홈으로 돌아가기
      </Link>
    </main>
  );
}
