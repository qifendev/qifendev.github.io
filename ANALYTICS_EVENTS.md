# qifendev.github.io — Analytics 事件文档

> 站点：https://qifendev.github.io（纯静态 HTML，无框架 / 无构建 / 无 Flutter）
> Firebase 项目：`qifen-website`　Web App ID：`1:560692380028:web:e500f02711f70ce569a4f9`　Measurement ID：`G-JVWCQ2WCCN`
> 实现：`analytics.js`（事件委托，捕获全站每次点击） + `firebase-config.js`（配置）
> GA4 事件上限：500 个不同名称、每个事件 25 个参数、参数值 ≤100 字符（本实现均满足）

---

## 1. 当前状态

- [x] Firebase 项目 `qifen-website` 已创建（2026-11-20）
- [x] Web 应用 `qifendev.github.io` 已注册
- [x] 纯 JS 埋点已接入 `index.html`，全站点击均被捕获
- [x] 隐私政策已披露官网使用 Firebase Analytics（17 个隐私页）
- [x] Firebase 控制台已启用 Analytics，Measurement ID：`G-JVWCQ2WCCN`（2026-11-20）
- [x] ID 已填入 `firebase-config.js` 的 `measurementId` 字段，埋点正式上报

> gtag.js 从 `https://www.googletagmanager.com/gtag/js?id=G-JVWCQ2WCCN` 加载；
> 事件在脚本就绪前照常进入 `dataLayer` 缓冲、就绪后回放，不丢事件。
> 调试：URL 加 `?analytics_debug=1` 逐条打印，Firebase 控制台 → DebugView 实时可见。

---

## 2. 如何启用 Analytics 并拿到 ID

1. 打开 https://console.firebase.google.com/project/qifen-website/overview
2. 左侧「项目设置」→「您的应用」→ Web 应用 `qifendev.github.io`
3. 若未启用：回到概览页点「Google Analytics」卡片 → 启用（Analytics 位置选 **美国/非中国**，因为 GitHub Pages 面向全球；关联已有 GA4 属性或新建）
4. 项目设置页复制 **Measurement ID**（形如 `G-ABC123DEF4`）
5. 填到 `qifendev.github.io/firebase-config.js`：
   ```js
   measurementId: "G-ABC123DEF4"
   ```
6. 验证：打开首页，加 `?analytics_debug=1`，控制台应出现 `[analytics] gtag ready (G-...)`；Firebase 控制台 Analytics → DebugView 实时可见。

---

## 3. 事件表（Event catalogue）

所有事件都带公共参数：`language`（页面当前语言）、`page_path`（路径+查询串）。
下表列出事件名、触发时机、专属参数及用途。

| # | 事件名 | 触发时机 | 参数 | 用途 / 分析维度 |
|---|--------|---------|------|----------------|
| 1 | `page_view` | 每次打开首页（含刷新）；`is_new_session` 标记是否新会话 | `is_new_session` (bool), `referrer` (string) | 访问量、新/回访、来源 |
| 2 | `language_change` | 点击语言切换面板中的某个语言 | `to_language`, `from_language`, `method='switcher'` | **哪种语言最受欢迎**、切换路径 |
| 3 | `lang_switcher_click` | 点击右上角语言按钮（展开/收起） | `action='toggle'` | 语言功能使用率 |
| 4 | `store_click` | **点击 Google Play / App Store 下载徽章** | `app_id` (如 `idownload`), `store` (`google_play`/`app_store`), `link_url` | **哪个 App 下载意愿最高**、各商店占比 |
| 5 | `coming_soon_click` | 点击「Coming soon」徽章（未上架 App） | `app_id` | **哪些待开发 App 需求最高**（排期依据） |
| 6 | `outbound_click` | 点击外部链接 / 邮件（Telegram、YouTube、TikTok、Email） | `destination` (`external`/`email`), `link_url`, `link_text`, `app_id` | 社媒引流效果 |
| 7 | `nav_click` | 点击页内锚点（如 "Explore the apps"、导航 Apps） | `target` (如 `#apps`), `link_text` | CTA  effectiveness、首屏引导效果 |
| 8 | `link_click` | 其它 `<a>` 链接（隐私政策等） | `link_url`, `link_text`, `store` | 补充覆盖 |
| 9 | `button_click` | 其它 `<button>` 或 `role=button` 控件 | `element_id`, `element_text` | 通用按钮覆盖 |
| 10 | `ui_click` | **兜底**：任何未被上面捕获的点击 | `tag`, `element_id`, `class_name`, `element_text` | 保证「每个点击都有记录」，页面改版也不漏 |

