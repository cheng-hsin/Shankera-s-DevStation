import crypto from 'crypto'

// 簡單的 token 存儲（生產環境應該使用資料庫）
const validTokens = new Set()

export function createAuthToken() {
  const token = crypto.randomBytes(32).toString('hex')
  validTokens.add(token)
  return token
}

export function verifyAuthToken(token) {
  return validTokens.has(token)
}

export function revokeAuthToken(token) {
  validTokens.delete(token)
}
