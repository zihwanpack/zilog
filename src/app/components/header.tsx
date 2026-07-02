"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
      <div ref={scrollSentinelRef} className="absolute top-0 h-1 w-full" />

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-border bg-background/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-accent"
          >
            zilog
          </Link>

          <ul className="flex items-center gap-8 text-sm font-medium">
            <li>
              <Link
                href="/posts"
                className="underline-offset-4 hover:underline hover:text-accent transition-colors"
              >
                Posts
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
