/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zilog.dev",
  outDir: "out",
  generateRobotsTxt: true,
  sitemapSize: 5000,
};
