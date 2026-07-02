/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zilog.dev",
  generateRobotsTxt: true,
  sitemapSize: 5000,
};
