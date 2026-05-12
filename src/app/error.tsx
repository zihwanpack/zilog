"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="py-32">
      <h1 className="text-8xl font-bold tracking-tight text-[var(--color-accent)] leading-none">
        오류
      </h1>
      <p className="mt-6 text-xl text-[var(--color-foreground)]">
        문제가 발생했습니다
      </p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        잠시 후 다시 시도해주세요.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-12 inline-block text-sm text-[var(--color-accent)] hover:underline underline-offset-4"
      >
        다시 시도하기 →
      </button>
    </main>
  );
}
