import Reveal from "./Reveal.jsx";

const cards = [
  {
    icon: "/images/icon-hours.svg",
    title: "Chasing contractors for hours and invoices",
    body: "Late timesheets, missing invoices, and a different format every time.",
  },
  {
    icon: "/images/icon-profit.svg",
    title: "No source of truth for profitability",
    body: "Hours, costs, and rates are scattered across tools, so you can’t tell if a project is making or losing money.",
  },
  {
    icon: "/images/icon-global.svg",
    title: "Paying a global team is complex and expensive",
    body: "Different countries and currencies turn every payment into its own small project.",
  },
];

export default function Problems() {
  return (
    <section className="problems" aria-labelledby="problems-title">
      <div className="wrap wrap-narrow">
        <Reveal>
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
                <img src={card.icon} alt="" width="41" height="41" />
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
