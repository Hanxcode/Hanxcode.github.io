AI：人工智能（Artificial Intelligence），是一个学科领域的统称，目标就是使机器能够像人类一样思考、学习、推理和解决问题

AI大模型：也称为大语言模型（Large Language Models，LLM），是AI技术的一个分支，其实就是一个用代码模拟人脑神经网络的程序（参数量极其庞大，通常达到数十亿至数千亿级别），通过大量的数据训练后，使其具备理解人类语言、思考、推理并输出人类语言的能力

AI应用：是指将AI大模型技术落地到具体的业务场景中，用来解决实际问题的产品或者服务

# AI应用 - 基础
## 大模型部署

本地部署
* 优点：数据安全、自主可控、长期成本低
* 缺点：初始成本高、需长期维护、性能受损
官方开放API
API：应用程序编程接口（Application Programming Interface），是软件间的标准化的”桥梁“，允许开发者无需知晓内部细节即可调用外部功能或数据
* 优点：前期成本低、无需部署和维护、随时访问
* 缺点：隐私不能保障、长期成本高、可控性差
云服务平台
* 优点：前期成本低、无需部署和维护、选择度高
* 缺点：安全及隐私不能保障、长期成本高



## 大模型调用

### 网络基础知识

网络：也就是我们通常所说的互联网（Internet），就是由无数个计算机网络设备连接起来形成的全球性的网络基础设施

**IP地址**可以理解为就是设备在互联网中的地址（唯一身份证），每一个连入网络的设备都有一个自己的IP地址，用来定位设备在互联网中的位置
IPv4地址：32位二进制
IPv6地址：128位二进制
注意：127.0.0.1 是一个非常特殊的地址，表示的是本机地址（也称为本地回环地址）

**域名（Domain Name）**，是由一串用点分隔的英文字母组成的。IP地址不便于记忆，因此设计出了域名，并通过`DNS（域名解析服务器）`来讲域名和IP地址相互映射，便于记忆和访问

**端口（Port）**，是整数，取值范围在0-65535，它是用来标识计算机设备中的运行中的程序
`HTTP协议`默认端口号位80，`HTTPS协议`默认端口为 443

IP：唯一定位一台互联网上的设备（127.0.0.1 为本机地址）
域名：降低IP地址的书写与记忆成本（localhost 为本地域名）
端口：每一个程序启动运行后都会占用一个端口（0-65535）

#### 网络模型

互联网（Internet）连接了数以亿计的设备，网络四通八达就如同城市的复杂道路，网络中传输的数据就像是城市道路中的车流，如果不加以管理那必然会出现混乱。在国际ISO组织就统一了程序在网络中通信的模型和标准。包括：

OSI网络模型：全球网络互联标准模型
TCP / IP网络模型：可以认为是OSI的简化版（应用层、传输层、网络层、网络接口层）
* 应用层（HTTP、FTP、SMTP）：将用户与应用程序交互的数据按照协议格式进行封装
* 传输层（UDP、TCP）：负责将数据准确送到对应的应用程序（端口）
* 网络层（IP）：负责基于IP地址将数据包路由给对应设备
* 网络接口层：负责数据在物理网络中的传输，处理与硬件设备交互

##### HTTP协议

概念：Hyper Text Transfer Protocol，超文本传输协议，规定了客户端和服务器之间数据传输的规则。（只有在请求及响应中都准训了统一的谷子额，服务端才能读懂客户都安发来的请求，客户都安才能解析服务端响应的结果）

特点：
* 基于文本的协议：请求和响应的部分的协议内容为文本格式，底层通过TCP协议传输，稳定性强
* 基于请求-响应模型：一次请求对应一次响应，必须由客户端先发起请求，服务端才会返回响应
* 无状态：服务端不会记忆与客户端的历史交互信息，每次请求 - 响应都是独立的

##### HTTP协议 - 请求数据格式

请求行（请求方式、资源路径、协议）
请求头（格式 key ：value）

请求体（请求参数部分、GET方式没有，POST可以有）

请求方式：
* GET：请求参数在请求行中，没有请求体，如：/ api/courses？name=Python&status=1。GET请求参数大小在浏览器中是有限制的
* POST：请求参数在请求体中，POST请求大小是没有限制的

##### HTTP协议 - 响应数据格式

响应行（协议、状态码）
* 200：客户端请求成功
* 400：请求参数错误
* 404：请求资源不存在，url输入错误，或者网站资源被删除了
* 500：服务器发生了不可预期的错误
响应头（格式 key ：value）
响应体（存放服务端相应的数据）



### Apifox 测试

#### Json格式

