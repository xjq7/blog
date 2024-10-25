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
