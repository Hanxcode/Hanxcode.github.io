<!-- .vitepress/theme/MyLayout.vue -->

<script setup lang="ts">
/**
 * MyLayout 组件
 *
 * 扩展默认主题布局，目前主要用于实现“点击切换明暗主题”时的
 * View Transition 圆形扩散动画效果。
 *
 * 通过 provide('toggle-appearance') 覆盖 VitePress 默认的主题切换行为，
 * 在支持 startViewTransition 的浏览器中提供更平滑的过渡动画。
 */
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'

// 获取 VitePress 全局数据，其中 isDark 控制当前是否为深色主题
const { isDark } = useData()

/**
 * 判断当前浏览器是否支持 View Transition 动画，
 * 同时尊重用户系统设置的“减少动画”偏好。
 */
const enableTransitions = () =>
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches

/**
 * 覆盖默认的主题切换函数：
 * 1. 如果不支持 View Transition，直接切换主题
 * 2. 如果支持，则以鼠标点击位置为圆心，使用 clip-path 圆形扩散动画过渡
 */
provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  // 计算从点击位置到屏幕四个角的最大距离，作为圆形扩散的半径
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  // 启动 View Transition，在 DOM 更新完成后再执行动画
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  // 根据切换后的主题方向决定圆形扩散的顺序（深色/浅色方向相反）
  document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
      }
  )
})
</script>

<template>
  <DefaultTheme.Layout>
    <!-- 这里可以插入其他插槽组件，目前仅继承默认布局 -->
  </DefaultTheme.Layout>
</template>

<style>
/*
 * View Transition 伪元素样式：
 * 关闭默认动画和混合模式，避免与自定义 clip-path 动画冲突。
 */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 控制新旧视图在过渡期间的层级关系，确保主题切换时视觉连续 */
::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

/* 调整主题切换开关的样式，使其更紧凑 */
.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
