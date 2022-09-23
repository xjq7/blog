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
