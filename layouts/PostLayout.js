import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children, toc }) {
  const { slug, fileName, date, title, images, tags } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <div className="my-8 mx-auto max-w-7xl flex gap-8">
        <article className="kawaii-card flex-1 max-w-6xl p-8">
          <div>
            <header className="mb-8">
              <div className="space-y-4 text-center">
                <dl>
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-bold text-purple-500">
                      📅{' '}
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <h1 className="gradient-text text-3xl font-bold md:text-4xl">{title}</h1>
                </div>
              </div>
            </header>
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
              <div className="xl:col-span-1">
                <dl className="space-y-6">
                  <div>
                    <dt className="mb-2 text-sm font-bold text-purple-700">✨ Authors</dt>
                    <dd>
                      <ul className="space-y-4">
                        {authorDetails.map((author) => (
                          <li className="flex items-center space-x-2" key={author.name}>
                            {author.avatar && (
                              <Image
                                src={author.avatar}
                                width="38px"
                                height="38px"
                                alt="avatar"
                                className="h-10 w-10 rounded-full border-2 border-purple-300"
                              />
                            )}
                            <dl className="text-sm">
                              <dt className="sr-only">Name</dt>
                              <dd className="font-bold text-purple-800">{author.name}</dd>
                              <dt className="sr-only">Twitter</dt>
                              <dd>
                                {author.twitter && (
                                  <Link href={author.twitter} className="kawaii-link">
                                    {author.twitter.replace('https://twitter.com/', '@')}
                                  </Link>
                                )}
                              </dd>
                            </dl>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  {tags && (
                    <div>
                      <dt className="mb-2 text-sm font-bold text-purple-700">🏷️ Tags</dt>
                      <dd className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
              <div className="xl:col-span-3">
                <div className="prose prose-lg mb-8 max-w-none">{children}</div>
                <div className="mb-6 flex gap-4 text-sm font-bold">
                  <Link href={discussUrl(slug)} rel="nofollow" className="kawaii-link">
                    💬 Discuss on Twitter
                  </Link>
                  <span className="text-purple-300">•</span>
                  <Link href={editUrl(fileName)} className="kawaii-link">
                    📝 View on GitHub
                  </Link>
                </div>
                <Comments frontMatter={frontMatter} />
              </div>
            </div>
            <footer className="mt-8 border-t-2 border-purple-200 pt-8">
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {prev && (
                  <div>
                    <h2 className="mb-2 text-xs font-bold text-purple-700">← PREVIOUS</h2>
                    <Link href={`/blog/${prev.slug}`} className="kawaii-link font-bold">
                      {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="text-right">
                    <h2 className="mb-2 text-xs font-bold text-purple-700">NEXT →</h2>
                    <Link href={`/blog/${next.slug}`} className="kawaii-link font-bold">
                      {next.title}
                    </Link>
                  </div>
                )}
              </div>
              <div className="text-center">
                <Link href="/blog" className="kawaii-btn">
                  ← Back to Blog
                </Link>
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
