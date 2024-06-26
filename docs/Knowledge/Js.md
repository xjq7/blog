[[toc]]

## this 绑定规则

### 1. 默认绑定:根据函数调用位置

```Javascript
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

### 2. 隐式绑定:当函数引用有上下文对象时，隐式绑定规则会把函数中的 this 绑定到这个上下文对象。对象属性引用链中只有上一层或者说最后一层在调用中起作用。

```Javascript
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

### 3. 显示绑定:通过 call 或者 apply 方法。

```Javascript
var foo = function () {
  console.log(this.a) //1
}
var obj = {
  a: 1,
}
foo.call(obj)
```

### 4. new 绑定

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建（或者说构造）一个新对象。
2. 这个新对象会被执行[[Prototype]]连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

### 5. 箭头函数:箭头函数的 this 是在定义函数时绑定的，不是在执行过程中绑定的

闭包是指有权访问另一个函数作用域中的变量的函数

### 定时器与闭包

下面这段程序会打印 4,
var 存在变量提升问题, 导致 callback 引用的是全局作用域下的 i
for 循环在当前事件循环一次执行完将 i 修改为 4
然后执行下一个事件循环的 setTimeout callback 取到了全局作用域的 i

```Javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}
```

## 闭包

通过闭包创建块级作用域, 可以打印 0 1 2 3 4

```Javascript
for (var i = 0; i < 5; i++) {
  ;(function () {
    setTimeout(() => {
      console.log(i)
    }, 1000)
  })(i)
}
```

## 事件循环

### Node

