---
title: 前端
---

## js

### 数据类型

- 值类型(基本类型)：字符串(string)、数值(number)、布尔值(boolean)、undefined、空值(null)、symbol

  ```js
  //string
  var str = "hello";

  //number 另外NaN是个特殊的number,表示无法计算的结果
  var num = 10;
  //NaN判断方法
  isNaN(NaN); //true

  //boolean
  var bool1 = true;
  var bool2 = false;

  //null
  var empty = null;

  //undefined 或者定义了变量未赋值
  var a = undefined;

  //symbol
  var s1 = Symbol();
  var s2 = Symbol();
  s1 === s2; //false
  ```

- 引用类型：对象（Object）、数组（Array）、函数（Function）

  ```js
  //Object
  var obj = {
    name: "xjq",
  };

  //Array
  var arr = [1, 2, 3];

  //Function
  function fun() {
    console.log("fun");
  }
  ```

### 标准内置对象

#### 值

- Infinity，无穷大

- NaN，不是一个数字

- undefined，未赋值

- globalThis，任何环境下的 this

#### 函数

- parseInt,从给定的字符串中解析出的一个整数或者 NaN

- encodeURI,url 编码，以下情况不会被编码，解码(decodeURI())

  1. 保留字符：; , / ? : @ & = + $

  2. 非转义的字符：字母 数字 - \_ . ! ~ \* ' ( )

  3. 数字符号：#

- encodeURIComponent，url 编码，除了非转义字符,解码(decodeURIComponent())

  1. 字母 数字 - \_ . ! ~ \* ' ( )

- isFinite(),判断是否是有限数值

#### 数字、日期对象

- BigInt：可以表示大于 2^53 - 1 的整数

### 数据类型区别

- **值类型**

  占用空间固定，保存在栈中（当一个方法执行时，每个方法都会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。因此，所有在方法中定义的变量都是放在栈内存中的；栈中存储的是基础变量以及一些对象的引用变量，基础变量的值是存储在栈中，而引用变量存储在栈中的是指向堆中的数组或者对象的地址，这就是为何修改引用类型总会影响到其他指向这个地址的引用变量。）

- **引用类型**

  占用空间不固定，保存在堆中（当我们在程序中创建一个对象时，这个对象将被保存到运行时数据区中，以便反复利用（因为对象的创建成本通常较大），这个运行时数据区就是堆内存。堆内存中的对象不会随方法的结束而销毁，即使方法结束后，这个对象还可能被另一个引用变量所引用（方法的参数传递时很常见），则这个对象依然不会被销毁，只有当一个对象没有任何引用变量引用它时，系统的垃圾回收机制才会在核实的时候回收它。）

  <div style="text-align: center;">
    <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/typeOfData/reference-type.png"/>
  </div>

### 函数

- 修改 this 指向

  - call,绑定 this 调用 fn，以参数列表接收参数,call 的实现思路:当函数调用 call 的时候,将函数设置为对象的属性,执行函数后删除,执行时函数 this 已经指向 call 方法参数对象

  ```js
  fn.call(this, ...arguments);
  // 实现call
  Function.prototype.call2 = function (context) {
    // 首先要获取调用call的函数，用this可以获取
    context.fn = this;
    const obj = [].shift.call(arguments);
    obj.fn(...arguments);
    delete obj.fn;
  };
  ```

  - apply，绑定 this 调用 fn，以数组形式提供参数

  ```js
  fn.apply(this, arguments);
  ```

  - bind

  创建一个新的函数

  ```js
  var newFn = fn.bind(this, ...arguments);
  newFn();
  ```

### js 事件循环

**js 是单线程语言,事件循环是为了协调事件、用户交互、脚本、UI 渲染和网络处理等行为，防止主线程阻塞**

- **主线程**

  一些具有回调函数的事件将进入执行栈中,等待主线程读取,等待主线程读取,遵循先进先出原则。主线程循环：即主线程会不停的从执行栈中读取事件，会执行完所有栈中的同步代码。当遇到一个异步事件后，并不会一直等待异步事件返回结果，而是会将这个事件挂在与执行栈不同的队列中，我们称之为任务队列(Task Queue)。当主线程将执行栈中所有的代码执行完之后，主线程将会去查看任务队列是否有任务。如果有，那么主线程会依次执行那些任务队列中的回调函数。

- **宏任务与微任务**

  异步任务分为 宏任务(macrotask) 与 微任务 (microtask)，

  宏任务(macrotask):
  script(整体代码)、setTimeout、setInterval、UI 渲染、 I/O、postMessage、 MessageChannel、setImmediate(Node.js 环境)

  微任务(microtask):
  Promise、 MutaionObserver、process.nextTick(Node.js 环境)

- **Event Loop(事件循环)**

  1. 执行栈选择最先进入队列的宏任务
  2. 然后执行微任务
  3. ...循环执行完全部任务(宏任务-微任务-宏任务)

### 继承

### 原型

每一个 js 对象(除 null)都有另一个对象有关联,这里另一个对象就是原型,每个对象都从原型继承属属性

### new 的实现

关键字 new,实现一个 new,然后创建一个对象的过程

1. 创建一个没有原型的对象

2. 将传入的构造函数的 prototype 绑定到创建的对象原型

3. 构造函数 this 指向创建的对象,附带我们传入的参数,没有这一步,我们 new 一个对象的时候就没有构造函数生成的属性

```js
function newObject() {
  var obj = Object.create(null);
  //去除参数里的构造函数
  const Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);
  return obj;
}

function factory(name, age) {
  this.name = name;
  this.age = age;
}

var obj = newObject(factory, "xjq", 23);
```

### 观察者模式

### 发布-订阅模式

### 模块化

## ES6

### 数据结构

- Set

  类数组，成员唯一,可遍历

  - add

  - delete

  - has

  - clear

  - keys

  - values

  - forEach

- WeakSet

  只能存储对象，不可遍历，垃圾回收运行前后，部分成员可能被回收

- Map

  键值对

  - size，成员总数

  - set，设置键名对应的键值

  - get，读取 key 对应的键值

  - has，判断是否包含某个 key

  - delete，删除某个键，如果删除失败，返回 false

  - clear

  - keys

  - values

  - entries

  - forEach

- WeakMap

  只支持对象作为键名

  - get

  - set

  - has

  - delete

### Promise

### Async/Await

## 浏览器

### 重绘、重排

### 浏览器渲染机制

## http 协议

### 三次握手，四次挥手

## 状态管理

### redux

## 框架

### react

#### diff 算法

计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行原生 DOM 操作，而非重新渲染整个页面

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

## util

### 防抖

触发高频事件 n 秒后执行，如果 n 秒内再次触发高频事件，则重新计时

```js
function debounce(fn, delay) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(fn.bind(context, ...args), delay);
  };
}
```

### 节流

高频事件触发，n 秒内只会执行一次

```js
function throttle(fn, time) {
  let canCall = true;

  return function () {
    if (!canCall) return;
    canCall = false;
    const context = this;
    const args = arguments;
    fn.bind(this, ...arguments)();
    setTimeout(() => {
      canCall = true;
    }, time);
  };
}
```
