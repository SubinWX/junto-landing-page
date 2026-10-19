import Reveal from "./Reveal.jsx";

const steps = [
  {
    title: "Set up your projects",
    body: "Clients, projects, sprints, budgets, and team rates.",
    image: "/images/dashboard.png",
  },
  {
    title: "Contractors track and invoice",
    body: "Hours down to the sprint, invoices manual or automatic.",
    image: "/images/dashboard.png",
  },
  {
    title: "Approve and pay",
    body: "Review invoices and process payments in Junto.",
    image: "/images/dashboard.png",
  },
];

export default function Steps() {
  return (
    <section className="steps" aria-labelledby="steps-title">
      <div className="steps-glow" aria-hidden="true" />
      <div className="wrap steps-grid">
        <Reveal className="steps-head">
          <h2 id="steps-title">
            From tracked hour to paid invoice, <span>all connected</span>
          </h2>
        </Reveal>

        <ol className="step-list">
          {steps.map((step, index) => (
            <Reveal key={step.title} as="li" delay={index * 110} className="step">
              <div className="step-copy">
                <span className="step-num">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              <div className="step-media">
                <img src={step.image} alt="" width="1440" height="894" loading="lazy" decoding="async" />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
