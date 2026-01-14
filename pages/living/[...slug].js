import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug, formatSlug } from '@/lib/mdx'
import { getFiles } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  const posts = getFiles('living')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug('living', params.slug.join('/'))
  return { props: { post } }
}

export default function Living({ post }) {
  const { mdxSource, frontMatter } = post

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
