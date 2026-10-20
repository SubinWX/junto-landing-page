import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Problems from "./components/Problems.jsx";
import Steps from "./components/Steps.jsx";
import Features from "./components/Features.jsx";
import Testimonial from "./components/Testimonial.jsx";
import Signup from "./components/Signup.jsx";
import Footer from "./components/Footer.jsx";
import Faq from "./components/Faq.jsx";

export default function App() {
  // Scroll to in-page sections without adding "#section" to the URL.
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || link.classList.contains("skip-link")) return;

      const id = link.getAttribute("href").slice(1);
      const target = id === "top" ? document.body : id && document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (id === "top") {
        window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      } else {
        target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <div className="orb orb-c" aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <Problems />
        <Steps />
        <Features />
        <Testimonial />
        <Signup />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
