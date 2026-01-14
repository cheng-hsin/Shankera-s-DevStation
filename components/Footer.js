import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="jp-header mt-8">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-3">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="5" />
            <SocialIcon kind="github" href={siteMetadata.github} size="5" />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="5" />
          </div>
          <div className="text-center text-xs text-gray-600">
            © {new Date().getFullYear()} {siteMetadata.author} · {siteMetadata.title}
          </div>
        </div>
      </div>
    </footer>
  )
}
