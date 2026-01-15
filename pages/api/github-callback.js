// GitHub OAuth 回調處理
import { createAuthToken } from '@/lib/githubAuth'

export default async function handler(req, res) {
  const { code, state } = req.query

  console.log('=== GitHub Callback ====')
  console.log('Code:', code ? 'exists' : 'missing')
  console.log('State:', state)

  // 驗證 state（防止 CSRF）
  const cookieState = req.headers.cookie
    ?.split(';')
    .find((c) => c.trim().startsWith('github_oauth_state='))
    ?.split('=')[1]

  console.log('Cookie State:', cookieState)

  if (!state || state !== cookieState) {
    console.log('State mismatch!')
    return res.redirect('/admin?error=invalid_state')
  }

  if (!code) {
    console.log('No code!')
    return res.redirect('/admin?error=no_code')
  }

  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
  const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
  const GITHUB_REDIRECT_URI =
    process.env.GITHUB_REDIRECT_URI ||
    `${
      req.headers.origin || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }/api/github-callback`

  console.log('Client ID:', GITHUB_CLIENT_ID ? 'exists' : 'missing')
  console.log('Client Secret:', GITHUB_CLIENT_SECRET ? 'exists' : 'missing')
  console.log('Redirect URI:', GITHUB_REDIRECT_URI)

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    console.log('OAuth not configured!')
    return res.redirect('/admin?error=not_configured')
  }

  try {
    // 1. 用 code 換取 access token
    console.log('Exchanging code for token...')
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: GITHUB_REDIRECT_URI,
      }),
    })

    const tokenData = await tokenResponse.json()
    console.log('Token response:', tokenData)

    if (tokenData.error) {
      console.log('Token error:', tokenData.error)
      return res.redirect(`/admin?error=${tokenData.error}`)
    }

    const accessToken = tokenData.access_token

    // 2. 獲取用戶信息
    console.log('Fetching user info...')
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!userResponse.ok) {
      console.log('User fetch failed:', userResponse.status)
      return res.redirect('/admin?error=user_fetch_failed')
    }

    const user = await userResponse.json()
    console.log('User:', user.login)

    // 3. 檢查用戶是否在允許列表中（可選）
    const allowedUsers = process.env.ADMIN_GITHUB_USERS
      ? process.env.ADMIN_GITHUB_USERS.split(',').map((u) => u.trim().toLowerCase())
      : []

    console.log('Allowed users:', allowedUsers)
    console.log('User login:', user.login.toLowerCase())

    if (allowedUsers.length > 0 && !allowedUsers.includes(user.login.toLowerCase())) {
      console.log('User not authorized!')
      return res.redirect('/admin?error=unauthorized_user')
    }

    // 4. 創建 session token
    const sessionToken = createAuthToken()
    console.log('Session token created')

    // 5. 設置認證 cookie
    res.setHeader(
      'Set-Cookie',
      `admin_token=${sessionToken}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}; SameSite=Strict${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`
    )

    // 6. 獲取 returnTo
    const returnTo =
      req.headers.cookie
        ?.split(';')
        .find((c) => c.trim().startsWith('github_return_to='))
        ?.split('=')[1] || '/admin'

    console.log('Cookie set, redirecting to', returnTo)

    // 7. 重定向到原本的頁面
    res.redirect(`${returnTo}?success=true`)
  } catch (error) {
    console.error('GitHub OAuth Error:', error)
    res.redirect('/admin?error=oauth_failed')
  }
}
