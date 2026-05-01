# Performance Optimization Roadmap

## Scope

This document records the full optimization work completed for production speed on this Nuxt 2 project, including baseline measurements, code changes, infrastructure updates, validation, and incident fixes.

## Goals

- Improve production user-perceived performance.
- Reduce duplicated API calls and wasted client work.
- Lower initial render payload and runtime overhead.
- Improve asset delivery and caching behavior.
- Keep deployment reproducible with Docker.

## Phase 0: Baseline

### Actions

- Ran production build and server startup.
- Collected route timings with `curl` for representative routes.
- Captured build artifact sizes for comparison.

### Baseline sample metrics

- `/` -> HTTP 200, ~0.90s in one sampled run
- `/search/test` -> HTTP 200, ~23.95s in one sampled run
- `.nuxt` size snapshot captured for before/after comparison

Notes:
- Route timings vary run-to-run due to upstream API latency.
- Search remained backend/API dominated and was identified as primary bottleneck.

## Phase 1: Data Fetch Deduplication and Overfetch Reduction

### 1.1 Store-level request caching

Added lightweight in-memory TTL caches to reduce repeated identical requests:

- `store/fetchBanners.js`
- `store/fetchWeather.js`
- `store/fetchTranslations.js`

Behavior:
- Cache keys include headers and params.
- Entries expire after short TTL windows.

### 1.2 Header/layout duplicate fetch removal

Refactored `components/layout/Header.vue` to remove duplicated ownership:

- Header now consumes `weather` passed from layout (no duplicate weather fetch on initial path).
- Removed duplicate translation API call from Header language watcher.
- Centralized locale-derived UI prep into a single refresh method.

### 1.3 Page-level overfetch cleanup

- `pages/about.vue`
  - Removed unused books fetch in `asyncData`.
- `pages/library.vue`
  - Switched from fetching all tabs at once to lazy-loading only the active tab first, then on-demand tab fetches.
- `pages/news-menu/_index.vue`
  - Removed duplicate mounted-time fetch block that repeated work already done in `asyncData`.
- `pages/all-photo-news.vue`
  - Corrected "load more" to use photo-news endpoint and normalized appended items.

## Phase 2: Payload and Runtime Trimming

### 2.1 Nuxt config cleanup

Updated `nuxt.config.js`:

- Removed duplicated Google Analytics script from `head.script`.
- Kept analytics in plugin path (single initialization flow).
- Removed stale `build.vendor`.
- Enabled `modern: "client"`.
- Added preload tuning for scripts/styles/fonts in `render.bundleRenderer.shouldPreload`.

### 2.2 Analytics dedupe hardening

Updated `plugins/google-analitics.js`:

- Ensures GA script is injected once.
- Uses guarded `window.gtag` initialization.

### 2.3 Audio player SSR safety

- Audio player remains client-only through `~plugins/vue-aplayer.js` with `ssr: false`.
- Removed direct page-level import that caused SSR to access `window`.

## Phase 3: Media and Font Optimization

### 3.1 Image loading behavior

Applied lazy/async image loading hints across card components under `components/cards`:

- Added `loading="lazy"` and `decoding="async"` to card image tags.

### 3.2 Font payload reduction

Reduced Google Fonts families/weights in `nuxt.config.js` to a smaller subset used by the UI.

## Phase 4: Delivery and Caching

### 4.1 Static asset cache headers

Added static cache headers in `nuxt.config.js`:

- `Cache-Control: public, max-age=31536000, immutable` for static assets.

### 4.2 Containerized deployment

Added and validated:

- `Dockerfile` (multi-stage production build)
- `.dockerignore`
- `docker-compose.yml`

## Phase 5: Validation and Regression Checks

### Actions

- Rebuilt app after changes (`npm run build`).
- Route probes for key pages.
- Compose startup verification.
- Lint checks on modified files.

### Result summary

- Build succeeds.
- Key routes verified as HTTP 200 after final SSR fix.
- Search route remains relatively slow and likely needs backend/index/query optimization for major gains.

## Incident Report: SSR RuntimeError

### Symptom

Vue SSR stack trace in `vue-server-renderer/build.prod.js`.

### Root cause

- Browser-only package (`@liripeng/vue-audio-player`) accessed `window` during SSR path when imported directly in page code.

### Fix

- Reverted to client-only plugin loading in `nuxt.config.js`.
- Removed direct `AudioPlayer` page import.

### Final status

- SSR route rendering recovered.
- Home and tested content routes respond successfully.

## Files Updated (High-Level)

- Config/infra:
  - `nuxt.config.js`
  - `Dockerfile`
  - `.dockerignore`
  - `docker-compose.yml`
- Plugins:
  - `plugins/google-analitics.js`
- Layout/components/pages:
  - `components/layout/Header.vue`
  - `pages/about.vue`
  - `pages/library.vue`
  - `pages/news-menu/_index.vue`
  - `pages/all-photo-news.vue`
  - `pages/index.vue`
  - multiple `components/cards/*.vue`
- Store:
  - `store/fetchBanners.js`
  - `store/fetchWeather.js`
  - `store/fetchTranslations.js`
- Documentation:
  - `README.md`
  - `docs/performance-optimization-roadmap.md`

## Recommended Next Steps

- Add backend-side caching/indexing strategy for search endpoints.
- Use Lighthouse/WebPageTest in a production-like environment and track:
  - LCP
  - INP
  - CLS
  - TTFB
  - JS/CSS transferred
- Add a small route-level performance budget checklist to CI.
