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

## Where to add real content

### Address
- **Location component** (`src/components/Location.jsx`): Update the `address` variable and uncomment/add the full street address in the NAP block and JSON-LD schema.
- **App.jsx**: Uncomment the `address` object in `localBusinessSchema` and add your full street address.

### Google Maps embed
- **Location component** (`src/components/Location.jsx`): Replace `mapEmbedUrl` with your actual Google Maps embed URL (from Google Maps → Share → Embed a map).

### Google Business Profile
- **Reviews component** (`src/components/Reviews.jsx`): Replace `googleReviewsUrl` with your Google Business Profile / Google Maps listing URL.

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
