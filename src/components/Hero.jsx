import { useRef, useState } from "react";

export default function Hero() {
  const stage = useRef(null);
  const [shift, setShift] = useState({ x: 0, y: 0 });

  function onMove(event) {
    const node = stage.current;
    if (!node) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setShift({ x: x * 18, y: y * 12 });
  }

  function onLeave() {
    setShift({ x: 0, y: 0 });
  }

  return (
    <section className="hero" id="top" ref={stage} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="badge">Now in Beta</p>
          <h1>
            <span className="line">
              <span>Manage global contractors.</span>
            </span>{" "}
            <span className="line">
              <span>Keep every project profitable.</span>
            </span>
          </h1>
          <p className="lede">
            Junto brings time tracking, invoicing, and payments into one platform, so you always
            know who worked on what, what it cost, and what you’re actually earning.
          </p>
          <a className="btn" href="#early-access">
            <span>Get early access</span>
          </a>
        </div>

        <div
          className="hero-visual"
          style={{ transform: `translate3d(${shift.x}px, ${shift.y}px, 0)` }}
        >
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-enter">
            <img
              className="hero-shot hero-shot-full"
              src="/images/dashboard-full.svg"
              alt="Junto dashboard showing payments, invoices, and contractor status"
              width="684"
              height="540"
              fetchPriority="high"
            />
            <img
              className="hero-shot hero-shot-crop"
              src="/images/dashboard.svg"
              width="549"
              height="540"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
