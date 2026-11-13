# qifendev.github.io

个人工作室官网（GitHub Pages），托管**隐私政策**与**商店素材**。

> **远程配置已下线**：因 App Store 审核要求（不得由服务端下发开关改变 app 行为），
> fast_sea 已删除 `remoteConfigUrl`，改为随安装包发布的包内本地配置
> `packages/fast_sea/assets/config/remote_config.json`，运行时不联网、不读下面的
> `config/` 目录。`SeaRatingRemote.enabled` 默认 `false`（启动不弹评分框）。
> 详见 [`../release_fast_sea/doc/BUNDLED_CONFIG.md`](../release_fast_sea/doc/BUNDLED_CONFIG.md)。

## 目录

| 目录 / 文件 | 用途 |
|---|---|
| `index.html` | 单页官网。内嵌 10 语言字典 `I18N`、`APPS`（已上架 4 个）、`PLANNED`（规划中 10 个）、`GLYPH`（内联 SVG 图标）、语言切换与卡片渲染。 |
| `images/` | 已上架 app 的图标（`ishare.png` 等）。规划中的 app 用内联 SVG，不占图片文件。 |
| `config/<app>/latest.json` | **已废弃的旧远程配置**（广告频率、评分、维护/更新提示），app 已不再读取；保留仅为历史记录，新增 app 不必再建。配置改在 fast_sea 包内 `assets/config/remote_config.json`，改动必须发版。 |
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
并在 `privacy/` 补政策页。配置统一走 fast_sea 包内本地配置，不再建 `config/<app>/latest.json`。

## 规划依据

完整规划见 [`../release/docs/APP_ROADMAP_2026-11-06.md`](../release/docs/APP_ROADMAP_2026-11-06.md)。
包名统一 `site.qifen.<app>`；目前处于**待确认**阶段，未创建分支、未开发。
