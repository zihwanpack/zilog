"use client";
import { useRef, useState } from "react";

export function MdxPre(props: React.ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLPreElement>(null);

  const copy = async () => {
    const code = ref.current?.querySelector("code")?.innerText;
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group/pre">
      <pre ref={ref} {...props} />
      <button
        type="button"
        onClick={copy}
        className="absolute top-3 right-3 text-xs px-2 py-1 opacity-0 group-hover/pre:opacity-100 transition-opacity bg-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
      >
        {copied ? "✓" : "복사"}
      </button>
    </div>
  );
}
