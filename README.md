# qifendev.github.io

个人工作室官网（GitHub Pages），同时托管**远程配置**与**隐私政策**。

## 目录

| 目录 / 文件 | 用途 |
|---|---|
| `index.html` | 单页官网。内嵌 10 语言字典 `I18N`、`APPS`（已上架 4 个）、`PLANNED`（规划中 10 个）、`GLYPH`（内联 SVG 图标）、语言切换与卡片渲染。 |
| `images/` | 已上架 app 的图标（`ishare.png` 等）。规划中的 app 用内联 SVG，不占图片文件。 |
| `config/<app>/latest.json` | 各 app 的远程配置（广告频率、评分、维护/更新提示）。现有 4 份：`ishare`、`idownload`、`iscan`、`iplayer`。 |
| `privacy/` | 隐私政策与服务条款 HTML（Play / App Store 上架必填）。 |
| `app-ads.txt` | AdMob 发布商声明。 |
| `code/`, `temp/` | 站内辅助资源。 |

## 页面结构（2026-11-06）

1. Hero
2. **Our Apps** — 已上架 4 个（iShare / iDownload / iScan / iPlayer），带 Google Play / App Store 徽标。
3. **In the works**（新增） — 规划中 10 个本地工具，用 `badgeSoon` 显示「开发中」，**不生成假的商店链接**：
   `iDevice · iZip · iDoc · iBook · iNote · iCamera · iRecord · iMedia · iSpeed · iCast`
   卡片数据来自 `PLANNED` 数组；文案在 `I18N.<lang>.planned`（en / zh_Hans / zh_Hant 完整，其余语言回退英文），
   区块标题 `plannedTitle` / `plannedSub` 覆盖全部 10 种语言。
4. Connect / Footer

新 app 上架后：把 `PLANNED` 里对应项移到 `APPS`，补上 `gp` / `as` 链接与 `images/<app>.png`，
再在 `config/<app>/latest.json` 与 `privacy/` 补配置和政策页。

## 规划依据

完整规划见 [`../release/docs/APP_ROADMAP_2026-11-06.md`](../release/docs/APP_ROADMAP_2026-11-06.md)。
包名统一 `site.qifen.<app>`；目前处于**待确认**阶段，未创建分支、未开发。
