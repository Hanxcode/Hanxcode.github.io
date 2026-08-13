<script setup>
/**
 * tmp 组件
 *
 * 一个节日风格的装饰组件，渲染圣诞树、雪花飘落、蜡烛火焰与火花粒子效果。
 * 当前未在默认布局中全局使用，可作为特殊页面或节日活动的装饰组件手动引入。
 */

// 生成圣诞树的每一行星星数量：1, 3, 5, ..., 19（共 10 行）
const rows = Array.from({ length: 10 }, (_, i) => i * 2 + 1);

/**
 * 生成雪花数据：
 * - left：水平位置百分比
 * - duration：下落动画时长（秒）
 * - delay：动画延迟（秒），让雪花错落有致
 */
const snowflakes = Array.from({ length: 50 }, () => ({
  left: Math.random() * 100,
  duration: Math.random() * 5 + 3,
  delay: Math.random() * 5,
}));

/**
 * 生成蜡烛火花粒子的随机样式：
 * 包括水平位置、大小、动画时长/延迟和透明度。
 */
const generateSparkStyle = () => {
  const left = Math.random() * 100;
  const size = Math.random() * 3 + 2;
  const animationDuration = Math.random() * 1.5 + 1;
  const animationDelay = Math.random() * 0.5;
  const opacity = Math.random() * 0.5 + 0.5;

  return {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${animationDelay}s`,
    opacity: opacity,
  };
};

</script>

<template>
  <!-- 整个场景容器：全屏居中显示 -->
  <div class="tree-container">
    <!-- 雪花层：50 片雪花随机飘落 -->
    <div
        v-for="(flake, index) in snowflakes"
        :key="index"
        class="snowflake"
        style="color: white"
        :style="{
        left: `${flake.left}%`,
        animationDuration: `${flake.duration}s`,
        animationDelay: `${flake.delay}s`
      }"
    >
      ❅
    </div>

    <!-- 圣诞树主体包装器 -->
    <div class="tree-wrapper">
      <!-- 左侧蜡烛组：3 根蜡烛，每根带火焰和火花 -->
      <div class="candles">
        <div v-for="(index) in 3" :key="index" class="candle">
          <div class="flame"/>
          <div class="spark" style="margin-left: -2px" v-for="n in 40" :key="n" :style="generateSparkStyle()"></div>
        </div>
      </div>

      <!-- 圣诞树区域：星星、树冠、树干 -->
      <div class="tree-area">
        <div class="star">★</div>
        <div class="tree">
          <div v-for="(row, index) in rows" :key="index" class="tree-row">
            <span v-for="i in row" :key="i" class="tree-star">*</span>
          </div>
        </div>
        <div class="tree-trunk">
          <div style="display:flex;">
            <div class="trunk-line"></div>
            <div class="trunk-line"></div>
          </div>
          <div style="display:flex;">
            <div class="trunk-line"></div>
            <div class="trunk-line"></div>
          </div>
          <div style="display:flex;">
            <div class="trunk-line"></div>
            <div class="trunk-line"></div>
          </div>
        </div>
        <!-- 底部装饰 GIF -->
        <div style="margin-top: -20px;height: 20px;width: 20px">
          <img src="/public/pictures/nilu.gif" alt="" style="margin-top: -20px;height: 20px;width: 200px">
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>
/* 场景容器：全屏居中 */
.tree-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-left: 90px;
}

.tree-wrapper {
  display: flex;
  align-items: center;
}

/* 圣诞树区域：垂直居中排列 */
.tree-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
}

/* 蜡烛样式 */
.candle {
  width: 10px;
  height: 40px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  margin: 10px 0;
}

.candles {
  margin-top: 220px;
  display: flex;
  gap: 20px;
  align-items: center;
  margin-right: 20px;
}


/* 雪花：绝对定位，从顶部飘落 */
.snowflake {
  position: absolute;
  top: -18%;
  left: 0;
  color: white;
  font-size: 15px;
  opacity: 0.8;
  animation: snow linear infinite;
}

/* 雪花下落关键帧 */
@keyframes snow {
  0% {
    transform: translateY(-100px);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

/* 树顶星星：黄色并持续旋转 */
.star {
  color: yellow;
  font-size: 24px;
  margin-bottom: 5px;
  animation: spin 3s linear infinite;
}

/* 树冠：绿色字符组成的三角形 */
.tree {
  display: flex;
  color: green;
  flex-direction: column;
  align-items: center;
}

.tree-row {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  line-height: 20px;
  white-space: nowrap;
}

.tree-star {
  margin: 0 1px;
}

/* 树干 */
.tree-trunk {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.trunk-line {
  width: 6px;
  height: 10px;
  background-color: #815814;
  margin: 2px 0;
}

/* 星星旋转动画 */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}




/* 蜡烛火花：从火焰顶部向上飘散 */
.spark {
  position: absolute;
  bottom: 100%;
  width: 4px;
  height: 4px;
  background-color: yellow;
  border-radius: 50%;
  opacity: 0;
  animation: sparkAnimation 1.5s infinite;
}

/* 火花飘散关键帧 */
@keyframes sparkAnimation {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px) scale(0.7);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-20px) scale(0.3);
    opacity: 0;
  }
}
</style>
