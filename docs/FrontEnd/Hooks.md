---
title: react hook
---

> hook 简介右转官网[Hook 简介](https://zh-hans.reactjs.org/docs/hooks-intro.html)

## useState

### 概念

```js
const [state, setState] = useState(initState)
```

state 为状态值,setState 函数用于更新 state,它接收一个新的 state 值并将组件的一次重新渲染加入队列

初次渲染时,返回的状态 state 与传入的初始值 initialState 相同,在后续的重新渲染中，useState 返回的第一个值将始终是更新后最新的 state

### 函数式更新

```js
function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount)
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </>
  )
}
```

更新状态有两种方式,直接传入要更新的值,或者传入函数,可获取到之前的状态,在某些场景下需要拿到之前的值,可以合并更新对象

在状态值很多且关联度较高时可以使用 useReducer 替代 useState 管理

### 惰性初始 state

initialState 只会在组件初次渲染时起作用,后续渲染会被忽略,如果初始状态需要通过复杂计算获得,则可以传入一个函数

```js
const [state,setState] = useState(()=>{
  ...
  这里可以对初始状态做处理
  ...
  return initialState
})
```

### 传入相同的 state 的时候

当我们调用 setState 并传入相同的 state 时,react 将会跳过组件渲染以及 effect 的执行,具体根据 Object.is 比较 state

```js
//Object.is

//true的情况:两者都为undefined、null、true、false、+0、-0、0、NaN、对象引用相同
Object.is('foo', 'foo') // true
Object.is(window, window) // true

Object.is('foo', 'bar') // false
Object.is([], []) // false

var foo = { a: 1 }
var bar = { a: 1 }
Object.is(foo, foo) // true
Object.is(foo, bar) // false

Object.is(null, null) // true

// Special Cases
Object.is(0, -0) // false
Object.is(-0, -0) // true
Object.is(NaN, 0 / 0) // true
```

需要注意的是,在跳过组件渲染前仍然可能渲染组件,只是不会对深层次的节点进行不必要的渲染,如果渲染时有高开销计算,我们可以使用 useMemo 优化

## useEffect

### 概念

```js
const Test = () => {
  useEffect(() => {})
  return <div></div>
}
```

在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。

使用 useEffect 完成副作用操作。赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。

默认情况下，effect 将在每轮渲染结束后执行，但你可以选择让它 在只有某些值改变的时候 才执行。

### 清除 effect

通常，组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源。要实现这一点，useEffect 函数需返回一个清除函数

```js
useEffect(()=>{
  ...
  return ...
})
```

为了防止内存泄漏,清除函数会在组件卸载前执行,在执行下一个 effect 前,上一个 effect 就已被清除

### effect 的条件执行

默认情况下,effect 在每轮组件渲染后都会执行

我们可以通过 useEffect 第二个参数(数组)限制 effect 的更新,传入空数组时,effect 只会执行一次,类似 componentDidMount 和 componentWillUnmount

```js
//当依赖a,b改变时,effect才会执行
useEffect(() => {}, [a, b])
```

## useMount

模拟类组件 componentDidmount

```js
const useMount = (effect) => {
  useEffect(effect, [])
}
```

## useUnmount

模拟类组件卸载时的钩子

```js
const useUnmount = (fn) => {
  const fnRef = useRef(fn)
  fnRef.current = fn
  useMount(() => () => fnRef.current())
}
```

## usePrevious

获取上一次的 state

```js
const usePrevious = (state) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = state
  })

  return ref.current
}
```
