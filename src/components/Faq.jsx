import { useState } from "react";
import Reveal from "./Reveal.jsx";
import { faqItems as items } from "../content/faq.js";

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="wrap faq-inner">
        <Reveal>
          <p className="faq-kicker">Frequently Asked Questions</p>
          <h2 id="faq-title">Before you join the beta</h2>
        </Reveal>

        <div className="faq-list">
          {items.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            return (
              <Reveal key={item.question} delay={index * 60} className="faq-reveal">
                <div className={isOpen ? "faq-item is-open" : "faq-item"}>
                  <h3 className="faq-q">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <span className="faq-plus" aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="faq-answer" id={panelId} hidden={!isOpen}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
