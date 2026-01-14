import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import { useState } from 'react'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = frontMatter
  const [isEnglish, setIsEnglish] = useState(true)

  const content = {
    en: {
      title: 'About',
      toggleText: '中文',
      occupation: 'B.S. in Computer Science and Information Engineering',
      company: 'Tamkang University',
    },
    zh: {
      title: '關於我',
      toggleText: 'English',
      occupation: '資訊工程學系學士',
      company: '淡江大學',
    },
  }

  const currentLang = isEnglish ? 'en' : 'zh'

  return (
    <>
      <PageSEO
        title={`${content[currentLang].title} - ${name}`}
        description={`About me - ${name}`}
      />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="kawaii-card mb-6 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="gradient-text text-xl font-bold">{content[currentLang].title}</h1>
            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="kawaii-btn cursor-pointer text-xs"
              type="button"
            >
              {content[currentLang].toggleText}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <div className="kawaii-card p-6 text-center">
              <Image
                src={avatar}
                alt="avatar"
                width="192px"
                height="192px"
                className="mx-auto mb-4 h-48 w-48 rounded-full"
              />
              <h3 className="gradient-text mb-2 text-xl font-bold">{name}</h3>
              <div className="mb-1 text-sm text-gray-600">{content[currentLang].occupation}</div>
              <div className="mb-4 text-sm text-gray-600">{content[currentLang].company}</div>
              <div className="flex justify-center space-x-3">
                <SocialIcon kind="mail" href={`mailto:${email}`} />
                <SocialIcon kind="github" href={github} />
                <SocialIcon kind="linkedin" href={linkedin} />
                <SocialIcon kind="twitter" href={twitter} />
              </div>
            </div>

            {/* Quick Facts */}
            <div className="kawaii-sidebar p-4">
              <h3 className="mb-3 text-sm font-bold text-purple-700">
                {isEnglish ? '⚡ Quick Facts' : '⚡ 快速了解'}
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {isEnglish ? '🎓 Started coding:' : '🎓 開始寫程式:'}
                  </span>
                  <span className="font-bold text-purple-600">
                    {isEnglish ? 'After high school' : '高中畢業後'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {isEnglish ? '💼 Current role:' : '💼 目前職位:'}
                  </span>
                  <span className="font-bold text-purple-600">DevOps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {isEnglish ? '☁️ Favorite cloud:' : '☁️ 最愛雲端:'}
                  </span>
                  <span className="font-bold text-purple-600">AWS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{isEnglish ? '🏠 Dream:' : '🏠 夢想:'}</span>
                  <span className="font-bold text-purple-600">
                    {isEnglish ? 'Own place' : '專屬小窩'}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="kawaii-sidebar p-4">
              <h3 className="mb-3 text-sm font-bold text-purple-700">
                {isEnglish ? '📍 Current Status' : '📍 目前狀態'}
              </h3>
              <div className="space-y-2 text-xs">
                <div className="rounded-lg bg-green-50 p-2">
                  <div className="font-bold text-green-700">
                    🟢 {isEnglish ? 'Available for chat' : '可以聊天'}
                  </div>
                  <div className="text-green-600">
                    {isEnglish ? 'Always happy to discuss tech!' : '隨時歡迎技術交流！'}
                  </div>
                </div>
                <div className="rounded-lg bg-blue-50 p-2">
                  <div className="font-bold text-blue-700">
                    💻 {isEnglish ? 'Currently learning' : '目前在學'}
                  </div>
                  <div className="text-blue-600">
                    {isEnglish ? 'Advanced K8s patterns' : '進階 K8s 模式'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="kawaii-card p-6">
              {isEnglish ? (
                <div className="prose max-w-none">{children}</div>
              ) : (
                <div className="prose max-w-none">
                  <h3>嗨！我是 Shankera 👋</h3>
                  <p>
                    高中畢業後開始接觸程式設計，從那時候就對寫程式產生了濃厚的興趣。大學快畢業時，決定要走
                    DevOps 這條路 🚀
                  </p>

                  <h4>我的職涯小故事 📖</h4>
                  <p>
                    第一份工作選擇以 QA
                    作為跳板，在測試的過程中學習了很多系統架構和自動化的知識。現在是一名 DevOps
                    工程師，每天都在與雲端服務、容器化、自動化部署打交道 ☁️
                  </p>

                  <h4>技能樹點法 🎮</h4>
                  <ul>
                    <li>
                      🐍 <strong>程式語言</strong>：Python
                    </li>
                    <li>
                      ☁️ <strong>雲端平台</strong>：AWS 各種服務
                    </li>
                    <li>
                      🐳 <strong>容器化</strong>：Docker、Kubernetes、EKS
                    </li>
                    <li>
                      🔧 <strong>自動化工具</strong>：Terraform、Ansible、Jenkins
                    </li>
                    <li>
                      🚀 <strong>GitOps</strong>：ArgoCD
                    </li>
                    <li>
                      📊 <strong>監控</strong>：Prometheus、Grafana
                    </li>
                  </ul>

                  <h4>日常生活 ☕</h4>
                  <p>
                    工作之餘喜歡逛咖啡店、寫技術筆記，偶爾會分享一些生活小事。相信技術是為了讓生活更美好，而不是讓生活變得更複雜
                    😊
                  </p>

                  <h4>小小夢想 🏠</h4>
                  <p>
                    目標是買一間屬於自己的專屬小窩，有個舒適的工作角落，可以放我的機械鍵盤和多螢幕設備，還要有個小陽台可以種植物
                    🌱
                  </p>

                  <p>如果你也對 DevOps 或技術有興趣，歡迎一起交流！</p>
                  <p>
                    <a href="mailto:shankeraliang@gmail.com" className="kawaii-link">
                      📧 shankeraliang@gmail.com
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
