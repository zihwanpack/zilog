import { ImageResponse } from "next/og";

import { getPostBySlug } from "@/app/lib/post";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<ImageResponse> {
  const { slug } = await params;
  const { metadata } = await getPostBySlug(slug);

  return new ImageResponse(
    <div
      style={{
        background: "#F5F0E8",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "80px",
      }}
    >
      <div
        style={{
          color: "#8B1A1A",
          fontSize: "64px",
          fontWeight: "bold",
          lineHeight: 1.1,
          marginBottom: "24px",
        }}
      >
        {metadata.title}
      </div>
      <div style={{ color: "#888", fontSize: "24px" }}>zilog</div>
    </div>,
    { ...size },
  );
}
