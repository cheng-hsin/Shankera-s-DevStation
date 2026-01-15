# 環境變數配置範例

請複製以下內容到 `.env.local` 文件中（不要提交到版本控制）

```bash
# GitHub API 配置（用於文章發布和管理）
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repository_name

# Giscus 評論系統配置
NEXT_PUBLIC_GISCUS_REPO=your_github_username/your_repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your_repository_id
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id

# Utterances 評論系統配置（如果使用）
NEXT_PUBLIC_UTTERANCES_REPO=your_github_username/your_repo

# Disqus 評論系統配置（如果使用）
NEXT_PUBLIC_DISQUS_SHORTNAME=your_disqus_shortname

# 分析工具配置（可選）
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Plausible Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com

# Umami Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your_website_id

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Newsletter 配置（可選）
# Mailchimp
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_SERVER_PREFIX=us1

# Buttondown
BUTTONDOWN_API_KEY=your_buttondown_api_key

# ConvertKit
CONVERTKIT_API_KEY=your_convertkit_api_key

# Klaviyo
KLAVIYO_API_KEY=your_klaviyo_api_key

# Revue
REVUE_API_KEY=your_revue_api_key

# EmailOctopus
EMAILOCTOPUS_API_KEY=your_emailoctopus_api_key

# GitHub OAuth 配置（用於管理後台登入）
# 1. 前往 https://github.com/settings/developers
# 2. 點擊 "New OAuth App"
# 3. 填寫：
#    - Application name: 你的博客名稱
#    - Homepage URL: https://your-domain.com
#    - Authorization callback URL: https://your-domain.com/api/github-callback
# 4. 複製 Client ID 和創建 Client Secret
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
GITHUB_REDIRECT_URI=https://your-domain.com/api/github-callback

# GitHub 用戶白名單（可選）
# 如果設置，只有這些 GitHub 用戶名可以訪問管理後台
# 格式：用逗號分隔，例如：admin,shankera
# 如果不設置，任何有效的 GitHub 帳號都可以訪問
ADMIN_GITHUB_USERS=your_github_username

# 開發環境配置
NODE_ENV=development
SOCKET=true
```

## 說明

- `.env.local` - 本地開發環境變數（已加入 .gitignore，不會提交）
- 生產環境請在 Vercel 或其他部署平台的環境變數設置中添加這些值
- 只配置你實際使用的服務即可，不需要的可以忽略
