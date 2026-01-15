import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ManagePosts() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/list-posts')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Posts data:', data)
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [])

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/check-auth')
      if (response.ok) {
        setIsAuthenticated(true)
        await fetchPosts()
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }, [fetchPosts])

  // 檢查是否已登錄
  useEffect(() => {
    checkAuth()
    // 檢查 URL 參數中的錯誤或成功訊息
    const urlParams = new URLSearchParams(window.location.search)
    const successParam = urlParams.get('success')

    if (successParam) {
      checkAuth() // 重新檢查認證狀態
      router.replace('/manage-posts', undefined, { shallow: true })
    }
  }, [router, checkAuth])

  const handleGitHubLogin = () => {
    window.location.href = '/api/github-login?returnTo=/manage-posts'
  }

  const handleDelete = async (fileName, category) => {
    if (!confirm(`確定要刪除 ${fileName} 嗎？`)) return

    try {
      const response = await fetch('/api/delete-post', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, category }),
      })

      if (response.ok) {
        alert('刪除成功！')
        fetchPosts()
      } else {
        alert('刪除失敗')
      }
    } catch (error) {
      alert('錯誤: ' + error.message)
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

  if (loading) return <div className="max-w-4xl mx-auto p-6">載入中...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="gradient-text text-2xl font-bold">文章管理</h1>
        <div className="flex gap-3">
          <Link href="/admin" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
            新增文章
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
          >
            登出
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.path} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{post.name}</h3>
              <p className="text-sm text-gray-500">
                {post.category} • {post.path}
              </p>
            </div>
            <button
              onClick={() => handleDelete(post.name, post.category)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-medium text-sm"
            >
              刪除
            </button>
          </div>
        ))}
      </div>

      {posts.length === 0 && <div className="text-center text-gray-500 py-8">沒有文章</div>}
    </div>
  )
}
