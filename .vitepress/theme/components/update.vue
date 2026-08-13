<script setup lang="ts">
/**
 * update 组件
 *
 * 显示当前页面的最后更新时间。
 * 基于 VitePress 提供的 page.lastUpdated 数据，
 * 可在 Markdown 中通过 <update /> 全局组件使用。
 */
import { useData } from 'vitepress'
import { computed } from 'vue'

// 获取当前页面数据
const { page } = useData()

// 将 lastUpdated 转换为本地时间字符串
const date = computed(
    () => new Date(page.value.lastUpdated!)
)
</script>

<template>
  <div class="LastUpdated">
    <p>更新时间: {{ date.toLocaleString() }}</p>
  </div>
</template>

<style>
.LastUpdated {
  color: var(--vp-c-text-2);
}
</style>
