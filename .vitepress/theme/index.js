/**
 * 自定义主题入口文件
 *
 * 通过 extends DefaultTheme 继承 VitePress 默认主题，
 * 并在此基础上注册自定义组件、初始化第三方库（Mermaid、medium-zoom、busuanzi）、
 * 以及通过插槽扩展页面布局。
 */
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import './style/custom.css';
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import bsz from "./components/bsz.vue"
import update from "./components/update.vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import backtotop from "./components/backtotop.vue"
import header from "./components/header.vue"
import MyLayout from './components/MyLayout.vue'
import "vitepress-markdown-timeline/dist/theme/index.css";
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import { h } from "vue";
import mermaid from "mermaid";


export default {
    // 继承 VitePress 默认主题，保留默认样式与行为
    extends: DefaultTheme,

    /**
     * setup 函数：
     * 只在客户端执行，用于初始化一些浏览器端才需要的第三方库和交互效果。
     */
    setup() {
        onMounted(() => {
            // 初始化 Mermaid：关闭自动渲染，改为在需要时手动控制
            mermaid.initialize({ startOnLoad: false })

            /**
             * 初始化 medium-zoom：
             * 为页面中 class 包含 .mermaid 的 svg 图表启用点击放大功能。
             * 背景色使用 CSS 变量，保证在明暗主题下都能自然过渡。
             */
            mediumZoom('.mermaid svg', { background: 'var(--vp-c-bg)' });
        })

        const route = useRoute();

        /**
         * 初始化 medium-zoom 的图片放大功能：
         * 为文章正文内的所有 <img> 图片启用点击放大，
         * 并在路由切换后重新绑定，保证 SPA 跳转后新页面图片也能生效。
         */
        const initZoom = () => {
            // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认只放大带 data-zoomable 属性的图片
            mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 为文章正文所有图片启用放大
        };

        onMounted(() => {
            initZoom();
        });

        // 监听路由变化，DOM 更新完成后重新初始化图片放大
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );
    },

    /**
     * enhanceApp：
     * 用于注册全局组件、挂载路由钩子等。
     * 这里注册了 update 和 ArticleMetadata 两个全局组件，
     * 并在每次路由切换后触发 busuanzi 重新统计访问量。
     */
    enhanceApp({ app, router }) {
        if (inBrowser) {
            // 路由切换完成后重新拉取不蒜子访问统计，确保 SPA 跳转后统计数字更新
            router.onAfterRouteChanged = () => {
                busuanzi.fetch()
            }
        }

        // 注册全局组件，方便在 Markdown 中直接使用
        app.component('update', update)
        app.component('ArticleMetadata', ArticleMetadata)
    },

    /**
     * Layout：
     * 通过渲染 DefaultTheme.Layout 并使用其插槽扩展页面。
     * - doc-footer-before：在文档页脚前插入“返回顶部”组件
     * - layout-bottom：在页面底部插入不蒜子访问统计组件
     * - home-hero-image：在首页 Hero 图片位置插入自定义 header 组件
     */
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'doc-footer-before': () => h(backtotop), // 文档页脚前显示返回顶部按钮
            'layout-bottom': () => h(bsz),           // 页面底部显示访问统计
            'home-hero-image': () => h(header)       // 首页 Hero 区域使用自定义图片组件
        })
    }
}
