# Vue3

Vue是一款用于**构建用户界面**的**渐进式**JavaScript**框架***。

* 构建用户界面：基于数据渲染出用户看到的界面
* 框架：就是一套完整的项目解决方案，用于快速构建项目

## Vue快速入门

准备

* 引入Vue模块（官方提供）
* 创建Vue程序的应用实例，控制视图的元素
* 准备元素（div），被Vue控制

数据驱动视图

* 准备数据
* 通过插值表达式渲染页面

```Vue
<div id = "app">
    <h1>{{message}}</h1>
    <h1>{{count}}</h1>

  </div>
  
 <script type = "module">
   import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

   createApp({
    data(){
      return {
        message:'Hello Vue',
        count:100
      }
    }
   }).mount('#app');
 </script>
```

## Vue常用指令

指令：HTML标签上带有 v-前缀的特殊属性，不同的指令具有不同的含义，可以实现不同的功能

| 指令                      | 作用                                                  |
| ------------------------- | ----------------------------------------------------- |
| v-for                     | 列表渲染，遍历容器的元素或者对象的属性                |
| v-bind                    | 为 HTML 标签绑定属性值，如设置 href、css 样式等       |
| v-if / v-else-if / v-else | 条件性的渲染某元素，判定为 true 时渲染，否则不渲染    |
| v-show                    | 根据条件展示某元素，区别在于切换的是 display 属性的值 |
| v-model                   | 在表单元素上创建双向数据绑定                          |
| v-on                      | 为 HTML 标签绑定事件                                  |

### v-for

语法

```vue
<tr v-for = "(item,index) in items" : key = "item.id">{{item}}</tr>
```

参数说明：

* items 为遍历的数组
* item 为遍历出来的元素
* index 为索引 / 下标，从0开始；可以省略，省略index语法：v-for = "item in items"

Key

- 作用：给元素添加的唯一标识，便于Vue进行列表项的正确排序复用，提升渲染性能
- 推荐使用id作为key（唯一），不推荐使用index作为key（会变化，不对应）

注意：便利的数组，必须在data中定义；要想让哪个标签循环展示多次，就在哪个标签上使用 v-for 指令

### v-bind

作用：动态为HTML标签绑定属性值，如设置href，src，style样式等。

语法：v-bind:属性名="属性值"

```Vue
<img v-bind:src="item.image" width="30px">
```

简化：属性名="属性值" 

```vue
<img :src="item.image" width="30px">
```

注意：动态的为标签的属性绑定值，不能使用插值表达式，得使用 v-bind 指令。且绑定的数据，必须在 data 中定义。

### v-if  &  v-show

作用：这两类指令，都是用来控制元素的显示与隐藏的

**v-if：**

- 语法：v-if="表达式"，表达式值为 true，显示；false，隐藏
- 原理：基于条件判断，来控制创建或移除元素节点（条件渲染）
- 场景：要么显示，要么不显示，不频繁切换的场景
- 其它：可以配合 v-else-if / v-else 进行链式调用条件判断

注意：**v-else-if必须出现在v-if之后，可以出现多个； v-else 必须出现在v-if/v-else-if之后 。** 

**v-show：**

- 语法：v-show="表达式"，表达式值为 true，显示；false，隐藏
- 原理：基于CSS样式display来控制显示与隐藏
- 场景：频繁切换显示隐藏的场景

### v-model

作用：在表单元素上使用，双向数据绑定。可以方便的获取和设置表单项数据

语法： v-model = "变量名"

# Ajax

Asynchronous JavaScript And XML，异步的JavaScript 和 XML。

XML：（Extensible Markup Language）可扩展标记语言，本质是一种数据格式，可以用来储存复杂的数据结构

Ajax作用：

* 数据交换：通过Ajax可以给服务器发送请求，并获取服务器相应的数据。
* 异步交换：可以在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页的技术，如：搜索联想、用户名是否可用的校验等等

## async & await

可以通过async、await让异步变为同步操作。async就会是用来声明一个异步方法，await 是用来等待异步任务执行