JSON（JavaScript Object Notation）是前端的一种对象表示方法。表示形式类似于Python中的字典，都是key：value这种形式，不过所有的key都必须使用双引号引起来，值可以是任何类型：
* 对象：用 {} 表示，{}之间是键值对形式，键是字符串，值可以是任意其他类型
* 数字：整数和小数都是数字，例如：12，3.14
* 字符串：用 “” 引起来，例如：“jack”
* 布尔：有两种值：true 或 false
* 列表：用 [ ] 表示，[ ] 中是列表的元素，多个元素以，分割


### 代码调用测试


## 提示词工程

提示词（Prompt）：是引导大模型（LLM）进行内容生成的命令（一句话，一个问题等）

提示词工程（Prompt Engineering）：通过有技巧的拜尼希萼提示词，使大模型生成出尽可能符合预期的聂荣，这一持续性的过程就成为提示词工程
* 给大模型设定角色和能力
* 明确核心请求与任务
* 按步骤拆解复杂任务
* 指定风格和语气
* 明确要求输出格式
* 提供输入输出示例

# AI应用 - 实战

## Streamlit

Streamlit 是一个开源的Python库，专为数据工程师及机器学习工程师设计，用来快速基于Python代码构建交互式的Web网站（无需掌握前端技术）

Streamlit 使用步骤：
- 安装(pip install streamlit)
- 基于streamlit中的api构建页面
- 运行(streamlit run xxx.py)


## AI智能伴侣 - 基本交互

```python
import streamlit as st
import os
from openai import OpenAI

print("----------> 重新执行此文件 , 渲染展示页面")

# 设置页面的配置项
st.set_page_config(
    page_title="AI智能伴侣",
    page_icon="🤖",
    # 布局
    layout="wide",
    # 控制的是侧边栏的状态
    initial_sidebar_state="expanded",
    menu_items={}
)

# 大标题
st.title("AI智能伴侣")

# Logo
st.logo("resources/logo.png")

# 系统提示词
system_prompt = "你是一名非常可爱的AI助理, 你的名字叫小甜甜, 请你使用温柔可爱的语气回答用户的问题"

# 初始化聊天信息
if "messages" not in st.session_state:
    st.session_state.messages = []

# 展示聊天信息
for message in st.session_state.messages: # {"role": "user", "content": prompt}
    st.chat_message(message["role"]).write(message["content"])


# 创建与AI大模型交互的客户端对象 (DEEPSEEK_API_KEY 环境变量的名字, 值就是DeepSeek的API_KEY的)
client = OpenAI(api_key=os.environ.get('DEEPSEEK_API_KEY'), base_url="https://api.deepseek.com")

# 消息输入框
prompt = st.chat_input("请输入您要问的问题")
if prompt: # 字符串会自动转换为布尔值, 如果字符串非空, 则为True; ""否则为False
    st.chat_message("user").write(prompt)
    print("----------> 调用AI大模型, 提示词: ", prompt)
    # 保存用户输入的提示词
    st.session_state.messages.append({"role": "user", "content": prompt})

    # 调用AI大模型
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
        stream=False
    )

    # 输出大模型返回的结果
    print("<---------- 大模型返回的结果: ", response.choices[0].message.content)
    st.chat_message("assistant").write(response.choices[0].message.content)
    # 保存大模型返回的结果
    st.session_state.messages.append({"role": "assistant", "content": response.choices[0].message.content})
```



## AI智能伴侣 - 会话记忆

与AI大模型的交互本质是无状态的，每一次请求响应都是相互独立的。（AI大模型本身没有真正的会话记忆能力）

滚雪球

```python
import streamlit as st
import os
from openai import OpenAI

print("----------> 重新执行此文件 , 渲染展示页面")

# 设置页面的配置项
st.set_page_config(
    page_title="AI智能伴侣",
    page_icon="🤖",
    # 布局
    layout="wide",
    # 控制的是侧边栏的状态
    initial_sidebar_state="expanded",
    menu_items={}
)

# 大标题
st.title("AI智能伴侣")

# Logo
st.logo("resources/logo.png")

# 系统提示词
system_prompt = "你是一名非常可爱的AI助理, 你的名字叫小甜甜, 请你使用温柔可爱的语气回答用户的问题,注意：回答中不要使用 Markdown 的删除线语法（~~文字~~）。"

# 初始化聊天信息
if "messages" not in st.session_state:
    st.session_state.messages = []

# 展示聊天信息
for message in st.session_state.messages: # {"role": "user", "content": prompt}
    st.chat_message(message["role"]).write(message["content"])


# 创建与AI大模型交互的客户端对象 (DEEPSEEK_API_KEY 环境变量的名字, 值就是DeepSeek的API_KEY的)
client = OpenAI(api_key=os.environ.get('DEEPSEEK_API_KEY'), base_url="https://api.deepseek.com")

# 消息输入框
prompt = st.chat_input("请输入您要问的问题")
if prompt: # 字符串会自动转换为布尔值, 如果字符串非空, 则为True; ""否则为False
    st.chat_message("user").write(prompt)
    print("----------> 调用AI大模型, 提示词: ", prompt)
    # 保存用户输入的提示词
    st.session_state.messages.append({"role": "user", "content": prompt})

    # 调用AI大模型
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": system_prompt},
            * st.session_state.messages
        ],
    )

    # 输出大模型返回的结果
    print("<---------- 大模型返回的结果: ", response.choices[0].message.content)
    st.chat_message("assistant").write(response.choices[0].message.content)
    # 保存大模型返回的结果
    st.session_state.messages.append({"role": "assistant", "content": response.choices[0].message.content})

```


