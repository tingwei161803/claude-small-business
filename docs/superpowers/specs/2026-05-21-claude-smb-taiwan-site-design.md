# 設計規格：Claude for Small Business · 台灣老闆導讀互動網頁

- **日期**：2026-05-21
- **作者**：Peter Chang（monkeydluffy3u4@gmail.com）
- **狀態**：設計核准，待 spec review

---

## 1. 目標與定位

把 Anthropic 2026-05-13 發布的 **Claude for Small Business** 整理成一份**中英雙語、互動式、編輯風格**的單頁導讀網站，對象是「沒有 IT 部門、一人或小團隊撐起整間店的台灣中小企業老闆」。

差異化重點：
1. **白話比喻**教學（食譜 / 萬能轉接頭 / 不會算錯的會計 / 自帶設計師），降低 enterprise 文體門檻。
2. **🇹🇼 台灣對照註解**——把美國工具、定價、巡迴講座對應到台灣的真實可用方案與限制。
3. **事實以官方為準**——所有產品細節經查證，存疑者標註或不寫死。

非目標（YAGNI）：
- 不做後端、不做帳號系統、不做互動式 prompt 執行器（僅複製貼上）。
- 不嵌入影片檔，僅以連結指向官方示範。
- 不做深色模式（第一版）。

---

## 2. 內容來源與原創性原則

- **參考但不照抄**：`reference/` 內的 ELI5 簡報（作者 Dennis Wei）僅作為「教學概念骨架」參考。所有文案**全部重寫**，換敘事、換例子句構；保留通用比喻方向（食譜/轉接頭/會計/設計師）但不沿用其句子。
- **移除**參考素材的專屬內容：原作者署名、特定 LINE 讀書會連結、可疑的 findskill.ai「18-25 小時/週」統計。
- **作者署名**改為本專案作者；來源頁清楚標示官方原始出處。
- **founder playbook**（`../anthropic-the-founder-playbook`）僅作為**視覺與結構**參考，CSS 為自家專案，可沿用同風格但獨立檔案。

---

## 3. 經查證的事實基礎（內容必須符合）

### 必須採用（VERIFIED）
- **15 個 ready-to-run agentic workflows**，外加 15 個底層 skills（兩者不同，不可混為「15 個功能」）。
- Workflow 對應 slash 指令：`/plan-payroll`、`/close-month`、`/monday-brief`、`/run-campaign`，啟用用 `/smb-onboard`（或對 Claude 說「get me started」）。
- **「Payroll」= 預測現金 + 追逾期款，不是真的跑發薪**。文案需精準描述為「薪資/現金規劃」。
- 啟用方式：**在 Claude Cowork 裡安裝「Claude for Small Business」plugin → 開啟 → 接工具 → 跑 `/smb-onboard`**。它是 Cowork 內的 plugin/toggle，**不是獨立 app、也不是獨立付費方案**。
- **定價更正**：Claude for Small Business 本身**免費**，內建於 Cowork，任何付費方案皆可用。方案價：Pro $20/月（年繳 $17）、Max 自 $100/月起、Team $25/席/月（年繳 $20，5 席起）、Enterprise 客製。**沒有官方確認的 7 天免費試用，不要寫。**
- Daniela Amodei 引言（逐字）："Small businesses make up nearly half the American economy, but they've never had the resources of bigger companies. AI is the first technology that can finally close that gap."
- 三則客戶見證（逐字 + 正確頭銜）：
  - Brian Ludviksen, COO, **Purity Coffee**：「Not only could it problem-solve for me, it also showed me problems I didn't know I had.」
  - Mike Beckham, CEO, **Simple Modern**：「...Hours of looking at stuff that doesn't matter are gone. I want an entire organization where everybody is using these tools daily.」
  - Ryan Olson, **Technology and Innovation Manager, MidCentral Energy**：「It's freeing up things that used to be a lot of very tedious clerical work for more value-add tasks.」
- **50% 資安擔憂**：是 **Anthropic 自家對小企業主的調查**（「half named data security as their single biggest hesitation」），不是第三方研究。
- 資料隱私：「We don't train on your data」——商用產品預設不拿客戶輸入訓練模型。
- 認證：SOC 2 Type I & II、ISO/IEC 27001:2022、ISO/IEC 42001:2023（AI 管理）、HIPAA（可簽 BAA）、GDPR。
- AI Fluency for Small Business 免費課程：`anthropic.skilljar.com/ai-fluency-for-small-businesses`，9 課、約 54 分鐘、隨選、免帳號、完課發證書。
- Claude SMB Tour：美國 10+ 城市免費半日工作坊（2026 春–秋），參加者送 1 個月 Claude Max。

