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

> 注：Decap CMS 后台界面可在 `/admin` 预览，但 GitHub Pages 纯静态托管不支持 GitHub OAuth 登录，写作请直接编辑 Markdown。
## 维护与校验

```bash
pnpm install            # 依赖（packageManager 固定 pnpm@9.14.4）
pnpm run type-check     # astro sync + tsc --noEmit（会先生成 .astro/types.d.ts）
pnpm run check          # astro check（.astro 组件类型检查，0 errors 为佳）
pnpm run build          # 完整构建（图标生成 + astro build + pagefind 索引）

# 与 CI / GitHub Pages 一致的静态构建（本地默认走 vercel adapter，产物进 .vercel/）
GITHUB_ACTIONS=true pnpm run build

# 安全审计（默认 registry 是 npmmirror，没有 audit 端点，必须显式指定官方源）
pnpm audit --prod --registry=https://registry.npmjs.org/
```

注意事项：

- `tsconfig.json` 必须保留 `skipLibCheck: true`（Astro 官方 base 预设即如此），否则 `.astro/*.d.ts` 与第三方 d.ts 的噪声会让 type-check 失败。
- `type-check:isolated` 是上游模板的 `--isolatedDeclarations` 严格档，当前源码有 76 处缺少显式返回类型标注，属预期，需要时单独跑。
- `src/utils/icons.ts` 由 `scripts/generate-icons.js` 生成且纳入版本控制（空文件会让全新克隆的 type-check 报找不到模块）；改动图标依赖后重新构建即会更新，生成结果稳定可重复。
- `astro 5.x` 有已公开的 AVIF 图片优化 RCE 等漏洞，修复版本在 7.x；升级 Astro 大版本需连带 `@astrojs/mdx` / `@astrojs/svelte` 等集成一起迁移，属独立任务。
- Decap CMS 的 `/admin` 后台需要服务端 OAuth 回调，GitHub Pages 不支持；当前 `decapCmsOauth({ enable: false })`，写作走 Markdown + push。

Powered by [Twilight](https://github.com/Spr-Aachen/Twilight)
