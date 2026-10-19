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
