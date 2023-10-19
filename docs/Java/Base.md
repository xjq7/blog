[[toc]]

## 基础数据类型

| 类型    | 解释                   | 范围           |
| :------ | ---------------------- | -------------- |
| byte    | 1 字节                 | -128 ~ 127     |
| char    | 2 字节                 |                |
| boolean | 1 字节                 | true 和 false  |
| short   | 2 字节短整数           | -32768 ~ 32767 |
| int     | 4 字节整数             | -2^32 ~ 2^32   |
| long    | 8 字节长整数, 后缀l或L | -2^64 ~ 2^64   |
| float   | 4 字节浮点数, 后缀f或F | -2^128 ~ 2^127 |
| double  | 8 字节浮点数, 后缀d或D |                |

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

### 不可变的优势

#### 缓存 hash 值

只需计算一次

#### String Pool

如果 String 对象已经创建过, 就可以直接从 String Pool 取得引用

#### 安全性

String 不可变性保证参数不可变

#### 线程安全

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

## 时间处理

### 时间点获取

```java
// 当前时间
String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

// 当天 0 点
LocalDate.now().atStartOfDay().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

// 当天 23:59:59
LocalDateTime.of(LocalDate.now(), LocalTime.MAX).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
```
