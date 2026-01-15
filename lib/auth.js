// 簡單的身份驗證工具
export function verifyPassword(password) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  if (!ADMIN_PASSWORD) {
    // 如果沒有設置密碼，在生產環境拒絕訪問
    if (process.env.NODE_ENV === 'production') {
      return false
    }
    // 開發環境允許訪問（但建議設置密碼）
    return true
  }
  return password === ADMIN_PASSWORD
}

export function createAuthToken() {
  // 創建一個簡單的 token（實際應用中應該使用更安全的方法）
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)
  return Buffer.from(`${timestamp}-${random}`).toString('base64')
}

export function verifyAuthToken(token) {
  if (!token) return false
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [timestamp] = decoded.split('-')
    const tokenAge = Date.now() - parseInt(timestamp)
    // Token 有效期 24 小時
    return tokenAge < 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}
