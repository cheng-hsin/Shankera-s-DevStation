# Next.js 升級指南

## ✅ 已完成的更新

我已經將 `package.json` 更新為 Next.js 14.2.0 和 React 18.3.0，並更新了相關依賴。

## 📋 接下來你需要做的步驟

### 1. 安裝更新的依賴

```bash
npm install
```

這會安裝所有更新後的依賴包。

### 2. 測試構建

```bash
npm run build
```

如果構建成功，繼續下一步。如果有錯誤，請查看下面的「常見問題」部分。

### 3. 測試開發服務器

```bash
npm run dev
```

訪問 http://localhost:3000 確保網站正常運行。

## 🔧 已更新的主要依賴

- **Next.js**: 12.1.4 → 14.2.0
- **React**: 17.0.2 → 18.3.0
- **React DOM**: 17.0.2 → 18.3.0
- **ESLint Config Next**: 12.1.4 → 14.2.0
- **@next/bundle-analyzer**: 12.1.4 → 14.2.0
- **next-themes**: 0.0.14 → 0.3.0
- **mdx-bundler**: 8.0.0 → 9.0.0
- 以及其他相關依賴

## ⚠️ 可能的兼容性問題

### 1. MDX Bundler 更新

如果遇到 MDX 相關錯誤，可能需要檢查：

- `lib/mdx.js` 中的配置
- MDX 文件的語法

### 2. React 18 的變化

React 18 引入了自動批處理（Automatic Batching），這通常不會影響現有代碼，但如果有問題，可能需要調整。

### 3. Next.js 14 的變化

- Pages Router 仍然完全支持（你的專案使用 Pages Router）
- `getStaticProps` 和 `getStaticPaths` 仍然支持
- `Head` 組件仍然支持

### 4. Preact 兼容性

我已經更新了 `next.config.js` 中的 Preact 配置，以支持 React 18 的新 jsx-runtime 路徑。

## 🐛 如果遇到錯誤

### 錯誤：Cannot find module 'xxx'

```bash
# 刪除 node_modules 和 package-lock.json，重新安裝
rm -rf node_modules package-lock.json
npm install
```

### 錯誤：MDX 相關問題

檢查 `lib/mdx.js` 中的配置，確保所有 remark/rehype 插件版本兼容。

### 錯誤：構建失敗

1. 檢查終端錯誤訊息
2. 查看是否有特定的文件或組件出問題
3. 嘗試逐步修復

## 📝 測試清單

升級後，請測試以下功能：

- [ ] 首頁正常顯示
- [ ] 博客列表頁面正常
- [ ] 博客文章頁面正常
- [ ] 標籤頁面正常
- [ ] 搜索功能正常
- [ ] 深色/淺色主題切換正常
- [ ] 圖片加載正常
- [ ] MDX 內容渲染正常
- [ ] 評論系統正常（如果使用）

## 🚀 升級完成後

如果一切正常，你可以：

1. 刪除這個 `UPGRADE_GUIDE.md` 文件
2. 提交更改到 Git
3. 部署到生產環境

## 📚 參考資料

- [Next.js 14 升級指南](https://nextjs.org/docs/app/building-your-application/upgrading)
- [React 18 升級指南](https://react.dev/blog/2022/03/29/react-v18)

---

**注意**：如果遇到任何問題，請先檢查錯誤訊息，然後根據具體錯誤進行修復。
