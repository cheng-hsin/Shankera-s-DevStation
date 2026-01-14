import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  basePath = 'blog',
}) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="kawaii-card mb-6 p-6">
          <h1 className="gradient-text mb-4 text-xl font-bold">{title}</h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="🔍 Search articles..."
              className="block w-full rounded-full border-2 border-purple-200 bg-white px-4 py-2 text-sm text-gray-700 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {!filteredBlogPosts.length && (
            <div className="col-span-2 py-8 text-center text-gray-500">No posts found.</div>
          )}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <div key={slug} className="kawaii-card p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h2 className="flex-1 text-sm font-bold leading-tight text-gray-800">
                    <Link href={`/${basePath}/${slug}`} className="kawaii-link">
                      {title}
                    </Link>
                  </h2>
                  <span className="whitespace-nowrap text-xs font-medium text-purple-500">
                    📅 {formatDate(date).split(',')[0]}
                  </span>
                </div>
                <p className="line-clamp-2 mb-2 text-xs leading-relaxed text-gray-600">{summary}</p>
                <div className="flex flex-wrap gap-1">
                  {tags.slice(0, 4).map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
