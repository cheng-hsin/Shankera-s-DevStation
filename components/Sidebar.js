import Link from './Link'
import Image from './Image'
import { useMemo } from 'react'

export default function Sidebar() {
  // 使用 useMemo 緩存日期計算，只在組件掛載時計算一次
  // 日曆不需要實時更新，如果需要可以改為每小時更新
  const currentDate = useMemo(() => new Date(), [])

  const days = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysArray = []

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i)
    }
    return daysArray
  }, [currentDate])
  const weekDays = ['日', '月', '火', '水', '木', '金', '土']
  const today = currentDate.getDate()

  return (
    <aside className="sticky top-24 space-y-3">
      {/* Kawaii Flat Calendar */}
      <div className="rounded-lg bg-white" style={{ border: '2px solid #e8d5f2' }}>
        <div className="border-b-2 border-purple-300 bg-purple-500 p-2 text-center">
          <div className="text-xs font-bold text-white">
            {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
          </div>
        </div>
        <div className="p-2">
          <div className="grid grid-cols-7 gap-0">
            {weekDays.map((day, i) => (
              <div
                key={day}
                className="border border-purple-200 py-1 text-center text-xs font-bold"
                style={{
                  background: i === 0 ? '#fecaca' : i === 6 ? '#bfdbfe' : '#f3e8ff',
                  color: '#7c3aed',
                }}
              >
                {day}
              </div>
            ))}
            {days.map((day, i) => (
              <div
                key={i}
                className="border border-purple-200 py-2 text-center text-xs font-bold"
                style={{
                  background: day === today ? '#a855f7' : day ? '#fff' : '#fafafa',
                  color: day === today ? '#fff' : '#4a4a4a',
                }}
              >
                {day || ''}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Profile Card */}
      <div className="kawaii-sidebar p-4">
        <div className="mb-3 text-center">
          <div className="border-3 float-icon mx-auto mb-2 h-16 w-16 overflow-hidden rounded-full border-purple-300">
            <Image
              src="/static/images/anpanman.png"
              alt="avatar"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="gradient-text text-sm font-bold">Welcome! ✨</h3>
        </div>
        <p className="text-center text-xs leading-relaxed text-gray-600">
          Tech blog sharing DevOps, Cloud, and development insights
        </p>
      </div>

      {/* Quick Stats */}
      <div className="kawaii-sidebar p-4">
        <h3 className="mb-3 flex items-center gap-1 text-sm font-bold text-purple-700">
          📊 Quick Stats
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between rounded-lg bg-purple-50 p-2">
            <span className="text-gray-600">📝 Total Posts</span>
            <span className="font-bold text-purple-600">60+</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-pink-50 p-2">
            <span className="text-gray-600">🏷️ Tags</span>
            <span className="font-bold text-pink-600">50+</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-blue-50 p-2">
            <span className="text-gray-600">☕ Coffee</span>
            <span className="font-bold text-blue-600">∞</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="kawaii-sidebar p-4">
        <h3 className="mb-3 flex items-center gap-1 text-sm font-bold text-purple-700">
          🧭 Navigation
        </h3>
        <ul className="space-y-2 text-xs">
          <li className="rounded-lg p-2 transition-all hover:bg-purple-50">
            <Link href="/blog" className="kawaii-link flex items-center gap-2">
              💻 Tech Blog
            </Link>
          </li>
          <li className="rounded-lg p-2 transition-all hover:bg-purple-50">
            <Link href="/living" className="kawaii-link flex items-center gap-2">
              🌱 Living
            </Link>
          </li>
          <li className="rounded-lg p-2 transition-all hover:bg-purple-50">
            <Link href="/projects" className="kawaii-link flex items-center gap-2">
              🚀 Projects
            </Link>
          </li>
          <li className="rounded-lg p-2 transition-all hover:bg-purple-50">
            <Link href="/tags" className="kawaii-link flex items-center gap-2">
              🏷️ All Tags
            </Link>
          </li>
        </ul>
      </div>

      {/* Popular Tags */}
      <div className="kawaii-sidebar p-4">
        <h3 className="mb-3 flex items-center gap-1 text-sm font-bold text-purple-700">
          🔥 Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/tags/aws" className="kawaii-tag px-3 py-1 text-xs">
            #AWS
          </Link>
          <Link href="/tags/docker" className="kawaii-tag px-3 py-1 text-xs">
            #Docker
          </Link>
          <Link href="/tags/kubernetes" className="kawaii-tag px-3 py-1 text-xs">
            #K8s
          </Link>
          <Link href="/tags/cicd" className="kawaii-tag px-3 py-1 text-xs">
            #CI/CD
          </Link>
          <Link href="/tags/devops" className="kawaii-tag px-3 py-1 text-xs">
            #DevOps
          </Link>
        </div>
      </div>

      {/* Fun Quote */}
      <div className="kawaii-sidebar p-4 text-center">
        <div className="sparkle mb-2 text-3xl">🌟</div>
        <p className="text-xs font-medium italic text-purple-600">"Code with ♥, Deploy with ✨"</p>
      </div>
    </aside>
  )
}
