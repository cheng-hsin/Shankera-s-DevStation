export default function handler(req, res) {
  return res.status(200).json({
    hasClientId: !!process.env.GITHUB_CLIENT_ID,
    hasClientSecret: !!process.env.GITHUB_CLIENT_SECRET,
    clientIdPrefix: process.env.GITHUB_CLIENT_ID?.substring(0, 8),
    redirectUri: process.env.GITHUB_REDIRECT_URI,
    allowedUsers: process.env.ADMIN_GITHUB_USERS,
  })
}
