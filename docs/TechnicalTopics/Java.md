[[toc]]

## 基础数据类型

### 整数类型

- byte

1 byte： -128~127

- short

2 byte： -32768~32767

- int
  4 byte： -2147483648~2147483647

- long
  8 byte： -9223372036854774808~9223372036854774807

### 浮点数

- float

4 byte: -2^128 ~ +2^127

- double

8 byte: -2^1024 ~ +2^1024

### 符号位

### 布尔和字符

- boolean

1 byte: true 和 false

- char

2 byte： 所有字符

## 进制

### 八进制

0 开头的整数

011 = 9

### 十六进制

0x 开头的整数

0xf = 15
0x11 = 17

## 位移运算

符号位不动， 其余位右移，符号位后边补 0

```java
>>
```

无符号位右移： 符号位一起右移，左边补 0

```java
>>>
```

左移

```java
<<
```

## 类型转换

### 自动转换

低精度转高精度

char 可以转 int， 不可转 short

### 强制转换

精度可能出问题

## String

### 比较

- equals

- equalsIgnoreCase

- compareTo

### 查找

- indexOf

- lastlndexOf

- charAt

## StringBuffer

StringBuffer 是线程安全

StringBuilder 非线程安全, 不过性能略高

- append

添加字符

- setCharAt

设置指定索引的字符

- reverse

字符串反转

- deleteCharAt

移除指定索引的字符

- delete

移除一段字符

## 正则表达式

### example

```java
String s = "hello world~";
Pattern re = Pattern.compile(".+~");
Matcher m = re.matcher(s);
boolean f = m.matches();
System.out.println(f);
```

### pattern

Pattern 对象是正则表达式编译后在内存中的表示形式

### Matcher

- find()

返回目标字符串中是否包含与 Pattern 匹配的子串

- group()

返回上一次与 Pattern 匹配的子串

- matches()

反正整个字符串与 Pattern 是否完全匹配

- reset()

将现有的 Matcher 对象应用于一个新的字符序列
