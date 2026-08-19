# Troubleshooting — Next.js static export on GitHub Pages

Symptom → fix map for deploying this statically-exported Next.js app. **Read this
first** when a build or deploy misbehaves.

## Deployment source (read this FIRST)

- **Pages Source MUST be "GitHub Actions".** This repo ships a workflow that builds
  the static export (`out/`) and deploys it as a Pages artifact. Pages must be set to
  **Settings → Pages → Build and deployment → Source: GitHub Actions** — NOT "Deploy
  from a branch". KnowGitty configures this automatically when it creates the project,
  so this mainly matters if someone changed it, or if Pages was set up by hand.
- **If a custom workflow exists AND Pages says "Deploy from a branch" → switch to
  GitHub Actions.** Never run both deployment methods: branch mode serves raw repo
  files instead of the built `out/` export, so you get a **blank or broken page** even
  though the Actions run is green.
- **Workflow green but the live page is BLANK → check the Pages Source FIRST**, then
  open the browser console and fix the FIRST red error. A green build+deploy with a
  blank page is almost always the wrong Pages Source (branch mode), not a build bug.
- **Node.js deprecation warnings in the Actions log, with the build + deploy still
  green → ignore them.** They are maintenance/version-support warnings from the
  actions, NOT the cause of an outage. Only investigate steps that actually fail.
- **This repository is PUBLIC.** GitHub Pages on free accounts requires a public repo,
  so anyone can read every file. **Never commit tokens, credentials, private keys,
  API secrets, internal URLs, or personal data** — treat everything here as world-
  readable.

## Success criteria (what a healthy deploy looks like)

- **Pages Source = GitHub Actions** (not "Deploy from a branch").
- The **build** job is green and produces the `out/` artifact (`path: ./out`).
- The **deploy** job is green.
- The live page loads its JS/CSS from `/<repo>/…` (HTTP 200, correct MIME) — the
  `configure-pages` step injects Next's `basePath`/`assetPrefix` for you.
- The UI actually renders at `https://<user>.github.io/<repo>/` — not a blank page.

## Build & lockfile

- **`package-lock.json` missing AND the workflow uses `npm ci` or `cache: npm`** →
  both REQUIRE a committed lockfile and fail the first deploy without one. Run
  `npm install` locally and commit the generated `package-lock.json`, or keep the
  workflow on `npm install` with no npm cache (this repo ships this way).
- **`npm run build` fails** → fix the build first; without it there is no `out/`
  export to deploy.

## Static export & base path

- **`output: 'export'` missing from `next.config.js`** → without it `next build`
  does not emit a static `out/` directory. This repo sets it already.
- **Assets 404 under a Pages project-site subpath** (`<user>.github.io/<repo>/`) →
  Next needs `basePath`/`assetPrefix` set to `/<repo>`. The workflow's
  `actions/configure-pages` step with `static_site_generator: next` injects these
  for you — do NOT hardcode `basePath` as well, or you double the prefix. For a
  custom domain or user/org root site, no basePath is needed.
- **`next/image` errors or blank images on the static site** → static export has no
  image optimization server; set `images.unoptimized: true` (this repo does).
- **Deep links 404 without a trailing slash** → `trailingSlash: true` (set here)
  makes routes export as `route/index.html`, which static hosts serve cleanly.

## Deployment source & artifacts

- **Workflow uploads the repo root instead of the export** → upload `./out` (this
  repo does).
- **The live HTML differs from the exported `out/` HTML** → the wrong output is
  being served. Fix the hosting source / docroot / artifact path / proxy target.
- **A host deploys from a branch while the workflow also deploys artifacts** → pick
  ONE method. In **Settings → Pages → Source** choose **GitHub Actions** (not
  "Deploy from a branch"); never both.
- **JS files return HTML / wrong MIME types** → a catch-all rewrite is redirecting
  asset requests to a page. Serve `.js` as `application/javascript` and `.css` as
  `text/css`, and don't rewrite real asset paths.

## Blank page & runtime

- **Blank screen** → open the browser console and fix the FIRST error.
- **`window`/`document`/`localStorage`/`location` during render** → these run on the
  server at build time; move access into `useEffect`, or guard with
  `typeof window !== "undefined"`.

## Routing

- **Refreshing a client route 404s** → with `trailingSlash: true` most routes export
  as real HTML files. For fully client-driven routes, add a `404.html` fallback.

## Custom domains & caching

- **Custom domain serves the repo root instead of `out/`** → configure the host to
  publish `out/`, or deploy `out/` through its pipeline; remove the Next `basePath`
  (the domain root has no `/<repo>` prefix).
- **Domain shows old content after a successful build** → check DNS, custom-domain
  settings, CDN cache, and whether another server answers on that hostname.

## Env vars & API calls

- **Env vars work locally but fail in production** → browser-exposed vars must be
  prefixed `NEXT_PUBLIC_` AND defined in the deployment environment; they are inlined
  at build time, so rebuild after changing them.
- **An API works locally but fails in production** → check the production API URL,
  CORS, HTTPS, auth, and any proxy config.

## Clean-setup checklist

1. Commit `package-lock.json` (after first `npm install`).
2. `npm ci` in CI only after the lockfile is committed; else `npm install`.
3. `output: 'export'` + `images.unoptimized: true` in `next.config.js`.
4. `static_site_generator: next` in the Pages workflow (injects basePath).
5. `npm run build` produces `out/`.
6. Upload `./out` as the Pages artifact.
7. Exactly ONE deployment source (Settings → Pages → GitHub Actions).
8. The domain points at that deployment (drop basePath for a root/custom domain).
9. JS and CSS bundles all return HTTP 200.

Builds take ~2–6 minutes — watch the **Actions** tab before re-debugging.