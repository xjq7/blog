[[toc]]

## Rollup

## Webpack

### 构建流程

1. 初始化参数: 解析 Webpack 配置参数, 合并 Shell 传入和 配置文件的参数, 形成最终配置
2. 开始编译: 使用参数初始化 Compiler 对象, 注册所有配置的插件, 执行对象的 run 方法 开始执行编译
3. 确定入口: 从配置的 entry 入口, 开始解析文件构建 AST 语法树, 递归解析处理依赖
4. 编译模块:
5. 完成模块编译:
6. 输出资源: 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
7. 输出完成:

### 热更新

在不刷新页面的前提下, 替换代码块

HRM 原理: Webpack-dev-server 和浏览器之间维护了一个 websocket 服务, 当本地资源发生变化后, Webpack 会先将打包生成新的模块代码放入内存, 然后 WDS 向浏览器推送更新, 并附带上构建时的 hash, 让客户端和上一次资源做比对

### Code Splitting

代码分割是一种优化技术, 将一个大的 chunk 拆分成多个小的 chunk, 实现 按需加载, 减少初始化 加载时间, 提高应用程序性能

### Tree Shaking

### Sourcemap

### 构建优化

#### 构建速度

#### 构建资源体积优化

### 生命周期

#### Webpack 5

- beforeRun

在 Webpack 编译器开始运行之前触发

- run

在 Webpack 编译器开始编译之前触发

- emit

在生成文件之前触发

- afterEmit

在生成文件之后触发

- done

当 Webpack 编译器完成编译后触发

- failed

当 Webpack 编译器编译失败时触发

- invalid

当 Webpack 编译器无效时触发

- matchRun
