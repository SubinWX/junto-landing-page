import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";

const DURATION = 6500;

// Each illustration is rebuilt from the layers of its Figma export, so every
// card can animate in on its own. Coordinates are in artboard pixels.
// `from` sets the entrance: "left" / "right" slide in from that edge, "up"
// rises, and "pop" scales in.
const steps = [
  {
    title: "Set up your projects",
    body: "Create clients, projects, and sprints. Add budgets, assign your team, and set each person's billable rate and cost rate.",
    art: {
      width: 626,
      height: 522,
      fit: 78,
      layers: [
        { src: "setup-revenue", x: 0, y: 24, w: 543, h: 251, radius: 9, from: "up" },
        { src: "setup-projects", x: 26, y: 312, w: 328, h: 210, radius: 9, shadow: 0.06, from: "up" },
        { src: "setup-roi", x: 264, y: 6, w: 139, h: 70, radius: 10, shadow: 0.23, from: "pop" },
        { src: "setup-chip-a", x: 410, y: 300, w: 177, h: 72, from: "pop" },
        { src: "setup-chip-b", x: 378, y: 408, w: 190, h: 80, from: "pop" },
        { src: "setup-chip-c", x: 473, y: 380, w: 153, h: 65, from: "pop" },
      ],
    },
  },
  {
    title: "Contractors track and invoice",
    body: "Contractors log time down to the sprint, then submit invoices, created manually or auto-filled from their tracked hours.",
    art: {
      width: 718,
      height: 516,
      fit: 100,
      align: "start",
      layers: [
        { src: "invoice-filters", x: 0, y: 0, w: 693, h: 96, from: "left" },
        { src: "invoice-table", x: 243, y: 132, w: 475, h: 329, radius: "15 0 0 15", from: "right" },
        { src: "invoice-hours", x: 123, y: 259, w: 186, h: 245, radius: "14 14 0 0", shadow: 0.07, from: "up" },
      ],
    },
  },
  {
    title: "Approve and pay",
    body: "Review and approve invoices, then process payments inside Junto. Powered by Stripe during beta.",
    art: {
      width: 699,
      height: 474,
      fit: 97,
      align: "start",
      layers: [
        { src: "pay-table", x: 0, y: 0, w: 433, h: 370, radius: "0 16 16 0", from: "left" },
        { src: "pay-status", x: 388, y: 52.23, w: 184.08, h: 119.96, radius: 12, shadow: 0.15, from: "pop" },
        { src: "pay-avatar", x: 514.17, y: 15, w: 85.83, h: 85.83, radius: "50%", ring: true, from: "pop" },
        { src: "pay-payment", x: 455, y: 230, w: 159, h: 235, radius: 11, shadow: 0.09, from: "up" },
        { label: "Successfully processed", x: 528.1, y: 237.1, w: 170.8, h: 30.8, from: "pop" },
      ],
    },
  },
];

// Artboard pixels to container-relative units, so the art scales as one piece.
const cq = (px, base) => `${(px / base) * 100}cqw`;

function radiusFor(radius, base) {
  if (radius === undefined) return undefined;
  if (typeof radius === "string" && radius.includes("%")) return radius;
  return String(radius)
    .split(" ")
    .map((value) => cq(Number(value), base))
    .join(" ");
}

function Scene({ art, className = "" }) {
  return (
    <div
      className={`scene ${className}`.trim()}
      data-align={art.align}
      style={{ "--scene-width": `${art.fit}%` }}
    >
      <div className="scene-art" style={{ aspectRatio: `${art.width} / ${art.height}` }}>
        {art.layers.map((layer, index) => {
          const style = {
            left: `${(layer.x / art.width) * 100}%`,
            top: `${(layer.y / art.height) * 100}%`,
            width: `${(layer.w / art.width) * 100}%`,
            height: `${(layer.h / art.height) * 100}%`,
            borderRadius: radiusFor(layer.radius, art.width),
            "--i": index,
          };
          if (layer.shadow) {
            style.boxShadow = `0 0 ${cq(12, art.width)} rgba(0, 0, 0, ${layer.shadow})`;
          }

          if (layer.label) {
            return (
              <span
                key={layer.label}
                className="scene-layer scene-pill"
                data-from={layer.from}
                style={{ ...style, fontSize: cq(12.5, art.width) }}
              >
                {layer.label}
              </span>
            );
          }

          return (
            <img
              key={layer.src}
              className={layer.ring ? "scene-layer scene-ring" : "scene-layer"}
              data-from={layer.from}
              src={`/images/step-${layer.src}.webp`}
              alt=""
              loading="lazy"
              decoding="async"
              style={style}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Steps() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [played, setPlayed] = useState(false);

  // Once the art has animated in, keep it visible when scrolling back.
  useEffect(() => {
    if (inView) setPlayed(true);
  }, [inView]);

  // Only animate and rotate while the section is on screen, so visitors see
  // the first step play rather than arriving midway through the cycle.
  useEffect(() => {
    setReady(true);
    const node = sectionRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Mobile shows every step at once, so there is nothing to rotate.
    if (window.matchMedia("(max-width: 980px)").matches) return;

    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % steps.length);
    }, DURATION);

    return () => window.clearTimeout(timer);
  }, [active, inView]);

  const sectionClass = ["steps", ready && "is-ready", ready && (inView || played) && "is-playing"]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClass} ref={sectionRef} aria-labelledby="steps-title">
      <div className="steps-glow" aria-hidden="true" />
      <div className="wrap">
        <h2 id="steps-title">
          From tracked hour to paid invoice, <span>all connected</span>
        </h2>
      </div>
      <div className="wrap steps-layout">
        <div className="steps-stage" aria-hidden="true">
          {steps.map((step, index) => (
            <Scene
              key={step.title}
              art={step.art}
              className={index === active ? "is-active" : ""}
            />
          ))}
        </div>

        <div className="steps-copy">
          <ol className="step-list">
            {steps.map((step, index) => {
              const isActive = index === active;
              return (
                <li key={step.title}>
                  <button
                    type="button"
                    className={isActive ? "step is-active" : "step"}
                    aria-current={isActive ? "step" : undefined}
                    onClick={() => setActive(index)}
                  >
                    <span className="step-progress" aria-hidden="true">
                      <span key={isActive ? active : "idle"} />
                    </span>
                    <span className="step-num">{index + 1}</span>
                    <span className="step-copy">
                      <span className="step-title">{step.title}</span>
                      <span className="step-body">{step.body}</span>
                    </span>
                  </button>

                  <Reveal className="step-media">
                    <Scene art={step.art} />
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
