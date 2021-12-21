---
title: es6模块化
---

## 模块化的必要性

- 解决命名冲突，防止全局变量的污染，全局作用域更加干净，而不是到处都有命名冲突之类的问题
- 我们希望一段代码拥有自己的作用域, 而且不要被其他代码所污染
- 我们的程序更加井然有序，易于代码的扩展和维护
- 管理文件依赖，避免引入时的层层依赖
- 保护私有属性

## package.json 包管理

- 利用 package.json 可以解决我们项目目录文件跨层级引用问题

<div style="text-align: center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/es6module/lavel.png"/>
</div>

- 当我们需要从当前文件跨越两个目录层级引用另一个文件方法、变量时，我们的目录层级会很长(当目录层级跨越更多时，可能经常弄错，导致不必要的引用错误)

```js
import { test2 } from '../../test-2/test-2-1/a'
export { test2 }
```

- 当我们在导出方法、变量的模块内引入 package.json 之后，在 test-2-1 目录下 init package.json(在目录下 npm init 可生成 package.json)

<div style="text-align: center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/es6module/package.png"/>
</div>

- 通过包导入的方式

```js
//  test/test-2/test-2-1/package.json
{
  "name": "test2",//包名
  "version": "1.0.0",
  "description": "",
  "main": "index.js"//入口文件,一般都是index.js，包导出的东西为index.js导出
}

//  test/test-1/test-1-1/a.js
import { test2,test1 } from 'test2';
export { test2,test1 };
```

## 命名导出

- es6 中 export 和 import 一般用法有两种:1.命名导出 2.默认导出

```js
//导出变量
const str = '导出我'
const num = 2
//导出函数
function multiply(x) {
  return x * num
}
export { str, num, multiply }

//引入
import { str, num, multiply } from 'test2'
console.log(str) //'导出我'
console.log(num) //2
console.log(multiply(3)) //6
```

## 别名引入、空间命名引入

- 现在我们有个问题，当我们引入两个文件中出现了相同命名的变量怎么办？

```js
import { str } from 'test2'
import { str } from 'test1'
```

- 这时我们可以通过重命名的方式解决

```js
import { str as str1 } from 'test2'
import { str as str2 } from 'test1'
```

- 空间命名引入:当从每个模块需要引入的方法很多的时候，别名引入的写法就显得十分的繁琐、冗长

```js
//反例
import { str as str1, num as num1, fun as fun1 } from 'test2'
//正解
import * as test from 'test2'
test.str
test.num
test.fun()
```

## 默认导出

- 默认导出每个文件只能有一个，引入时需要自命名(随便你命名什么，瞎几把命名会挨砍而已)

```js
//导出
export default function(){ ... }
//引入
import fun from 'test'
fun()
```

- 一个默认导出，可以导出多个方法

```js
//导出
export default {
    fun1(){},
    fun2(){},
    fun3(){}
}
//引入
import fun from 'test'
fun.fun1()
...
```

## 实战

- 导出 test 包

```js
// test包index.js
const str = '导出我'
export { str }
export const num = 2
export function fun1(){
    return 'fun1'
}
export default fun2(){
    return 'fun2'
}
```

- 导入

```js
import * as variable from 'test'
import fun from 'test'
variable.str //'导出我'
variable.num //2
variable.fun1() //'fun1'
fun() //'fun2'
```
