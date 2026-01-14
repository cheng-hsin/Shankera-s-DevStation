import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="kawaii-tag inline-block px-3 py-1 text-xs font-medium">#{text}</a>
    </Link>
  )
}

export default Tag
