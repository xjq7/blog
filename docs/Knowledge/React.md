[[toc]]

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

## 生命周期

## 合成事件

React 在内部对事件做了统一的处理

1. 合成事件抹平了浏览器兼容性差异
2. React 通过顶层监听的形式，通过事件委托的方式来统一管理所有的事件，可以在事件上区分事件优先级

## React Hooks

## Fiber 架构

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

### Fiber 的结构

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

### 双缓存 Fiber 树

在 React 中最多会同时存在两棵 Fiber 树。当前屏幕上显示内容对应的 Fiber 树称为 current Fiber 树，正在内存中构建的 Fiber 树称为 workInProgress Fiber 树

## React 错误捕获

## diff 算法

计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行原生 DOM 操作，而非重新渲染整个页面

把树形结构按照层级分解，只比较同级元素

### tree diff

两棵树只对同一层级节点进行比较，只要该节点不存在了，那么该节点与其所有子节点会被完全删除,不在进行进一步比较
只需要遍历一次，便完成对整个 DOM 树的比较

### component diff

同类型组件，组件 A 转化为了组件 B，如果 virtual DOM 无变化，可以通过 shouldComponentUpdate()方法优化
不同类型的组件，那么 diff 算法会把要改变的组件判断为 dirty component,从而替换整个组件的所有节点

### element diff

key 往前移动的节点不进行任何操作，所以当把最后一个节点移动到头部时，性能损耗最大

- 插入: 新的组件不在原来的集合中，而是全新的节点，则对集合进行插入操作
- 删除: 组件已经在集合中，但集合已经更新，此时节点就需要删除
- 移动: 组件已经存在于集合中，并且集合更新时，组件并没有发生更新，只是位置发生改变(同一层的节点添加唯一 key 进行区分，并且移动,当新集合中位置在旧集合之后时,需要移动)
