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

### 数据类型区别

- **值类型**

  占用空间固定，保存在栈中（当一个方法执行时，每个方法都会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。因此，所有在方法中定义的变量都是放在栈内存中的；栈中存储的是基础变量以及一些对象的引用变量，基础变量的值是存储在栈中，而引用变量存储在栈中的是指向堆中的数组或者对象的地址，这就是为何修改引用类型总会影响到其他指向这个地址的引用变量。）

- **引用类型**

  占用空间不固定，保存在堆中（当我们在程序中创建一个对象时，这个对象将被保存到运行时数据区中，以便反复利用（因为对象的创建成本通常较大），这个运行时数据区就是堆内存。堆内存中的对象不会随方法的结束而销毁，即使方法结束后，这个对象还可能被另一个引用变量所引用（方法的参数传递时很常见），则这个对象依然不会被销毁，只有当一个对象没有任何引用变量引用它时，系统的垃圾回收机制才会在核实的时候回收它。）

  <div style="text-align: center;">
    <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/typeOfData/reference-type.png"/>
  </div>

## 浏览器

## http 协议

##
