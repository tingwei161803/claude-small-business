# Claude for Small Business · 台灣老闆白話導讀

把 Anthropic 在 2026-05-13 發布的 **Claude for Small Business**，用生活比喻翻成「沒有 IT 部門的台灣小老闆」也聽得懂的話 —— 一份中英雙語、互動式、編輯風格的單頁導讀網站。

> 🌐 **線上瀏覽**
> - 中文：<https://claude-small-business.peteraim.com/>
> - English：<https://claude-small-business.peteraim.com/en/>

---

## 這是什麼

官方那篇發布文 enterprise 味很重、又全是英文，對只想專心顧店的老闆其實不好啃。這個專案把它重新組織成：

- 用 **食譜 / 萬能轉接頭 / 不會算錯的會計 / 自帶設計師的行銷助理** 等白話比喻講解
- 穿插 **🇹🇼 台灣對照註解**，把美國工具、定價、巡迴講座對應到台灣的真實可用方案與限制
- 附 **手把手 4 步驟安裝** 與 **8 個台灣情境的可複製 prompt 食譜**
- 內容經官方頁面查證，產品細節以官方為準，存疑處於文中標註

> ⚠️ 本站為**非官方**的個人整理，與 Anthropic 無隸屬關係。所引用之客戶見證與引言皆出自 Anthropic 官方案例。內容若與官方最新資訊不符，**一律以官方為準**。

---

## 功能特色

| 功能 | 說明 |
|------|------|
| 🌏 中英雙語 | 分頁式（`index.html` ↔ `en/index.html`），右上角 `[中｜EN]` 切換並在桌機保留當前章節 |
| 📑 互動目錄 | 左側 sticky TOC，捲動時自動高亮當前章節；行動版可收合 |
| 📈 閱讀進度條 | 頂部進度條反映捲動位置 |
| 📋 一鍵複製 | 8 個情境 prompt 皆可一鍵複製（中英自動切換按鈕文字） |
| ✨ 產品名高亮 | 內文中的 Claude / Claude Cowork 自動高亮，捲入視窗時點亮 |
| ⭐ GitHub 星數 | 右上角按鈕顯示本 repo 即時 star 數 |
| 📱 RWD | 手機、平板、桌機三斷點；表格在窄螢幕轉為卡片 |
| ♿ 無障礙 | 語意標籤、`:focus-visible`、`prefers-reduced-motion`、ARIA |

---

## 內容結構

12 個區塊（中英章節 `id` 完全對齊，確保切換不跑位）：

| # | 章節 | 核心比喻 / 重點 |
|---|------|----------------|
| 00 | 這份導讀 | 封面與導覽 |
| 01 | 先搞懂這是什麼 | 住進你工具裡的兼職，不是新軟體 |
| 02 | 為什麼小企業需要 | 終於支付得起的 AI 顧問；50% 資安疑慮（Anthropic 自家調查） |
| 03 | 15 道現成食譜 | 不用學 prompt engineering；slash 指令一覽 |
| 04 | 萬能轉接頭 | connector 清單；vs 一般聊天 AI；🇹🇼 工具對照 |
| 05 | 不會算錯的會計 | 財務工作流；「草擬 ≠ 寄出」 |
| 06 | 自帶設計師的行銷 | 成長活動 / 潛在客戶分級 |
| 07 | 三位老闆的故事 | Purity Coffee／Simple Modern／MidCentral（官方逐字引言） |
| 08 | 銀行金庫級保護 | 不訓練、加密、認證；⚠️ 你自己也要做的 3 件事 |
| 09 | 免費補習班 | AI Fluency 課程；SMB Tour（🇹🇼 美國限定→台灣走線上） |
| 10 | 手把手裝起來 | Cowork plugin 安裝 4 步驟 + 8 個情境 prompt 食譜 |
| 11 | 下一步路徑圖 | 三條路徑 CTA |
| 12 | 資料來源 | 官方出處逐一列出，可查核 |

### 8 個台灣情境 prompt 角色

