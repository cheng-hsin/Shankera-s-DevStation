import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Breadcrumb from '@/components/Breadcrumb'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children, toc }) {
  const { date, title } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <ScrollTopAndComment />
      <Breadcrumb />
      <div className="my-8 mx-auto max-w-7xl flex flex-col xl:flex-row gap-8 px-4 xl:px-0">
        <article className="kawaii-card flex-1 max-w-4xl p-4 xl:p-8">
          <div>
            <header>
              <div className="space-y-4 border-b-2 border-purple-200 pb-6 text-center">
                <dl>
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-bold text-purple-500">
                      📅 <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <h1 className="gradient-text text-3xl font-bold md:text-4xl">{title}</h1>
                </div>
              </div>
            </header>
            <div className="mt-8">
              <div className="prose prose-lg max-w-none overflow-x-auto">{children}</div>
            </div>
            <Comments frontMatter={frontMatter} />
            <footer className="mt-8 border-t-2 border-purple-200 pt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                {prev && (
                  <Link href={`/blog/${prev.slug}`} className="kawaii-btn text-center">
                    ← {prev.title}
                  </Link>
                )}
                {next && (
                  <Link href={`/blog/${next.slug}`} className="kawaii-btn text-center">
                    {next.title} →
                  </Link>
                )}
              </div>
            </footer>
          </div>
        </article>
        {toc && toc.length > 0 && (
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="kawaii-sidebar p-4">
                <h3 className="text-sm font-bold text-purple-700 mb-3">目錄</h3>
                <nav className="text-xs space-y-2">
                  {toc.map((heading) => (
                    <a
                      key={heading.url}
                      href={heading.url}
                      className="block text-gray-600 hover:text-purple-600 transition-colors"
                      style={{ paddingLeft: `${(heading.depth - 1) * 12}px` }}
                    >
                      {heading.value}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        )}
      </div>
    </SectionContainer>
  )
}
