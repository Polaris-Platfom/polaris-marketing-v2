import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Polaris - Democratic funding platform for community empowerment" />
        <meta name="keywords" content="blockchain, governance, community, funding, democracy, voting" />
        <meta name="author" content="Polaris Platform" />
        <link rel="icon" href="/assets/logos/polaris-logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/assets/icons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 