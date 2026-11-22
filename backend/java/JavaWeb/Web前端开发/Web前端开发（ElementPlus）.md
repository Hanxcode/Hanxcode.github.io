# Web前端开发（ElementPlus）

## 介绍

Element：是饿了么公司前端开发团队提供的一套基于 Vue3 的网站组件库，用于快速构建网页。

Element 提供了很多组件（组成网页的部件）供我们使用。例如 超链接、按钮、图片、表格等等。

官方网站：https://element-plus.org/zh-CN/#/zh-CN

如下图所示就是我们开发的页面和ElementUI提供的效果对比：可以发现ElementUI提供的各式各样好看的按钮。

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

ElementPlus的学习方式和我们之前的学习方式不太一样，对于ElementPlus，我们作为一个后台开发者，只需要**学会如何从 ElementPlus 的官网拷贝组件到我们自己的页面中，并且做一些修改即可**。 我们主要学习的是ElementPlus中提供的常用组件，至于其他组件同学们可以通过我们这几个组件的学习掌握到ElementPlus的学习技巧，然后课后自行学习。





## 快速入门

**准备工作：**

1). 将资料中提供的基础工程（`资料/04. ElementPlus基础工程/vue-project02.zip`），解压到工作目录中，使用VSCode将其打开。

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

2). 参照官方文档，安装ElementPlus的组件库（在当前工程的目录下），执行如下命令：【这一步可以不做，已经安装好了】

```HTML
npm install element-plus@2.4.4 --save
```

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

3). 在`main.js` 中引入ElementPlus组件库 （参照官方文档），最终 `main.js` 中代码如下：

```JavaScript
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)

app.mount('#app')
```

**制作组件：**

1）. 访问ElementPlus的官方文档，查看对应的组件源代码。

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

2). 在 src下创建 `views` 目录，在 `views` 目录下，创建`Element.vue`组件文件，复制组件代码，调整成自己想要的 。

```HTML
<script setup>

</script>

<template>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
</template>

<style scoped>

</style>
```

3). 在根组件 `app.vue` 中引入`Element.vue`

```HTML
<script setup>
import Element from './views/Element.vue'
</script>

<template>
  <Element></Element>
</template>

<style scoped>

</style>
```

4). 启动项目，访问 `http://localhost:5173/`

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）



1. `ElementPlus`的使用步骤
   * 安装：`npm install element-plus@2.4.4 -save`
   * 引入：在`main.js`中引入`Element Plus`（参照官方文档）
   * 组件：访问官方文档中的组件，调整成我们需要的样子即可



## 常见组件

### 表格组件

用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

接下来我们通过代码来演示。

首先我们需要来到 ElementPlus 的组件库中，找到表格组件，如下图所示：

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

然后在 `Element.vue` 组件中继续制作表格。组件中，需要注意的是，我们组件包括了3个部分，如果官方有除了`<template>`部分之外的`<style>`和`<script>`都需要复制。具体操作如下图所示：

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

整体代码如下所示(绿色背景部分代码为本次增加的代码)：

```HTML
<script setup>
const tableData = [
  {date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'}
]
</script>

<template>

  <!-- Button按钮 -->
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>

  <br>

  <!-- Table表格 -->
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<style scoped>

</style>
```

此时回到浏览器，我们页面呈现如下效果：

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）



Table表格组件，属性说明：

- `data`: 主要定义table组件的数据模型
- `prop`: 定义列的数据应该绑定data中定义的具体的数据模型
- `label`: 定义列的标题
- `width`: 定义列的宽度



1. > 表格组件使用的关键点
   >
   > * 表格组件使用时关键点在于清楚表格中绑定的数据`data`，以及每一列要展示的属性信息



### 分页条组件

Pagination: 分页组件，主要提供分页工具条相关功能。其展示效果图下图所示：

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

默认情况下，ElementPlus的组件是英文的，如果希望使用中文语言，可以在 `main.js` 中做如下配置：

```JavaScript
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
app.use(ElementPlus, {locale: zhCn})
```

接下来我们通过代码来演示功能。

首先在官网找到分页组件，我们选择带背景色分页组件，如下图所示：

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

然后复制代码到我们的 `Element.vue` 组件文件的template中，在 `<template> </template>` 拷贝如下代码：