流式输出

```python
import streamlit as st
import os
from openai import OpenAI

print("----------> 重新执行此文件 , 渲染展示页面")

# 设置页面的配置项
st.set_page_config(
    page_title="AI智能伴侣",
    page_icon="🤖",
    # 布局
    layout="wide",
    # 控制的是侧边栏的状态
    initial_sidebar_state="expanded",
    menu_items={}
)

# 大标题
st.title("AI智能伴侣")

# Logo
st.logo("resources/logo.png")

# 系统提示词
system_prompt = "你是一名非常可爱的AI助理, 你的名字叫小甜甜, 请你使用温柔可爱的语气回答用户的问题"

# 初始化聊天信息
if "messages" not in st.session_state:
    st.session_state.messages = []

# 展示聊天信息
for message in st.session_state.messages: # {"role": "user", "content": prompt}
    st.chat_message(message["role"]).write(message["content"])


# 创建与AI大模型交互的客户端对象 (DEEPSEEK_API_KEY 环境变量的名字, 值就是DeepSeek的API_KEY的)
client = OpenAI(api_key=os.environ.get('DEEPSEEK_API_KEY'), base_url="https://api.deepseek.com")

# 消息输入框
prompt = st.chat_input("请输入您要问的问题")
if prompt: # 字符串会自动转换为布尔值, 如果字符串非空, 则为True; ""否则为False
    st.chat_message("user").write(prompt)
    print("----------> 调用AI大模型, 提示词: ", prompt)
    # 保存用户输入的提示词
    st.session_state.messages.append({"role": "user", "content": prompt})

    # 调用AI大模型
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": system_prompt},
            *st.session_state.messages
        ],
        stream=True
    )

    # 输出大模型返回的结果 (非流式输出的解析方式)
    # print("<---------- 大模型返回的结果: ", response.choices[0].message.content)
    # st.chat_message("assistant").write(response.choices[0].message.content)

    # 输出大模型返回的结果 (流式输出的解析方式)
    response_message = st.empty() # 创建一个空的组件, 用于展示大模型返回的结果

    full_response = ""
    for chunk in response:
        if chunk.choices[0].delta.content is not None:
            content = chunk.choices[0].delta.content
            full_response += content
            response_message.chat_message("assistant").write(full_response)

    # 保存大模型返回的结果
    st.session_state.messages.append({"role": "assistant", "content": full_response})

```

## AI智能伴侣 - 侧边栏功能

