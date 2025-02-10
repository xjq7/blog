[[toc]]

## React 特点

- 组件化: React 将应用程序分解为组件, 每个组件都是一个独立的模块, 可以独立开发和测试, 组件可以包含状态、属性、事件处理程序等, 并且可以相互通信和交互

- 数据驱动: React 界面支持数据驱动, 无需操作 DOM, 可以通过数据状态来驱动 DOM 渲染

- 虚拟 DOM: 通过虚拟 DOM 算法提升 React 性能, 减少真实 DOM 操作的开销

- 单向数据流: 数据从父组件流向子组件, 保持数据流动的可预测性

## 受控组件与非受控组件

- 受控组件: 表单数据由 React 组件管理
- 非受控组件: 表单数据由 DOM 自身管理(通过 ref 获取)

## Hooks

允许函数组件中使用状态和生命周期方法

解决类组件的复杂性(this绑定、生命周期)

## diff 算法

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

## Fiber

React 16 引入的新渲染引擎架构

支持异步渲染, 提升大型应用的性能

渲染过程允许中断和恢复, 避免阻塞主线程

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

## React Error Boundary

捕捉子组件中的 Js 错误, 并显示备用 UI

## 状态管理

### Flux 架构

Flux 架构是 facebook 提出的前端应用架构模式, 用于管理应用的状态和数据流, 它的核心思想是 **单向数据流**

通过明确的职责分离和清晰的数据流动, 使应用的状态管理更加可预测和易于维护

#### 核心概念

1. View(视图)

   - 负责渲染用户界面
   - 响应用户动作(Action)
   - 监听 Store 变化, 在数据更新时重新渲染

2. Action(动作)

   - 表示应用中的事件或用户交互
   - 包含 type 和 payload 的简单对象, 描述更新信息
   - 由 View 或外部事件(如 API 响应)触发, 并通过 Dispatcher 发送

3. Dispatcher(调度器)

   - 是 Flux 架构的中心枢纽, 负责接收 Action 并将其分发给 Store

4. Store(存储)

   - 负责管理应用状态和业务逻辑
   - 接收 Dispatcher 分发的 Action, 根据 Action 类型更新状态
   - 状态更新后, 通知 View 更新视图

## React 18

18 带来的更新

- 并发模式
- 更新 render API
- 自动批处理
- Suspense 支持 SSR
- startTransition
- useTransition
- useDeferredValue
- useId
- 提供给 第三方库的 Hook

## JSX

JSX 是 JS 语法的扩展, 可以编写 类 HTML 的代码

提高了代码可读性与开发效率

## 合成事件

合成事件是 React 封装的事件对象, 提供跨浏览器的一致性

合成事件抹平了浏览器兼容性差异

React 通过事件委托的方式来统一管理所有的事件

## 生命周期

## React Hooks

## React 错误捕获
