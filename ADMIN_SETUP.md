# 後台發文系統設定指南

## 1. 建立 GitHub Token

1. 前往 GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 點擊 "Generate new token (classic)"
3. 勾選權限：
   - ✅ `repo` (完整 repo 權限)
4. 複製生成的 token (格式: `ghp_xxxxx`)

## 2. 設定環境變數

### 本地開發

複製 `.env.local.example` 為 `.env.local`：

```bash
cp .env.local.example .env.local
```

編輯 `.env.local`：

```env
GITHUB_TOKEN=ghp_your_actual_token
GITHUB_OWNER=your-github-username
GITHUB_REPO=Shankera-s-DevStation
```

### Vercel 部署

在 Vercel Dashboard → Settings → Environment Variables 新增：

- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`

## 3. 使用方式

1. 訪問 `/admin` 頁面
2. 填寫文章資訊：
   - 標題
   - 摘要
   - 標籤 (用逗號分隔)
   - 分類 (blog/living)
   - 內容 (Markdown 格式)
3. 點擊「發布文章」
4. 系統會自動：
   - 生成檔案名稱 (格式: `YYYY-MM-DD_slug.mdx`)
   - 建立 frontmatter
   - 透過 GitHub API commit 到 repo
   - Vercel 自動偵測並重新部署

## 4. 檔案命名規則

- 日期格式：`YYYY-MM-DD`
- Slug：標題轉小寫，空格和特殊字元轉 `-`
- 範例：`2025-01-15_my-new-post.mdx`

## 5. 安全建議

⚠️ **重要**：

- 不要將 `.env.local` commit 到 Git
- GitHub Token 要妥善保管
- 建議加上簡單的密碼保護 (可選)

## 6. 進階功能 (可選)

如需密碼保護，可在 `pages/admin.js` 加上：

```javascript
const [password, setPassword] = useState('')
const [isAuthed, setIsAuthed] = useState(false)

if (!isAuthed) {
  return (
    <div className="max-w-md mx-auto mt-20">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && password === 'your-password') {
            setIsAuthed(true)
          }
        }}
        placeholder="輸入密碼"
        className="w-full p-3 border rounded-lg"
      />
    </div>
  )
}
```

## 7. 測試流程

1. 本地測試：

```bash
npm run dev
```

訪問 `http://localhost:3000/admin`

2. 發布測試文章
3. 檢查 GitHub repo 是否有新 commit
4. 等待 Vercel 自動部署
5. 確認文章顯示正常

## 8. 故障排除

### 發布失敗

- 檢查 GitHub Token 是否有效
- 檢查 repo 權限
- 查看瀏覽器 Console 錯誤訊息

### 檔案已存在

- API 會回傳錯誤
- 需要手動刪除或改用 UPDATE 模式

### Vercel 未自動部署

- 檢查 Vercel 的 Git 整合設定
- 手動觸發部署
