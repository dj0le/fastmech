# FastMech Frontend Update Plan

## Context

The fastmech frontend (`~/dev/personal/fastmech`) was recently redeployed to a standard nginx reverse proxy setup on the VPS. The frontend and backend now share a single domain (`mech-index.com`) with nginx routing `/api/` to the backend and `/static/` to the backend's static files. The frontend needs:

1. API URL configuration fixed for the new nginx setup
2. Dependencies bumped from pre-release Svelte 5 to current stable
3. Carousel rewritten using the cleaner implementation from orbat/frontend

## Critical Files

**FastMech (target):**
- `src/routes/+page.svelte` - main carousel page (rewrite)
- `src/routes/+page.server.ts` - server data loading (update URL handling)
- `src/routes/details/[id]/+page.ts` - detail data loading (update URL handling)
- `src/routes/details/[id]/+page.svelte` - detail page (minor fixes)
- `src/lib/types.ts` - type defs (fix `role` type from number to string)
- `src/app.css` - global styles (responsive carousel styles)
- `package.json` - dependency versions
- `.github/workflows/deploy.yml` - build args
- `Dockerfile` - env vars

**Orbat (source for carousel logic):**
- `~/dev/orbat/frontend/src/routes/images/+page.svelte` - reference carousel

**VPS (deployment config, read-only reference):**
- `~/dev/personal/vps/nginx/conf.d/mech-index.conf` - nginx proxy rules
- `~/dev/personal/vps/docker-compose.yml` - container env vars

## Step 1: Fix API URL Configuration

The new nginx setup means client-side requests can use relative paths since frontend and backend share the same domain.

**Current state:**
- `+page.server.ts` uses `env.API_URL` (private, server-side) = `http://mech-api` in docker-compose
- `+page.svelte` and `details/[id]/+page.ts` use `PUBLIC_API_URL` for client-side fetch and image URLs
- Deploy workflow hardcodes `PUBLIC_API_URL=https://mech-index.com`

**New approach:**
- Server-side (`+page.server.ts`): keep `API_URL=http://mech-api` (container-to-container, works as-is)
- Client-side API calls: use relative paths with `/api/` prefix (nginx strips it)
- Client-side static files: use relative `/static/` paths (nginx proxies directly)
- Remove `PUBLIC_API_URL` entirely since relative paths work behind the shared nginx

**Changes:**
- `src/routes/+page.svelte`: change image src from `{PUBLIC_API_URL}/static/thumbs/...` to `/static/thumbs/...`
- `src/routes/details/[id]/+page.ts`: change fetch from `${PUBLIC_API_URL}/details/...` to `/api/details/...`
- `src/routes/+page.server.ts`: no change needed (already correct for SSR)
- `.github/workflows/deploy.yml`: remove `PUBLIC_API_URL` build arg
- `Dockerfile`: remove `PUBLIC_API_URL` ARG/ENV lines

## Step 2: Bump Dependencies to Stable

Update `package.json` from pre-release to current stable versions:

- `svelte`: `^5.0.0-next.1` -> `^5.0.0` (stable)
- `@sveltejs/kit`: `^2.0.0` -> `^2.0.0` (already fine, npm will resolve latest 2.x)
- `@sveltejs/vite-plugin-svelte`: `^3.0.0` -> `^4.0.0` (matches svelte 5 stable)
- `vite`: `^5.0.3` -> `^6.0.0` (current)
- `svelte-check`: `^3.6.0` -> `^4.0.0` (matches svelte 5)
- Other deps: check for any breaking changes

Run `npm install` and fix any resulting issues.

## Step 3: Rewrite Carousel with Orbat Pattern

Replace the current DOM-manipulating `$effect` carousel with the orbat-style `$derived.by()` reactive approach.

**What to port from orbat:**
- `visibleCards` as `$derived.by()` instead of a plain array computed once
- `cardStyles` as `$derived.by()` computing transforms reactively
- `navigateCarousel(direction)` function (clean replacement for event-listener approach)
- Responsive card sizing with `clamp(200px, 25vw, 350px)` instead of fixed 280px
- `top: 50%` + `translateY(calc(-50% + ...))` positioning (better centering)
- Svelte `style:` attribute bindings instead of imperative DOM style updates

**What to keep from fastmech:**
- Server-side data fetching in `+page.server.ts` (no filters needed for static mech list)
- Open-props styling (no Tailwind migration)
- Card content layout (mech chassis name, weight class, role, "Overview" link)
- Detail page navigation and structure
- Header/footer as-is

**What NOT to port:**
- Orbat's filtering/search UI (mech-index has a static list of 96 mechs)
- Orbat's collection toggle (units/soldiers)
- Orbat's client-side fetching pattern
- Tailwind classes

**Core logic rewrite in +page.svelte:**
```
// Replace imperative $effect DOM manipulation with:
let currentCard = $state(0);

let visibleCards = $derived.by(() => {
  // compute which 8 cards surround each card position
  // same offset logic [-4,-3,-2,-1,1,2,3,4] but as reactive derived state
});

let cardStyles = $derived.by(() => {
  // compute transform, opacity, zIndex, filter for each card
  // based on its position relative to currentCard
});

function navigateCarousel(direction: 'left' | 'right') {
  currentCard = direction === 'right'
    ? visibleCards[currentCard][4]
    : visibleCards[currentCard][3];
}
```

Then in the template, apply styles declaratively:
```svelte
{#each data.mechs as mech, i}
  <div class="carousel-card"
    style:transform={cardStyles[i]?.transform}
    style:opacity={cardStyles[i]?.opacity}
    style:z-index={cardStyles[i]?.zIndex}
    style:filter={cardStyles[i]?.filter}>
    ...
  </div>
{/each}
```

**CSS updates:**
- Card width: `clamp(200px, 25vw, 350px)` instead of fixed `280px`
- Card positioning: `top: 50%; left: 50%` with negative margin offset
- Keep open-props variables for colors/surfaces
- Update responsive breakpoints if needed

## Step 4: Fix Type Definition

In `src/lib/types.ts`, the `MechShort` interface has `role: number` but it should be `role: string` (the API returns a string like "Scout").

## Step 5: Update Detail Page

- `src/routes/details/[id]/+page.ts`: update fetch URL to use `/api/details/${params.id}`
- `src/routes/details/[id]/+page.svelte`: replace hardcoded `totalMechs = 96` with dynamic count from data if possible, or at minimum keep it but add a comment
- Update fullsize image URL to use relative `/static/fullsize/...` path

## Verification

1. Run `npm install` and `npm run build` to confirm dependencies resolve and project builds
2. Run `npm run dev` and verify:
   - Carousel renders and navigates left/right
   - Cards have 3D perspective transforms and smooth transitions
   - Responsive sizing works across viewport widths
   - Image URLs resolve (will need backend running or will 404 gracefully)
3. Run `npm run check` for TypeScript/Svelte validation
4. Verify no remaining references to `PUBLIC_API_URL` in source code
