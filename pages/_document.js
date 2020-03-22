import Document, { Html, Head, Main, NextScript } from 'next/document'

const siteUrl = 'https://stumptownbear.com'
const siteName = 'Rainbow Trip'
const author = 'Evan Krambuhl'
const handle = '@eeveekreevee'
const description = ''

export default  class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          { /* Description */ }
          <meta name="author" content={author} />
          <meta name="description" content={description} />

          { /* PWA tags */ }
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-title" content={siteName} />
          { /* <link rel="manifest" href="/static/manifest/manifest.json" /> */ }

          { /* Twitter card */ }
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={siteName} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:site" content={handle} />
          <meta name="twitter:creator" content={handle} />
          <meta name="twitter:image" content={`${siteUrl}/static/social-image-twitter.jpg`} />

          { /* Open Graph */ }
          <meta property="og:url" content={siteUrl} />
          <meta property="og:title" content={siteName} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={`${siteUrl}/static/social-image-og.jpg`} />

          { /* Fonts */ }
          <link rel="preconnect" href="https://use.typekit.net" />
          <link rel="preload" as="style" rel="stylesheet" href="https://use.typekit.net/wwp8trw.css" crossOrigin="" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
