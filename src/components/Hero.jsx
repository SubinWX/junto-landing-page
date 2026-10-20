import { useRef, useState } from "react";

// The banner is rebuilt from the two layers of its Figma export (desktop
// dashboard and phone) so each can animate in on its own. Positions are in
// artboard pixels; the full artboard is 684px wide, the cropped one 549px.
const ART_HEIGHT = 540;

function HeroShot({ width, className, label }) {
  const pct = (value, base) => `${(value / base) * 100}%`;
  const cq = (value) => `${(value / width) * 100}cqw`;

  return (
    <div
      className={`hero-shot ${className}`}
      style={{ aspectRatio: `${width} / ${ART_HEIGHT}` }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <img
        className="hero-layer hero-layer-dashboard"
        src="/images/hero-dashboard.webp"
        alt=""
        fetchPriority="high"
        style={{
          left: pct(28, width),
          top: pct(28, ART_HEIGHT),
          width: pct(634, width),
          height: pct(394, ART_HEIGHT),
          borderRadius: cq(16),
          boxShadow: `0 0 ${cq(28)} rgba(0, 0, 0, 0.13)`,
        }}
      />
      <img
        className="hero-layer hero-layer-phone"
        src="/images/hero-phone.webp"
        alt=""
        style={{
          left: pct(113, width),
          top: pct(232, ART_HEIGHT),
          width: pct(149, width),
          height: pct(297, ART_HEIGHT),
          borderWidth: cq(5),
          borderRadius: cq(21),
          boxShadow: `0 0 ${cq(22)} rgba(0, 0, 0, 0.14)`,
        }}
      />
    </div>
  );
}

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
            <HeroShot
              width={684}
              className="hero-shot-full"
              label="Junto dashboard showing payments, invoices, and contractor status"
            />
            <HeroShot width={549} className="hero-shot-crop" />
          </div>
        </div>
      </div>
    </section>
  );
}
