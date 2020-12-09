---
title: 迭代
---

## 参考

[Array 所有方法详解](http://30ke.cn/doc/js-array-method)

[原帖链接](https://segmentfault.com/a/1190000015333058)

## 1.forEach

```js
let arr = [1, 2, 3, 4, 5]
arr.forEach((i) => {
  console.log(i) //1 2 3 4 5
})
```

这种循环的问题在于无法中途跳出循环，break 和 return 命令不能奏效.
map 和 filter 都返回数组，map 返回的与原数组长度相同

---

## 2.map

```js
let arr = ['a', 'b', 'c', 'd']
let newArr = arr.map((val, key) => {
  if (val == 'c') {
    return val
  }
})
console.log(newArr) //[undefined,undefined,'c',undefined];
```

---

## 3.filter

```js
let arr = ['a', 'b', 'c', 'd']
let newArr = arr.filter((val, key) => {
  if (val == 'c') {
    return val
  }
})
console.log(newArr) //['c']
```

只返回符合条件的结果一个值
every 和 some 返回布尔值

---

## 4.for-in

遍历对象所有的可枚举属性（主要是为了遍历对象而设计的，不适用于遍历数组）功能类似于 Object.keys().

```js
let obj = {
  name: 'xiaoming',
  age: 15,
}
for (let item in obj) {
  console.log(item) //name age
}
```

不可枚举的对象：如 constructor,数组的 length

```js
let arr = [10, 20, 30, 40, 50]

for (let item in arr) {
  console.log(item) // '0' '1' '2' '3' '4'
}
```

数组的键名是数字，但是 for-in 循环是以字符串作为键名‘0’、‘1’、‘2’等.

## 5.for-of

所有实现了[Symbol.iterator]接口的对象都可以被遍历。可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如 arguments 对象、DOM NodeList 对象）、Generator 对象，以及字符串
for..of 获取索引
.entries()返回键值对
.keys()返回键名
.values()返回键值
类似数组的对象：如字符串 DOM NodeList 对象、arguments 对象等

```js
let str = 'hi'
for (let i of str) {
  console.log(s)
} //h i

let item = document.querySelectorAll('p')
for (let a of item) {
  a.classList.add('test')
}

;(function () {
  for (let x of arguments) {
    console.log(x)
  }
})('a', 'b')
//'a'
//'b'
```

并非所有类似数组的对象都有 iterator 接口，使用 Array.from()将其转化为数组

```js
let ar = { length: 2, 0: 'a', 1: 'b' }
for (let i of ar) {
  console.log(i) //报错
}
for (let i of Array.from(ar)) {
  consle.log(i) //'a' 'b'
}
```

普通对象不能直接使用 for-of 会报错，因为没有 iterator 接口,for-in 可以直接使用，若非要使用 for-of 需要使用 Object.keys 方法将键名生成一个数组，然后遍历这个数组。

```js
for (let key of Object.keys(obj)) {
  console.log(key + ' ' + obj[key])
}
```

## 6.Object.keys(),Object.values(),Object.entries()

- Object.keys(),ES5 引入了 Object.keys 方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名
- Object.values(),返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
- Object.entries(),返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

```js
var obj = {
  name: 'dd',
  age: 2,
}
Object.keys(obj) //["name","age"]
Object.values(obj) //["dd",2]
Object.entries(obj) //[["name","dd"],["age",2]]
```
