import { verifyPassword, createAuthToken } from '@/lib/auth'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { password } = req.body

  if (!password) {
    return res.status(400).json({ error: '請輸入密碼' })
  }

  if (verifyPassword(password)) {
    const token = createAuthToken()
    // 設置 HTTP-only cookie（更安全）
    res.setHeader(
      'Set-Cookie',
      `admin_token=${token}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}; SameSite=Strict${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`
    )
    return res.status(200).json({ success: true, message: '登錄成功' })
  } else {
    return res.status(401).json({ error: '密碼錯誤' })
  }
}
