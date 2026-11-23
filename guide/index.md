---
description: 从运行本站源码开始，换上自己的站名，写下第一篇笔记，再用 GitHub Pages 发布。
---

# 用 VitePress 搭建自己的博客

这个博客没有后台和数据库。你写一份 Markdown 文件，VitePress 就能把它变成网页；推送到 GitHub 后，GitHub Actions 会构建网站，GitHub Pages 负责让别人访问。下面从本站源码开始，发布一篇自己的笔记。

## 一篇笔记怎样变成网页？

1. **文件决定页面。** 仓库根目录就是文档根目录：`index.md` 是首页，`agent/index.md` 对应 `/agent/`。Obsidian 只是写 Markdown 的一种编辑器，PicGo 只是把图片上传到图床的工具；用普通编辑器和随文章提交的本地图片，也能得到同样的网页。
2. **配置决定内容怎么呈现。** VitePress 把 Markdown 编译为 Vue 页面。`.vitepress/config.mjs` 用 `withSidebar` 按栏目生成侧栏，用 `withMermaid` 支持流程图；Markdown 插件分别处理时间线、MathJax 公式和文章页首。站内的 `articleHeader` 插件会为普通文章插入标题下方的元信息，不必每篇手写。
3. **主题决定信息出现在哪里。** `.vitepress/theme/index.js` 复用 VitePress 的默认布局 `DefaultTheme.Layout`，例如通过 `doc-footer-before` 插槽在文章末尾放置「返回顶部」按钮。文章的最后更新时间来自该文件的 Git 提交记录；字数和预计阅读时长则由浏览器根据正文与配图统计，不是手填的发布日期。
4. **发布只需要静态文件。** GitHub Actions 运行与本地相同的构建命令，将生成的 `.vitepress/dist/` 交给 Pages。读者访问的是其中的 HTML、样式和脚本，服务器不必为每次阅读运行 Node.js。

## 1. 在本机打开博客

