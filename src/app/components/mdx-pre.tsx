"use client";
import { Check, Copy } from "lucide-react";
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
        className="absolute top-3 right-3 p-1.5 opacity-0 group-hover/pre:opacity-100 transition-opacity text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
        aria-label="코드 복사"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
