[[toc]]

# 手写系列

## promise

```Javascript
function Promise(fn) {
  this.state = 'pending'
  this.value = null
  this.callbacks = []
  fn(this._resolve.bind(this), this._reject.bind(this))
}

Promise.prototype._resolve = function (value) {
  if (this.state === 'pending') {
    this.state = 'fullfilled'
    this.value = value
    this.callbacks.forEach((fn) => this._handle(fn))
  }
}

Promise.prototype._reject = function (value) {
  if (this.state === 'pending') {
    this.state = 'rejected'
    this.value = value
    this.callbacks.forEach((fn) => this._handle(fn))
  }
}

Promise.prototype._handle = function (callback) {
  if (this.state === 'pending') {
    this.callbacks.push(callback)
    return
  }
  let cb = this.state === 'fullfilled' ? callback.onFullfilled : callback.onRejected
  if (!cb) {
    cb = this.state === 'fullfilled' ? callback.resolve : callback.reject
    cb(this.value)
    return
  }
  let ret
  try {
    ret = cb(this.value)
    cb = this.state === 'fullfilled' ? callback.resolve : callback.reject
  } catch (error) {
    ret = error
    cb = callback.reject
  } finally {
    cb(ret)
  }
}

Promise.prototype.then = function (onFullfilled, onRejected) {
  return new Promise((resolve, reject) => {
    this._handle({
      onFullfilled: onFullfilled || null,
      onRejected: onRejected || null,
      resolve,
      reject,
    })
  })
}

Promise.prototype.catch = function (onError) {
  return this.then(null, onError)
}

Promise.prototype.finally = function (onFinally) {
  if (typeof onFinally !== 'function') return this.then()
  let promise = this.constructor
  return this.then(
    (value) => promise.resolve(onFinally()).then(() => value),
    (reason) =>
      promise.resolve(onFinally()).then(() => {
        throw reason
      })
  )
}

Promise.resolve = function (value) {
  if (value && value instanceof Promise) {
    return value
  } else if (value && value instanceof Object && value.then instanceof Function) {
    const then = value.then
    return new Promise((resolve) => then(resolve))
  } else {
    return new Promise((resolve) => resolve(value))
  }
}

Promise.reject = function (value) {
  if (value && value instanceof Object && value.then instanceof Function) {
    const then = value.then
    return new Promise((resolve, reject) => then(reject))
  } else {
    return new Promise((resolve, reject) => reject(value))
  }
}

Promise.all = function (promiseList) {
  return new Promise((resolve, reject) => {
    const resList = []
    promiseList.forEach((p, index) => {
      p.then(
        (res) => {
          resList[index] = res
          if (resList.length === arr.length) {
            resolve(resList)
          }
        },
        (err) => reject(err)
      )
    })
  })
}

Promise.race = function (promiseList) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseList.length; i++) {
      Promise.resolve(promiseList[i]).then(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
    }
  })
}
```

## instanceof

## isType

```Javascript
function isType(type) {
  return function (o) {
    return Object.prototype.toString.call(o) === `[object ${type}]`
  }
}
```

## call

```Javascript
Function.prototype.call2 = function (context) {
  // 首先要获取调用call的函数，用this可以获取
  context.fn = this
  const obj = [].shift.call(arguments)
  obj.fn(...arguments)
  delete obj.fn
}
```

## bind

```Javascript
Function.prototype.bind2 = function (o) {
  const context = this
  return function () {
    const symbol = Symbol()
    o[symbol] = context
    o[symbol](...arguments)
    delete o[symbol]
  }
}
```

## new

```Javascript
function newObject() {
  var obj = Object.create(null)
  //去除参数里的构造函数
  const Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  Constructor.apply(obj, arguments)
  return obj
}

function factory(name, age) {
  this.name = name
  this.age = age
}

var obj = newObject(factory, 'xjq', 23)
```

## async

## 迭代器

## EventEmitter

```Javascript
class Event {
  constructor() {
    this.event = {}
    this.maxListener = 5
    this.listenerCount = 0
  }
  on(type, fn) {
    if (this.listenerCount >= this.maxListener) {
      throw new Error('事件数量超限')
    }
    let hasEvent = !!this.event[type]
    if (typeof fn === 'function') {
      if (hasEvent) {
        this.event[type].push(fn)
      } else {
        this.event[type] = [fn]
      }
    }
    if (!hasEvent) this.listenerCount++
  }

  once(type, fn) {
    const _this = this
    function newFn() {
      fn(...arguments)
      _this.removeListener(type, newFn)
    }
    this.on(type, newFn)
  }

  emit(type, params) {
    if (this.event[type]) {
      this.event[type].forEach((fn) => fn(params))
    }
  }

  setMaxListeners(count) {
    this.maxListener = count
  }

  listeners(type) {
    return this.event[type] || []
  }

  removeAllListener(type) {
    this.event[type] = null
  }
  removeListener(type, listener) {
    if (this.event[type]) {
      this.event[type] = this.event[type].filter((fn) => listener !== fn)
    }
  }

  addListener(type, fn) {
    this.on(type, fn)
  }
}

const e = new Event()
function a1() {
  console.log('a1')
}

function a2() {
  console.log('a2')
}

e.once('a', a1)
e.on('a', a2)
e.emit('a')
e.emit('a')
```

## 防抖

```Javascript
function debounce(fn, delay) {
  let timer
  return function (...args) {
    const context = this
    clearTimeout(timer)
    timer = setTimeout(fn.bind(context, ...args), delay)
  }
}
```

## 节流

```Javascript
function throttle(fn, time) {
  let canCall = true
  return function (...args) {
    if (!canCall) return
    canCall = false
    fn(...args)
    setTimeout(() => {
      canCall = true
    }, time)
  }
}
```

## 深拷贝

