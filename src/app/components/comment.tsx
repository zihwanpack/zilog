"use client";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Comments() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <Giscus
        repo="zihwanpack/zilog"
        repoId="R_kgDORpIJSg"
        category="General"
        categoryId="DIC_kwDORpIJSs4C8aYK"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={
          resolvedTheme === "dark"
            ? "dark_high_contrast"
            : "light_high_contrast"
        }
        lang="ko"
      />
    </div>
  );
}
