import { useEffect, useRef } from "react";

// Page-wide scroll effects driven by one passive, rAF-throttled listener:
// - a reading-progress bar along the top of the viewport
// - `is-scrolled` on <html> once the page leaves the top (header shadow)
// - `--p` on every [data-parallax] element: -1 while its centre is at the
//   bottom of the viewport, 0 at the middle, 1 at the top. CSS turns that
//   into motion, so each element decides how far and which way it moves.
export default function ScrollEffects() {
  const bar = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const max = root.scrollHeight - viewport;

      if (bar.current) {
        bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      }
      root.classList.toggle("is-scrolled", scrollY > 8);

      if (reduce) return;
      for (const node of document.querySelectorAll("[data-parallax]")) {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > viewport + 200) continue;
        const centre = rect.top + rect.height / 2;
        const p = Math.max(-1, Math.min(1, (viewport / 2 - centre) / (viewport / 2 + rect.height / 2)));
        node.style.setProperty("--p", p.toFixed(4));
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={bar} />
    </div>
  );
}
