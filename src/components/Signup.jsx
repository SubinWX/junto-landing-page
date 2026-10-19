import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";

const HUBSPOT_SCRIPT = "https://js.hsforms.net/forms/embed/v2.js";
const HUBSPOT_FORM = {
  portalId: "2146248",
  formId: "05bb8e23-6431-4474-b2ef-4b7a0309a284",
  region: "na1",
};
const TARGET_ID = "hubspot-signup-form";

// Load the HubSpot embed script once, however many times the effect runs.
let scriptPromise;
function loadHubSpot() {
  if (window.hbspt) return Promise.resolve(window.hbspt);
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = HUBSPOT_SCRIPT;
    script.charset = "utf-8";
    script.async = true;
    script.onload = () => resolve(window.hbspt);
    script.onerror = () => {
      scriptPromise = undefined;
      reject(new Error("HubSpot form script failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export default function Signup() {
  const created = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Guard against StrictMode's double effect run creating two forms.
    if (created.current) return;
    created.current = true;

    loadHubSpot()
      .then((hbspt) =>
        hbspt.forms.create({
          ...HUBSPOT_FORM,
          target: `#${TARGET_ID}`,
          // Drop HubSpot's default theme; the page styles the form instead.
          css: "",
        })
      )
      .catch(() => setFailed(true));
  }, []);

  return (
    <section className="signup" id="early-access" aria-labelledby="signup-title">
      <div className="wrap">
        <Reveal>
          <h2 id="signup-title">
            Ready to run your global team
            {" "}<br />
            with less chaos?
          </h2>
          <p className="signup-copy">
            Sign up to be among the first to get access once Junto opens.
            {" "}<br />
            We'll email you as soon as your spot is ready.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="signup-embed" id={TARGET_ID} />
          {failed && (
            <p className="signup-done" role="status">
              The signup form didn't load. Please refresh the page or try again later.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
