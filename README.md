# Blank Theme (WordPress + Gulp)

Starter kit for building a WordPress theme with a static asset pipeline.

## Overview

This project uses Gulp 5 to build frontend assets for a WordPress theme:
- SCSS -> CSS (Autoprefixer + minification)
- JS bundling with Webpack (single bundle output, no code splitting)
- Image optimization with sharp-based tooling
- SVG optimization and sprite generation

Output assets are written into the theme `assets` directory and are intended for static delivery.

## Requirements

- Node.js: `>=18.20.0 <25`
- npm: `>=9.0.0`

## Install

```bash
npm install
```

## Available Scripts

```bash
npm start      # runs gulp default watch tasks
npm run dev    # same as start
npm run watch  # same as start
npm run build  # production build for all asset groups
npm run clean  # cleans built assets
npm run node:version
```

## Gulp Task Groups

Main grouped tasks in `gulpfile.js`:
- `default`: watch mode for fonts/svg/sprite/images/scripts/styles
- `build`: production build for all groups
- `clean`: clean all generated asset folders

Individual tasks are available per group, for example:
- `fonts:clean`, `fonts:dev`, `fonts:prod`, `fonts:watch`
- `scripts:clean`, `scripts:dev`, `scripts:prod`, `scripts:watch`

## Project Structure (high level)

- `src/js`: source JavaScript
- `src/scss`: source styles
- `src/images`, `src/fonts`, `src/svg`: source static assets
- `gulp/core/config`: pipeline configuration
- `gulp/core/recipes`: build task implementations
- `assets`: compiled output consumed by the WordPress theme
- `app`, `templates`, `partials`, `functions.php`: WordPress theme PHP layer

## Linting / Quality

- ESLint is used for JS linting.
- Current build allows warnings (for example `no-console`) without failing production builds.

## Future Tasks

- Add style loader flow for critical styles in `src/js/main.js` (for critical-path CSS strategy).
- Introduce optional BrowserSync enablement toggle in `gulpfile.js` for local-only live reload.
- Add a minimal CI workflow: install, lint, build.
- Improve frontend baseline script by replacing test console output in `src/js/_generalScripts.js`.
- Add docs for how to include assets in PHP templates and enqueue strategy.

## Notes

- This repository is configured for static frontend output suitable for WordPress themes.
- Keep dependency updates aligned with WordPress ecosystem compatibility expectations.
