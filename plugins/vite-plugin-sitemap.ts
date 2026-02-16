import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import type { Plugin } from "vite";
import { SITE_URL, routes } from "../src/seo/routes";

/**
 * Vite plugin that generates sitemap.xml at build time
 * from the route definitions in src/seo/routes.ts.
 *
 * No manual updates needed — just add routes to the routes array.
 */
export default function sitemapPlugin(): Plugin {
    return {
        name: "vite-plugin-sitemap",
        apply: "build",
        closeBundle() {
            const today = new Date().toISOString().split("T")[0];

            const urls = routes
                .map(
                    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
                )
                .join("\n");

            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

            const outDir = resolve(process.cwd(), "dist");
            mkdirSync(outDir, { recursive: true });
            writeFileSync(resolve(outDir, "sitemap.xml"), sitemap, "utf-8");
            console.log("✓ sitemap.xml generated with", routes.length, "routes");
        },
    };
}
