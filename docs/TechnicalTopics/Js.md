- [拷贝](./Js.html#拷贝)
  - [浅拷贝](./Js.html#浅拷贝)
  - [深拷贝](./Js.html#深拷贝)
- [继承](./Js.html#继承)
  - [原型链继承](./Js.html#原型链继承)
  - [构造函数继承](./Js.html#构造函数继承)
  - [组合继承](./Js.html#组合继承)
  - [原型式继承](./Js.html#原型式继承)
  - [寄生式继承](./Js.html#寄生式继承)
  - [寄生组合式继承](./Js.html#寄生组合式继承)

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
