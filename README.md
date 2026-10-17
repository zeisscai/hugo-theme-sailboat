# Sailboat

一个现代、美观的 [Hugo](https://gohugo.io) 主题。默认黑暗主题，大量使用毛玻璃效果与卡片式布局，强调色为 `#ffcd00`。

## 特性

- **黑暗优先**：默认黑暗主题，一键切换至明亮主题，选择记忆在 `localStorage`。
- **毛玻璃效果**：导航栏、侧边栏、卡片、页脚使用 `backdrop-filter` 实现玻璃质感。
- **卡片式布局**：内容以卡片形式呈现，视觉清晰、层次分明。
- **响应式设计**：桌面、平板、移动端均有良好表现，移动端带抽屉式菜单。
- **站内搜索**：通过 Hugo 自定义输出格式生成 `search.json` 索引，前端零依赖搜索。
- **自动分类导航**：顶部导航栏根据文章分类自动生成分类链接。
- **中英文混排字体**：文章标题与正文使用 Noto Serif（中英），界面使用 Noto Sans（中英）。
- **资源管道**：CSS/JS 通过 Hugo Pipes 自动压缩与指纹化，无需 Node.js。

## 环境要求

- Hugo **v0.146.0** 及以上（建议使用 extended 版本，用于资源管道处理）

## 安装

将本主题放入 Hugo 项目的 `themes/` 目录：

```bash
git clone https://github.com/zeisscai/hugo-theme-sailboat themes/sailboat
```

或在项目目录下作为子模块：

```bash
git submodule add https://github.com/zeisscai/hugo-theme-sailboat themes/sailboat
```

## 配置

在站点根目录的 `hugo.toml` 中启用主题：

```toml
title = "Sailboat"
theme = "sailboat"
defaultContentLanguage = "zh-cn"

[taxonomies]
  category = "categories"
  tag = "tags"

[params]
  author = "Sailboat"
  description = "一个现代、美观的 Hugo 主题"
  favicon = "/favicon.png"
  defaultTheme = "dark"      # dark 或 light
  beian = "京ICP备12345678号-1"
  policeBeian = "京公网安备 11010102003777号"

  [params.stats]
    visits = "128,560"
    articles = 24
    comments = 1024

[menus]
  [[menus.main]]
    name = "首页"
    url = "/"
    weight = 1
  [[menus.main]]
    name = "关于"
    url = "/about/"
    weight = 2

# 站内搜索索引输出格式
[outputFormats]
  [outputFormats.SearchIndex]
    mediaType = "application/json"
    baseName = "search"
    isPlainText = true
    notAlternative = true

[outputs]
  home = ["HTML", "RSS", "SearchIndex"]
```

## 内容结构

```
content/
├── _index.md        # 首页固定内容
├── about.md         # 关于页面
└── posts/           # 文章目录
    └── hello.md
```

文章 front matter 示例：

```markdown
---
title: "文章标题"
date: 2026-07-21
draft: false
categories: ["设计"]
tags: ["CSS", "毛玻璃"]
description: "文章摘要，用于列表与搜索索引"
---
```

## 目录结构

```
themes/sailboat/
├── theme.toml
├── README.md
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── apps.css          # 应用商店页专用，仅该页加载
│   └── js/main.js
├── layouts/
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── single.html
│   │   └── list.html
│   ├── apps/
│   │   └── list.html         # 应用商店页模板
│   ├── partials/
│   │   ├── header.html
│   │   ├── sidebar.html
│   │   ├── footer.html
│   │   ├── post-card.html
│   │   ├── app-card.html     # 单个应用卡片
│   │   └── pagination.html
│   ├── taxonomy/
│   │   ├── list.html
│   │   └── term.html
│   ├── index.html
│   ├── index.json
│   └── 404.html
└── exampleSite/              # 可直接运行的演示站点
    ├── hugo.toml
    ├── data/apps.yaml
    └── content/
```

## 应用商店页面

主题内置 `/apps/` 应用商店页：卡片式网格，每个应用含图标、名称、简介，以及「直接下载」「前往官网」两个按钮。

### 启用

1. 在**站点根目录**创建 `content/apps/_index.md`：

```markdown
---
title: "应用商店"
subtitle: "常用软件集中管理，一处直达下载。"
---

这里可以写一段介绍，显示在标题下方。
```

2. 在**站点根目录**创建 `data/apps.yaml`（字段见下）。
3. 在 `hugo.toml` 中加入导航入口：

```toml
[[menus.main]]
  name = "应用"
  url = "/apps/"
  weight = 2
```

该页会自动隐藏侧栏并占满内容区宽度，无需额外配置。

### 数据字段

```yaml
groups:
  - name: 开发工具          # 分组名称
    apps:
      - name: Visual Studio Code
        summary: 一句话简介，卡片内最多显示两行
        site: https://code.visualstudio.com/        # 官网下载页
        download: https://example.com/app-x64.exe   # 选填，文件直链
        platform: Windows                            # 选填
        version: 最新稳定版                           # 选填
        icon: /icons/vscode.svg                      # 选填，留空回退首字母
```

`download` 留空时只渲染「前往官网」按钮。**不确定的直链不要填** —— 悬空的下载按钮比没有按钮更糟。

### 关于下载链接

`download` 支持三种形态：

| 形态 | 示例 | 说明 |
|---|---|---|
| 固定直链 | `https://dl.example.com/app-1.2.3.exe` | 需随版本更新 |
| 跳转链接 | `https://update.code.visualstudio.com/latest/win32-x64-user/stable` | 浏览器自动跟随 302，长期有效 |
| 开源项目 | `https://github.com/owner/repo/releases/latest/download/app.exe` | 文件名稳定时可长期有效 |

若官网下载地址由页面内 JavaScript 动态生成（含签名或时效参数），**纯前端无法可靠解析** —— 浏览器跨域策略会阻断对第三方站点的请求。此时只有两条路：改为指向官网下载页，或在构建阶段用 `resources.GetRemote` 抓取真实地址并配合定时重建。

### 图标

图标放在站点 `static/icons/` 下，`icon` 字段填 `/icons/xxx.svg`。留空时自动以应用名首字母渲染彩色方块作为占位，不影响布局。

### 本地预览

```bash
cd exampleSite
hugo server
```

`exampleSite/hugo.toml` 中的 `themesDir` 与 `theme` 依赖仓库目录名；若目录名不同，改用：

```bash
hugo server --themesDir ../.. --theme <你的目录名>
```

## 本地预览

```bash
hugo server
```

默认在 `http://localhost:1313/` 提供预览。

## 自定义

- **强调色**：修改 `assets/css/main.css` 顶部 `:root` 中的 `--accent`。
- **字体**：修改 `baseof.html` 中 Google Fonts 链接与 CSS 中的 `--font-sans` / `--font-serif`。
- **备案信息**：在 `hugo.toml` 的 `[params]` 下设置 `beian` 与 `policeBeian`。

## 许可

MIT License
