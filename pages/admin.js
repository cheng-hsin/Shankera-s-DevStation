import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    tags: '',
    content: '',
    category: 'blog', // blog or living
  })
  const [isPublishing, setIsPublishing] = useState(false)
  const router = useRouter()

  // 檢查是否已登錄
  useEffect(() => {
    checkAuth()
    // 檢查 URL 參數中的錯誤或成功訊息
    const urlParams = new URLSearchParams(window.location.search)
    const errorParam = urlParams.get('error')
    const successParam = urlParams.get('success')

    if (errorParam) {
      setError(getErrorMessage(errorParam))
      // 清除 URL 參數
      router.replace('/admin', undefined, { shallow: true })
    }
    if (successParam) {
      checkAuth() // 重新檢查認證狀態
      router.replace('/admin', undefined, { shallow: true })
    }
  }, [router])

  const getErrorMessage = (error) => {
    const messages = {
      invalid_state: '安全驗證失敗，請重試',
      no_code: 'GitHub 授權失敗',
      not_configured: 'GitHub OAuth 未配置',
      user_fetch_failed: '無法獲取用戶信息',
      unauthorized_user: '您的 GitHub 帳號未授權',
      oauth_failed: 'GitHub 登入失敗，請重試',
    }
    return messages[error] || '登入失敗'
  }

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/check-auth')
      if (response.ok) {
        setIsAuthenticated(true)
      }
    } catch (error) {
      // 忽略錯誤
    } finally {
      setIsLoading(false)
    }
  }

  const handleGitHubLogin = () => {
    window.location.href = '/api/github-login'
  }

  // 如果還在檢查認證狀態，顯示載入中
  if (isLoading) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <div className="text-center">載入中...</div>
      </div>
    )
  }

  // 如果未認證，顯示登錄頁面
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <div className="kawaii-card p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">🔐 GitHub 登入</h1>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center">使用你的 GitHub 帳號登入管理後台</p>
            <button
              onClick={handleGitHubLogin}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              使用 GitHub 登入
            </button>
            <p className="text-xs text-gray-500 text-center">點擊按鈕將跳轉到 GitHub 進行授權</p>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPublishing(true)

    try {
      const response = await fetch('/api/publish-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        alert('文章發布成功！')
        router.push('/blog')
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('發布錯誤:', data)
        }
        alert(`發布失敗: ${data.error}\n\n詳細資訊: ${JSON.stringify(data.details || {}, null, 2)}`)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('網路錯誤:', error)
      }
      alert('網路錯誤: ' + error.message)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/logout')
      setIsAuthenticated(false)
      router.push('/admin')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="gradient-text text-2xl font-bold">發布新文章</h1>
        <div className="flex gap-3">
          <Link
            href="/manage-posts"
            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
          >
            管理文章
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
          >
            登出
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">標題</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">摘要</label>
          <textarea
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="w-full p-3 border rounded-lg h-20"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">標籤 (用逗號分隔)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="aws, docker, kubernetes"
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">分類</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-3 border rounded-lg"
          >
            <option value="blog">Tech Blog</option>
            <option value="living">Living</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">內容 (Markdown)</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full p-3 border rounded-lg h-96 font-mono"
            placeholder="## 標題

你的文章內容..."
            required
          />
        </div>

        <button type="submit" disabled={isPublishing} className="kawaii-btn disabled:opacity-50">
          {isPublishing ? '發布中...' : '發布文章'}
        </button>
      </form>
    </div>
  )
}