```HTML
  <el-pagination
    v-model:current-page="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="[100, 200, 300, 400]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
```

在 `<script> </script>` 中拷贝如下代码：

```JavaScript
import { ref } from 'vue'

const currentPage4 = ref(4)
const pageSize4 = ref(100)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
```

目前，整个 `Element.vue`  的文件内容如下(绿色背景部分代码为本次增加的代码)：

```HTML
<script setup>
import { ref } from 'vue'

const tableData = [
  {date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'}
]

const currentPage4 = ref(4)
const pageSize4 = ref(100)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>

<template>

  <!-- Button按钮 -->
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>

  <br>

  <!-- Table表格 -->
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  
  <br>

  <el-pagination
    v-model:current-page="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="[100, 200, 300, 400]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<style scoped>

</style>
```

打开浏览器，查看页面效果如下：

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

Pagination 分页组件的属性如下：

对于分页组件我们需要关注的是如下几个重要属性（可以通过查阅官网组件中最下面的组件属性详细说明得到）：

- `background`: 添加北京颜色，也就是上图蓝色背景色效果。
- `layout`: 分页工具条的布局，其具体值包含`sizes`, `prev`, `pager`, `next`, `jumper`,  `total` 这些值
- `total`: 数据的总数量

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

对于分页组件，除了上述几个属性，还有2个非常重要的事件我们需要去学习：

- `size-change` ： pageSize 改变时会触发 
- `current-change` ：currentPage 改变时会触发 





### 对话框组件

在保留当前页面状态的情况下，告知用户并承载相关操作。

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

首先我们需要在ElementPlus官方找到Dialog组件，如下图所示：

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

然后复制如下代码到我们的组件文件 `Element.vue` 的 `<template></template>` 模块中：

```HTML
  <el-button @click="dialogTableVisible = true">
    打开对话框
  </el-button>

  <el-dialog v-model="dialogTableVisible" title="Shipping address">
    <el-table :data="tableData">
      <el-table-column property="date" label="Date" width="150" />
      <el-table-column property="name" label="Name" width="200" />
      <el-table-column property="address" label="Address" />
    </el-table>
  </el-dialog>
```

然后复制如下代码到我们的组件文件 `Element.vue` 的 `<script></script>` 模块中：

```JavaScript
const dialogTableVisible = ref(false)
```

最终，完成的 `Element.vue` 的代码如下：

```HTML
<script setup>
import { ref } from 'vue'

const tableData = [
  {date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'}
]

const currentPage4 = ref(4)
const pageSize4 = ref(100)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}

// Dialog对话框
const dialogTableVisible = ref(false)
</script>

<template>

  <!-- Button按钮 -->
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>

  <br>

  <!-- Table表格 -->
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>

  <br>

  <el-pagination
    v-model:current-page="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="[100, 200, 300, 400]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />

  <br>

  <el-button @click="dialogTableVisible = true">
    打开对话框
  </el-button>

  <el-dialog v-model="dialogTableVisible" title="Shipping address">
    <el-table :data="tableData">
      <el-table-column property="date" label="Date" width="150" />
      <el-table-column property="name" label="Name" width="200" />
      <el-table-column property="address" label="Address" />
    </el-table>
  </el-dialog>

</template>

<style scoped>

</style>
```

打开浏览器，最终的页面效果如下：

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

Dialog对话框组件使用的关键点，就是控制其显示与隐藏。 通过 v-model 给定的boolean值，来控制Dialog的显示与隐藏。



1. > `Dialog`对话框组件使用的关键点
   >
   > * 通过`model-value / v-model`给定的`boolean`值，来控制`Dialog`的显示与隐藏



### 表单组件

Form 表单：由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据。 

表单在我们前端的开发中使用的还是比较多的，接下来我们学习这个组件，与之前的流程一样，我们首先需要在ElementPlus的官方找到对应的组件示例：如下图所示：

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

然后复制如下代码到我们的组件文件 `Element.vue` 的 `<template></template>` 模块中：

```HTML
<!-- Form 表单 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="Approved by">
      <el-input v-model="formInline.user" placeholder="Approved by" clearable />
    </el-form-item>

    <el-form-item label="Activity zone">
      <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>

    <el-form-item label="Activity time">
      <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable/>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
```

