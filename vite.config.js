import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchGooglePlaceReviews } from './lib/googleReviews.js'
import { units, priceRange } from './src/config/pricing.js'
import { faqs } from './src/config/faqs.js'

// Indent every line after the first, so the injected JSON lines up with the
// surrounding structured data in index.html.
function indentJson(value, spaces) {
  return JSON.stringify(value, null, 2).replaceAll('\n', `\n${' '.repeat(spaces)}`)
}

// The OfferCatalog entries for the SelfStorage structured data, built from the
// same unit definitions the Units section renders.
function unitOffers() {
  return units.map((unit) => ({
    '@type': 'Offer',
    name: `${unit.tier} Storage Unit (${unit.compactSize})`,
    description: unit.description,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: String(unit.monthlyPrice),
      priceCurrency: 'CAD',
      unitText: 'MON',
    },
  }))
}

// The FAQPage Question entries, built from the same definitions the FAQ section
// renders, so the two can't drift apart.
function faqEntities() {
  return faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }))
}

function injectStructuredData(html) {
  const tokens = {
    // Quoted, so index.html stays valid JSON before the arrays are swapped in.
    '"__UNIT_OFFERS__"': indentJson(unitOffers(), 8),
    '"__FAQ_ENTITIES__"': indentJson(faqEntities(), 6),
    __PRICE_RANGE__: priceRange(),
  }

  const out = Object.entries(tokens).reduce(
    (acc, [token, value]) => acc.replaceAll(token, value),
    html,
  )

  // Fail loudly rather than shipping structured data with a stray token —
  // e.g. if a token in index.html is renamed but not updated here.
  const leftover = out.match(/__[A-Z_]+__/g)
  if (leftover) {
    throw new Error(
      `inject-structured-data: unreplaced token(s) in index.html: ${[...new Set(leftover)].join(', ')}`,
    )
  }

  return out
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const gtmId = (env.VITE_GTM_ID || '').trim()

  return {
    plugins: [
      react(),
      {
        name: 'inject-gtm',
        transformIndexHtml(html) {
          if (gtmId) {
            const gtmHead = `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>`
            const gtmBody = `\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
            return html.replace('<!-- GTM_HEAD -->', gtmHead).replace('<!-- GTM_BODY -->', gtmBody)
          }
          return html
            .replace('<!-- GTM_HEAD -->', '<!-- GTM disabled: set VITE_GTM_ID to enable -->')
            .replace('<!-- GTM_BODY -->', '')
        },
      },
      {
        name: 'inject-structured-data',
        transformIndexHtml(html) {
          return injectStructuredData(html)
        },
      },
      {
        name: 'reviews-api',
        configureServer(server) {
          server.middlewares.use('/api/reviews', async (req, res, next) => {
            if (req.method !== 'GET') return next()
            const apiKey = env.VITE_GOOGLE_MAPS_API_KEY
            const placeId = env.VITE_GOOGLE_PLACE_ID
            try {
              const { reviews, error, status } = await fetchGooglePlaceReviews(apiKey, placeId)
              if (!reviews?.length) {
                res.statusCode = status || 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: error || 'No reviews found' }))
                return
              }
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ reviews }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Failed to fetch reviews' }))
            }
          })
        },
      },
    ],
  }
})
