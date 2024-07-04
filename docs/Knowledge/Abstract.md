[[toc]]

# 抽象

## 架构设计与工程化

前端架构设计是指设计一系列相关的抽象模式(例如一系列工具和流程的集合), 用于指导完成前端项目各个方案的工作, 解决已存在或未来可能发生的技术问题, 增加前端项目的可管理性、稳定性、可扩展性

前端工程化是系统化的、规范的、可度量的方法用于前端的开发、运行和维护的过程, 通过各种工具和技术, 提升前端开发效率的过程。一切能提升前端开发效率、提高前端应用质量的方法和工具都是前端工程化

### 架构设计的目的与通用原则

架构设计本质是解决软件复杂度带来的问题

三大通用软件架构设计原则

- 合适原则: 以实际场景除法
- 简单原则: 以最简单的解决方案来解决问题
- 演化原则: 设计架构应当满足当前的业务需要, 还能够应变后续架构升级和调整的需要

首先需要熟悉业务, 形成业务架构, 根据业务架构, 做出相应的数据架构和应用架构, 最后通过技术架构落地实施

### 工程化

- 规范

  1. 分支管理
  2. 代码规范
  3. 项目规范
  4. UI 规范

- 质量

  1. 单元测试

- 监控预警
- 效率
- CICD

- 数据
- 通信
- 生命周期
- 插件

- 渲染
- 交互
- 用户
- 业务

## React

> [React技术揭秘](https://react.iamkasong.com/)

React 架构分为三层

- 调度器(Scheduler): 调度任务的优先级，高优任务优先进入 协调器
- 协调器(Reconciler): 负责找出变化的组件, 递归处理虚拟 dom,可中断, 中断时机: 1. 有其他更高优任务需要先更新; 2. 当前帧没有剩余时间
- 渲染器(Renderer): 负责将变化的组件渲染到页面上, 渲染器 根据协调器 给虚拟 DOM 打的标记，同步执行对应的 DOM 操作

### Fiber 的结构

```Javascript
function FiberNode(tag: WorkTag, pendingProps: mixed, key: null | string, mode: TypeOfMode) {
  // 作为静态数据结构的属性
  this.tag = tag
  this.key = key
  this.elementType = null
  this.type = null
  this.stateNode = null

  // 用于连接其他Fiber节点形成Fiber树
  // 指向父级Fiber节点
  this.return = null
  // 指向子Fiber节点
  this.child = null
  // 指向右边第一个兄弟Fiber节点
  this.sibling = null
  this.index = 0

  this.ref = null

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null
  this.memoizedState = null
  this.dependencies = null

  this.mode = mode

  this.effectTag = NoEffect
  this.nextEffect = null

  this.firstEffect = null
  this.lastEffect = null

  // 调度优先级相关
  this.lanes = NoLanes
  this.childLanes = NoLanes

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null
}
```

### 双缓存 Fiber 树

在 React 中最多会同时存在两棵 Fiber 树

当前屏幕上显示内容对应的 Fiber 树称为 current Fiber 树, 正在内存中构建的 Fiber 树称为 workInProgress Fiber 树

workInProgress Fiber 树构建完成交给 渲染器渲染在页面上后, 应用根节点的 current 指针指向 workInProgress Fiber 树, 此时 workInProgress Fiber树就变为current Fiber 树

每次状态更新都会产生新的 workInProgress Fiber 树, 通过 current 与 workInProgress 的替换, 完成 DOM 更新

### diff 算法

计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行原生 DOM 操作，而非重新渲染整个页面

把树形结构按照层级分解，只比较同级元素

- tree diff

  两棵树只对同一层级节点进行比较，只要该节点不存在了，那么该节点与其所有子节点会被完全删除,不在进行进一步比较
  只需要遍历一次，便完成对整个 DOM 树的比较

- component diff

  同类型组件，组件 A 转化为了组件 B，如果 virtual DOM 无变化，可以通过 shouldComponentUpdate()方法优化
  不同类型的组件，那么 diff 算法会把要改变的组件判断为 dirty component,从而替换整个组件的所有节点

- element diff

  key 往前移动的节点不进行任何操作，所以当把最后一个节点移动到头部时，性能损耗最大

  - 插入: 新的组件不在原来的集合中，而是全新的节点，则对集合进行插入操作
  - 删除: 组件已经在集合中，但集合已经更新，此时节点就需要删除
  - 移动: 组件已经存在于集合中，并且集合更新时，组件并没有发生更新，只是位置发生改变(同一层的节点添加唯一 key 进行区分，并且移动,当新集合中位置在旧集合之后时,需要移动)

## React-Native 旧架构

> [React Native 技术详解 (一) - 认识它](https://www.lumin.tech/blog/react-native-1-introduction/)

![架构图](https://image.xjq.icu/2024/7/3/1719995368426_react-native-architecture.svg)

RN 以 React 技术为开发基础, 通过 Metro 打包器构建成 JS Bundle, jsbundle 运行在 JSC 引擎中, 通过 Bridge 传递布局及相关渲染数据

最后由 Yoga 与 Native UI 模块管理布局和渲染工作

### Metro Bundler

Metro 是专为 React Native 提供的 JS 构建工具, 提供开发服务和打包功能

### Hermes

Hermes 引擎是 RN 优化后的 JS 引擎

相对于 JSC 的优化:

- 优化了启动时间, 支持字节码编译, 能跳过 JS 引擎生成字节码的步骤
- 降低内存的使用, 针对新架构, 优化了引擎的 GC
- Android 端 APK 体积变小

### Yoga

Yoga 是 C++ 实现的 基于 Flexbox 的跨平台布局引擎

## React Native 新架构

> [React Native 技术详解 (二) - 新架构](https://www.lumin.tech/blog/react-native-2-new-architecture/)

![新架构图](https://image.xjq.icu/2024/7/3/1720000605227_react-native-new-architecture.svg)

新架构 JSI 取代 JS bridge, 他为 JS 引擎提供 API, JS 能直接调用原生(Java/Objc)函数

### JSI

JSI 的优势是 JS线程和 Native Modules 的完全同步,

老架构 Bridge 的消息队列在高频通信时容易阻塞队列, 导致事件响应不及时和 UI 卡帧现象

数据序列化与反序列化对于性能也有影响, 同时他也是异步的

### Fabric Native UI

Fabric 通过 JSI 暴露的 Native 函数与 JS 进行通信, 提升了数据传递性能与效率

### Turbo Modules

Turbo Modules 可以按需加载原生模块, 原来的 Native Modules 需要在启动时加载所有原生模块, 而 Turbo Modules 是懒加载的, 提升了应用的启动时间

## Taro 1/2 架构

> [Taro 版本升级权威指南](https://jelly.jd.com/article/5f9235c98faf9d015810e654)

![架构图](https://image.xjq.icu/2024/7/4/1720061661758_740516-20200902220421165-135534489.png)

Taro 1/2 属于编译型架构, 将类 React 代码编译转换成各端代码, 再搭配轻量运行时适配以及根据标准组件库、API 抹平平台差异, 实现多端适配

## Taro 3 架构

> [Taro 版本升级权威指南](https://jelly.jd.com/article/5f9235c98faf9d015810e654)

![架构图](https://image.xjq.icu/2024/7/4/1720076123312_740516-20200902220739074-31178626.png)

Taro 3 为解释型架构, 通过在小程序端模拟实现 DOM、BOM API来让前端框架直接运行在小程序环境中

对于其他平台差异如 生命周期、组件库、API、路由等, 通过定义统一标准, 各端负责各自实现的方式来进行抹平

## Webpack
