[[toc]]

## 资源

[regex101](https://regex101.com/)

[regexper 可视化正则](https://regexper.com/)

[regex-vis 可视化正则](https://regex-vis.com/)

[正则表达式手册](https://tool.oschina.net/uploads/apidocs/jquery/regexp.html)

[（速查手册）常用正则表达式最强整理](https://www.rongcloud.cn/blog/?p=5818)

[正则大全](https://any-rule.vercel.app/)

[regexone](https://regexone.com/)

## 前言

正则表达式是 描述字符串匹配的模式(模式在这里可以理解为序列或者特征)

描述一组序列特征

- 序列包含了哪些字符,以及他们的顺序, 比如说: abc, cba
- 序列左右边界, a 开头 d 结尾, 可以匹配 acccd a111d

偏实战

可以在IDE中使用正则表达式查找和替换

开发中可以使用正则表达式解决字符串校验与数据处理问题

## 使用场景

正则表达式 的用途

1. 对字符串进行子串校验
2. 对字符串做子串替换操作
3. 对字符串做子串提取

编辑器查找与替换

1. vscode

   type-challenges 中查找所有类型定义, 查找所有的 a 标签

2. vim

   批量替换, 替换 host ip,

   :%s/foo/bar/g

### 代码开发

- 开发参数校验

  手机号, 网址, ip地址, 金额, 身份证, 日期

- 开发数据处理

  解析 html 文件, 文件匹配, 子串提取, 子串替换

  提取 链接, 提取某个标签的内容, 内容查找

## 基础

包含普通字符, 元字符

元字符让正则表达式拥有了处理能力, 是专用字符, 可以使用简短的语法 表达复杂序列或者规则

元字符又可分为 字符集合, 量词, 转义字符, 位置匹配

### 普通字符

单个字符或者一组字符序列

```js
// 校验 google
'<a href="https://www.baidu.com"></a>'.test(/google/) // false

// 校验 百度
'<a href="https://www.baidu.com"></a>'.test(/baidu/) // true
```

### 字符集合

表达一组字符的匹配, 某个字符位置上存在匹配多种字符, 也可以称为纵向匹配

```js
// 字符集合
'bat nat cat'
/[bcn]at/

// 字符范围
'Today is Thursday,v me $50'
/[0-9]/
/[a-d]/

// 匹配英文字符
/[a-zA-Z]/

// 匹配数字
/[0-9]/

// 取非
'crazy thursday, v me $50.0'
/[^a-z .]/
```

字符集合里面都是普通字符

### 特殊字符

与正则表达式引擎的约定

.：匹配除了换行符之外的任何单个字符

```js
'<a href="https://www.baidu.com"></a>
<a href="http://www.baidu.com"></a>'
/./
```

\: 转义字符: 将下一个字符标记为特殊字符或原义字符

```js
'3.14 3214'
/3\.14/

'/** regex **/ const a = 1'
/\/\*\*.+\*\*\//

'21f;';[]22_aa'
/\w+/ -> [A-Za-z0-9_]
/\W+/
/\d+/ -> [0-9]
/\n/
/\s/ -> 空格
```

|: 逻辑或运算符

```js
// example
'this is https://baidu.com.'
'this is ftp://127.0.0.1'

// 正则
/(https|ftp):\/\//
```

### 量词

横向匹配

{}: 括号量词匹配

```js
// example
'15115438096'
// 固定数量
/\d{11}/

// example
'2574073960'
'973017473'
'100000'
'1000'
'32131231232312323'
// 固定左右边界
/\d{6,12}/

// 固定左边界
/\d{6,}/
```

+: 匹配前面一个表达式一次或者多次 (贪婪匹配)

```js
// example
'qq: 2574073960'
'973017473'
'100000'
'1000'
'32131231232312323'
// 正则
/qq: \d+/
```

\*: 匹配前面一个表达式 0 次或者多次

```js
// example
'<a href="https://www.baidu.com"></a>'
'<a href="https://www.baidu.com"></a>'
'<a href="https://"></a>'
// 正则
/https:\/\/.*/
```

?: 匹配前面字符 0 次或者 1次, 如果是接在量词后面, 表示非贪婪模式, 尽可能少匹配字符

```js
// 匹配链接
'<a href="https://www.baidu.com"></a>'
'<a href="http://www.baidu.com"></a>'
'<a href="https://"></a>'
'https://'
// 正则
/https?:\/\/[^"]+/

// 非贪婪模式匹配所有链接
/href=".*?"/
```

### 位置匹配

位置: 字符间的空档即为位置, 正则要么匹配字符, 要么匹配位置

1.单词边界

```js
// example
'Regular expressions are extremely useful in extracting information from text such as code, log files, spreadsheets, or even documents.'

// 正则
/\b/
/\B/
```

2.开头结尾

```js
// example
'1511543809612'
'151154380962'
'15115438096'
// 正则
/^\d{11}$/

// example
'https://example.com'
'https://juejin.im'
'tthttps://juejin.im'
// 正则
/^https:\/\/.+/
```

## 进阶

### 断言(前后查找)

对当前匹配序列做进一步条件判断

1.向前肯定断言, (?=)

以什么结尾的条件

```js
// example
'README.md'
'README.zh-CN.md'
'README.ko.md'
'a.txt'
// 正则
/.+(?=\.md)/
```

2.向前否定断言

不以什么结尾的条件

```js
// example
'windows 2000'
'windows xp'
'windows 11'
'windows 10'
// 正则
/windows\s(?!11|10)/
```

3.向后肯定断言

以什么开头的条件

```js
// example
'<a href="https://www.baidu.com"></a>'
'https://www.baidu.com'
'<img src="https://www.baidu.com/a.png"/>'

// 正则
/(?<=href=")https:\/\/[^"]+/
```

4.向后否定断言

不以什么开头的条件

```js
const regex = /(?<!href=")https:\/\/.+(?=")/
```

### 回溯

```js
/".*"/

/"[^"]*"/
```

![](https://image.xjq.icu/2024/5/7/1715070846587_%E5%9B%9E%E6%BA%AF.png)

反向引用

捕获: 记录子表达式

```js
// example
'<a href="https://www.baidu.com">nihao</a>'
// 正则
/(https:\/\/)([^"]+)/
```

不捕获

```js
// example
'this is https://baidu.com'
'this is ftp://127.0.0.1'
// 正则
/(?:https|ftp):\/\/.+/
```

引用: 反向引用捕获的子表达式

```js
// example
'<h1>nihao</h1>'
'<h2>wo</h2>'
'<h1>ta</h2>'
// 正则
/(?<=<(h[1-6])>).+?(?=<\/\1>)/
```

## 原理剖析

可以参照[编译原理分享-词法分析篇](https://xjq.icu/TechnicalTopics/CompilationPrinciple.html#%E8%AF%8D%E6%B3%95%E5%88%86%E6%9E%90%E5%99%A8)

正则表达式引擎

DFA: 确定型有穷自动机
NFA: 非确定型有穷自动机

## 考试

### 1. ip 地址

匹配合法 ip 地址

[在线练习地址](https://regex101.com/r/WMgsEN/1)

```js
// 只匹配下面这类合法 ip 地址
'192.168.0.1'
'127.0.0.1'
'23.54.23.167'

// test case
'1000.1.1.1'
'192..168.0.1'
'192.168.0.1000'
'192.168.1.a'
'256.22.23.4'

/^((2([0-4]\d|5[0-5])|1?\d{1,2})\.){3}(2([0-4]\d|5[0-5])|1?\d{1,2})$/ // 参考答案
```

### 2. 金额

匹配金额数字

[在线练习地址](https://regex101.com/r/fNzPi1/1)

```js

// 提取金额 匹配示例
'v me $50'     -> '50'
'v me $1.5'    -> '1.5'
'v me $-50'    -> '-50'

// test case
'v me $1.'
'v me $.5'
'v me $.22'
'v me $22.'

/-?(\d+\.\d+|(?<!\D+\.|\.\d)\d+(?!\.\D+|\d+\.))/ // 参考答案
```

### 3. 日期

匹配合法日期

[在线练习地址](https://regex101.com/r/ppFtsH/3)

```js
// 匹配这类日期格式
'2023.3.30'
'2023/3/30'
'2023-3-30'

// test case
'2023.3/30'
'2023-3/30'
'2023/13/30'
'2023/12/32'
'2023/1/'
```

### 4. 提取注释内容

匹配注释内容

[在线练习地址](https://regex101.com/r/yIztds/1)

```js
// 提取示例
'/** TODO:此处有bug1 **/' -> 'TODO:此处有bug1'
'// TODO:此处有bug4'     -> 'TODO:此处有bug4'

// test case
'/** TODO:此处有bug1 **/'
'// TODO:此处有bug4'
```

### 5. 千分位金额格式化

位置匹配应用, 将金额格式化为千分位表示

[在线练习地址](https://regex101.com/r/z94TK4/1)

```js
// 匹配示例
'12345'        -> '12,345'
'123456789'    -> '123,456,789'
'123456.1234'  -> '123,456.1234'

// test case
'12345'
'123456789'
'123456.1234'

/(?<!\.\d*)\B(?=(?:\d{3})+\b)/ // 参考答案
```

## 参考文献

[正则表达式知识体系](https://rualc.me/frontend/javascript-regular-expression/#zheng-ze-ji-ben-gai-nian)

[正则表达式完全指南](https://juejin.cn/post/7104152252180332581)

[正则表达式引擎执行原理——从未如此清晰！](https://segmentfault.com/a/1190000021787021)

[浅谈正则表达式原理](https://juejin.cn/post/6844903889687281677)
