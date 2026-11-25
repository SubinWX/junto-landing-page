import { useEffect, useRef, useState } from "react";

// Fades children in once they scroll into view. `variant` picks the entrance:
// "up" (default), "left", "right", "scale", "mask" (heading rises from behind
// a clip), or "clip" (wipes open from the bottom). Nested elements can key
// their own animations off `.reveal.is-in` and the `--delay` custom property.
export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  threshold = 0.22,
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-in" : ""} ${className}`.trim()}
      data-variant={variant}
      style={{ transitionDelay: `${delay}ms`, "--delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
