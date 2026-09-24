import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const output = path.resolve(process.argv[2] || "dist/client");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

if (!basePath?.startsWith("/") || basePath === "/" || basePath.endsWith("/")) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must be a repository path such as /digital-studio-growth.");
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  }));
  return files.flat();
}

const files = await listFiles(output);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
if (htmlFiles.length < 10 || !htmlFiles.some((file) => path.basename(file) === "index.html")) {
  throw new Error(`Expected the homepage and all static pages in ${output}; found ${htmlFiles.length} HTML files.`);
}

for (const file of htmlFiles) {
  const original = await readFile(file, "utf8");
  const html = original.replaceAll("/_next/", `${basePath}/_next/`);
  await writeFile(file, html);
}

const publishedFiles = await listFiles(output);
const publishedSet = new Set(publishedFiles.map((file) => path.resolve(file)));
const internalUrl = /(?:href|src)="([^\"]+)"/g;
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const [, url] of html.matchAll(internalUrl)) {
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    if (!url.startsWith(`${basePath}/`)) {
      throw new Error(`Unprefixed site URL ${url} in ${path.relative(output, file)}.`);
    }

    const pathname = decodeURIComponent(url.slice(basePath.length).split(/[?#]/, 1)[0]);
    if (pathname.endsWith(".html") || pathname.includes("/_next/") || pathname === "/favicon.svg") {
      const target = path.resolve(output, `.${pathname}`);
      if (!publishedSet.has(target)) {
        throw new Error(`Missing published file for ${url} in ${path.relative(output, file)}.`);
      }
    }
  }
}

// Vinext also emits Cloudflare and RSC-only build metadata; GitHub Pages only
// needs the HTML pages and browser assets.
await Promise.all(files.filter((file) =>
  file.endsWith(".rsc") || file.endsWith(".assetsignore")
).map((file) => rm(file, { force: true })));
await rm(path.join(output, "_headers"), { force: true });
await rm(path.join(output, ".vite"), { recursive: true, force: true });
await rm(path.join(output, "vinext-client-entry-manifest.json"), { force: true });
await writeFile(path.join(output, ".nojekyll"), "");

const finalHtml = (await listFiles(output)).filter((file) => file.endsWith(".html"));
console.log(`Prepared ${finalHtml.length} static pages for GitHub Pages at ${basePath}/.`);
