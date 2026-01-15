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

export async function verifyGitHubUser(githubToken, allowedUsers = []) {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      return { valid: false, error: 'Invalid GitHub token' }
    }

    const userData = await response.json()
    const username = userData.login.toLowerCase()

    if (allowedUsers.length > 0 && !allowedUsers.includes(username)) {
      return { valid: false, error: 'User not authorized' }
    }

    return { valid: true, username: userData.login }
  } catch (error) {
    return { valid: false, error: error.message }
  }
}