🍳 早餐店 ｜ 💎 手作飾品電商 ｜ 🎬 YouTuber／自媒體 ｜ 👩‍🏫 線上開課 ｜ 🧋 手搖飲／咖啡（多分店）｜ 💅 個人工作室（美甲／美容）｜ 🎨 接案設計師／SOHO ｜ 📚 補習班／才藝班

---

## 技術

純靜態網站，**無建置流程、無相依套件** —— 直接用瀏覽器開檔即可運作。

- **HTML**：手寫語意標籤
- **CSS**：`assets/styles.css`，Anthropic 編輯風（奶油紙底、Claude 橘 `#CC785C`、Fraunces + DM Sans + Noto Serif/Sans TC）
- **JS**：`assets/app.js`，單一 vanilla IIFE，無框架
- **字型**：Google Fonts（Fraunces / DM Sans / JetBrains Mono / Noto Serif·Sans TC）

```
claude-small-business/
├── index.html              # 中文版（主頁，lang="zh-Hant"）
├── en/
│   └── index.html          # English 版（lang="en"，資源路徑用 ../assets/）
├── assets/
│   ├── styles.css          # 樣式系統（共用元件 + tw-note/recipe/flow/timesave/install-step/prompt-card/warn）
│   └── app.js              # 進度條 / TOC / 雙語 hash / 產品名高亮 / 複製鈕 / GitHub 星數
├── docs/
│   └── superpowers/specs/  # 設計規格文件
├── reference/              # 原始參考素材（不納入網站，git 已忽略）
└── README.md
```

---

## 本機開發

不需要 server，直接開檔即可：

```bash
open index.html          # macOS
```

若要用本機伺服器（例如測試雙語相對路徑）：

```bash
python3 -m http.server 8000
# 開 http://localhost:8000/        中文
# 開 http://localhost:8000/en/     English
```

---

## 部署（GitHub Pages）

本站以 GitHub Pages 提供（`main` 分支 / root）：

1. Repo → **Settings → Pages**
2. **Source** 選 `Deploy from a branch`，分支選 `main`、資料夾 `/ (root)`
3. 等部署完成，即可由 `https://<帳號>.github.io/claude-small-business/` 瀏覽

---

## 雙語機制

採**分頁式**而非單頁 JS 切換：

- 中文 `index.html`、英文 `en/index.html` 各自獨立
- 兩頁的章節 `id` 與 CSS class **完全一致**，只有文字不同
- 右上角切換：桌機（≥961px）會帶上當前 `#hash`，停在同一章；行動版回到頁首
- 複製按鈕文字依 `document.documentElement.lang` 自動切換（`複製/已複製` ↔ `Copy/Copied`）

要新增章節時，**務必同步在兩頁加入相同的 `id`**，否則切換會跑位。

---

## 內容查證原則

產品細節經官方頁面查證，與一般二手整理不同的更正包括：

- Claude for Small Business 是 **Claude Cowork 內的免費 plugin**，不是 $20 新方案、無官方確認的 7 天試用
- `/plan-payroll` 是**現金預測 + 追逾期款**，不是真的執行發薪
- 移除來路不明的「每週省 18–25 小時」說法，改為有來源的保守描述與警語
- connector 清單、合規認證、客戶引言與頭銜均以官方為準

---

## 資料來源

- [Anthropic — Introducing Claude for Small Business](https://www.anthropic.com/news/claude-for-small-business)（官方發布文）
- [產品頁 · Solutions](https://claude.com/solutions/small-business)
- [Cowork Plugin 說明](https://claude.com/plugins/small-business)
- [方案與定價](https://claude.com/pricing)
- [Anthropic 信任中心](https://trust.anthropic.com)
- [AI Fluency for Small Business（免費課程）](https://anthropic.skilljar.com/ai-fluency-for-small-businesses)

---

## 致謝與聲明

視覺與結構靈感參考自社群的 *The Founder's Playbook* 編輯風格，文案與內容皆為原創改寫。本專案僅供學習與資訊整理用途，與 Anthropic 無任何官方關係；所有商標與引言版權歸原權利人所有。

---

<sub>Claude for Small Business · 台灣老闆白話導讀 · 2026 · 非官方整理</sub>
