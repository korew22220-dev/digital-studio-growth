import type { AnchorHTMLAttributes } from "react";

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Use native document navigation for internal routes on the published Site. */
export default function SiteLink({ href, ...props }: SiteLinkProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  let publishedHref = href;
  if (basePath && href.startsWith("/") && !href.startsWith("//")) {
    const match = href.match(/^([^?#]*)(.*)$/);
    const pathname = match?.[1] || href;
    const suffix = match?.[2] || "";
    const pagePath = pathname === "/" || pathname.endsWith(".html")
      ? pathname
      : `${pathname}.html`;
    publishedHref = `${basePath}${pagePath}${suffix}`;
  }

  return <a href={publishedHref} {...props} />;
}
