## html

1. 盒模型

标准 W3C 盒子模型的范围包括 margin、border、padding、content，并且 content 部分不包含其他部分

IE 盒子模型的范围也包括 margin、border、padding、content，和标准 W3C 盒子模型不同的是：IE 盒子模型的 content 部分包含了 border 和 pading

2. BFC

块级格式化上下文

BFC 的原理

1. BFC 这个元素的垂直的边距会发生重叠
2. BFC 的区域不会与浮动元素的 float 重叠
3. 独立的容器，内外元素互不影响
4. 计算 BFC 高度，浮动元素也参与计算

BFC 创建

1. float 不为 none 的时候
2. position 不为 static 或者 relative 的时候
3. display 与 table 相关的时候
4. overflow 为 auto, hidden 的时候

BFC 应用

1. 解决边距重叠问题

## Css

- flex 布局

- 居中布局

## Typescript

## code

### 浅拷贝

```js
function clone(obj) {
  const type = Object.prototype.toString.call(obj)
  if (!(type === '[object Object]' || type === '[object Array]')) return obj
  const o = type === '[object Object]' ? {} : []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      o[key] = obj[key]
    }
  }
  return o
}
```

### 深拷贝

- 序列化

```js
JSON.parse(JSON.stringfy(obj))
```

- 递归

```js
function deepClone(obj, weakMap = new WeakMap()) {
  const type = Object.prototype.toString.call(obj)
  if (!(type === '[object Object]' || type === '[object Array]')) return obj
  const o = type === '[object Object]' ? {} : []
  if (weakMap.get(obj)) return o
  weakMap.set(obj, true)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      o[key] = deepClone(obj[key])
    }
  }
  return o
}
```

## React

### hooks

类组件缺陷:

- 代码笨重
- 组件难拆分,重构及测试
- 业务逻辑复用不便
- 类组件引入了复杂的编成方式, 高阶组件

函数组件没有状态和生命周期, 无法取代类组件

hooks 的设计是加强函数组件, 不使用类也可以写出一个全功能的组件

### 高阶组件

参数为组件, 返回值为新组件的函数

将可复用的逻辑与 UI 分离, 在不破坏原有组件功能的同时,增强原有组件

### 原理

React 是用于快速构建用户界面的 js 库

### other

1. 列表组件 key 的作用

2. setState

3.

### React 事件机制

## webpack && vite

1. 动态主题

2. 懒加载

## 架构

## 工程

### 脚手架

## 浏览器

1. async vs defer

### 事件机制

浏览器事件机制是描述 JS 与 HTML 的交互过程，他们之间的交互是通过事件完成的，而事件流描述了 页面接受事件的顺序

#### 事件流分为三种

- 事件冒泡

  事件冒泡是由 IE 团队提出来的，是从交互元素开始触发事件，然后冒泡到顶级元素 document

- 事件捕获

  事件捕获是由 Netscape 团队提出来的 事件解决方案，和事件冒泡相反，事件捕获是由顶级元素 document 接受事件，向下传播到交互元素，在事件捕获阶段我们可以拦截事件

- DOM 事件流

  DOM 事件流分为三个阶段：事件捕获、目标元素、事件冒泡，先事件捕获，为提前拦截事件提供可能，再到达目标元素，最后是事件冒泡

#### 事件处理程序

- HTML 事件处理程序

  写在 HTML 标签中的函数

- DOM0 事件处理程序

  获取 DOM 元素,然后绑定事件处理函数, 函数作用域在 DOM 元素中, this 也指向这个对象

  无法同时添加多个事件, 无法控制元素事件流

- DOM2 事件处理程序

  通过事件监听的方式绑定事件处理函数, 作用域指向当前元素

  addEventListener 添加, removeEventLinstener 移除

- IE 事件处理程序

  与 DOM2 级事件处理程序相似, 通过 attachEvent 绑定事件函数, detachEvent 解绑, IE8 之前的版本只支持 冒泡事件流,无第三个参数

  作用域在全局中, 指向 window

