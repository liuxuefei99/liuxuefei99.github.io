# Xuefei Liu Homepage

Personal academic homepage rebuilt as a static React site with a dynamic single-cell spatial scene.

## Local

```bash
npm.cmd install
npm.cmd run dev
```

## Build

```bash
npm.cmd run build
```

The production output is written to `dist/`.

## Publish

This project is ready for static hosting. The included GitHub Pages workflow publishes `dist/` after pushing to the `main` branch and enabling GitHub Pages with the source set to "GitHub Actions".

Vercel, Netlify, and Cloudflare Pages can also deploy it with:

- Build command: `npm.cmd run build`
- Output directory: `dist`