### 参数字典

| 参数 | 类型 | 示例 | 说明 |
|---|---|---|---|
| `app_id` | string | `ishare`, `idownload`, `iscan`, `iplayer`, `idevice`（已上架）；`izip`, `idoc`, `ibook`, `inote`, `icamera`, `irecord`, `imedia`, `ispeed`, `icast`（待上架） | 从所在 App 卡片的 `.app-name` 自动提取（小写去符号） |
| `store` | string | `google_play` / `app_store` | 由链接域名判定 |
| `language` | string | `zh-hans`, `en-us`, `ja`, `ar-sa` | 页面 `document.documentElement.lang` |
| `to_language` / `from_language` | string | `zh-hant` / `en-us` | 语言切换前后 |
| `link_url` | string | `https://play.google.com/...` | 完整目标链接（不含 PII） |
| `element_text` / `link_text` | string | `GET IT ON Google Play` | 元素可见文字，截断 80 字符 |

---

## 4. 实现原理（为什么能覆盖「每个按钮」）

- **单一事件委托**：`analytics.js` 在 `document` 上挂一个 `click` 监听，页面里所有元素（包括语言切换后 `innerHTML` 重绘出来的 App 卡片按钮）都会被捕获，无需逐元素绑定。
- **必须用捕获阶段**（`addEventListener('click', fn, true)`）：`#langBtn` 自身监听器调用了 `e.stopPropagation()`，若用冒泡阶段，语言按钮的点击根本到不了 `document`，`lang_switcher_click` 会永久漏采。捕获阶段先于目标元素的监听器执行，且本脚本只观察、不 `preventDefault`/`stopPropagation`，不影响页面交互。
- **识别顺序**：语言选项 → 语言按钮 → 下载徽章/Coming soon → 所有链接 → 按钮控件 → 兜底 `ui_click`。命中即 `return`，不重复上报。
- **下载识别**：徽章 `a[href]` 域名含 `play.google.com` → `google_play`，含 `apps.apple.com` → `app_store`。
- **App 识别**：向上找 `.app-card` 读 `.app-name`，转成小写 id（与仓库命名一致）。
- **无 gtag 时**：`gtag()` 仍把事件压入 `window.dataLayer`；GA4 脚本加载后会回放队列，不丢事件。
- **零隐私风险**：不采集输入、不采集 Cookie 内容、不含邮箱以外的 PII；`mailto:` 只记录 `email` 类型与链接文本。

---

## 5. 使用示例（控制台调试）

```js
// 手动发一个自定义事件
qifenTrack('my_event', { foo: 'bar' });

// 查看缓冲的事件
dataLayer.filter(x => x[0] === 'event');

// 调试模式：URL 加 ?analytics_debug=1，控制台逐条打印
```

---

## 6. 常见分析场景

- **哪个 App 最受欢迎**：按 `store_click` 的 `app_id` 分组计数（下载意愿）。
- **待开发优先级**：`coming_soon_click` 的 `app_id` 排名 → 决定先做哪个（iZip / iDoc / iBook…）。
- **语言分布**：`language_change.to_language` + `page_view.language` → 哪些语言用户真正使用。
- **商店对比**：`store_click.store` → Google Play vs App Store 占比。
- **社媒引流**：`outbound_click.destination` / `link_url` → Telegram / YouTube / TikTok 效果。
