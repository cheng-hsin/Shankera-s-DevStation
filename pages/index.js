import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Sidebar from '@/components/Sidebar'

const MAX_DISPLAY = 20

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {/* Main Content */}
          <div className="space-y-4 lg:col-span-3">
            {/* Welcome Banner */}
            <div className="kawaii-card p-6">
              <h1 className="gradient-text mb-2 flex items-center gap-2 text-2xl font-bold">
                <span className="sparkle">✨</span>
                Latest Posts
                <span className="sparkle">✨</span>
              </h1>
              <p className="text-sm text-gray-600">{siteMetadata.description}</p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {!posts.length && 'No posts found.'}
              {posts.slice(0, MAX_DISPLAY).map((frontMatter, idx) => {
                const { slug, date, title, summary, tags } = frontMatter
                return (
                  <div
                    key={slug}
                    className="kawaii-card p-4"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h2 className="flex-1 text-sm font-bold leading-tight text-gray-800">
                        <Link href={`/blog/${slug}`} className="kawaii-link">
                          {title}
                        </Link>
                      </h2>
                      <span className="whitespace-nowrap text-xs font-medium text-purple-500">
                        📅 {formatDate(date).split(',')[0]}
                      </span>
                    </div>
                    <p className="line-clamp-2 mb-2 text-xs leading-relaxed text-gray-600">
                      {summary}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {tags.slice(0, 4).map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {posts.length > MAX_DISPLAY && (
              <div className="text-center">
                <Link href="/blog" className="kawaii-btn inline-block">
                  View All Posts →
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  )
}
