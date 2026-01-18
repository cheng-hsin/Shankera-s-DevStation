import Document, { Html, Head, Main, NextScript } from 'next/document'
import { shankeraPersonSchema, websiteSchema } from '@/lib/schema'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-TW" className="scroll-smooth">
        <Head>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#8b5cf6" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
          {/* Google AdSense */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1485399275405167"
            crossOrigin="anonymous"
          />
          <meta
            name="keywords"
            content="Shankera, DevOps, AWS, Kubernetes, Docker, Terraform, Ansible, CI/CD, 雲端架構, 容器化, 自動化部署"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(shankeraPersonSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
        </Head>
        <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
