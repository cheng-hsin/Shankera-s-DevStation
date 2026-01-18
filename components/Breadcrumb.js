import Link from '@/components/Link'
import { useRouter } from 'next/router'

export default function Breadcrumb() {
  const router = useRouter()
  const pathSegments = router.asPath.split('/').filter(Boolean)

  if (pathSegments.length === 0) return null

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    ...pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/')
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
      return { name, href }
    }),
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://shankera-s-dev-station.vercel.app${crumb.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-gray-900">{crumb.name}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-purple-600">
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
