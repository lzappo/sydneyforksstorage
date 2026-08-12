# Sydney Forks Self Storage – Landing Page

A modern, SEO-optimized marketing site for Sydney Forks Self Storage in Sydney Forks, Nova Scotia.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Content sources (single source of truth)

Some copy appears both on the page and in the JSON-LD structured data in
`index.html`. To stop the two from drifting apart, that content lives in one
place and is injected into `index.html` at build time by the
`inject-structured-data` plugin in `vite.config.js` (it runs in `npm run dev`
too):

| Edit here | Updates |
| --- | --- |
| `src/config/pricing.js` | Unit cards, the sizes FAQ answer, and the `priceRange` + `hasOfferCatalog` offers in the SelfStorage schema |
| `src/config/faqs.js` | The FAQ section and the whole `FAQPage` schema |

Notes:
- `index.html` holds tokens (`"__UNIT_OFFERS__"`, `"__FAQ_ENTITIES__"`,
  `__PRICE_RANGE__`) instead of literal content. The build **fails** on any
  token it can't fill, so a rename can't silently ship broken structured data.
- The sizes FAQ answer is generated from `units` — the count ("three sizes"),
  each dimension, and each price. Adding or repricing a unit needs no copy edit.
- FAQ answers can surface directly in Google results, detached from the page,
  so keep them self-contained (say "on our website", not "on this page").

### Contact details are intentionally NOT centralized

The phone number and address are repeated across the site. This was considered
for the same `src/config/` treatment as pricing and decided against — it is a
deliberate choice, not an unfinished chore:

- **The value has never changed.** Across the repo's history, `902-574-2282` is
  the only phone number it has ever contained; same for `2627 King's Rd` and the
  postal code. Every commit that touches those strings is structural (adding a
  section, moving meta tags), never a change of value. Pricing and promo copy, by
  contrast, churn regularly — which is why those *are* centralized.
- **Nothing has drifted.** All occurrences currently agree.
- **A single constant wouldn't collapse them anyway.** Three forms are each
  required by their context, so a shared module would still need three
  accessors, and each call site would still have to pick the right one:

  | Form | Used for |
  | --- | --- |
  | `902-574-2282` | human-readable display |
  | `tel:9025742282` | `href` — digits only |
  | `+1-902-574-2282` | `telephone` in the SelfStorage schema |

#### If the number or address ever does change

It's a 16-occurrence edit across 9 files (the greps below report 15 lines —
`Footer.jsx` carries both forms on one line). The `tel:` links are the easy ones
to miss — a stale one silently breaks click-to-call instead of looking wrong.
Start by listing every occurrence:

```bash
grep -rn "902-574-2282\|9025742282" --include="*.jsx" --include="*.js" --include="*.html" src index.html
grep -rn "King's Rd\|B1L1A1\|46.0683" --include="*.jsx" --include="*.js" --include="*.html" src index.html
```

Files to expect: `index.html`, `src/config/faqs.js`, the `Hero`, `Units`,
`Contact` and `Location` sections, and the `Header`, `Footer` and `MobileCTA`
components. If it turns out to change more than once, revisit the decision above
and add a `src/config/business.js`.

### Minor known inconsistency

"9.5 foot ceilings" in the `Features` section and the `Units` subtitle vs
"9.5-foot ceilings" in the sizes FAQ answer. Cosmetic hyphenation drift, not
worth centralizing — just pick one if you're editing that copy anyway.

## Where to add real content

### Address
- **Location component** (`src/components/Location.jsx`): Update the `address` variable and uncomment/add the full street address in the NAP block and JSON-LD schema.
- **App.jsx**: Uncomment the `address` object in `localBusinessSchema` and add your full street address.

### Google Maps & Place ID
Copy `.env.example` to `.env` and add:
- `VITE_GOOGLE_MAPS_API_KEY` – From [Google Cloud Console](https://console.cloud.google.com/). Enable **Places API (New)** for live Google reviews (with author names). Legacy Places API is used as a fallback.
- `VITE_GOOGLE_PLACE_ID` – Your business Place ID (used for the map embed, reviews, and "Read more on Google" link).

**Google reviews** are fetched via `/api/reviews` (server-side to avoid CORS). Locally, the Vite dev server proxies this to the Places API. For production, deploy to **Vercel** so the `api/reviews.js` serverless function runs. Add `GOOGLE_MAPS_API_KEY` and `GOOGLE_PLACE_ID` to your Vercel project env vars (or reuse the `VITE_` ones). Ensure billing is enabled on your Google Cloud project.

### Site URL
- Add `VITE_SITE_URL=https://yourdomain.com` to `.env` for canonical and Open Graph URLs.
- Update `robots.txt` and `sitemap.xml` in `/public` with your production domain.

### Images
- **Source images** go in `src/assets/` (JPEG, PNG, etc.).
- **Optimized images** used by the site are in `src/assets/optimized/` (resized to max 1920px for performance).
- To add new photos: place them in `src/assets/`, then run:
  ```bash
  sips -Z 1920 src/assets/yourphoto.jpeg --out src/assets/optimized/yourphoto.jpeg
  ```
  Then import from `../assets/optimized/` in your components.

## Formspree (optional)

1. Create a form at [formspree.io](https://formspree.io).
2. Create `.env` in the project root and add:
   ```
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   ```
3. Restart the dev server. If not set, the form falls back to `mailto:`.

## Project structure

```
src/
├── App.jsx           # Main app, SEO meta, JSON-LD schema
├── main.jsx
├── styles.css        # Global styles
├── assets/           # Source images
├── assets/optimized/ # Resized images (max 1920px) – used by the app
└── components/
    ├── Header.jsx
    ├── Hero.jsx
    ├── Gallery.jsx
    ├── Features.jsx
    ├── Units.jsx
    ├── WhyChooseUs.jsx
    ├── Reviews.jsx
    ├── Location.jsx
    ├── Contact.jsx
    ├── Footer.jsx
    └── MobileCTA.jsx
public/
├── robots.txt
└── sitemap.xml
```
# sydneyforksstorage
