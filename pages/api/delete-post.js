import { requireAuth } from '@/lib/apiAuth'

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authError = requireAuth(req, res)
  if (authError) return authError

  const { fileName, category } = req.body

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const GITHUB_OWNER = process.env.GITHUB_OWNER
  const GITHUB_REPO = process.env.GITHUB_REPO

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return res.status(500).json({ error: '環境變數未設定' })
  }

  const filePath = `data/${category}/${fileName}`

  try {
    // 先取得檔案的 SHA (GitHub API 刪除檔案需要)
    const getResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (!getResponse.ok) {
      throw new Error('找不到檔案')
    }

    const fileData = await getResponse.json()

    // 刪除檔案
    const deleteResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Delete post: ${fileName}`,
          sha: fileData.sha,
          branch: 'main',
        }),
      }
    )

    const data = await deleteResponse.json()

    if (!deleteResponse.ok) {
      throw new Error(data.message || '刪除失敗')
    }

    return res.status(200).json({
      success: true,
      message: '文章已刪除',
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Delete Error:', error)
    }
    return res.status(500).json({
      error: error.message,
    })
  }
}
