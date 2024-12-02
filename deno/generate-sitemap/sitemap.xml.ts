import { Context } from "@sapling/sapling";
import { SitemapUrl, generateSitemap } from "./lib/sitemap.ts";

export default function SitemapXml(c: Context) {
  // Get the base URL without the /sitemap.xml
  const baseUrl = `${c.req.url.split('/sitemap.xml')[0]}`;
  // Add the routes you want to include in the sitemap here
  // these could be declard somewhere else or fetched from your CMS
  const urls: SitemapUrl[] = [
    {
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0
    },
  ];

  const sitemap = generateSitemap(urls);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}