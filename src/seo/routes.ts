/**
 * Central route definitions for SEO.
 * Used by both the sitemap Vite plugin and the app for SEO meta tags.
 *
 * Add new routes here and the sitemap will be regenerated on next build.
 */
export interface SiteRoute {
    path: string;
    priority: number;
    changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}

export const SITE_URL = "https://blog.mappso.com";

export const routes: SiteRoute[] = [
    { path: "/", priority: 1.0, changefreq: "weekly" },
    { path: "/contact", priority: 0.8, changefreq: "monthly" },
];
