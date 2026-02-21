import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

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
        name: 'reviews-api',
        configureServer(server) {
          server.middlewares.use('/api/reviews', async (req, res, next) => {
            if (req.method !== 'GET') return next()
            const apiKey = env.VITE_GOOGLE_MAPS_API_KEY
            const placeId = env.VITE_GOOGLE_PLACE_ID
            if (!apiKey || !placeId) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Missing API key or Place ID' }))
              return
            }
            try {
              const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews&key=${apiKey}`
              const response = await fetch(url)
              const data = await response.json()
              if (data.status !== 'OK') {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: data.status, message: data.error_message }))
                return
              }
              const reviews = (data.result?.reviews || []).map((r) => ({
                text: r.text || '',
                author_name: r.author_name || 'Google user',
                rating: r.rating ?? null,
                profile_photo_url: r.profile_photo_url || null,
                relative_time_description: r.relative_time_description || null,
              }))
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