```python
import streamlit as st
import os
from openai import OpenAI

print("----------> 重新执行此文件 , 渲染展示页面")

# 设置页面的配置项
st.set_page_config(
    page_title="AI智能伴侣",
    page_icon="🤖",
    # 布局
    layout="wide",
    # 控制的是侧边栏的状态
    initial_sidebar_state="expanded",
    menu_items={}
)

# 大标题
st.title("AI智能伴侣")

# Logo
st.logo("resources/logo.png")

# 系统提示词
system_prompt = """
            你叫 %s，现在是用户的真实伴侣，请完全代入伴侣角色。：
            规则：
                1. 每次只回1条消息
                2. 禁止任何场景或状态描述性文字
                3. 匹配用户的语言
                4. 回复简短，像微信聊天一样
                5. 有需要的话可以用 ❤️ 🌸等emoji表情
                6. 用符合伴侣性格的方式对话
                7. 回复的内容, 要充分体现伴侣的性格特征
            伴侣性格：
                - %s
            你必须严格遵守上述规则来回复用户。
        """

# 初始化聊天信息
if "messages" not in st.session_state:
    st.session_state.messages = []
# 昵称
if "nick_name" not in st.session_state:
    st.session_state.nick_name = "小甜甜"

# 性格
if "nature" not in st.session_state:
    st.session_state.nature = "活泼开朗的东北姑娘"


# 展示聊天信息
for message in st.session_state.messages: # {"role": "user", "content": prompt}
    st.chat_message(message["role"]).write(message["content"])


# 创建与AI大模型交互的客户端对象 (DEEPSEEK_API_KEY 环境变量的名字, 值就是DeepSeek的API_KEY的)
client = OpenAI(api_key=os.environ.get('DEEPSEEK_API_KEY'), base_url="https://api.deepseek.com")


# 左侧侧边栏 - with : streamlit中的上下文管理器
with st.sidebar:
    st.subheader("伴侣信息")
    # 定义伴侣昵称输入框
    nick_name = st.text_input("昵称",placeholder="请输入伴侣的昵称",value=st.session_state.nick_name)
    if nick_name:
        st.session_state.nick_name = nick_name

    # 定义性格输入框
    nature = st.text_area("性格",placeholder="请输入伴侣的性格",value=st.session_state.nature)
    if nature:
        st.session_state.nature = nature


# 消息输入框
prompt = st.chat_input("请输入您要问的问题")
if prompt: # 字符串会自动转换为布尔值, 如果字符串非空, 则为True; ""否则为False
    st.chat_message("user").write(prompt)
    print("----------> 调用AI大模型, 提示词: ", prompt)
    # 保存用户输入的提示词
    st.session_state.messages.append({"role": "user", "content": prompt})

    # 调用AI大模型
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": system_prompt % (st.session_state.nick_name,st.session_state.nature)},
            * st.session_state.messages
        ],
        stream = True
    )

    # # 输出大模型返回的结果(非流式输出)
    # print("<---------- 大模型返回的结果: ", response.choices[0].message.content)
    # st.chat_message("assistant").write(response.choices[0].message.content)

    # 输出大模型返回的结果(流式输出的解析方式)
    response_message = st.empty() # 创建一个空的组件，用于展示大模型返回的结果

    full_response = " "
    for chunk in response:
        if chunk.choices[0].delta.content is not None:
            content = chunk.choices[0].delta.content
            full_response += content
            response_message.chat_message("assistant").write(full_response)




    # 保存大模型返回的结果
    st.session_state.messages.append({"role": "assistant", "content": full_response})

```


# AI智能伴侣 - 会话管理

内存中存放的数据在计算机关机后会消失，要永久保存数据，就需要将数据保存在文件中

## 文件操作入门

日常我们操作文件时，基本分为三步操作：打开、读 / 写、关闭

读文件
```python
# 1．打开文件
f = open("resources/望庐山瀑布.txt", "r", encoding="utf-8")

# 2．读取文件
content = f.read()
print(content)

# 3．关闭文件
f.close()

```

写文件
```python
# 1．打开文件
f = open("resources/静夜思.txt", "w", encoding="utf-8")

# 2．写入文件
f.write("窗前明月光，\n")
f.write("疑是地上霜。\n")
f.write("举头望明月，\n")
f.write("低头思故乡。\n")

# 3．关闭文件
f.close()

```
编码：是将字符（文字、数字、符号）转换为计算机能够存储和处理的数字代码的规则系统，如：ASCII、GBK、UTF-8

## 文件操作 - 资源释放

如果在操作文件过程中出现了异常，文件无法正常关闭，怎么解决？


资源释放方案一：
```python
# 1．打开文件
f = open("resources/静夜思.txt", "w", encoding="utf-8")
try:
    # 2．写入文件
    f.write("静夜思(李白)\n")
    f.write("窗前明月光，\n")
    f.write("疑是地上霜。\n")
    f.write("举头望明月，\n")
    f.write("低头思故乡。\n")
finally:
    # 3．关闭文件
    f.close()

```

资源释放方案二（推荐）：
```python
with open("resources/静夜思.txt", "w", encoding="utf-8") as f:
    f.write("静夜思(李白)\n")
    f.write("窗前明月光，\n")
    f.write("疑是地上霜。\n")
    f.write("举头望明月，\n")
    f.write("低头思故乡。\n")

```
with 语句（上下文管理器）的核心作用就是确保资源总是被正确的获取和释放（即使发生异常，也会被正确释放），也是项目开发中的推荐方式

## 读取json格式文件

JSON 是软件开发中最常用的数据交换格式，而为了简化JSON数据的处理，在Python标准库中就提供了处理JSON数据的核心模块 json

序列化（写入json格式数据）：
```python
# 写入json数据
import json

obj = {
    "name": "张三",
    "age": 18,
    "gender": "男",
    "hobbies": ["reading", "swimming"]
}

# ensure_ascii 默认为true，确保所有的输出数据都是ascii编码（非ASCII码会进行转义）
# indent 会在会话输出的json数据中添加缩进（格式化）
with open("resources/session.json", "w", encoding="utf-8") as f:
    json.dump(obj, f, ensure_ascii=False, indent=2)

```

反序列化（读取json格式数据）：
```python
# 读取json数据
import json

with open("resources/session.json", "r", encoding="utf-8") as f:
    obj = json.load(f)
    print(obj)
```


# AI应用 - 知识扩展

