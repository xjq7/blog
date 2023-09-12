[[toc]]

## example

```java
String s = "hello world~";
Pattern re = Pattern.compile(".+~");
Matcher m = re.matcher(s);
boolean f = m.matches();
System.out.println(f);
```

## pattern

Pattern 对象是正则表达式编译后在内存中的表示形式

## Matcher

- find()

返回目标字符串中是否包含与 Pattern 匹配的子串

- group()

返回上一次与 Pattern 匹配的子串

- matches()

反正整个字符串与 Pattern 是否完全匹配

- reset()

将现有的 Matcher 对象应用于一个新的字符序列
