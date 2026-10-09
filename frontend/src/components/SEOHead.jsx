import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://dpdp.doaide.com'

function SEOHead({ title, description, path = '/', type = 'website', jsonLd }) {
  const fullUrl = `${BASE_URL}${path}`
  const fullTitle = title.includes('DoAide') ? title : `${title} — DoAide DPDP`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="DoAide DPDP" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}

export default SEOHead
