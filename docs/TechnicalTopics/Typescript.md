[[toc]]

## 概念

TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程

### 优势

- 解决大型项目的稳定性, 可维护性

- 强类型, 支持静态和动态类型

- 编译期间发现错误

## 基础类型

- boolean

- number

- string

- undefined

- null

undefined 和 null 默认是所有类型的子类型

指定 strictNullChecks 之后, 只能只能赋值给自己和 void

- any

- unknown

安全类型, 类似 any, unknown 类型 无法赋值给其他类型变量

- void

- never

永远不存在的类型

程序无法运行到(异常)

- symbol

- 数组类型

- 元组类型

## 函数类型

## interface

interface 是 TS 设计出来用于定义对象类型的，可以对对象的形状进行描述

### 可选属性

### readonly 只读属性

### 自定义属性(可索引的类型)

## 类

## 枚举

## 高级类型

### 联合类型

### 交叉类型

### 类型别名

#### 与 interface 对比

- 相同点

都可以定义一个对象或函数

都允许继承, interface 使用 extends,type 使用交叉类型实现继承

- 区别

类型别名用于给各种类型定义别名, 更加简洁

type 可以声明基本类型, 联合类型, 交叉类型, 元组, interfa 不行

interface 可以合并重复声明

### 索引类型

keyof 取某个类型的键, 返回联合类型

### 泛型约束

extends, 约束泛型变量

### 映射类型

#### in

对联合类型遍历

####

## 泛型

软件工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能

## 体操

### Await

```ts
type MyAwaited<T> = T extends Promise<infer K> ? (K extends Promise<unknown> ? MyAwaited<K> : K) : T
```

### Pick

```ts
type MyPick<T, K extends keyof T> = { [P in K]: T[P] }
```

### Exclude

```ts
type MyExclude<T, K extends T> = T extends K ? never : T
```

### First

```ts
type First<T extends unknown[]> = T extends [infer P, ...unknown[]] ? P : never
```

### Readonly

```ts
type MyReadonly<T> = { readonly [K in keyof T]: T[K] }
```

### IF

```ts
type If<C extends boolean, T, F> = C extends true ? T : F
```

### Concat

```ts
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U]
```

### Push

```ts
type Push<T extends unknown[], U> = [...T, U]
```

### Includes

```ts
type Includes<T extends unknown[], U> = T extends [infer P, ...infer K]
  ? Equal<P, U> extends true
    ? true
    : Includes<K, U>
  : false
```

### Equal

```ts
type Equal<P, U> = (<T>() => T extends P ? 1 : 2) extends <T>() => T extends U ? 1 : 2 ? true : false
```

### Unshift

```ts
type Unshift<T extends unknown[], U> = [U, ...T]
```

### Parameters

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer K) => any ? K : never
```

### Readonly2

```ts
type MyReadonly2<T, K extends keyof T = keyof T> = { readonly [R in keyof T]: T[R] } & {
  [R in Exclude<keyof T, K>]: T[R]
}
```

### Chainable

```ts
type Chainable<T = {}> = {
  option: <K extends string, V>(
    key: K extends keyof T ? (V extends T[K] ? never : K) : K,
    value: V
  ) => Chainable<Omit<T, K> & { [P in K]: V }>
  get: () => T
}
```

### DeepReadonly

```ts
type DeepReadonly<T> = T extends Object
  ? {
      readonly [R in keyof T]: T[R] extends Object
        ? T[R] extends Function
          ? T[R]
          : DeepReadonly<T[R]>
        : Readonly<T[R]>
    }
  : never
```

### TupleToUnion

```ts
type TupleToUnion<T extends unknown[]> = T[number]
```

### Last

```ts
type Last<T extends unknown[]> = T extends [...unknown[], infer R] ? R : T[0]
```

### PromiseAll

```ts
declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<{ [R in keyof T]: T[R] extends Promise<infer P> ? Awaited<P> : T[R] }>
```

### Lookup

```ts
type Lookup<U, T extends string> = U extends { type: T } ? U : never
```

### Capitalize

```ts
type MyCapitalize<S extends string> = S extends `${infer P}${infer R}` ? `${Uppercase<P>}${R}` : S
```

###

```ts
// 1 ways
type UpperLetter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'

type KebabCase<S extends string, U = S> = S extends `${infer R}${infer P}`
  ? R extends UpperLetter
    ? U extends `${infer _}${infer US}`
      ? P extends US
        ? `${Lowercase<R>}${KebabCase<P, S>}`
        : `-${Lowercase<R>}${KebabCase<P, S>}`
      : S
    : `${R}${KebabCase<P, S>}`
  : S

