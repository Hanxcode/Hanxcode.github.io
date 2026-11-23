<script setup>
import { withBase } from 'vitepress'
import {
  ApacheMavenIcon, DockerIcon, FastApiIcon, GitHubIcon, GitIcon, JavaScriptIcon,
  LinuxIcon, MySqlIcon, OpenJdkIcon, PythonIcon, RedisIcon, SpringBootIcon,
  VitePressIcon, VueDotjsIcon,
} from 'vue3-simple-icons'

const skillGroups = [
  { label: '编程语言', skills: [
    { name: 'Java', icon: OpenJdkIcon, color: '#d46837' },
    { name: 'Python', icon: PythonIcon, color: '#3776ab' },
    { name: 'JavaScript', icon: JavaScriptIcon, color: '#b88b00' },
  ] },
  { label: '后端与数据', skills: [
    { name: 'Spring Boot', icon: SpringBootIcon, color: '#589a34' },
    { name: 'FastAPI', icon: FastApiIcon, color: '#008476' },
    { name: 'MySQL', icon: MySqlIcon, color: '#427b94' },
    { name: 'Redis', icon: RedisIcon, color: '#ce443a' },
  ] },
  { label: '前端与建站', skills: [
    { name: 'Vue', icon: VueDotjsIcon, color: '#389570' },
    { name: 'VitePress', icon: VitePressIcon, color: '#786bc2' },
  ] },
  { label: '工具与环境', skills: [
    { name: 'Git', icon: GitIcon, color: '#e65c43' },
    { name: 'Maven', icon: ApacheMavenIcon, color: '#ae4263' },
    { name: 'Docker', icon: DockerIcon, color: '#347fbc' },
    { name: 'Linux', icon: LinuxIcon, color: '#af8317' },
  ] },
]

const activities = [
  { label: '整理 Java SE、Java Web 和 Redis 的学习笔记', link: '/backend/首页.html' },
  { label: '用 Spring AI 练习对话机器人和智能客服', link: '/agent/' },
  { label: '把本站的搭建过程整理成一篇博客搭建指南', link: '/guide/' },
]
</script>

<template>
  <main class="about-page" aria-labelledby="profile-name">
    <header class="profile-card">
      <div class="portrait-frame">
        <img class="portrait" :src="withBase('/header1.jpg')" alt="Hanxcode 的博客头像" width="140" height="140">
      </div>
      <div class="profile-copy">
        <p class="eyebrow">关于我 · ABOUT ME</p>
        <h1 id="profile-name">Hanxcode</h1>
        <p class="profile-subtitle">后端开发 · AI 应用</p>
        <p class="intro">我把学过的东西写在这里，留给下次遇到同一个问题的自己。<br>从 Java 到 Spring AI，慢慢学，也慢慢记。</p>
        <a class="profile-link" href="https://github.com/Hanxcode">
          <GitHubIcon size="16px" aria-hidden="true" /> 我的 GitHub
        </a>
      </div>
    </header>

    <section class="about-section" aria-labelledby="skills-title">
      <h2 id="skills-title">笔记里的技术</h2>
      <div class="skill-groups">
        <div v-for="group in skillGroups" :key="group.label" class="skill-group">
          <h3>{{ group.label }}</h3>
          <ul class="skills">
            <li v-for="skill in group.skills" :key="skill.name" :style="{ '--icon-color': skill.color }">
              <component :is="skill.icon" size="28px" aria-hidden="true" />
              <span>{{ skill.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="about-section" aria-labelledby="activity-title">
      <h2 id="activity-title">最近在做什么</h2>
      <ul class="activity-list">
        <li v-for="activity in activities" :key="activity.link">
          <a class="activity-link" :href="withBase(activity.link)">
            <span>{{ activity.label }}</span><span class="arrow" aria-hidden="true">→</span>
          </a>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped src="./about-me.css"></style>
