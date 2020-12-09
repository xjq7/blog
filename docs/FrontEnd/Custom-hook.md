---
title: 自定义hook
---

> [react-use 库](https://github.com/streamich/react-use/)

> [react-use 库文档(很好的文档)](https://streamich.github.io/react-use/?path=/story/ui-usecss--docs)

## 定时器

- #### 封装

```js
//useInterval.js
import { useEffect, useRef } from 'react'

const useInterval = (callback, delay) => {
  const savedCallback = useRef(() => {})

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0)
      return () => clearInterval(interval)
    }
    return undefined
  }, [delay])
}

export default useInterval
```

- #### 使用

```js
import useInterval from './useInterval'

...
useInterval(()=>{
  ...
},1000)
...
```

## 布尔值

```js
import { useCallback, useState } from 'react'

const useToggle = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(
    (nextValue) => {
      if (typeof nextValue === 'boolean') {
        setValue(nextValue)
      } else {
        setValue((currentValue) => !currentValue)
      }
    },
    [setValue]
  )

  return [value, toggle]
}

export default useToggle
```

- #### 使用

```js
...
const [flag,toggle] =useToggle(false)
...
flag // false
toggle(false) //传参指定boolean值
toggle() //不传参取反
```

## 获取 state 改变前的值

```js
import { useEffect, useRef } from 'react'

const usePrevious = (state) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = state
  })

  return ref.current
}

export default usePrevious
```

<!-- const useForceUpdate = () => {
  const [, dispatch] = useState(Object.create(null));

  const memoizedDispatch = useCallback(() => {
    dispatch(Object.create(null));
  }, [dispatch]);
  return memoizedDispatch;
}; -->