```Javascript
function deepClone(obj, weakMap = new WeakMap()) {
  if (!(obj instanceof Object)) return obj
  var isArray = obj instanceof Array
  var res = isArray ? [] : {}
  if (!isArray) {
    if (weakMap.get(obj)) return obj
    weakMap.set(obj, {}.toString.call(obj))
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key], weakMap)
    }
  }
  return res
}
```

## 对象合并

```Javascript
function getType(o) {
  return Object.prototype.toString.call(o)
}

function deepClone(obj, weakMap = new WeakMap()) {
  if (!(obj instanceof Object)) return obj
  var isArray = obj instanceof Array
  var res = isArray ? [] : {}
  if (!isArray) {
    if (weakMap.get(obj)) return {}
    weakMap.set(obj, {}.toString.call(obj))
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key], weakMap)
    }
  }
  return res
}

function merge(a, b) {
  if (getType(a) !== getType(b)) {
    return deepClone(b)
  }
  if (!(a instanceof Object)) {
    return b
  }
  const isArray = a instanceof Array
  const res = isArray ? [] : {}
  for (let key in b) {
    if (b.hasOwnProperty(key)) {
      res[key] = merge(a[key], b[key])
    }
  }
  for (let key in a) {
    if (res[key] === undefined && a.hasOwnProperty(key)) {
      res[key] = deepClone(a[key])
    }
  }
  return res
}
```

## 柯里化

```Javascript
const add = (args) => args.reduce((a, b) => a + b, 0)

function currying(func) {
  const args = []
  return function result(...rest) {
    if (rest.length) {
      args.push(...rest)
      return result
    } else {
      return func(args)
    }
  }
}
```

## LazyMan

```Javascript
const stepObj = {
  eat: async function ({ str }) {
    console.log(str)
  },
  sleep: async function ({ delay }) {
    return sleep(delay)
  },
  sleepFirst: async function ({ delay }) {
    return sleep(delay)
  },
  talk: async function ({ name }) {
    console.log(`I'm ${name}`)
  },
}

async function sleep(delay) {
  return new Promise((r, j) => setTimeout(r, delay))
}

function LazyManConstructor(name) {
  this.step = []
  this.name = name
  this.step.push({ name: 'talk', params: { name } })
  async function fn() {
    while (this.step.length) {
      const { name, params } = this.step.shift()
      if (this.step.length) {
        if (this.step[0].name === 'sleepFirst') {
          const { name: lateName, params: lateParams } = this.step.shift()
          await stepObj[lateName](lateParams)
        }
      }
      await stepObj[name](params)
    }
  }
  setTimeout(fn.bind(this), 0)
  return this
}

LazyManConstructor.prototype.eat = function (str) {
  this.step.push({ name: 'eat', params: { str } })
  return this
}

LazyManConstructor.prototype.sleep = function (delay) {
  this.step.push({ name: 'sleep', params: { delay } })
  return this
}

LazyManConstructor.prototype.sleepFirst = function (delay) {
  this.step.push({ name: 'sleepFirst', params: { delay } })
  return this
}

function LazyMan(name) {
  return new LazyManConstructor(name)
}
```

## 排序

### 插入排序

```Javascript
function insert(arr) {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    let preIdx = i
    let current = arr[i + 1]
    while (preIdx >= 0 && current < arr[preIdx]) {
      arr[preIdx + 1] = arr[preIdx]
      preIdx--
    }
    arr[preIdx + 1] = current
  }
  return arr
}
```

### 选择排序

```Javascript
function selectSort(arr) {
  let len = arr.length
  let temp, minIdx
  for (let i = 0; i < len - 1; i++) {
    minIdx = i
    for (let j = i + 1; j < len; j++) {
      if (arr[minIdx] > arr[j]) {
        minIdx = j
      }
    }
    temp = arr[minIdx]
    arr[minIdx] = arr[i]
    arr[i] = temp
  }
  return arr
}
```

### 归并排序

```Javascript
function mergeSort(arr) {
  _mergeSort(arr, 0, arr.length - 1)
}

function _mergeSort(arr, l, r) {
  if (l < r) {
    const mid = l + parseInt((r - l) / 2)
    _mergeSort(arr, l, mid)
    _mergeSort(arr, mid + 1, r)
    _merge(arr, l, mid, r)
  }
}

function _merge(arr, l, mid, r) {
  let i = l,
    j = mid + 1
  let k = 0,
    temp = []
  while (i <= mid && j <= r) {
    if (arr[i] > arr[j]) {
      temp[k++] = arr[j++]
    } else {
      temp[k++] = arr[i++]
    }
  }

  while (i <= mid) {
    temp[k++] = arr[i++]
  }

  while (j <= r) {
    temp[k++] = arr[j++]
  }
  for (let i = 0; i < k; i++) {
    arr[l + i] = temp[i]
  }
}
```

### 快速排序

```Javascript
function quickSort(arr) {
  _quickSort(arr, 0, arr.length - 1)
}
function _quickSort(arr, l, r) {
  if (l > r) return

  let left = l,
    right = r

  let base = arr[left]
  let temp
  while (l != r) {
    while (arr[r] >= base && l < r) {
      r--
    }
    while (arr[l] <= base && l < r) {
      l++
    }

    if (l < r) {
      temp = arr[l]
      arr[l] = arr[r]
      arr[r] = temp
    }
  }
  arr[left] = arr[l]
  arr[l] = base
  _quickSort(arr, left, l - 1)
  _quickSort(arr, l + 1, right)
}
```

### 冒泡排序

```Javascript
function bubbleSort(arr) {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}
```

## Redux-thunk

```Javascript
function createThunkMiddleware(extraArgument) {
  const middleware =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument)
      }

      return next(action)
    }
  return middleware
}
```