#### 事件对象

DOM 中发生事件时, 所有相关信息都会被收集并存储在 event 对象中, 包含 DOM 元素, 事件类型, 事件相关数据

- event. preventDefault()

  阻止默认事件行为, 或者函数 return false 也能阻止

- event.stopPropagation()

  阻止事件冒泡, 事件捕获

- event.stopImmediatePropagation()

  既能阻止事件冒泡, 也能阻止同类型其他事件监听器触发

- event.target

  触发事件的元素

- event.currentTarget

  事件监听者

#### 事件委托

利用事件冒泡机制, 使用一个事件处理程序管理一种类型的事件

### 事件循环

## 工程化

- 开发效率

  自动化

      - 分支管理规范
      - 代码格式, 代码规范
      - 自动化测试
      - 持续集成(CI)
      - 持续部署(CD)

- 协作效率

- 系统质量

  可读性, 可维护性, 稳定性

  - 设计严谨的需求

    需求理解清晰, 考虑周全

  - 设计严谨的方案

    技术方案合理, 实现考虑可用性, 兼容性, 扩展性, 性能等方面,避免过度设计
    架构设计
    技术栈选用合理, 符合系统需要, 生态完善, 开发人员上手容易或者有经验
    模块拆分合理, 符合高内聚低耦合模型, 重复逻辑抽象封装

  - 严格的测试

    不同环境(开发,测试,预发布,生产)测试的一致性
    单元测试
    自动化测试

  - 完善的文档

    人员变动, 技术迭代更新需要在当前记录一份简洁, 可靠的文档

  - 完善的监控系统

    异常监控告警, 性能报告

## babel

## Js

### 继承

#### 原型链继承

子类的 prototype 设置为父类的实例

缺点:

1. 子类共享同一份实例, 父子类数据耦合
2. 无法传参

```js
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

#### 构造函数继承

将父类构造函数内容复制给子类构造函数, 子类不会相互影响,且可以传参

缺点: 无法复用父类方法

```js
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

#### 组合继承

原型链继承与构造函数继承的组合

优点:

    1. 父类方法可以复用
    2. 父类引用属性不会共享
    3. 子类构造实例可以向父类传参

缺点:

    1. 调用了两次父类构造函数
    2. 父类属性存在子类实例以及子类实例原型中

```js
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

#### 原型式继承

浅复制参数对象

子类父类属性耦合
无法传递参数

```js
const obj = { a: 1 }
function clone(o) {
  function F() {}
  F.prototype = o
  return new F()
}
const c1 = clone(obj)
console.log(c1.a)
```

#### 寄生式继承

在原型式继承基础上增强

```js
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

#### 寄生组合式继承

通过寄生式继承复用父类原型方法
通过组合继承复用父类属性

```js
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

## 类型体操

### Nginx

高性能 HTTP 和反向代理服务器

Nginx 以事件驱动的方式编写，所以有非常好的性能，同时也是一个非常高效的反向代理、负载平衡服务器

在性能上，Nginx 占用很少的系统资源，能支持更多的并发连接，达到更高的访问效率；在功能上，Nginx 是优秀的代理服务器和负载均衡服务器

在安装配置上，Nginx 安装简单、配置灵活。

Nginx 支持热部署，启动速度特别快，还可以在不间断服务的情况下对软件版本或配置进行升级，即使运行数月也无需重新启动。

## 其他

1. 首屏时间优化

   1. http 缓存
   2. cdn
   3. 按需加载
   4. 资源压缩
   5. http 2.0

## JSBridge

原生与 Webview 通信的桥梁, 让原生可以调用 JS, JS 可以调用原生

### JS 调用 Native

1. 拦截 URL Scheme

URL Scheme 是一种类似 url 的链接,是为了方便 App 互相调用而设计的

2. Native 重写原生 JS 方法

3. 注入 API

通过 Webview 提供的接口, 像 Window 注入对象或方法

## Native 调用 JS

执行 拼接好的 JS 代码

## 虚拟长列表

## Webpack
