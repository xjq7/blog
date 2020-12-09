---
title: 字符串方法
---

[原帖](https://www.cnblogs.com/l1pe1/p/6197371.html)

## 拼接-concat

-  **拼接字符串**

```js
var str = 'hello';
var str2 = ',world';
str.concat(str2); //'hello,world'
```

---

## 查找-indexOf,search,lastIndexOf

-   indexOf,返回字符串中一个子串第一处出现的索引（从左到右搜索）。如果没有匹配项，返回 -1
-   search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。如果没有找到任何匹配的子串，则返回 -1
-   lastIndexOf,返回字符串中一个子串最后一处出现的索引（从右到左搜索），如果没有匹配项，返回 -1

```js
str.indexOf('l'); // 2
str.indexOf('a'); //-1
str.search('e'); //1
str.lastIndexOf('l'); //3
```

## charAt

- **返回指定位置的字符**

```js
str.charAt(0); //'h'
```

## match

- **检查一个字符串匹配一个正则表达式内容，如果没有匹配返回 null。**

```js
var re = new RegExp(/^\w+$/); //匹配字母数字下划线开头的字符串
var is_alpha1 = str.match(re); //打印出来是个数组，["hello", index: 0, input: "hello", groups: undefined]
var is_alpha2 = str2.match(re); //null
```

## 截取字符串-substring,substr,slice

- **substring,返回字符串的一个子串，传入参数是起始位置和结束位置,取前不取后**
- **substr,返回字符串的一个子串，传入参数是起始位置和长度**
- **slice,提取字符串的一部分，并返回一个新字符串（与 substring 相同）**

```js
str.substring(1, 3); //'el'
str.substr(1, 3); //ell
str.slice(1); //'ello'
```

## 替换-replace

**replace,用来查找匹配一个正则表达式的字符串，然后使用新字符串代替匹配的字符串。**

```js
str.replace(re, 'Hello'); //'Hello'
str2.replace(re, 'Hello'); //',world',没匹配到，不替换
```

## split

**通过将字符串划分成子串，将一个字符串做成一个字符串数组。**

```js
str.split(''); //[h,e,l,l,o]
```

## length

**返回字符串的长度，所谓字符串的长度是指其包含的字符的个数。**

```js
str.length(); //5
```

## 大小写转换

- **toLowerCase,将整个字符串转成小写字母**
- **toUpperCase,将整个字符串转成大写字母**

```js
str.toLowerCase(); //'hello'
str.toUpperCase(); //'HELLO'
```

## 扩充

- **lTrim,去左空格**
- **rTrim,去右空格**
- **trim,去空格**

```js
String.prototype.lTrim = function(){
    return this.replace(/(^\s*)/)/g,"");
}
String.prototype.rTrim = function(){
    return this.replace(/(\s*$)/)/g,"");
}
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g,"");
}
```
