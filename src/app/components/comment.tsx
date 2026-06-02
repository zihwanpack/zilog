"use client";
import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO;
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

export function Comments() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (
    !GISCUS_REPO ||
    !GISCUS_REPO_ID ||
    !GISCUS_CATEGORY ||
    !GISCUS_CATEGORY_ID
  ) {
    return null;
  }

  return (
    <div>
      <Giscus
        repo={GISCUS_REPO as `${string}/${string}`}
        repoId={GISCUS_REPO_ID}
        category={GISCUS_CATEGORY}
        categoryId={GISCUS_CATEGORY_ID}
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light_high_contrast"
        lang="ko"
      />
    </div>
  );
}
