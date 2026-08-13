<script setup>
/**
 * header 组件
 *
 * 用于替换首页 Hero 区域的默认图片。
 * 通过 theme/index.js 中的 'home-hero-image' 插槽注入。
 * 图片路径指向 public/header1.jpg，VitePress 会自动将其作为静态资源提供。
 */
</script>

<template>
  <!-- 使用 VitePress 内置的 VPImage 样式类，保持与默认 Hero 图片一致的布局行为 -->
  <img
      class="VPImage image-src"
      src="../../../public/header1.jpg"
      alt=""
  >
</template>

<style scoped>
/*
 * 为首页 Hero 图片添加上下浮动动画：
 * 通过复杂的 CSS 选择器精准定位 VitePress 默认生成的 Hero 图片元素，
 * 避免影响站点其他位置的图片。
 */
#VPContent>div>div.VPHero.has-image.VPHomeHero>div>div.image>div>img {
  animation: Updown .9s infinite alternate ease-in-out;
}

/* 上下浮动关键帧：在 -50% 到 -46% 之间来回移动，形成轻微浮动效果 */
@keyframes Updown {
  0% {
    transform: translate(-50%, -50%);
  }
  100% {
    transform: translate(-50%, -46%);
  }
}
</style>
