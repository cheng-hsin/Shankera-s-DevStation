import { requireAuth } from '@/lib/apiAuth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authError = requireAuth(req, res)
  if (authError) return authError

  const { title, summary, tags, content, category } = req.body

  // 檢查環境變數
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const GITHUB_OWNER = process.env.GITHUB_OWNER
  const GITHUB_REPO = process.env.GITHUB_REPO

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return res.status(500).json({
      error: '環境變數未設定',
      details: {
        hasToken: !!GITHUB_TOKEN,
        hasOwner: !!GITHUB_OWNER,
        hasRepo: !!GITHUB_REPO,
      },
    })
  }

  // 生成檔案名稱
  const date = new Date()
  const dateStr = date.toISOString().split('T')[0]
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '')
  const fileName = `${dateStr}_${slug}.mdx`

  // 生成 frontmatter
  const tagsArray = tags.split(',').map((t) => t.trim())
  const frontmatter = `---
title: '${title}'
date: ${dateStr}
tags: [${tagsArray.map((t) => `'${t}'`).join(', ')}]
draft: false
summary: '${summary}'
layout: PostSimple
---

${content}`

  const filePath = `data/${category}/${fileName}`

  try {
    // 呼叫 GitHub API 建立檔案
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add new post: ${title}`,
          content: Buffer.from(frontmatter).toString('base64'),
          branch: 'main',
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || '發布失敗')
    }

    return res.status(200).json({
      success: true,
      fileName,
      url: data.content.html_url,
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('GitHub API Error:', error)
    }
    return res.status(500).json({
      error: error.message,
      details: error.toString(),
    })
  }
}
