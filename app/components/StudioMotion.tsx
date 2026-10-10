"use client";

import { useEffect } from "react";

/** Progressive enhancement: every element is visible without JS or animation support. */
export function StudioMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;
    const animations = new Set<Animation>();
    const selector = ".reveal, .service-card, .home-process-grid li, .directory-card, .tariff-card, .inner-details article, .mercedes-case-image, .mercedes-delivered li, .pricing-heading, .portfolio-group-heading";
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches) continue;
        const animation = entry.target.animate([
          { opacity: .15, transform: "translateY(28px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 650, easing: "cubic-bezier(.2,.65,.2,1)" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: .08 });
    document.querySelectorAll(selector).forEach(element => observer.observe(element));
    const stop = () => { if (preference.matches) animations.forEach(animation => animation.cancel()); };
    preference.addEventListener("change", stop);
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); preference.removeEventListener("change", stop); };
  }, []);
  return null;
}
