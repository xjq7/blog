## 合成事件

React 在内部对事件做了统一的处理

1. 合成事件抹平了浏览器兼容性差异
2. React 通过顶层监听的形式，通过事件委托的方式来统一管理所有的事件，可以在事件上区分事件优先级

## 架构模型

### Scheduler 调度器

调度任务的优先级，高优任务优先进入 Reconciler

### Reconciler 协调器

负责找出变化的组件, 递归处理虚拟 dom,可中断

中断时机:

1. 有其他更高优任务需要先更新

2. 当前帧没有剩余时间

### Renderer 渲染器

负责将变化的组件渲染到页面上

Renderer 根据 Reconciler 为虚拟 DOM 打的标记，同步执行对应的 DOM 操作

### Fiber

#### Fiber 的结构

```js
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

#### 双缓存 Fiber 树

在 React 中最多会同时存在两棵 Fiber 树。当前屏幕上显示内容对应的 Fiber 树称为 current Fiber 树，正在内存中构建的 Fiber 树称为 workInProgress Fiber 树
