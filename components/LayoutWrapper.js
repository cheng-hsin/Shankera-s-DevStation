import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
// import { HeaderAd } from './GoogleAds'

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col">
        <header className="kawaii-header sticky top-0 z-50 px-4 py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center gap-3">
                <div className="float-icon">
                  <img
                    src="/static/favicons/apple-touch-icon.png"
                    alt="logo"
                    className="h-10 w-10 rounded-full border-2 border-purple-300"
                  />
                </div>
                <span className="gradient-text text-xl font-bold">{siteMetadata.headerTitle}</span>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <div className="hidden gap-1 sm:flex">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-purple-700 transition-all hover:bg-purple-50"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <MobileNav />
            </div>
          </div>
        </header>
        {/* Header 廣告欄位 - 暫時關閉，使用 Auto ads */}
        {/* <HeaderAd /> */}
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
