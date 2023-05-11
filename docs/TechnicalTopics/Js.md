[[toc]]

## 拷贝

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

## 继承

### 原型链继承

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

### 构造函数继承

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

### 组合继承

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

### 原型式继承

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

### 寄生式继承

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

### 寄生组合式继承

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

## CommonJS

## djb2 算法

djb2 是一个产生随机分布的的哈希函数

### 参数 33 的选择

在 DJB2 哈希算法中，使用乘数 33 作为哈希算法的参数，是为了利用位运算的性质，避免乘法运算，从而提高计算速度和效率

使用乘数 33 的主要原理是：将一个数左移一位，相当于将这个数乘以 2，左移 n 位相当于将这个数乘以 2 的 n 次方。而使用位运算的速度远远快于乘法运算，因此在哈希算法中使用位运算可以显著提高计算速度和效率

同时，33 作为乘数的选择也是有一定道理的。首先，33 是一个奇数，这可以确保在哈希过程中使用的乘数不会与偶数相关的信息发生冲突。其次，33 可以写成 2 的五次方再加上 1，即 33=2^5+1。这意味着在哈希过程中，可以将原始哈希值左移 5 位，再加上原始哈希值，相当于将原始哈希值乘以 33，从而得到更好的哈希值
