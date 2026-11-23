<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()
const aside = computed(() => frontmatter.value.homeAside)
</script>

<template>
  <aside v-if="aside" class="home-sidebar" aria-label="博客侧栏">
    <section class="side-card" aria-labelledby="home-about">
      <h2 id="home-about">关于我</h2>
      <p class="side-note">{{ aside.bio }}</p>
      <a class="about-link" :href="withBase('/about/')">更多关于我 <span aria-hidden="true">→</span></a>
    </section>

    <section class="side-card" aria-labelledby="home-friends">
      <h2 id="home-friends">友情链接</h2>
      <template v-if="aside.friendLinks?.length">
        <p v-if="aside.linksNote" class="side-note">{{ aside.linksNote }}</p>
        <ul class="friend-list">
          <li v-for="friend in aside.friendLinks" :key="friend.url">
            <a :href="friend.url" target="_blank" rel="noopener noreferrer">
              {{ friend.name }} <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </template>
      <p v-else class="side-note">暂未收录友链。</p>
    </section>
  </aside>
</template>

<style scoped>
.home-sidebar {
  display: grid;
  gap: 16px;
  margin: 16px 24px 0;
  overflow-wrap: anywhere;
}
.side-card {
  min-width: 0;
  padding: 20px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
}
.side-card h2 {
  border-inline-start: 3px solid var(--vp-c-brand-1);
  padding-inline-start: 10px;
  font-size: 16px;
  font-weight: 650;
  line-height: 24px;
}
.side-note {
  margin-top: 10px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.65;
}
.side-card a {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 550;
}
.side-card a:hover { text-decoration: underline; }
.side-card a:focus-visible { outline: 2px solid var(--vp-c-brand-2); outline-offset: 2px; }
.side-card a span { color: var(--vp-c-brand-1); }
.about-link { width: fit-content; margin-top: 6px; }
.friend-list { margin: 6px 0 0; padding: 0; list-style: none; }
.friend-list a { justify-content: space-between; }
.friend-list li + li { border-top: 1px solid var(--vp-c-divider); }

@media (min-width: 640px) and (max-width: 959px) {
  .home-sidebar { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-inline: 48px; }
}
@media (min-width: 960px) {
  .home-sidebar { margin: 0; }
}
</style>
