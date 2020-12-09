---
title: C语言常用内置函数
sidebarDepth: 2
---

## ctype.h

```cpp
//判断字母
isalpha('a')

//是否是数字、字母
isalnum('a')

//判断大写字母
isupper('a')
//转换
toupper('a')

//判断小写字母
islower('a')
//转换
tolower('A')

//判断数字
isdigit('7')

//空格
isspace(' ')
```

## math.h

```cpp
//double
//向上取整(进一)
ceil(double)

//向下取整(舍去)
floor(double)

//平方根
sqrt(double)

//n次方
double pow(double,double)

//绝对值
int abs(int)

//e的x次方
exp(x)

//
log(x)
log10(x)
```

## 随机数

```cpp
//设置随机数种子
srand(1);
//生成随机数
printf("%d",rand());
//随机数种子相同,生成相同随机数
srand(1);
printf("%d",rand());
```

## 字符串处理

### strcpy:将一个字符串内容复制到一个字符串数组中

```cpp
//会覆盖掉c1的内容
char c1[20] = "11";
char c2[3] = "122222";

stpcpy(c1, c2);
printf("%s",c1);//122222
```

### strlen:获取字符数组中字符串长度

```cpp
char c1[20] = "1234";
strlen(c1);//4
```

### strcat:合并两个字符数组

```cpp
char c1[20] = "1234    null";
char c2[10] = "222";
strcat(c1, c2);
printf("%s",c1);//1234    null222
```

### atio:字符串转整形

```cpp
int atio(const char* char);
```

### strcmp:字符串比较

```cpp
int strcmp (const char* str1,const char* str2)
```
