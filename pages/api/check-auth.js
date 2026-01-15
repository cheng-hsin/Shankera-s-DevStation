import { verifyAuthToken } from '@/lib/githubAuth'

export default function handler(req, res) {
  const token = req.cookies.admin_token

  if (!token || !verifyAuthToken(token)) {
    return res.status(401).json({ authenticated: false })
  }

  return res.status(200).json({ authenticated: true })
}
