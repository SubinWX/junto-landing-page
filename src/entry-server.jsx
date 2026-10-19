// Build-time entry: renders the page to static HTML so crawlers and AI answer
// engines see the full content without running JavaScript.
// Used by scripts/prerender.mjs; never shipped to the browser.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { faqItems } from "./content/faq.js";

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

export { faqItems };
