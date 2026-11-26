# LangChain



##  LangChain 简介
### LangChain 是什么

如果只想调用一次大语言模型，其实并不一定需要 LangChain。安装模型供应商提供的 SDK，创建客户端，传入问题，再读取返回结果，就能完成最基本的对话。

但当应用逐渐复杂时，事情就不再只是“发一个请求、收一段文本”了。一个真实的 AI 应用可能需要：

- 在不同模型供应商之间切换；
    
- 将系统指令、用户问题和历史消息组织在一起；
    
- 让模型按照指定的数据结构返回结果；
    
- 让模型调用 Python 函数、查询数据库或访问外部服务；
    
- 在多次模型调用和工具执行之间维护状态；
    
- 记录执行过程，并在出现异常时进行处理。
    

这些工作如果完全依赖原生 SDK 自己实现，就需要为不同供应商分别处理请求格式、消息格式、工具参数和返回结果。应用越复杂，重复代码就越多。

**LangChain 是一个用于构建大语言模型应用和 Agent 的开发框架。** 它把模型、消息、提示词、工具和 Agent 等常见能力组织成相对统一的接口，让开发者可以把精力更多放在应用逻辑上，而不是每次都从底层 HTTP 请求开始写。

可以先把它理解为一套面向 LLM 应用的组件和运行机制：模型负责生成，Prompt 负责组织输入，Messages 负责描述对话，Tools 负责连接外部能力，Agent 负责根据任务决定何时调用模型和工具。

这里需要区分两个概念：

- **LLM 应用**：程序调用模型完成某项任务，执行步骤通常由代码提前确定。
    
- **Agent（智能体）**：程序把一部分步骤交给模型判断，模型可以根据当前信息选择工具，并根据工具结果决定下一步。
    

LangChain 1.x 将 Agent 放在框架核心位置，但并不意味着所有应用都必须使用 Agent。单次问答、固定流程的数据提取，直接调用模型往往更简单。

##  为什么需要 LangChain
   - LangChain 的整体架构
   - LangChain 1.x 的主要变化

## Model 模型
   - Chat Model
   - init_chat_model
   - 模型调用流程
   - 模型返回结果

## Messages 消息管理
   - SystemMessage
   - HumanMessage
   - AIMessage
   - ToolMessage

## Prompt 提示词
   - PromptTemplate
   - ChatPromptTemplate
   - MessagesPlaceholder

## Structured Output
   - 结构化输出的作用
   - Pydantic
   - with_structured_output

## Tools 工具调用
   - 工具的作用
   - @tool
   - 工具参数与描述
   - 工具调用过程

## Agents 智能体
   - Agent 是什么
   - create_agent
   - Agent 执行循环
   - Tool Calling
   - Agent 的输入与输出

## Middleware 中间件
   - Middleware 的作用
   - before_model
   - after_model
   - 自定义 Middleware

## Streaming 流式输出

## 实战案例

## 学习总结