### Connector 清單（不要寫死「8 個」）
「整合的工具包含 QuickBooks、PayPal、HubSpot、Canva、Docusign、Slack、Stripe、Square、Google Workspace、Microsoft 365」等，清單比 8 個廣。

### 不要宣稱（DO NOT CLAIM）
- findskill.ai「18-25 小時/週」→ 捏造，移除。可改用有來源的保守說法（findskill.ai 第三方部落格估「完整採用約 10-15 小時/週」，明確標為第三方估計、非官方）。
- 7 天免費試用 → 無官方來源，不寫。

### 待現場確認（標 ⚠️ 或不寫死）
- SMB Tour 確切春/秋城市清單（含紐澤西 Hamilton Township）。
- trust.anthropic.com 逐字認證措辭（JS 渲染，認證內容已由 Privacy Center 佐證）。

---

## 4. 站台架構

```
claude-small-business/
├── index.html              # 中文版（lang="zh-Hant"，主頁）
├── en/index.html           # English 版（lang="en"）
├── assets/
│   ├── styles.css          # Anthropic 編輯風 + 本站新增元件
│   └── app.js              # 進度條 / TOC 高亮 / 雙語 hash 保留 / 產品名高亮
├── docs/                   # 內容 markdown 與本 spec
└── reference/              # 既有參考素材（不動）
```

- **分頁式雙語**：右上角 `[中 | EN]` 切到對應頁面；桌機保留當前章節 hash（同 founder playbook 的 `app.js` 機制），行動版回頂部。
- 兩頁章節 `id` 必須一致（cover, p00…p09, roadmap, sources），確保切換對齊。

---

## 5. 章節結構（完整版，中英各一份）

| id | 章節 | 核心比喻 / 重點 |
|----|------|----------------|
| cover | 封面 Hero | 24 小時待命的萬能小幫手 |
| p00 | 先搞懂這是什麼 | 傳統做法 vs 用 Claude SMB（住進你工具裡的兼職） |
| p01 | 為什麼小企業需要 | 終於支付得起的 AI 顧問；Daniela 引言；50% 資安擔憂（自家調查） |
| p02 | 15 道現成食譜 | workflow 三分類；slash 指令；不用學 prompt engineering |
| p03 | 萬能轉接頭 | connector 清單；vs ChatGPT「住進工具」；🇹🇼 工具對照 |
| p04 | 不會算錯帳的兼職會計 | 財務 workflow；「草擬 ≠ 寄出」；阿明早餐店情境 |
| p05 | 自帶設計師的行銷助理 | campaign / lead triage；小芳電商情境 |
| p06 | 3 位老闆的真實故事 | Purity / Simple Modern / MidCentral 逐字引言；🇹🇼 找到自己 |
| p07 | 銀行金庫等級保護 | 不訓練、加密、認證；⚠️ 你自己也要做的 3 件事 |
| p08 | 免費補習班 + 巡迴講座 | AI Fluency 課程；SMB Tour（🇹🇼 美國限定→台灣走線上） |
| p09 | 手把手裝起來 + Prompt 食譜書 | Cowork plugin 安裝 4 步驟 + 4 情境 prompt |
| roadmap | 下一步路徑圖 | 三條路徑 CTA（試水溫 / 已訂閱 / 找夥伴） |
| sources | 資料來源 | 官方出處逐一列出，可查核 |

安裝步驟（**依查證更正**）：
1. 確認有 Claude 付費方案（Pro/Max/Team 任一，Cowork 已含）。
2. 在 Claude Cowork 安裝「Claude for Small Business」plugin 並開啟。
3. 連接你最常用的 1 個工具（OAuth 授權）。
4. 跑 `/smb-onboard`（或說「get me started」）→ 複製情境 prompt 開跑。

8 個情境 prompt（重寫，台灣角色）。每個含「你貼的 prompt」「Claude 會做什麼」「省時對照」：
1. 🍳 阿明 · 早餐店 — 月結對帳交會計師
2. 💎 小芳 · 手作飾品電商 — 弱月救援 campaign
3. 🎬 阿凱 · YouTuber/自媒體 — 業配合約審查
4. 👩‍🏫 老師娘 · 線上開課 — 學員 morning brief
5. 🧋 阿珍 · 手搖飲/咖啡（多分店） — 各店營收對帳 + morning brief + 毛利
6. 💅 Vivi · 個人工作室（美甲/美容/按摩） — 預約 + 回診提醒 + 客戶分群
7. 🎨 阿哲 · 接案設計師/SOHO — 報價/合約審查 + 追尾款
8. 📚 主任 · 補習班/才藝班 — 繳費追蹤 + 招生 campaign + 家長未回訊息

