export type Heading = { depth: number; text: string; id: string };

export function extractHeadings(content: string): Heading[] {
  const regex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  const idCounts = new Map<string, number>();
  let match;

  while ((match = regex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const baseId =
      text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\p{L}\p{N}-]/gu, "") || `heading-${headings.length}`;

    const count = idCounts.get(baseId) ?? 0;
    const id = count === 0 ? baseId : `${baseId}-${count}`;
    idCounts.set(baseId, count + 1);

    headings.push({ depth, text, id });
  }
  return headings;
}
