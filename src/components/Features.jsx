import Reveal from "./Reveal.jsx";

const rows = [
  [
    {
      image: "/images/feature-invoices.svg",
      width: 757,
      height: 515,
      wide: true,
      title: "Submit invoices and pay them, all in one place",
      body: "Contractors submit invoices, manually or auto-filled from tracked time. You approve and pay inside Junto, powered by Stripe during beta.",
    },
    {
      image: "/images/feature-team-2x.png",
      width: 528,
      height: 504,
      wide: false,
      title: "Manage your team",
      body: "Assign people to projects, set billable and cost rates, and see who works on what.",
    },
  ],
  [
    {
      image: "/images/feature-time.svg",
      width: 528,
      height: 504,
      wide: false,
      title: "Time tracking that connects",
      body: "By client, project, and sprint.",
    },
    {
      image: "/images/feature-margins.svg",
      width: 757,
      height: 525,
      wide: true,
      title: "Know your margins on every project",
      body: "Billable vs. actual cost rates, in real time.",
    },
  ],
];

export default function Features() {
  return (
    <section className="features" aria-labelledby="features-title">
      <div className="wrap">
        <Reveal>
          <h2 id="features-title">
            Everything you need to run a profitable
            {" "}<br />
            distributed team
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="features-copy">
            We’ve created a simple and easy-to-use platform to help you manage your digital business.
          </p>
        </Reveal>

        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={rowIndex === 0 ? "feature-row" : "feature-row feature-row-b"}>
            {row.map((card, index) => (
              <Reveal key={card.title} delay={rowIndex * 80 + index * 90} className="feature-reveal">
                <article className={card.wide ? "feature-card feature-card-wide" : "feature-card feature-card-narrow"}>
                  {/* The image shows this text; keep a real heading for search engines and screen readers. */}
                  <h3 className="sr-only">{card.title}</h3>
                  <p className="sr-only">{card.body}</p>
                  <img
                    src={card.image}
                    alt=""
                    width={card.width}
                    height={card.height}
                    loading="lazy"
                    decoding="async"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        ))}

        <Reveal>
          <div className="beta">
            <h2>Join the beta and help shape what we build next</h2>
            <p>
              Get early access, a direct line to our team, and a real say
              {" "}<br />
              in what we build next.
            </p>
            <a className="btn btn-dark" href="#early-access">
              <span>Get early access</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
