import { verifyGitHubUser, createAuthToken } from '@/lib/githubAuth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { githubToken } = req.body

  if (!githubToken) {
    return res.status(400).json({ error: '請輸入 GitHub Token' })
  }

  // 獲取允許的用戶列表（可選，從環境變數）
  const allowedUsers = process.env.ADMIN_GITHUB_USERS
    ? process.env.ADMIN_GITHUB_USERS.split(',').map((u) => u.trim().toLowerCase())
    : []

  // 驗證 GitHub Token
  const result = await verifyGitHubUser(githubToken, allowedUsers)

  if (result.valid) {
    const token = createAuthToken()
    // 設置 HTTP-only cookie（更安全）
    res.setHeader(
      'Set-Cookie',
      `admin_token=${token}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}; SameSite=Strict${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`
    )
    return res.status(200).json({ success: true, message: 'GitHub 驗證成功' })
  } else {
    return res.status(401).json({ error: 'GitHub Token 無效或未授權' })
  }
}
