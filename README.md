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
│   ├── css/main.css
│   └── js/main.js
└── layouts/
    ├── _default/
    │   ├── baseof.html
    │   ├── single.html
    │   └── list.html
    ├── partials/
    │   ├── header.html
    │   ├── sidebar.html
    │   ├── footer.html
    │   ├── post-card.html
    │   └── pagination.html
    ├── taxonomy/
    │   ├── list.html
    │   └── term.html
    ├── index.html
    ├── index.json
    └── 404.html
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
