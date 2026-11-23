# Hanxcode 学习博客

这个博客由 VitePress 把仓库里的 Markdown 笔记生成网页。Obsidian 是可选的编辑器，PicGo 是可选的图床工具；用其他编辑器写的 `.md` 和本地图片也可以直接发布。

第一次建站？从[用 VitePress 搭建自己的博客](../guide/index.md)开始，了解本地预览、添加文章和发布到 GitHub Pages 的步骤。顶栏的「关于我」和「友情链接」是两个独立页面；收录朋友的博客时，直接在 `friends/index.md` 中添加 Markdown 链接即可。

## 把已有笔记放上来

1. 先在仓库外解压、检查正文和截图，移除真实密码、令牌、私钥及其他不想公开的内容。不要把原始 ZIP、无关附件或图床凭据加入 Git。
2. 把 `.md` 和它引用的附件一起复制到相应目录。例如：文章放在 `backend/java/JavaSE/输入输出/笔记.md`，配图放在同级的 `images/io.png`，正文写 `![输入输出示意图](./images/io.png)`。路径从文章所在位置算起，用 `/`，大小写与文件名一致。电脑上的盘符路径、Obsidian 的 `![[图片.png]]` 要换成标准 Markdown 链接。
3. 在 `backend/首页.md` 的相应专题补上文章链接。VitePress 会扫描 `backend/` 自动生成侧栏，不用为每篇文章改配置。网站从首页点「后端学习」就能看到这份目录。

**文章标题怎么定？** 推荐用 `# 文章标题` 开头，正文的章节从 `##` 写起。没有写页首标题也能发布：网站优先用文件顶部 YAML 中的 `title`，否则用文件名；更新时间、字数和预计阅读时长只在页首显示一次。新笔记还没有 Git 提交记录时，不显示更新时间。

**什么时候用 PicGo？** 图片已随笔记保存时，保留相对路径即可，不必逐张上传。如果希望新截图放到图床，先在本机 PicGo 配好图床并试传一张不含隐私的图片，再启动 PicGo 的 HTTP 服务。Obsidian 的 **Image auto upload** 插件默认调用 `http://127.0.0.1:36677/upload`：在笔记里粘贴截图，看到返回的图床链接就表示上传成功。把已有文件夹复制进仓库不会触发批量上传。图床令牌只保存在本机，不要写进笔记或提交到仓库。

**怎么补回缺图？** 在笔记里搜索「配图待补」。如果手头有原图，就把它放到该篇笔记旁边的 `.assets` 目录，用 `![图片说明](./笔记名.assets/文件名.png)` 替换提示。对于标有「公开版已省略」的截图，只补裁剪或打码后的版本。

## 本地预览

在仓库根目录使用 Node.js 24（与部署环境一致）：

| 命令 | 用途 |
| --- | --- |
| `npm ci` | 首次安装或锁文件变化后安装依赖 |
| `npm run docs:dev` | 编辑时预览；打开终端给出的网址，检查首页入口和文章配图 |
| `npm run docs:build` | 执行与线上相同的生产构建，输出到 `.vitepress/dist/` |
| `npm run docs:preview` | 构建成功后，本地查看生成的网站 |

## 发布与排查

**用 Obsidian：** 把仓库根目录作为库（vault）打开，启用 **Obsidian Git**。当前配置约每 5 分钟自动提交并推送未忽略的改动，不限于当前打开的笔记，因此应在复制进库前就完成隐私检查。同步需要 Obsidian 开着、Git 可用、网络正常，并且本机 Git 账号有远端写权限。

**不用 Obsidian：** 也可以直接用 Git。下面用前面的目录举例，请替换为实际路径；只暂存本次笔记、所需图片和首页，不要用 `git add .`。

```sh
git status --short --branch
git add -- "backend/java/JavaSE/输入输出/笔记.md" "backend/java/JavaSE/输入输出/images/io.png" "backend/首页.md"
git diff --cached
git commit -m "添加 Java 输入输出笔记"
git push
```

本仓库本地 `master` 已跟踪远端分支 `master/master`（远端名称也是 `master`），所以直接 `git push` 即可。推送到 `master` 后，GitHub Actions 自动安装依赖、构建并部署到 [GitHub Pages](https://hanxcode.github.io/)；不需要提交 `.vitepress/dist/`。

**网站没更新？** 在 GitHub 上先看 `master` 是否已有这次提交。没有就排查 Git 同步：本库的 `.git` 在根目录，若 Obsidian Git 提示 `Base path does not exist`，请把插件的「仓库子目录 / Base path」留空，不要在这里填 GitHub 网址。有提交就打开 **Actions → Deploy VitePress site to Pages** 对应的运行。`build` 失败时看第一个报错，并用 `npm run docs:build` 本地复现；`deploy` 失败时检查仓库 **Settings → Pages** 是否选择 **GitHub Actions**。如果页面更新但图片没显示，先核对图片是否一起提交、路径大小写是否完全一致。
