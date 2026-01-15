import { requireAuth } from '@/lib/apiAuth'

export default async function handler(req, res) {
  const authError = requireAuth(req, res)
  if (authError) return authError

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const GITHUB_OWNER = process.env.GITHUB_OWNER
  const GITHUB_REPO = process.env.GITHUB_REPO

  try {
    const posts = []

    // 取得 blog 文章
    const blogResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/data/blog`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (blogResponse.ok) {
      const blogFiles = await blogResponse.json()
      blogFiles.forEach((file) => {
        if (file.name.endsWith('.mdx') || file.name.endsWith('.md')) {
          posts.push({
            name: file.name,
            path: file.path,
            category: 'blog',
          })
        }
      })
    }

    // 取得 living 文章
    const livingResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/data/living`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (livingResponse.ok) {
      const livingFiles = await livingResponse.json()
      livingFiles.forEach((file) => {
        if (file.name.endsWith('.mdx') || file.name.endsWith('.md')) {
          posts.push({
            name: file.name,
            path: file.path,
            category: 'living',
          })
        }
      })
    }

    // 按檔名排序（檔名格式: YYYY-MM-DD_xxx.mdx）
    posts.sort((a, b) => b.name.localeCompare(a.name))

    return res.status(200).json({ posts })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