然后复制如下代码到我们的组件文件 `Element.vue` 的 `<script></script>` 模块中：

```JavaScript
// Form表单
const formInline = ref({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}
```

最终，完成的 `Element.vue` 的代码如下：

```HTML
<script setup>
import { ref } from 'vue'

const tableData = [
  {date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'}
]

const currentPage4 = ref(4)
const pageSize4 = ref(100)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}

// Dialog对话框
const dialogTableVisible = ref(false)

// Form表单
const formInline = ref({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<template>

  <!-- Button按钮 -->
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>

  <br>

  <!-- Table表格 -->
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>

  <br>

  <el-pagination
    v-model:current-page="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="[100, 200, 300, 400]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />

  <br>

  <el-button @click="dialogTableVisible = true">
    打开对话框
  </el-button>

  <el-dialog v-model="dialogTableVisible" title="Shipping address">
    <el-table :data="tableData">
      <el-table-column property="date" label="Date" width="150" />
      <el-table-column property="name" label="Name" width="200" />
      <el-table-column property="address" label="Address" />
    </el-table>
  </el-dialog>

  <br><br>

  <!-- Form 表单 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="Approved by">
      <el-input v-model="formInline.user" placeholder="Approved by" clearable />
    </el-form-item>

    <el-form-item label="Activity zone">
      <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>

    <el-form-item label="Activity time">
      <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable/>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>

</template>

<style scoped>

</style>
```

打开浏览器，查看页面效果：

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）





1. > 表单组件使用的关键点
   >
   > * 表单项数据采集：`v-model`数据绑定
   > * 表单数据绑定：事件绑定





## 案例

需求：基于ElementPlus组件库制作如下页面，并异步获取数据，完成页面展示。

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

**1). 准备工作**

由于在案例中，我们需要在vue项目中使用Axios，需要安装axios，需要在当前项目的目录下执行如下命令：

```HTML
npm install axios
```

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）

**2). 编码实现**

在`views`目录下，再定义一个文件 `EmpList.vue`，具体代码实现如下：

```HTML
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const searchEmp = ref({
  name: '',
  gender: '',
  job: '',
})

onMounted(() => {
  search();
})

const search = async () => {
  const url = `https://web-server.itheima.net/emps/list?name=${searchEmp.value.name}&gender=${searchEmp.value.gender}&job=${searchEmp.value.job}`
  const result = await axios.get(url)
  tableData.value = result.data.data
}

const clear = () => {
  searchEmp.value = { name: '', gender: '', job: '' }
  search();
}

let tableData = ref([])
</script>

<template>
  <div id="center">
    <el-form :inline="true" :model="searchEmp" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="searchEmp.name" placeholder="请输入姓名" clearable />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="searchEmp.gender" placeholder="请选择" clearable>
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="职位">
        <el-select v-model="searchEmp.job" placeholder="请选择" clearable>
          <el-option label="班主任" value="1" />
          <el-option label="讲师" value="2" />
          <el-option label="咨询师" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
    <br>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%; ">
      <el-table-column prop="id" label="ID" width="80" align="center" />
      <el-table-column prop="name" label="姓名" width="100" align="center" />
      <el-table-column label="头像" width="120" align="center">
        <template #default="scope">
          <img :src="scope.row.image" width="50">
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="120" align="center">
        <template #default="scope">
          {{ scope.row.gender == 1 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column label="职位" width="180" align="center">
        <template #default="scope">
          <span v-if="scope.row.job == 1">班主任</span>
          <span v-else-if="scope.row.job == 2">讲师</span>
          <span v-else-if="scope.row.job == 3">咨询师</span>
          <span v-else>其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="entrydate" label="入职日期" width="180" align="center" />
      <el-table-column prop="updatetime" label="更新时间" align="center" />
    </el-table>
  </div>
</template>

<style scoped>
#center {
  width: 70%;
  margin: auto;
  margin-top: 100px;
}
</style>
```

在 `App.vue` 中引入 `EmpList.vue` 文件

```HTML
<script setup>
  import EmpList from './views/EmpList.vue'
</script>

<template>
  <EmpList></EmpList>
</template>

<style scoped>

</style>
```

**3). 打开浏览器，查看页面效果**

（配图待补：原笔记使用飞书临时链接，压缩包未附原图。）
