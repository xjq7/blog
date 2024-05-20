[[toc]]

## 常问

### type 与 interface 对比

- 相同点

都可以定义一个对象或函数

都允许继承, interface 使用 extends, type 使用交叉类型实现继承

- 区别

类型别名用于给各种类型定义别名, 更加简洁

type 可以声明基本类型, 联合类型, 交叉类型, 元组, interface 不行

interface 可以合并重复声明

## 原理篇

### 协变

子类型赋值给父类型, 类型仍然是安全的

### 逆变

函数参数具有逆变的性质

函数 XX 类型可以赋值给 YY 类型, 函数 YY 在调用时参数是按 Y 约束, 但是用到的是 函数 XX 中 X 的属性和方法

ts 检查类型是安全的, 这种特性叫做逆变

```Typescript
interface Y {
  a: string
  b: boolean
}

interface X {
  a: string
}

let XX: (y: Y) => void
let YY: (y: X) => void
YY = XX
```

### 双向协变

父类型可以赋值给子类型, 子类型可以赋值给父类型, 既逆变又协变, 叫做双向协变

ts strictFunctionTypes 设置为 true 时, 支持函数参数的逆变, 设置为 false 时支持双向协变

### 不变

非父子类型不会发生型变

## 类型收窄

类型收窄会触发类型保护

```Typescript
function padLeft(padding: number | string, input: string): string {
  return ' '.repeat(padding) + input
}
```

## 分布式条件类型

当类型参数为联合类型时, 且在条件类型左边直接引用该类型, TS 会展开每一个类型单独传入类型运算, 最后再合并成联合类型

简化了类型编程, 不需要递归提取每个类型做处理

```Typescript
type Union = 'a' | 'b' | 'c'

type UppercaseA<Item extends string> = Item extends 'a' ? Uppercase<Item> : Item

type result = UppercaseA<Union> // 'b' | 'c' | 'A'
```

## 模式匹配

## 类型构造

## 特殊类型

### any

any 类型与任何类型交叉都是 any

```Typescript
type isAny<T> = 'a' extends 'b' & T ? true : false

type Result = isAny<any> // true
```

### never

never 类型 extends 任何类型都返回 never

```Typescript
type IsNever<T> = [T] extends [never] ? true : false

type Result = IsNever<never> // true
```

## 内置类型

- Pick

分布式条件类型

```Ts
type Pick<T, K extends keyof U> = { K: T[K]  }
```

- Exclude

分布式条件类型

```Ts
type Exclude<T, U> = T extends U ? never : T
```

- Partial

```Ts
type Partial<T> = { [K in keyof T]?: T[K] }
```

- Required

-? 剔除可选

```Ts
type Required<T> = { [K in keyof T]-?: T[K] }
```

- Readonly

```Ts
type Required<T> = { readonly [K in keyof T]: T[K] }
```

- Record

```Ts
type Record<T extends string| number | symbol, U> = { [K in T]: U }
```
