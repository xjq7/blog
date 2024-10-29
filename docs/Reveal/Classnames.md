[[toc]]

# classnames

简单的 classNames 类名连接库

## 使用

```Js
classNames('foo', 'bar') // 'foo bar'
classNames('foo', { bar: true }) // 'foo bar'
classNames({ 'foo-bar': true }) // 'foo-bar'
classNames({ 'foo-bar': false }) // ''
classNames({ foo: true }, { bar: true }) // 'foo bar'
classNames(null, false, 'bar', undefined, 0, { baz: null }, '') // 'bar'

classNames('a', ['b', { c: true, d: false }]) // 'a b c'
```

## 分析

版本: 2.5.1

循环处理 函数参数 arguments

```Js
function classnames(){
  let classes = ''
  for(let i=0;i<argument.length;i++){
    if(arguments[i]){
      classes = appendClass(classed, parseValue(arg))
    }
  }
}

// 拼接处理好的 class
function appendClass(value, newClass){
  if(!newClass) return value
  return value ? ( value + ' ' + newClass ) : newClass
}
```

解析某个 class 参数

```Js
function parseValue(value){
  if(typeof value === 'string') return value

  // 非数组或对象直接返回
  if(typeof value !== 'object') return ''

  // 数组参数 递归调用 classnames
  if(Array.isArray(value)) return classnames.apply(null, value)

  // 有些参数可能自己实现了 toString 方法, 这里判断有无 toString, 以及是否是原生的 toString 方法
  if(value.toString !== Object.prototype.toString && !value.toString.toString().includes('[native code]')){
    return value.toString()
  }

  // 解析对象类型, hasOwnProperty 用于判断对象属性是否是自有属性而不是原型链上的
  let classes = ''
  for(const key of value){
    if({}.hasOwnProperty(value, key) && value[key]){
      classes = appendClass(classes, key)
    }
  }
  return classes
}
```