// 2 ways
type KebabCase<S extends string> = S extends `${infer R}${infer P}`
  ? P extends Uncapitalize<P>
    ? `${Lowercase<R>}${KebabCase<P>}`
    : `${Lowercase<R>}-${KebabCase<P>}`
  : S
```

### AnyOf

```ts
// 1 way
type AnyOf<T extends unknown[]> = T extends [infer R, ...infer P]
  ? R extends [] | '' | false | 0 | Record<string, never>
    ? AnyOf<P>
    : true
  : false

// 2 way
type AnyOf<T extends any[]> = T[number] extends 0 | '' | false | [] | { [key: string]: never } ? false : true
```

### IsNever

```ts
type IsNever<T> = [T] extends [never] ? true : false
```

### Replace

```ts
type Replace<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer R}${From}${infer P}`
  ? `${R}${To}${P}`
  : S
```

### ReplaceAll

```ts
type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer R}${From}${infer P}`
  ? `${ReplaceAll<R, From, To>}${To}${ReplaceAll<P, From, To>}`
  : S
```

### Parameters

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer R) => any ? R : never
```

### Flatten

```ts
type Flatten<T extends unknown[]> = T extends [infer R, ...infer P]
  ? R extends unknown[]
    ? [...Flatten<R>, ...Flatten<P>]
    : [R, ...Flatten<P>]
  : []
```

### Absolute

```ts
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}` ? R : `${T}`
```

### IsUnion

```ts
type IsUnion<T, P = T> = [T] extends [never] ? false : T extends P ? ([P] extends [T] ? false : true) : false
```

### ReplaceKeys

```ts
type ReplaceKeys<U, T, Y> = U extends U
  ? { [R in keyof U]: R extends T ? (R extends keyof Y ? Y[R] : never) : U[R] }
  : never
```

### PickByType

```ts
type PickByType<T, U> = { [R in keyof T as T[R] extends U ? R : never]: T[R] }
```

### OmitByType

```ts
type OmitByType<T, U> = { [R in keyof T as T[R] extends U ? never : R]: T[R] }
```

### StartsWith

```ts
type StartsWith<T extends string, U extends string> = T extends `${U}${infer _}` ? true : false
```

### EndsWith

```ts
type EndsWith<T extends string, U extends string> = T extends `${infer _}${U}` ? true : false
```

### PartialByKeys

```ts
type Merge<T> = {
  [Key in keyof T]: T[Key]
}
type PartialByKeys<T, K = keyof T> = Merge<
  { [R in keyof T as R extends K ? never : R]: T[R] } & { [R in keyof T as R extends K ? R : never]?: T[R] }
>
```

### RequiredByKeys

```ts
type Merge<T> = { [R in keyof T]: T[R] }
type RequiredByKeys<T, K = keyof T> = Merge<
  { [R in keyof T as R extends K ? never : R]: T[R] } & { [R in keyof T as R extends K ? R : never]-?: T[R] }
>
```

### IndexOf

```ts
type IndexOf<T, U, Res extends unknown[] = []> = T extends [infer P, ...infer R]
  ? Equal<U, P> extends true
    ? Res['length']
    : IndexOf<R, U, [...Res, P]>
  : -1
```

### LastIndexOf

```ts
type LastIndexOf<T extends unknown[], U> = T extends [...infer R, infer P]
  ? Equal<P, U> extends true
    ? R['length']
    : LastIndexOf<R, U>
  : -1
```

### Unique

```ts
type IndexOf<T, U, Res extends unknown[] = []> = T extends [infer P, ...infer R]
  ? Equal<U, P> extends true
    ? Res['length']
    : IndexOf<R, U, [...Res, P]>
  : -1

type Unique<T, Res extends unknown[] = []> = T extends [infer P, ...infer R]
  ? IndexOf<Res, P> extends -1
    ? Unique<R, [...Res, P]>
    : Unique<R, Res>
  : Res
```

### MapTypes

```ts
type Include<T, U> = T extends { mapFrom: any; mapTo: any }
  ? Equal<T['mapFrom'], U> extends true
    ? T['mapTo']
    : never
  : never

