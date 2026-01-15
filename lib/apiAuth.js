import { verifyAuthToken } from './githubAuth'

// 從 cookie 中獲取 token
export function getAuthToken(req) {
  if (!req.headers.cookie) return null
  const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    acc[key] = value
    return acc
  }, {})
  return cookies.admin_token || null
}

// 驗證 API 請求是否已認證
export function requireAuth(req, res) {
  const token = getAuthToken(req)
  if (!token || !verifyAuthToken(token)) {
    return res.status(401).json({ error: '未授權，請先登錄' })
  }
  return null // 認證通過
}
