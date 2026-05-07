"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const scrollSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 1.0 },
    );
    const currentSentinel = scrollSentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, []);
  return (
    <>
      {/* 감지용 빈 div */}
      <div ref={scrollSentinelRef} className="absolute top-0 h-1 w-full" />

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-zinc-200 bg-white/70 backdrop-blur-md dark:border-zinc-800 dark:bg-black/70"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <Link href="/" className="text-xl font-bold">
            zilog
          </Link>

          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link
                href="/posts"
                className="hover:text-blue-500 transition-colors"
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-blue-500 transition-colors"
              >
                About
              </Link>
            </li>
            <li className="flex items-center">
              {/* ThemeToggle 컴포넌트는 별도로 구현되어 있다고 가정 */}
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
