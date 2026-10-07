import { mkdir, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const output = path.resolve(process.argv[2] || "dist/client");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

if (basePath === undefined || (basePath !== "" && (!basePath.startsWith("/") || basePath === "/" || basePath.endsWith("/")))) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must be empty or a path such as /digital-studio-growth.");
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  }))).flat();
}

const originalFiles = await listFiles(output);
const originalHtml = originalFiles.filter((file) => file.endsWith(".html"));
if (originalHtml.length < 10 || !originalHtml.includes(path.join(output, "index.html"))) {
  throw new Error(`Expected homepage and static pages; found ${originalHtml.length} HTML files.`);
}

// Vinext exports /route.html. Directory indexes let a plain web server serve
// /route/ directly, including nested service and case pages.
for (const file of originalHtml) {
  const source = await readFile(file, "utf8");
  const html = source.replaceAll('"/_next/', `"${basePath}/_next/`);
  if (path.basename(file) === "index.html") {
    await writeFile(file, html);
    continue;
  }
  const target = path.join(file.slice(0, -".html".length), "index.html");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(file, html);
  await rename(file, target);
}

const publishedFiles = await listFiles(output);
const publishedSet = new Set(publishedFiles.map((file) => path.resolve(file)));
const publishedHtml = publishedFiles.filter((file) => file.endsWith(".html"));
if (publishedHtml.length !== originalHtml.length) throw new Error("A static page was lost while moving HTML files.");

const reference = /(?:href|src)="([^"]+)"/g;
for (const file of publishedHtml) {
  const html = await readFile(file, "utf8");
  for (const [, url] of html.matchAll(reference)) {
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    if (!url.startsWith(`${basePath}/`)) throw new Error(`Unprefixed site URL ${url} in ${path.relative(output, file)}.`);

    const pathname = decodeURIComponent(url.slice(basePath.length).split(/[?#]/, 1)[0]);
    if (pathname.endsWith(".html")) throw new Error(`Old HTML link ${url} in ${path.relative(output, file)}.`);
    const target = path.resolve(output, `.${pathname}`, pathname.endsWith("/") ? "index.html" : "");
    if (!publishedSet.has(target)) throw new Error(`Missing published file for ${url} in ${path.relative(output, file)}.`);
  }
}

// Vinext also emits metadata that a conventional static host does not need.
await Promise.all(originalFiles.filter((file) => file.endsWith(".rsc") || file.endsWith(".assetsignore"))
  .map((file) => rm(file, { force: true })));
await rm(path.join(output, "_headers"), { force: true });
await rm(path.join(output, ".vite"), { recursive: true, force: true });
await rm(path.join(output, "vinext-client-entry-manifest.json"), { force: true });
await writeFile(path.join(output, ".nojekyll"), "");

console.log(`Prepared ${publishedHtml.length} directory-index pages at ${basePath}/.`);
