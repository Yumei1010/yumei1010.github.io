# Yumei's Blog

个人博客，基于 [Gmeek](https://github.com/Meekdai/Gmeek) 搭建 —— 一个完全基于 GitHub Pages + Issues + Actions 的超轻量博客框架。

- 🌐 博客地址：https://yumei1010.github.io
- ✍️ 写作方式：直接在 [Issues](https://github.com/Yumei1010/YuMei.github.io/issues) 中发帖（需添加至少一个 Label）
- ⚙️ 部署方式：GitHub Actions 自动构建，无需本地环境

## 写作指南

1. 打开本仓库的 [Issues](https://github.com/Yumei1010/YuMei.github.io/issues) 页面，点击 **New issue**
2. 标题即文章标题，正文支持 Markdown
3. **必须添加至少一个 Label（标签）**，保存后会自动触发构建
4. 片刻后访问 https://yumei1010.github.io 即可看到新文章

### 常用 Label 约定

- `documentation` / `good first issue` / `help wanted` 等均可，任意自定义标签都会作为文章分类展示

## 自定义

- 修改 `config.json` 中的标题、副标题、头像等配置后，需在 Actions 页面手动执行一次 **build Gmeek → Run workflow**（全局重新生成）
- 主题等高级自定义可参考 [Gmeek 文档](https://blog.meekdai.com/post/Gmeek-kuai-su-shang-shou.html)

Powered by :heart: [Gmeek](https://github.com/Meekdai/Gmeek)