准备好 [Git](https://git-scm.com/downloads) 和 [Node.js 24](https://nodejs.org/en/download)（与本站部署环境一致，附带 npm）。打开[本站源仓库](https://github.com/Hanxcode/Hanxcode.github.io)，点 **Fork** 创建自己的副本，然后从**自己仓库**的 **Code → HTTPS** 复制克隆地址。把下例的 `YOUR-NAME/YOUR-REPO` 换成你的账号和仓库名；最后的 `my-blog` 只是本机文件夹名。

```sh
git clone https://github.com/YOUR-NAME/YOUR-REPO.git my-blog
cd my-blog
npm ci
npm run docs:dev
```

打开终端打印的本地网址，保持终端运行。用任意文本编辑器打开根目录的 `index.md`，把 `hero.name` 改成自己的名字并保存；浏览器首页随之变化，就说明你改对了文件。仓库虽有 `pnpm-lock.yaml`，当前发布流程用的是 npm 和 `package-lock.json`，照着做时不用两种包管理器都装一遍。

## 2. 换成自己的站点信息

| 想改什么 | 改哪里 |
| --- | --- |
| 首页大标题、副标题、按钮、卡片 | 根目录 `index.md` 的 `hero` 和 `features` |
| 顶栏「关于我」 | `about/index.md` 使用 `.vitepress/theme/components/AboutMe.vue`；详细介绍、技术分组与近况在组件里 |
| 顶栏「友情链接」 | `friends/index.md` 是独立的 Markdown 页面，直接在其正文中维护站名和链接 |
| 浏览器标签标题、网站简介、标签图标 | `.vitepress/config.mjs` 的 `title`、`description`、`head` |
| 顶栏站名、栏目、GitHub 链接 | 同一配置文件的 `themeConfig.siteTitle`、`nav`、`socialLinks` |

**如何维护友链？** 打开 `friends/index.md`。目前友站区域尚未收录博客；另一小节里的 Vue、VitePress 官方文档是建站参考资料，不是互换的友链。有朋友的博客要收录时，用下面这样的 Markdown 列表项替换友站区域的空状态说明，记得把示例站名、网址都换成对方的真实主页：

```md
- [朋友的博客名](https://example.com/)
```

「关于我」和「友情链接」是两个独立的导航项，分别指向 `/about/` 和 `/friends/`。如果要调整它们在「主页」左边的排列顺序，调整 `themeConfig.nav` 中对应项的顺序即可；新增一条友链只需改正文，不必改导航。建站指南本身位于 `guide/index.md`，网址是 `/guide/`。

改标签图标时，可以把自己的图片放在 `public/`。例如文件是 `public/favicon.png`，在配置的 `head` 中把图标的 `href` 写成 `` `${base}favicon.png` ``。不要把 `public` 写进网址；这里的 `base` 是站点部署路径，在第 4 步确定。

## 3. 写一篇读者找得到的文章

以一篇 Python 笔记为例，新建 `backend/Python/第一篇笔记.md`，写下：

```md
# 第一次读懂列表推导式

我想把一组整数里的偶数筛出来。

## 例子

`[number for number in [1, 2, 3, 4] if number % 2 == 0]` 的结果是 `[2, 4]`。
```

再打开 `backend/首页.md`，在「Python」一节加上 `- [第一次读懂列表推导式](./Python/第一篇笔记.md)`。保存后，从[后端学习笔记](../backend/首页.md)点进新文章。侧边栏按 `backend/` 下的文件自动生成，栏目首页的推荐链接则是手写的，两者不是一回事。

- **给文章配图：** 把截图放在文章旁边的 `images/` 文件夹。例如有了 `backend/Python/images/result.png`，就在正文写 `![筛选偶数的结果](./images/result.png)`。发布时把图片一起提交，文件名大小写要完全一致。
- **换栏目：** 写 Agent 笔记就放到 `agent/` 下，并在 [Agent 笔记目录](../agent/index.md)（`agent/index.md`）补链接。
- **新建一级栏目：** 例如新建 `life/index.md`，在 `themeConfig.nav` 加上 `{ text: '生活', link: '/life/' }`。如果还需要和后端栏目一样的侧边栏，在 `.vitepress/config.mjs` 的 `sidebarConfigs` 里复制一组配置，将 `scanStartPath` 改成 `life`，`basePath`、`resolvePath` 都改成 `/life/`，再填写栏目名 `rootGroupText`。

## 4. 按最终网址检查构建结果

先确定读者将从哪个网址打开你的博客，再设置 `.vitepress/config.mjs` 顶部的 `const base`：

| 计划使用的网址（示例） | `base` |
| --- | --- |
| `https://YOUR-NAME.github.io/`（仓库名是 `YOUR-NAME.github.io`），或部署在自定义域名的根目录 | `'/'`（本站默认值） |
| `https://YOUR-NAME.github.io/my-blog/`（普通仓库 `my-blog`） | `'/my-blog/'`（把 `my-blog` 换成实际仓库名） |

回到终端，按 `Ctrl+C` 停止开发预览，再运行：

```sh
npm run docs:build
npm run docs:preview
```

构建会生成 `.vitepress/dist/`。打开预览服务打印的网址；如果设了子路径，确认地址栏也有这段路径。从首页进入栏目、打开新文章，并刷新文章页，检查正文、样式和图片都能加载。这比直接双击生成的 HTML 更接近读者在线上的体验。

## 5. 发布到 GitHub Pages

1. 在自己的 GitHub 仓库打开 **Settings → Pages → Build and deployment**，将 **Source** 选为 **GitHub Actions**。如果 Fork 的仓库还未启用工作流，在 **Actions** 页启用。
2. 在本地运行 `git branch --show-current`。本站 `.github/workflows/deploy.yml` 监听的是 `master`；如果你要发布的分支叫 `main`，先把工作流中 `push` 下的 `branches: [master]` 改为 `branches: [main]`。停掉预览，查看并推送这次修改：

   ```sh
   git status --short --branch
   git add -- index.md .vitepress/config.mjs "backend/首页.md" "backend/Python/第一篇笔记.md"
   git diff --cached
   git commit -m "发布第一篇博客笔记"
   git push
   ```

   这个 `git add` 只列出示例文件。若换了图标、添加了配图或修改了工作流，也要逐一暂存；不要上传 `node_modules/`、`.vitepress/dist/`、密钥或未经处理的私人截图。
3. 打开 **Actions → Deploy VitePress site to Pages**。`build` 成功表示站点已生成，`deploy` 成功才表示已发布。通过部署记录里的网址访问网站，按第 4 步的路线再走一遍。

如果推送后没有新运行，先核对分支和工作流开关；如果首页打开却没有样式，检查 `base` 是否与网址前缀一致；如果只有某一张图不见了，先在 GitHub 上确认图片已提交，再核对文章中的相对路径和大小写。之后写第二篇文章，不必重新建站：写 Markdown、补目录链接、预览、推送即可。
