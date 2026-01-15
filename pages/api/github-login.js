import crypto from 'crypto'

export default function handler(req, res) {
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
  const GITHUB_REDIRECT_URI =
    process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/api/github-callback'
  const returnTo = req.query.returnTo || '/admin'

  if (!GITHUB_CLIENT_ID) {
    return res.status(500).json({ error: 'GitHub OAuth not configured' })
  }

  // 生成隨機 state 防止 CSRF
  const state = crypto.randomBytes(16).toString('hex')

  // 設置 state 和 returnTo cookie
  res.setHeader('Set-Cookie', [
    `github_oauth_state=${state}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`,
    `github_return_to=${returnTo}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`,
  ])

  // 重定向到 GitHub OAuth
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    GITHUB_REDIRECT_URI
  )}&state=${state}&scope=user:email`

  res.redirect(githubAuthUrl)
}
