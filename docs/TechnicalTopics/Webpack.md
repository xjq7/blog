[[toc]]

## 打包过程

1. 读取 webpack 的配置参数

2. 启动 webpack, 创建 Compiler 对象并开始解析项目

3. 从入口文件开始解析, 并且找到其依赖模块, 递归遍历解析, 形成依赖关系树

4. 对不同文件采用对应 loader 进行编译处理

5. 整个过程中 webpack 通过发布订阅模式, 向外抛出一些 hooks,webpack 的插件可通过监听这些关键事件节点,执行插件任务干预输出结果

## hook

### Webpack 5

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

### Webpack 4

- environment

Webpack 启动之前触发

- afterEnvironment

Webpack 环境初始化之后触发

- entryOption

Webpack 处理入口选项之前触发

- beforeRun

Webpack 编译器开始运行之前触发

- run

Webpack 编译器开始编译之前触发

- watchRun

在 Webpack 监听模式下, 当编译器开始重新编译时触发

- normalModuleFactory

在创建模块工厂时触发

- contextModuleFactory

在创建上下文模块工厂时触发

- beforeCompile

在编译之前触发

- compile

在编译器创建新编译时触发

- thisCompilation

触发 compilation 事件之前执行

- compilation

在编译创建之后触发

-
