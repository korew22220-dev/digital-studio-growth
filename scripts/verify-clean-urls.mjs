import { readFile } from "node:fs/promises";

const site = process.env.SITE_URL || "https://koremo.ru";
const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (urls.length < 18 || new Set(urls).size !== urls.length) throw new Error("Sitemap is incomplete or has duplicate URLs.");

const errors = [];
const assets = new Set();
for (const url of urls) {
  const route = new URL(url);
  if (route.origin !== site || (!route.pathname.endsWith("/") && route.pathname !== "/")) {
    errors.push(`Noncanonical sitemap URL: ${url}`);
    continue;
  }
  try {
    const response = await fetch(url, { redirect: "manual" });
    const html = await response.text();
    if (response.status !== 200) errors.push(`${url} returned ${response.status}, expected 200`);
    const canonicalTag = html.match(/<link\b[^>]*rel="canonical"[^>]*>/i)?.[0];
    const canonical = canonicalTag?.match(/\bhref="([^"]+)"/)?.[1];
    if (canonical !== url) errors.push(`${url} canonical is ${canonical || "missing"}`);
    if (!html.includes("/_next/")) errors.push(`${url} has no browser assets`);
    for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
      const pathname = href.split(/[?#]/, 1)[0];
      if (pathname.endsWith(".html")) errors.push(`${url} links to old URL ${href}`);
      else if (pathname.startsWith("/_next/") || /\.(?:css|js|svg|webp|png|jpe?g|woff2?)$/.test(pathname)) assets.add(pathname);
      else if (pathname !== "/" && !urls.includes(`${site}${pathname}`)) errors.push(`${url} links to missing page ${href}`);
    }
  } catch (error) { errors.push(`${url}: ${error.message}`); }

  if (route.pathname === "/") continue;
  const legacy = `${site}${route.pathname.slice(0, -1)}.html`;
  try {
    const response = await fetch(legacy, { redirect: "manual" });
    const target = response.headers.get("location");
    if (response.status !== 301 || new URL(target || "/", legacy).href !== url) {
      errors.push(`${legacy} returned ${response.status} -> ${target || "none"}, expected direct 301 -> ${url}`);
    }
  } catch (error) { errors.push(`${legacy}: ${error.message}`); }
}

for (const pathname of assets) {
  try {
    const response = await fetch(`${site}${pathname}`);
    if (response.status !== 200) errors.push(`Asset ${pathname} returned ${response.status}`);
  } catch (error) { errors.push(`Asset ${pathname}: ${error.message}`); }
}

const robots = await fetch(`${site}/robots.txt`);
const body = await robots.text();
if (robots.status !== 200 || !body.includes(`Sitemap: ${site}/sitemap.xml`) || /Disallow:\s*\//i.test(body)) errors.push("robots.txt blocks pages or points to another sitemap");
const publishedMap = await (await fetch(`${site}/sitemap.xml`)).text();
if (publishedMap !== sitemap) errors.push("Published sitemap differs from repository sitemap");

console.log(`Checked ${urls.length} pages, ${urls.length - 1} direct 301 redirects, ${assets.size} assets.`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}
