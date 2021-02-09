---
title: javascript相关知识
sidebarDepth: 3
---

> [冴羽写博客的地方](https://github.com/mqyqingfeng/Blog)

> [前端你应该了解的数据结构与算法](https://juejin.im/post/5b331bc7f265da598451fd88#comment)

## 类型判断

- **typeof**

  typeof 可以识别简单基本类型值(比如:number,string,boolean),但对于复合类型(Object,Array,Function)却只能识别 Function,

  ```js
  typeof 10 //number
  typeof '' //string
  typeof true //boolean
  typeof Array //object
  typeof Object //object
  typeof function () {} //function
  typeof undefined //undefined
  typeof {} // object
  typeof [] // object
  typeof null // object
  ```

- **instanceof**

  instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性

  ```js
  console.log(Object instanceof Object) //true
  console.log(Function instanceof Function) //true
  console.log(Number instanceof Number) //false
  console.log(String instanceof String) //false
  console.log(Function instanceof Object) //true
  ```

## 作用域

**作用域是指程序源代码中定义变量的区域。**

**静态作用域(词法作用域)与动态作用域**

1. 静态作用域:静态作用域(即词法作用域)中的函数遇到既不是形参也不是函数内部定义的局部变量的变量时，会去函数定义时的环境中查询。

2. 动态作用域:动态作用域中的函数遇到既不是形参也不是函数内部定义的局部变量的变量时，到函数调用时的环境中查。

**既不是形参也不是函数内部定义的局部变量的变量即自由变量。形参或函数内部定义的局部变量即约束变量。**

**全局作用域与块级作用域(函数作用域):**

1. 全局作用域在 js 代码中任何地方都有定义

2. 块级作用域:在 js 中也就是函数作用域,在声明他们的函数体以及这个函数体嵌套的任意函数体内有定义

```js
var a = 'global'
function block() {
  console.log(a) //输出undefined,因为a在函数体内重新定义,在函数体内定义的a取代全局变量a
  var a = 'block' //变量作用域提升到函数顶层,执行此行语句前为undefined,未赋值
  console.log(a) //block
}
```

## 闭包

**闭包是指那些能够访问自由变量的函数,自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。**

## 垃圾回收

js 具有自动垃圾回收机制,执行环境负责管理代码执行过程中使用的内存

### 标记清除

这是最常用的垃圾回收方式

当变量进入环境（例如，在函数中声明一个变量）时，将这个变量标记为 “进入环境” 。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为我们在这个环境中可能随时会用到它们。当变量离开环境时，则将其标记为 “离开环境”。

### 引用计数

引用计数的含义就是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋给该变量时，这个值的引用次数就是 1。如果同一个值又被赋值给另一个变量，则引用次数加 1。相反，如果包含对这个值的引用的变量有取了另一个值，则引用次数减 1。当这个值的引用次数变为 0 时，说明已经没法再访问这个值了，因此可以将其占用的内存回收了。

这种回收方式会出现一个问题,那就是循环引用,比如两个对象的属性互相引用,在自己递归实现深拷贝的时候有碰到,需要注意,因此这种回收方式很少用

## 排序算法

稳定性:待排序的记录中,存在多个具有相同关键字的记录,经过排序后,这些记录的相对序列保持不变,则称算法是稳定的,否则是不稳定的

### 插入排序

最佳情况：T(n) = O(n)
最坏情况：T(n) = O(n2)
平均情况：T(n) = O(n2)

> [Js 的事件循环(Event Loop)机制以及实例讲解](https://segmentfault.com/a/1190000015317434)

> [JavaScript 深入之史上最全--5 种 this 绑定全面解析 #20](https://github.com/yygmind/blog/issues/20)

## this 绑定规则

**1. 默认绑定:根据函数调用位置**

```js
function baz() {
  // 当前调用栈是：baz
  bar() // <-- bar的调用位置
}

function bar() {
  // 当前调用栈是：baz --> bar
  // 因此，当前调用位置在 baz 中

  console.log('bar')
  foo() // <-- foo 的调用位置
}

function foo() {
  // 当前调用栈是：baz --> bar --> foo
  // 因此，当前调用位置在 bar 中

  console.log('foo')
}

baz() // <-- baz 的调用位置
```

**2. 隐式绑定:当函数引用有上下文对象时，隐式绑定规则会把函数中的 this 绑定到这个上下文对象。对象属性引用链中只有上一层或者说最后一层在调用中起作用。**

```js
//在·对象中调用,指向对象,谁调用即指向谁
function foo() {
  console.log(this.a)
}

var obj = {
  a: 2,
  foo: foo,
}

obj.foo() // 2
```

**3. 显示绑定:通过 call 或者 apply 方法。**

```js
var foo = function () {
  console.log(this.a) //1
}
var obj = {
  a: 1,
}
foo.call(obj)
```

**4. new 绑定**

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建（或者说构造）一个新对象。
2. 这个新对象会被执行[[Prototype]]连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

**5. 箭头函数:箭头函数的 this 是在定义函数时绑定的，不是在执行过程中绑定的**

## 继承

## 观察者模式

```js
function eventEmitter() {
  this.handlers = {}
}

eventEmitter.prototype.on = function (type, handle) {
  if (!this.handlers[type]) {
    this.handlers[type] = []
  }
  this.handlers[type].push(handle)
}

eventEmitter.prototype.emit = function () {
  var type = Array.prototype.shift.call(arguments)
  if (!this.handlers[type]) {
    return
  }
  this.handlers[type].forEach((item, index) => {
    var handler = this.handlers[type][index]
    handler.apply(this, arguments)
  })
}

const _ = new eventEmitter()

_.on('test', function ({ a }) {
  console.log('test' + a)
})

_.emit('test', { a: 111 })
```

## 数组

### es3 中的一些方法

**1. join:将数组中的元素转化为字符串连接到一起**

```js
var arr = [1, 2, 3]
arr.join() //"1,2,3"
arr.join('') //"123"
arr.join(' ') //"1 2 3"
```

**2. reverse:将数组中的元素颠倒顺序,返回逆序数组**

```js
var arr = [1, 2, 3]
arr.reverse() //[3,2,1]
```

**3. sort:返回排序后的数组**

```js
var arr = ['cba', 'abc', 'bac']
//不带参数时按字母表排序
arr.sort() //["abc","bac","cba"]

//需要按其他方式排序时,需要传入比较方法,根据参数方法返回的值负数、0、正数决定排序顺序
var arr = [123, 23, 3]
arr.sort(function (a, b) {
  return a - b
}) //[3,23,123]
arr.sort(function (a, b) {
  return b - a
}) //[123,23,1]
```

**4. concat:合并数组,具体使用如下**

```js
var arr = [1, 2, 3]

//参数为非数组时
arr.concat(4, 5) //[1,2,3,4,5]

//参数为数组时
arr.concat([4, 5]) //[1,2,3,4,5]

//多个参数都为数组时
arr.concat([4, 5], [6, 7]) //[1,2,3,4,5,6,7]

//多个参数数组与非数组都有时
arr.concat(4, [5, [6, 7]]) //[1,2,3,4,5,[6,7]],这里不会递归扁平化数组
```

**5. slice:数组切片**

```js
var arr = [1, 2, 3, 4, 5]
//两个参数,第一个为起始下标,第二个截止下标,左开右闭
arr.slice(0, 3) //[1,2,3]

//一个参数,起始下标到数组尾部
arr.slice(3) //[4,5]

//
arr.slice(1, -1) //[2,3,4]
arr.slice(-3, -2) //[3]
```

**6. splice:往数组插入或删除元素,第三种情况多参数时稍微有点复杂**

```js
//只有一个参数时,返回从指定数组中删除的元素数组,原来的数组会改变
var arr = [1, 2, 3, 4, 5]
arr.splice(3) //[5],arr为[1,2,3,4]

//两个参数时
arr = [1, 2, 3, 4, 5]
arr.splice(1, 3) //[2,3,4],arr为[1,5]

//三个参数以上,第一个参数决定删除元素起始下标,第二个决定删除个数,后面的删除是待插入数组,从第一个参数下标开始插入
arr = [1, 2, 3, 4, 5, 6]
arr.splice(1, 2, [2, 3], 0) //[2,3],arr为[1,[2,3],0,4,5,6]
```

**7. 首尾插入删除方法:push、pop、shift、unshift**

**8. toString:将每个元素转为字符串、并输出以逗号为分隔符的字符串列表**

```js
var arr = [1, 2, 3]
arr.toString() //"1,2,3"

//递归转化
arr = [1, 2, 4, [4, 5, [6, 7]]]
arr.toString() //"1,2,4,4,5,6,7"
```

### es5 中定义了 9 个新的数组方法来遍历、映射、过滤、检测、简化、检索数组

**1. forEach(常用):从头至尾遍历数组,为每个元素调用指定的函数,forEach 有三个参数:分别是数组元素、元素索引、数组本身,forEach 无法提前终止遍历**

**2. map:将调用的数组的每个元素传给指定的函数,并返回一个新数组,不影响原数组(react 中经常使用)**

```js
var arr = [1, 2, 4]
arr.map(function (x) {
  return x * x
}) //[1,4,16]
```

**3. filter:filter 方法返回的数组元素是调用数组的一个子集,传递的函数用作逻辑判断,返回 true 或 false,true 则代表元素是子集成员**

```js
var arr = [1, 2, 3, 4, 5]
arr.filter(function (x) {
  return x < 3
}) //[1,2]
```

**4. every 和 some:数组的逻辑判断,他们对数组元素应用指定的函数进行判断,返回 true 或 false,every 方法针对所有元素,当数组中所有元素调用函数返回 true 时才返回 true,some 只要有一个返回 true,即为 true**

```js
var arr = [1, 2, 3, 4]
arr.every(function (x) {
  return x > 0
}) //true
arr.some(function (x) {
  return x > 3
}) //true
```

**5. reduce:用指定的函数将数组元素进行组合,生成单个值,他有两个参数,第一个是处理函数,第二个是初始值,不传时默认数组第一个元素**

```js
var arr = [1, 2, 3, 4]
//求和操作
arr.reduce(function (x, y) {
  return x + y
}, 0) //10

//求积
arr.reduce(function (x, y) {
  return x * y
}, 1)

//求最大值
arr.reduce(function (x, y) {
  return x > y ? x : y
})
```

**6. indexOf 和 lastIndexOf:搜索数组中具有给定值的元素,有就返回第一个元素索引,没有就返回-1,lastIndexOf 是反向搜索**

```js
var arr = [1, 2, 4, 3, 2]

arr.indexOf(2) //1
arr.indexOf(9) //-1
```

## 跨域

- **同源策略**

  同源策略是 js 代码能够操作哪些 web 内容的一条完整的安全限制,引起同源策略的因素有域名、协议(http 和 https)、端口

## window 对象

- **location:浏览器当前窗口显示的 url**

  1. protocol: 协议(http 和 https)
  2. host:域名+端口
  3. hostName:域名
  4. port:端口
  5. search:参数,?后的 url
  6. reload 方法:刷新页面

- **history:该窗口的 history 对象**

  1. length:浏览历史记录数量
  2. back():返回上一次浏览记录
  3. forward():前进
  4. go():跳转多层记录

- **navigator:浏览器厂商和版本信息**

  这篇用到 navigator 对象,区分手机浏览器,[手机浏览器的识别](http://lxjq.icu/Javascript/Browser-identification.html)

```

```
