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
│   │   └── apps.css          # 软件中心页专用，仅该页加载
│   └── js/
│       ├── main.js
│       └── apps.js           # 下载菜单的触摸与键盘支持
├── layouts/
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── single.html
│   │   └── list.html
│   ├── apps/
│   │   └── list.html         # 软件中心页模板
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

## 软件中心页面

主题内置 `/apps/` 软件中心页：卡片式网格，每个应用含图标、名称、系统标签、简介，以及「直接下载」「前往官网」两个按钮。

### 启用

1. 在**站点根目录**创建 `content/apps/_index.md`：

```markdown
---
title: "软件中心"
subtitle: "常用软件集中管理，一处直达下载。"
---

这里可以写一段介绍，显示在标题下方。
```

2. 在**站点根目录**创建 `data/apps.yaml`（字段见下）。
3. 在 `hugo.toml` 中加入导航入口：

```toml
[[menus.main]]
  name = "软件中心"
  url = "/apps/"
  weight = 2
```

该页会自动隐藏侧栏并占满内容区宽度，无需额外配置。

### 数据字段

```yaml
groups:
  - name: 浏览器                 # 分组名称
    apps:
      - name: Google Chrome
        summary: 一句话简介，卡片内最多显示两行
        site: https://www.google.com/chrome/      # 官网
        icon: /icons/chrome.svg                   # 选填，留空回退首字母
        platforms:                                # 该应用支持的系统
          - os: Windows
            url: https://dl.google.com/chrome/install/latest/chrome_installer.exe
          - os: macOS
            url: https://dl.google.com/chrome/mac/universal/stable/GGRO/googlechrome.dmg
          - os: Linux
            url: https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

### 平台标签与下载按钮

`os` 会渲染为卡片标题下方的平台标签。下载按钮的行为由数据自动决定：

| 情形 | 表现 |
|---|---|
| 只有一个平台 | 「直接下载」直接跳转该地址 |
| 多平台，且各平台地址不同 | 悬浮（或点击）展开平台菜单，点选后跳转 |
| 多平台，但地址都相同 | 不展开菜单，直接跳转 —— 避免三个菜单项指向同一处 |

### 关于下载链接

`url` 可以是安装包直链，也可以是官方下载页，三种常用形态：

| 形态 | 示例 | 说明 |
|---|---|---|
| 稳定直链 | `https://update.code.visualstudio.com/latest/win32-x64-user/stable` | 官方维护的「最新版」地址，长期有效 |
| 平台直链 | `https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb` | 各平台分别有固定路径 |
| 下载页 | `https://github.com/owner/repo/releases/latest` | 无稳定文件名时的兜底 |

若官网下载地址由页面内 JavaScript 动态生成（含签名或时效参数），**纯前端无法可靠解析** —— 浏览器跨域策略会阻断对第三方站点的请求。此时只有两条路：指向官方下载页，或在构建阶段用 `resources.GetRemote` 抓取真实地址并配合定时重建。

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
