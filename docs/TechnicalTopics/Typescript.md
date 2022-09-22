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
