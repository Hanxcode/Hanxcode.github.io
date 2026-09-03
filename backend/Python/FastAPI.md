
# 路由

路由就是URL地址和处理函数之间的映射关系，它决定了当用户访问某个特定网址时，服务器应该执行哪段代码来返回结果。

FastAPI的路由定义基于Python的装饰器模式

# 参数

参数就是客户端发起请求时附带的额外信息和指令

参数的作用就是让同一个接口能根据不同的输入，返回不同的输出，实现动态交互

|   参数类型   |              位置              |           作用           |  常用HTTP方法  |
| :------: | :--------------------------: | :--------------------: | :--------: |
| **路径参数** |  URL 路径的一部分（如 `/book/{id}`）  |      指向唯一的、特定的资源       |    GET     |
| **查询参数** | URL `?` 之后（如 `?k1=v1&k2=v2`） |   对资源集合进行过滤、排序、分页等操作   |    GET     |
| **请求体**  |      HTTP 请求的消息体（body）中      | 创建、更新资源；携带大量数据（如 JSON） | POST、PUT 等 |

## 路径参数
## 查询参数

声明的参数不是路径参数时，路径操作函数会把该参数自动解释为查询参数

## 请求体参数

在HTTP协议中，一个完整的请求由三部分组成：
1. 请求行：包含方法、URL、协议版本
2. 请求头：元数据信息（Content-Type、Authorization等）
3. 请求体：实际要发送的数据内容

## 响应类型

| 响应类型              | 用途            | 示例                                  |
| ----------------- | ------------- | ----------------------------------- |
| JSONResponse      | 默认响应，返回JSON数据 | `return {"key": "value"}`           |
| HTMLResponse      | 返回HTML内容      | `return HTMLResponse(html_content)` |
| PlainTextResponse | 返回纯文本         | `return PlainTextResponse("text")`  |
| FileResponse      | 返回文件下载        | `return FileResponse(path)`         |
| StreamingResponse | 流式响应          | 生成器函数返回数据                           |
| RedirectResponse  | 重定向           | `return RedirectResponse(url)`      |

### 自定义响应数据格式

response_model是路径操作装饰器（如 @app.get 或 @app.post）的关键参数，它通过一个Pydantic模型来严格定义和约束API端点的输出格式

```python
from pydantic import BaseModel

class News(BaseModel):
    id: int
    title: str
    content: str

@app.get("/news/{id}", response_model=News)
async def get_news(id: int):
    return {
    "id": id,
    "title": f"这是第{id}本书",
    "content": "这是一本好书"
    }

```

### 异常处理

对于客户端引发的错误（4xx，如资源未找到，认证失败），应使用fastapi.HTTPException来中断正常处理流程，并返回标准错误响应

```python
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get('/news/{id}')
async def get_news(id: int):
    id_list = [1, 2, 3, 4, 5, 6]
    if id not in id_list:
        raise HTTPException(status_code=404, detail="当前id不存在")
    return {"id": id}

```

## 中间件

中间件（Middleware）是一个在每次请求进入FastAPI 应用时都会被执行的函数

它在请求到达实际的路径操作（路由处理函数）之前运行，并且在响应返回给客户端之前再运行一次

中间件：函数的顶部使用装饰器 `@app.middleware("http")`

```python
from fastapi import FastAPI

app = FastAPI()

@app.middleware("http")
async def middleware(request, call_next):
	# call_next:chuan'di'qing'qiu
    print('中间件开始处理 -- start')
    response = await call_next(request)
    print('中间件处理完成 -- end')
    return response

```