export type Heading = { depth: number; text: string; id: string };

export function extractHeadings(content: string): Heading[] {
  const regex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    headings.push({ depth, text, id });
  }
  return headings;
}