---

## 6. 🇹🇼 台灣對照註解（差異化重點）

用 `.tw-note` 元件（台灣旗 + 暖色卡片）穿插各章：
- **工具對照**：QuickBooks→鼎新/Excel；PayPal/Stripe/Square→綠界/藍新/街口/Line Pay；HubSpot→行動百分百/Salesforce；Docusign→iSign/Adobe Sign；Slack→LINE/Teams。
- **現實提醒**：SMB Tour 美國限定 → 台灣走免費線上 AI Fluency；定價以官方 USD 為準（換算僅約略）；信用卡需開跨國消費 / 可用數位帳戶金融卡；繁中介面情形。
- **責任提醒**：LINE 公開群勿貼客戶個資；帳號用獨立 email + 兩步驟驗證；先跟員工講清楚「什麼能給 AI 看」。

註解須**準確、不誇大**；台灣替代工具僅為「同類常用服務」示意，非官方整合（要講清楚 connector 是否真支援）。

---

## 7. 視覺風格（沿用 Anthropic 編輯風，獨立 CSS）

- 調色：奶油 `#F0EEE6` / 紙 `#FAF9F5` / 墨 `#191919` / Claude 橘 `#CC785C`。
- 字體：Fraunces（標題襯線）+ DM Sans + Noto Serif/Sans TC + JetBrains Mono。
- 既有元件沿用：hero、chapter head、prose、product chip 高亮、stage/challenge/tool/story 卡、decision 表（RWD 轉卡片）、進度條、sticky TOC。
- **新增元件**：
  - `.tw-note`——🇹🇼 台灣對照卡（暖底 + 左橘邊）。
  - `.recipe`——workflow 食譜卡（指令 + 一句說明）。
  - `.flow`——流程步驟（1→2→3→4，橫向，RWD 直排）。
  - `.timesave`——省時對照（3 小時 → 20 分鐘）。
  - `.install-step`——安裝步驟（你要做什麼 / 你會看到什麼 / 卡住了？三區塊）。
  - `.prompt-card`——情境 prompt（可複製碼框 + Claude 行為清單 + 省時）。
  - `.warn`——⚠️ 提醒（草擬≠寄出、資安責任）。

---

## 8. 互動行為（app.js）

- 頂部閱讀進度條。
- sticky TOC 當前章節高亮（IntersectionObserver / scroll）。
- 行動版 TOC 收合。
- 語言切換：桌機保留 hash 跳對應頁同章節；行動版回頂部。
- 產品名（Claude / Claude Cowork / Claude Code）自動高亮 chip（中英頁同步）。
- prompt 卡「複製」按鈕（clipboard API，含 fallback）。
- 無障礙：`:focus-visible`、`prefers-reduced-motion`、語意標籤、ARIA。

---

## 9. Agent Team 執行計畫

設計與 spec 核准後，開 agent team 平行施工（leader = 本會話統籌合併與驗證）：

- **Agent A — 樣式**：擴充 `assets/styles.css`（沿用既有 + 新增 §7 元件）。
- **Agent B — 中文內容上**：`index.html` Part 00–05。
- **Agent C — 中文內容下**：`index.html` Part 06–09 + roadmap + sources + 安裝 + prompt。
- **Agent D — 英文版**：`en/index.html` 全文對應翻譯（章節 id 對齊）。
- **Agent E — 互動 + 校對**：`assets/app.js`、雙語章節對齊、連結檢查、RWD/無障礙巡檢。

共用契約：章節 `id`、CSS class 名、事實基礎（§3）由 spec 固定，避免 agent 各做各的。

---

## 10. 驗收標準

- [ ] `index.html` 與 `en/index.html` 章節 `id` 完全一致，可雙向切換並保留章節。
- [ ] 所有 §3「必須採用」事實正確呈現，無 §3「不要宣稱」內容。
- [ ] 安裝流程反映「Cowork plugin、免費、無 7 天試用」的正確框架。
- [ ] 每章至少 1 個 🇹🇼 台灣對照註解，內容準確不誇大。
- [ ] 4 個情境 prompt 可一鍵複製。
- [ ] 行動版（≤560px）、平板、桌機三斷點版面正常；TOC 收合可用。
- [ ] 文案為原創改寫，無照抄參考簡報句子；作者署名為本專案作者。
- [ ] 鍵盤可操作、`prefers-reduced-motion` 下無動畫、對比度足夠。
- [ ] 無 console error；外部連結 `rel="noopener"`。