> [深入理解NodeJS事件循环机制](https://juejin.cn/post/6844903999506923528)

Node 端的事件循环包含 6 个阶段

1. timers 阶段: 这个阶段执行 setTimeout(callback) 和 setInterval(callback) 预定的 callback
2. I/O callbacks 阶段: 此阶段执行某些系统操作的回调
3. idle, prepare 阶段: 仅node内部使用
4. poll 阶段: 获取新的I/O事件, 例如操作读取文件等等, 适当的条件下node将阻塞在这里
5. check 阶段: 执行 setImmediate() 设定的callbacks
6. close callbacks 阶段: 比如 socket.on(‘close’, callback) 的callback会在这个阶段执行

#### nextTick 与 promise

process.nextTick 不属于事件循环的任何一个阶段, 它属于该阶段与下阶段之间的过渡, 即本阶段执行结束, 进入下一个阶段前, 所要执行的回调

promise 与 process.nextTick 可以看做为微任务, process.nextTick 优先级要高于 promise

process.nextTick 递归的话会导致 事件循环无法进入下一阶段, 通过 process.maxTickDepth 可以限制递归层数

### 浏览器

事件循环是单线程 JS 处理异步事件时的循环过程

JS 对于异步事件会将它先挂起加入事件队列, 主线程空闲时执行事件队列中的事件

执行过程 主线程 -> 微任务 -> 宏任务 -> 微任务 -> 宏任务 ...

在事件队列中微任务优先级高于宏任务

### 微任务

1. promise
2. process.nextTick(node)
3. mutationObserver(html5新特性)

### 宏任务

1. script 主线程
2. setTimeout
3. setInterval
4. setImmediate
5. IO
6. UI 渲染

## 原型链

![原型链关系图](https://image.xjq.icu/2024/3/29/1711702766719_image.png)

### 原型对象(prototype)

每个函数都有一个 prototype 属性, 这个属性指向一个对象, 这个对象就是函数的原型对象。

每个对象都有个 \_\_proto\_\_ 属性指向他的原型对象, \_\_proto\_\_ 的连接就是原型链

通过原型对象, 可以实现属性和方法的共享

### 构造函数(constructor)

构造函数是用来创建对象的函数，在构造函数中可以定义对象的属性和方法

constructor 存在于 prototype的属性上

### 优势

1. 实现对象之间的共享: 原型链允许对象之间共享属性和方法，这样可以减少内存消耗
2. 实现继承: 通过原型链，可以实现对象之间的继承关系，子对象可以继承父对象的属性和方法，提高代码的复用性
3. 动态性和灵活性: 可以动态地向原型对象添加属性和方法，所有基于该原型对象创建的对象都会自动继承这些新添加的属性和方法

## this

## 继承

### 原型链继承

子类的 prototype 设置为父类的实例

缺点:

1. 子类共享同一份实例, 父子类数据耦合
2. 无法传参

```Javascript
function Parent() {
  this.arr = [1, 2]
}

function Child(name) {
  this.name = name
}

Child.prototype = new Parent()

const c1 = new Child('x1')
const c2 = new Child('x2')

console.log(c1.arr) // [1,2]
c1.arr.push(3)
console.log(c2.arr) // [1,2,3]
```

### 构造函数继承

将父类构造函数内容复制给子类构造函数, 子类不会相互影响,且可以传参

缺点: 无法复用父类方法

```Javascript
function Parent(name) {
  this.pName = name
  this.arr = [1, 2]
}

function Child(name) {
  Parent.call(this, 'parent')
  this.name = name
}

const c1 = new Child('x1')
const c2 = new Child('x2')

console.log(c1.arr) // [1,2]
c1.arr.push(3)
console.log(c2.arr) // [1,2]
console.log(c1.pName) // parent
```

### 组合继承

原型链继承与构造函数继承的组合

优点:

    1. 父类方法可以复用
    2. 父类引用属性不会共享
    3. 子类构造实例可以向父类传参

缺点:

    1. 调用了两次父类构造函数
    2. 父类属性存在子类实例以及子类实例原型中

```Javascript
function Parent(age) {
  this.age = age
  this.arr = [1, 2]
}

Parent.prototype.say = function () {
  console.log('hello')
}

function Child(name) {
  Parent.call(this, 40)
  this.name = name
}

Child.prototype = new Parent()

const c1 = new Child('x1')
const c2 = new Child('x2')

console.log(c1.arr) // [1,2]
c1.arr.push(3)
console.log(c2.arr) // [1,2]
c1.say() // hello
```

### 原型式继承

浅复制参数对象

子类父类属性耦合
无法传递参数

```Javascript
const obj = { a: 1 }
function clone(o) {
  function F() {}
  F.prototype = o
  return new F()
}
const c1 = clone(obj)
console.log(c1.a)
```

### 寄生式继承

在原型式继承基础上增强

```Javascript
const obj = { a: 1 }
function clone(o) {
  function F() {}
  F.prototype = o
  const f = new F()
  f.say = function () {
    console.log('hello')
  }
  return f
}

const c1 = clone(obj)

c1.a // 1
c1.say()
```

### 寄生组合式继承

通过寄生式继承复用父类原型方法
通过组合继承复用父类属性

```Javascript
function Parent(age) {
  this.age = age
  this.arr = [1]
}

Parent.prototype.c = 'c1'
Parent.prototype.say = function () {
  console.log('hello')
}

function Child(name) {
  Parent.call(this, 22)
  this.name = name
}

function clone(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function inherit(child, parent) {
  let prototype = clone(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

inherit(Child, Parent)

const c1 = new Child('x1')
const c2 = new Child('x2')
```

## DOM 事件流

事件流: 事件在元素之间的触发顺序

事件捕获: 事件由最顶层逐级向下传播, 直至到达目标元素
事件冒泡: 事件由目标元素接收, 然后逐级向上传播

事件流规定了事件是先捕获再冒泡
事件流的三个阶段:

1. 捕获阶段: 事件从最顶层元素 window 一直传递到目标元素的父元素
2. 目标阶段: 事件到达目标元素, 如果事件指定不冒泡, 那就会在这里中止
3. 冒泡阶段: 事件从目标元素父元素向上逐级传递直到最顶层元素 window

### 阻止捕获和冒泡

通过 Event 对象的 stopPropagation 方法可以阻止事件捕获和冒泡

在捕获事件里执行, 子元素事件无法触发
在冒泡事件里执行, 父元素事件无法触发

### 事件委托

通过事件冒泡可以将子元素的事件函数定义在父元素上, 由父元素的事件统一处理多个子元素的事件

优点:

1. 减少内存消耗, 不需要为每个子元素绑定事件, 提高性能
2. 动态绑定事件

### DOM 级别

1. DOM0级事件是将函数赋值给元素的事件处理属性

比如 赋值给 button 属性的 onclick 属性

DOM0 级事件无法同时绑定多个处理函数

2.  DOM2级事件是通过元素的 addEventListener 和 removeEventListener 方法绑定与解绑事件

3.  DOM3级事件在 DOM2 级事件基础上新增了更多的事件类型

    - UI事件, 当用户与页面上的元素交互时触发, 如: load、scroll
    - 焦点事件, 当元素获得或失去焦点时触发, 如: blur、focus
    - 鼠标事件, mouseenter 和 mouseleave: 这两个事件与mouseover和mouseout类似, 但是不会在子元素进入或离开父元素时触发。它们更适合用于实现鼠标进入和离开元素的效果, 而不受子元素影响
    - 滚轮事件, 当使用鼠标滚轮或类似设备时触发, 如: mousewheel
    - 文本事件, 当在文档中输入文本时触发, 如: textInput
    - 键盘事件, input: 当用户输入文本时触发。与keydown、keypress和keyup事件不同, input事件在文本字段的值发生变化时触发, 而不是在按键被按下或释放时触发
    - 变动事件, 当底层DOM结构发生变化时触发, 如: DOMsubtreeModified
    - 触摸事件, touchstart、touchend、touchmove、touchcancel: 这些事件用于处理触摸屏设备上的触摸操作, 如手指接触屏幕、手指离开屏幕、手指在屏幕上移动等
    - 拖放事件, drag、dragstart、dragend、dragover、dragenter、dragleave、drop: 这些事件用于处理拖放操作, 可以实现拖动元素并将其放置到其他位置的功能
    - 复合事件, compositionstart、compositionupdate、compositionend: 这些事件用于处理复合输入（如中文输入法输入）时的事件, 可以捕获到输入法的中间状态和最终结果

## 模块化

### Commonjs

Commonjs 是 nodejs 中的模块化规范

1. Commonjs 模块是同步加载的
2. 文件级别的模块作用域
3. 首次加载会运行模块并缓存结果, 再次加载会使用缓存

CommonJS 实现会将模块的代码包装在一个IIFE中，并向该IIFE传递 exports、module 和 require，以确保模块的作用域是隔离的

```Javascript
;(function (exports, module, require) {
  // 模块代码
})(exports, module, require)
```

### ESM

ESM 在编译时就能确定模块依赖的输入与输出

1. ESM 输出的是值的引用
2. ESM 是编译时输出接口
3. ESM 支持异步加载

### AMD

### CMD

## JS 精度

IEEE 754 标准定义了单精度和双精度浮点格式,每个浮点数均由 3 个部分组成：符号位 S，指数部分 E 和尾数部分 M

### 计算机的运算方式

Javascript 中整数和浮点数都为 Number 类型,都以 64 位浮点数形式存储,计算机在做数值运算时,先转换为二进制,再进行运算

整数的二进制转换:除 2 取余数，若商不为 0 则继续对它除 2，当商为 0 时则将所有余数逆序排列

浮点数点二进制转换:整数部分按整数二进制转换,小数部分,乘 2 取整数部分，若小数不为 0 则继续乘 2，直至小数部分为 0 将取出的整数位正序排列。（若小数部分无法为零，根据有效位数要求取得相应数值，位数后一位 0 舍 1 入进行取舍）

例如: 0.1 转二进制

0.1 \* 2 = 0.2 - - - - - - - - - - 取 0

0.2 \* 2 = 0.4 - - - - - - - - - - 取 0

0.4 \* 2 = 0.8 - - - - - - - - - - 取 0

0.8 \* 2 = 1.6 - - - - - - - - - - 取 1

0.6 \* 2 = 1.2 - - - - - - - - - - 取 1

0.2 \* 2 = 0.4 - - - - - - - - - - 取 0

...

将 0.1 和 0.2 转换为二进制表示：

0.1 的二进制表示近似为 0.0001100110011001100110011001100110011001100110011001101...
0.2 的二进制表示近似为 0.0011001100110011001100110011001100110011001100110011010...

```
   0.0001100110011001100110011001100110011001100110011001101... (0.1)
 + 0.0011001100110011001100110011001100110011001100110011010... (0.2)
 --------------------------------------------------------------
   0.0100110011001100110011001100110011001100110011001100111... (近似结果)

```

近似结果为 0.30000000000000004

当出现无限循环的时候,js 数值运算就会出现相应的误差

### 单精度

1 位符号位,8 位指数位,23 位有效位

### 双精度

1 位符号位,11 位指数位,52 位有效位

## 严格模式

代码中启用更严格的解析和错误处理的方式, 可以使代码更安全, 维护性更好

启用严格模式后

- 全局变量需要显示声明
- 禁止删除变量, 无法使用 delete
- 禁止使用未声明的变量
- 禁止使用 八进制
- 禁止函数中的重复参数名
- 禁止使用 this 指向全局对象
- 禁止使用 eval 和 arguments 作为变量名
