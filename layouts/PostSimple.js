import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { date, title } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <ScrollTopAndComment />
      <article className="kawaii-card my-8 mx-auto max-w-4xl p-8">
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
            <div className="prose prose-lg max-w-none">{children}</div>
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
    </SectionContainer>
  )
}
