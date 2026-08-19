/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site into ./out for GitHub Pages / Azure Static Web Apps.
  output: 'export',
  images: {
    // next/image optimization needs a server; disable it for a static export.
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;