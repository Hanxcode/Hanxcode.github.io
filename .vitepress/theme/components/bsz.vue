<script setup>
/**
 * bsz（不蒜子）访问统计组件
 *
 * 不蒜子（busuanzi）是一个轻量级的第三方站点访问统计服务。
 * 本组件在页面底部显示：
 * - 本站访客数（UV，独立访客）
 * - 本站总访问量（PV，页面浏览量）
 *
 * 实际计数逻辑由 busuanzi.pure.js 在 theme/index.js 中初始化并在路由切换时刷新。
 */
</script>

<template>
  <div class="busuanzi">
    本站访客数 <span id="busuanzi_value_site_uv" style="font-weight: bold"/> 人次
    &nbsp;&nbsp;&nbsp;&nbsp;
    本站总访问量 <span id="busuanzi_value_site_pv" style="font-weight: bold"/> 次
  </div>
</template>

<style>
/* 访问统计居中对齐，使用小号灰色文字，避免喧宾夺主 */
.busuanzi {
  font-size: 11px;
  color: gray;
  text-align: center;
}
</style>
