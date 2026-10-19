import Reveal from "./Reveal.jsx";

export default function Testimonial() {
  return (
    <section className="testimonial" aria-labelledby="testimonial-title">
      <div className="wrap testimonial-grid">
        <Reveal className="testimonial-photo">
          <img
            src="/images/founders-photo.jpg"
            alt="Martijn van Dooren, CEO of WX Agency, with Melvin Heinsius"
            width="860"
            height="743"
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <Reveal delay={120} className="testimonial-copy">
          <h2 id="testimonial-title">
            Built by an agency,
            {" "}<br />
            <span>for teams like yours</span>
          </h2>
          <figure className="testimonial-quote">
            <blockquote>
              <p>
                “We run a global agency. Four years ago we couldn't find a platform that fit how we
                work, and the ones that came close were priced for big enterprises. So we built
                Junto and have used it ever since.
              </p>
              <p>Now we're opening it up to other small and mid-size companies.”</p>
            </blockquote>
            <figcaption>
              <p className="testimonial-name">— Martijn van Dooren</p>
              <p className="testimonial-role">CEO WX AGENCY</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
