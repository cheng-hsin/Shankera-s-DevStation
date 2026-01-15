import { revokeAuthToken } from '@/lib/githubAuth'

export default function handler(req, res) {
  const token = req.cookies.admin_token

  if (token) {
    revokeAuthToken(token)
  }

  // 清除 cookie
  res.setHeader(
    'Set-Cookie',
    `admin_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`
  )

  return res.status(200).json({ success: true })
}
