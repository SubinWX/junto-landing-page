// Post-build step: inject pre-rendered HTML, structured data, and absolute-URL
// SEO tags into dist/index.html, then write robots.txt, sitemap.xml, and
// llms.txt.
//
// Set the live domain when building so canonical / Open Graph tags and the
// sitemap can be generated:
//   SITE_URL=https://www.example.com npm run build
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const siteUrl = (process.env.SITE_URL || "").replace(/\/+$/, "");
if (!siteUrl) {
  console.warn(
    "\n[prerender] SITE_URL is not set. Skipping canonical, og:url, og:image, and sitemap.xml." +
      "\n[prerender] Build with SITE_URL=https://your-domain npm run build before deploying.\n"
  );
}

const { render, faqItems } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const description =
  "Junto brings time tracking, invoicing, and contractor payments into one platform, so you always know who worked on what, what it cost, and what you earn.";

// ---- Structured data (JSON-LD) ------------------------------------------
const withUrl = (obj, extra) => (siteUrl ? { ...obj, ...extra } : obj);

const graph = [
  withUrl(
    { "@type": "Organization", "@id": "#organization", name: "Junto" },
    { "@id": `${siteUrl}/#organization`, url: `${siteUrl}/`, logo: `${siteUrl}/images/logo.svg` }
  ),
  withUrl(
    { "@type": "WebSite", name: "Junto", description, inLanguage: "en" },
    { "@id": `${siteUrl}/#website`, url: `${siteUrl}/`, publisher: { "@id": `${siteUrl}/#organization` } }
  ),
  withUrl(
    {
      "@type": "SoftwareApplication",
      name: "Junto",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description,
      featureList: [
        "Time tracking by client, project, and sprint",
        "Contractor invoicing, manual or auto-filled from tracked time",
        "Invoice approval and payments",
        "Team management with billable and cost rates",
        "Project margin reporting in real time",
      ],
    },
    { url: `${siteUrl}/`, image: `${siteUrl}/og-image.jpg` }
  ),
  {
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
  /</g,
  "\\u003c"
);

const absoluteTags = siteUrl
  ? [
      `<link rel="canonical" href="${siteUrl}/" />`,
      `<meta property="og:url" content="${siteUrl}/" />`,
      `<meta property="og:image" content="${siteUrl}/og-image.jpg" />`,
      `<meta name="twitter:image" content="${siteUrl}/og-image.jpg" />`,
    ].join("\n    ")
  : "";

// ---- index.html ----------------------------------------------------------
const indexPath = path.join(dist, "index.html");
let html = await readFile(indexPath, "utf8");

const replaceOnce = (needle, value) => {
  if (!html.includes(needle)) throw new Error(`[prerender] Missing "${needle}" in dist/index.html`);
  html = html.replace(needle, () => value);
};

replaceOnce('<div id="root"></div>', `<div id="root">${render()}</div>`);
replaceOnce("<!--seo:absolute-urls-->", absoluteTags);
replaceOnce(
  "<!--seo:structured-data-->",
  `<script type="application/ld+json">${jsonLd}</script>`
);
await writeFile(indexPath, html);

// ---- robots.txt / sitemap.xml -------------------------------------------
await writeFile(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ""}`
);

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  await writeFile(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`
  );
}

// ---- llms.txt (plain-text summary for AI assistants) ---------------------
const llms = `# Junto

> ${description}

Junto is in beta. It is built for small and mid-size teams that work with contractors in more than one country.

## What Junto does

- Time tracking by client, project, and sprint
- Contractor invoicing, manual or auto-filled from tracked time
- Invoice approval and payments inside Junto (Stripe during beta)
- Team management with billable and cost rates
- Real-time margins on every project

## Who built it

Junto was built by WX Agency, a global agency that has used it internally for four years before opening it to other teams.

## FAQ

${faqItems.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n")}
${siteUrl ? `\n## Links\n\n- Join the beta: ${siteUrl}/#early-access\n` : ""}`;
await writeFile(path.join(dist, "llms.txt"), llms);

await rm(ssrDir, { recursive: true, force: true });
console.log(`[prerender] dist/index.html pre-rendered${siteUrl ? ` for ${siteUrl}` : ""}.`);
