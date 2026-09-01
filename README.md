# Yumei's Blog

个人博客，基于 [Twilight](https://github.com/Spr-Aachen/Twilight) 搭建 —— 一个基于 Astro 框架、支持 CMS 的静态博客模板。

- 🌐 博客地址：https://yumei1010.github.io
- ✍️ 写作方式：直接编辑 `src/content/` 下的 Markdown，推送后自动构建部署
- ⚙️ 部署方式：GitHub Actions 自动构建部署到 GitHub Pages

## 写作

在 `src/content/posts/` 下创建 `.md` 文件（带 frontmatter），推送 `main` 分支后自动发布：

```markdown
---
title: 文章标题
published: 2026-09-01
description: 文章描述
category: 随笔
tags: [随笔, 技术]
draft: false
---

文章正文（Markdown）
```

- `draft: true` 表示草稿（不发布）
- `pinned: true` 表示置顶
- 支持 Mermaid 图表、KaTeX 公式、GitHub 仓库卡片等增强语法

## 本地开发

```bash
pnpm install
pnpm dev
```

## 部署

推送 `main` 分支后，GitHub Actions（withastro/action）自动构建并部署到 GitHub Pages。

> 注：Decap CMS 后台界面可在 `/.admin` 预览，但 GitHub Pages 纯静态托管不支持 GitHub OAuth 登录，写作请直接编辑 Markdown。

Powered by [Twilight](https://github.com/Spr-Aachen/Twilight)
