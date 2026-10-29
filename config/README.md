# config/ — 远程配置托管

每个 app 一个目录、一个 `latest.json`，由客户端启动时拉取
（`SeaApp(remoteConfigUrl: 'https://qifendev.github.io/config/<app>/latest.json')`）。

```
config/
├── ishare/latest.json
└── <app>/latest.json      ← 新增 app 时照此建目录
```

字段说明、优先级、常用配方与排错手册见 fast_sea 仓库：

```
release_fast_sea/doc/REMOTE_CONFIG.md
```

几点约定：

- **整包替换**：改一个字段也要复制整个文件再改，不存在“部分覆盖”。
- 平台差异用字段表达（`platforms`、`unitIds.ios` / `unitIds.android`），**不要**按平台拆文件。
- 文件必须 UTF-8 + 合法 JSON；解析失败客户端会整包丢弃、继续用缓存。
- 本地兜底由 fast_sea 包内 `assets/config/remote_config.json` 统一提供，
  app 一般不需要自带配置。
- 协议/隐私页放 `../privacy/`，通过配置里的 `privacyUrl` / `termsUrl` 指过去。
- 推送后 Pages 有几十秒到几分钟缓存，验证时可加 `?v=时间戳`。
