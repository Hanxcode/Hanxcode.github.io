/**
 * VitePress 站点配置文件
 *
 * 本文件负责博客的全局配置，包括：
 * - 站点基础信息（标题、描述、图标、根路径）
 * - 主题配置（导航栏、搜索、社交链接、侧边栏）
 * - Markdown 插件扩展（时间线、数学公式、Mermaid、RSS 等）
 * - Vue 编译选项（自定义元素白名单，用于 MathJax）
 */
import { defineConfig } from 'vitepress';
import timeline from "vitepress-markdown-timeline";
import { generateSidebar, withSidebar } from 'vitepress-sidebar';
import { withMermaid } from 'vitepress-plugin-mermaid';
import mathjax3 from 'markdown-it-mathjax3';
import { RssPlugin } from "vitepress-plugin-rss";

// 站点部署的基础路径，'/' 表示部署在域名根目录
const base = '/';

/**
 * MathJax 渲染时会生成大量自定义标签（如 <mjx-container>、<mfrac> 等）。
 * Vue 默认会把未知的 HTML 标签当成组件尝试解析，导致警告或渲染异常。
 * 因此需要将这些 MathJax 相关标签列入自定义元素白名单，让 Vue 直接透传渲染。
 */
const customElements = [
  'mjx-container', 'mjx-assistive-mml', 'math', 'maction', 'maligngroup', 'malignmark', 'menclose', 'merror', 'mfenced', 'mfrac', 'mi', 'mlongdiv', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mscarries', 'mscarry', 'mscarries', 'msgroup', 'mstack', 'mlongdiv', 'msline', 'mstack', 'mspace', 'msqrt', 'msrow', 'mstack', 'mstack', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'semantics', 'math', 'mi', 'mn', 'mo', 'ms', 'mspace', 'mtext', 'menclose', 'merror', 'mfenced', 'mfrac', 'mpadded', 'mphantom', 'mroot', 'mrow', 'msqrt', 'mstyle', 'mmultiscripts', 'mover', 'mprescripts', 'msub', 'msubsup', 'msup', 'munder', 'munderover', 'none', 'maligngroup', 'malignmark', 'mtable', 'mtd', 'mtr', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'msline', 'msrow', 'mstack', 'maction', 'semantics', 'annotation', 'annotation-xml',
];


/**
 * 基础 VitePress 配置对象。
 * 注意：此对象尚未包含侧边栏，sidebar 会在后面通过 withSidebar 包装后自动注入。
 */
const baseVitePressConfig = {
  // 部署基础路径
  base,

  // 开启页面最后更新时间显示（基于 Git 提交时间）
  lastUpdated: true,

  // 站点标题与描述，会用于 HTML <title> 和 SEO
  title: "hanxcode",
  description: "我的想学习小站",

  // 站点图标（浏览器标签页）
  head: [
    ['link', { rel: 'icon', href: `https://github.com/Hanxcode/image-host/blob/main/header1-modified.png?raw=true` }]
  ],

  // Vite 插件配置示例：如需启用 RSS，可取消下面注释并配置 RSS 选项
  // vite:{
  //   plugins: [RssPlugin(RSS)]
  // },

  // 默认主题配置，详见：https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    // 左上角站点标题
    siteTitle: "今天也要来杯咖啡吗☕",

    // 本地搜索配置
    search: {
      provider: 'local',
      options: {
        // 搜索框与结果弹窗的文案汉化
        translations: {
          button: {
            buttonText: "哎，整点咖啡🤓☝🏻",
            buttonAriaLabel: "哎，整点咖啡🤓☝🏻",
          },
          modal: {
            noResultsText: "没有找到结果",
            resetButtonTitle: "清除搜索条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          }
        }
      }
    },

    // 顶部导航栏：依次显示“后端”、“agent”、“主页”
    // activeMatch 用于在访问子页面时保持对应导航项的高亮状态
    nav: [
      { text: '<strong>后端</strong>', link: '/backend/首页.md', activeMatch: '/backend/' },
      { text: '<strong>agent</strong>', link: '/agent/', activeMatch: '/agent/' },
      { text: '<strong>主页</strong>', link: '/' },
    ],

    // 右上角社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hanxcode' }
    ],

    // themeConfig.sidebar 将由 withSidebar 生成和添加，此处不手动维护
  },

  // Vue 模板编译选项
  vue: {
    template: {
      compilerOptions: {
        // 将 MathJax 相关标签标记为自定义元素，避免 Vue 把它们解析为组件
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },

  // Markdown 解析配置
  markdown: {
    config: (md) => {
      // 全局注册 markdown-it 插件：时间线语法支持
      md.use(timeline);

      // 全局注册 MathJax 数学公式渲染插件
      md.use(mathjax3);

      /**
       * 自定义 heading_close 渲染规则：
       * 在每一篇文档的 <h1> 标题后自动插入 <ArticleMetadata /> 组件，
       * 用于展示文章的更新时间、字数、阅读时长等元信息。
       * 注意：这里先保存原始规则，确保不会破坏 VitePress 默认的标题渲染行为。
       */
      const originalHeadingCloseRule = md.renderer.rules.heading_close;
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = originalHeadingCloseRule
            ? originalHeadingCloseRule(tokens, idx, options, env, slf)
            : slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      };
    }
  },

  /**
   * vitepress-sidebar 插件配置：
   * - useTitleFromFileHeading：从文件内的一级标题自动提取侧边栏文本
   * - collapsed：默认折叠分组
   * - collapseDepth：控制折叠层级
   */
  sidebar: generateSidebar({
    useTitleFromFileHeading: true,
    collapsed: true,     // 默认折叠分组
    collapseDepth: 2,    // 折叠深度为 2 级菜单
  })
};

/**
 * 侧边栏扫描配置数组。
 * vitepress-sidebar 会根据这里的配置自动扫描指定目录，
 * 按照文件夹结构生成对应的侧边栏导航。
 */
const sidebarConfigs = [
  {
    documentRootPath: '',       // 文档根目录为项目根目录
    scanStartPath: 'backend',   // 扫描 backend 目录
    basePath: '/backend/',      // 侧边栏链接的基础路径
    resolvePath: '/backend/',   // 解析路径
    rootGroupText: '后端学习笔记', // 侧边栏根分组标题
    removePrefixAfterOrdering: true,
    prefixSeparator: '.',
  },
  {
    documentRootPath: '',
    scanStartPath: 'agent',
    basePath: '/agent/',
    resolvePath: '/agent/',
    rootGroupText: 'Agent 笔记',
    removePrefixAfterOrdering: true,
    prefixSeparator: '.',
  },
];

// 使用 withSidebar 包装基础配置，将自动生成的侧边栏注入到 themeConfig.sidebar 中
const configWithSidebar = withSidebar(baseVitePressConfig, sidebarConfigs);

/**
 * 最终导出：
 * 1. 先用 withSidebar 生成侧边栏
 * 2. 再用 withMermaid 包装，启用 Mermaid 图表支持
 * 3. 最后用 defineConfig 导出标准 VitePress 配置
 */
export default defineConfig(
    withMermaid({
      // 将包含侧边栏的配置对象展开
      ...configWithSidebar,

      // Mermaid 图表库配置，详见：https://mermaid.js.org/config/setup/modules/mermaidAPI.html
      mermaid: {
        // 你的 Mermaid 配置...
      },

      // Mermaid 插件配置：为图表容器追加自定义 CSS 类
      mermaidPlugin: {
        class: "mermaid my-class",
        // 你的 Mermaid 插件配置...
      },

      // 如果还有其他顶层配置需要添加，可以在这里继续添加
    })
);
