# AGENTS.md

- Use `npm` for everything here; the repo has `package-lock.json` and no alternative package manager config.
- Main commands: `npm run serve`, `npm run lint`, `npm run build`, `npm run deploy`.
- There is no `test` script. For verification, use `npm run lint` and `npm run build`.
- `npm run deploy` runs `npm run build` first, then publishes `dist/` with `gh-pages`.
- Treat `dist/` and `node_modules/` as generated output. Do not edit them.
- This is a Vue 3 Vue CLI SPA. The app entry is `src/main.js`, which mounts after the router is ready.
- `src/App.vue` is only the top-level nav plus `<router-view />`; the actual pages live in `src/PizzaCalculator.vue` and `src/BreadCalculator.vue`.
- Route metadata is set in `src/router/index.js`; that file also updates `document.title`, meta description/Open Graph tags, and the canonical URL after every navigation.
- If you add or rename a page, update the route, the nav links in `src/App.vue`, and the route `meta` in `src/router/index.js` together.
- The calculators persist state in `localStorage` from component `data()` and watchers. Pizza keys are unprefixed; bread keys use the `bread_` prefix.
- If you add a persisted field, update the default state, watcher, save/load key, and reset logic in the same component.
- `src/registerServiceWorker.js` is imported from `src/main.js`; PWA behavior is production-only.
- `public/index.html` is the base template, but page-specific metadata comes from the router, not from per-page components.
- The site is configured for the root domain (`publicPath: '/'`, `homepage` set in `package.json`, and `public/CNAME` exists). Do not move it under a subpath without reviewing routing and deploy config together.