type MapTypes<T, R extends { mapFrom: any; mapTo: any } | { mapFrom: any; mapTo: any }> = {
  [P in keyof T]: Include<R, T[P]> extends never ? T[P] : Include<R, T[P]>

```

### Shift

```ts
type Shift<T> = T extends [infer _, ...infer R] ? R : never
```

### Reverse

```ts
type Reverse<T> = T extends [...infer R, infer K] ? [K, ...Reverse<R>] : []
```

### TupleToNestedObject

```ts
type TupleToNestedObject<T, U> = T extends [infer R, ...infer Rest]
  ? R extends string
    ? { [K in R]: TupleToNestedObject<Rest, U> }
    : U
  : U
```

### FlipArguments

```ts
type Reverse<T> = T extends [...infer R, infer K] ? [K, ...Reverse<R>] : []
type FlipArguments<T extends (...args: any) => any> = T extends (...args: infer R) => infer P
  ? (...args: Reverse<R>) => P
  : never
```

### Flip

```ts
type Flip<T extends Record<string | number | symbol, any>> = {
  [R in keyof T as T[R] extends boolean ? `${T[R]}` : R extends string | number | symbol ? T[R] : never]: R
}
```

### Subsequence

```ts
type Subsequence<T extends any[]> = T extends [infer P, ...infer R] ? [...Subsequence<R>] | [P, ...Subsequence<R>] : []
```

### Without

```ts
// 1 way
type TupleToUnion<T> = T extends unknown[] ? T[number] : T
type Without<T, U, K = TupleToUnion<U>> = T extends [infer P, ...infer R]
  ? P extends K
    ? Without<R, U>
    : [P, ...Without<R, U>]
  : []

// 2 way
type IndexOf<T, U, Res extends unknown[] = []> = T extends [infer P, ...infer R]
  ? Equal<U, P> extends true
    ? Res['length']
    : IndexOf<R, U, [...Res, P]>
  : -1
type Exist<T, U> = T extends unknown[] ? (IndexOf<T, U> extends -1 ? false : true) : Equal<T, U>
type Without<T, U> = T extends [infer P, ...infer R]
  ? Exist<U, P> extends false
    ? [P, ...Without<R, U>]
    : Without<R, U>
  : []
```

### Zip

```ts
type Zip<T, U> = T extends [infer P, ...infer R]
  ? U extends [infer K, ...infer KR]
    ? [[P, K], ...Zip<R, KR>]
    : []
  : []
```

### Fibonacci

```ts
type Fibonacci<
  T extends number,
  U extends unknown[] = [0],
  U1 extends unknown[] = [0],
  U2 extends unknown[] = [0]
> = U['length'] extends T ? U1['length'] : Fibonacci<T, [...U, 0], U2, [...U1, ...U2]>
```

### Chunk

```ts
type Chunk<T, U, K extends unknown[] = []> = K['length'] extends U
  ? [K, ...Chunk<T, U, []>]
  : T extends [infer P, ...infer R]
  ? Chunk<R, U, [...K, P]>
  : K['length'] extends 0
  ? []
  : [K]
```

### Split

```ts
type Split<S extends string, SEP extends string, Res extends string[] = []> = Equal<string, S> extends true
  ? string[]
  : S extends `${infer P}${SEP}${infer R}`
  ? Split<R, SEP, [...Res, P]>
  : SEP extends ''
  ? [...Res]
  : [...Res, S]
```

### LengthOfString

```ts
type LengthOfString<S extends string, U extends string[] = []> = S extends `${infer P}${infer R}`
  ? LengthOfString<R, [...U, P]>
  : U['length']
```

### RequiredKeys

```ts
type RequiredKeys<T> = keyof { [R in keyof T as T[R] extends Required<T>[R] ? R : never]: never }
```

### Assign

```ts
type Assign<T extends Record<string, unknown>, U extends unknown[]> = U extends [infer P, ...infer R]
  ? Assign<Merge<T, P>, R>
  : T
```

### TypedGet

```ts
type GetKey<T extends unknown[] | Record<string, any>, K extends string> = T extends unknown[]
  ? T[0] extends Record<string, unknown>
    ? T[0][K]
    : never
  : T extends Record<string, any>
  ? T[K]
  : never

type Get<O extends Record<string, any>, T extends string> = unknown extends O[T]
  ? T extends `${infer K}.${infer R}`
    ? R extends string
      ? O[R] extends unknown
        ? Get<GetKey<O, K>, R>
        : O[R]
      : GetKey<O, K>
    : T extends string
    ? GetKey<O, T>
    : never
  : O[T]
```
