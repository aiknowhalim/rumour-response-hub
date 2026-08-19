# rumour-response-hub

A minimal **Next.js** app configured for **static export**, scaffolded by
[KnowGitty Projects](https://knowhalim.com/knowgitty-projects). The whole page is
driven by `content/site.json` — you build a real, multi-section site by editing
that one file in the KnowGitty File Manager (or via the GPT/MCP tools). No code
changes required.

## Editing your content

`app/page.js` renders whatever it finds in `content/site.json`. The schema:

```json
{
  "title": "Site title (hero heading)",
  "tagline": "One-line intro under the title (optional)",
  "sections": [
    {
      "heading": "Section heading",
      "body": "One or more paragraphs. Separate paragraphs with a blank line.",
      "items": ["Optional bullet", "Another bullet"]
    }
  ],
  "footer": "Small text at the bottom (optional)"
}
```

Every field is optional and the page degrades gracefully:

- Add a section by appending an object to `sections`.
- Split `body` into paragraphs with a blank line between them.
- Add a bullet list with `items`; omit or empty it for no list.
- Drop `tagline` or `footer` entirely and that piece simply disappears.

You do **not** edit `page.js` to change copy — only `content/site.json`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Deploy — GitHub Pages (default, no extra setup)

This repo ships with `.github/workflows/deploy-pages.yml`. To turn it on:

1. On GitHub go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or re-run the workflow). Your site publishes automatically.

The workflow uses the official `actions/configure-pages` +
`actions/deploy-pages` flow with `static_site_generator: next`, so Next's
`basePath`/`assetPrefix` are set for you. It uses `npm install` (this repo ships
without a `package-lock.json`); commit the lockfile after your first install to
switch to `npm ci` + caching. Use exactly ONE deployment source — GitHub Actions,
not "Deploy from a branch".

If a deploy misbehaves, read **`TROUBLESHOOTING.md`** in this repo first — it maps
symptoms (asset 404s, blank page, wrong content) to fixes.

## Deploy — Azure Static Web Apps (alternative)

Prefer Azure? Create a **Static Web App** in the Azure Portal, point it at this
repo, and use these build settings:

- **App location:** `/`
- **Output location:** `out`
- **Build command:** `npm run build`

Azure will add its own workflow file (`azure-static-web-apps-*.yml`) with your
deployment token. A ready-made job you can adapt:

```yaml
# .github/workflows/azure-static-web-apps.yml (add your AZURE_STATIC_WEB_APPS_API_TOKEN secret)
# name: Azure Static Web Apps CI/CD
# on:
#   push:
#     branches: [ main ]
# jobs:
#   build_and_deploy:
#     runs-on: ubuntu-latest
#     steps:
#       - uses: actions/checkout@v4
#       - uses: Azure/static-web-apps-deploy@v1
#         with:
#           azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
#           action: upload
#           app_location: "/"
#           output_location: "out"
#           app_build_command: "npm run build"
```