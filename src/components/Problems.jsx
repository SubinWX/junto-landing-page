import Reveal from "./Reveal.jsx";
import iconHours from "../../public/images/icon-hours.svg?raw";
import iconProfit from "../../public/images/icon-profit.svg?raw";
import iconGlobal from "../../public/images/icon-global.svg?raw";

// Inline the icons (instead of <img>) so their strokes can draw on when the
// card scrolls in. pathLength="1" normalises every stroke for the dash trick.
const inline = (svg) =>
  svg
    .replace(/<svg /, '<svg aria-hidden="true" focusable="false" class="card-icon" ')
    .replaceAll("<path ", '<path pathLength="1" ');

const cards = [
  {
    icon: inline(iconHours),
    title: "Chasing contractors for hours and invoices",
    body: "Late timesheets, missing invoices, and a different format every time.",
  },
  {
    icon: inline(iconProfit),
    title: "No source of truth for profitability",
    body: "Hours, costs, and rates are scattered across tools, so you can’t tell if a project is making or losing money.",
  },
  {
    icon: inline(iconGlobal),
    title: "Paying a global team is complex and expensive",
    body: "Different countries and currencies turn every payment into its own small project.",
  },
];

export default function Problems() {
  return (
    <section className="problems" aria-labelledby="problems-title">
      <div className="wrap wrap-narrow">
        <Reveal variant="mask">
          <h2 id="problems-title">Managing a global team shouldn’t take five tools</h2>
        </Reveal>
        <Reveal delay={90}>
          <p className="problems-copy">
            Hours in one app. Invoices in your inbox. Payments somewhere else.
            {" "}<br />
            The platforms that solve this properly are priced for enterprises, so most
            {" "}<br />
            small teams end up patching it together by hand.
          </p>
        </Reveal>

        <div className="card-grid">
          {cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 110} className="card-reveal">
              <article className="card">
                <span className="card-icon-wrap" dangerouslySetInnerHTML={{ __html: card.icon }} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
