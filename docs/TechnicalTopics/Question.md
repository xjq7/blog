---
title: question
---

## 数据转换

1.

```js
// 问题
var arr1 = [
  {
    code: '1',
    children: [
      {
        code: '11',
        children: [
          {
            code: '111',
            children: [],
          },
          {
            code: '112',
            children: [],
          },
        ],
      },
    ],
  },
  {
    code: '2',
    children: [
      {
        code: '22',
        children: [
          {
            code: '221',
            children: [],
          },
          {
            code: '222',
            children: [],
          },
          {
            code: '223',
            children: [],
          },
        ],
      },
    ],
  },
  {
    code: '3',
    children: [
      {
        code: '33',
        children: [
          {
            code: '333',
            children: [],
          },
        ],
      },
    ],
  },
]
// arr1里面每一项下的层级都一样，如示例都是三级
// 转换后期望输出arr2：

var aar2 = [
  { code1: '1', code2: '11', code3: '111' },
  { code1: '1', code2: '11', code3: '112' },
  { code1: '2', code2: '22', code3: '221' },
  { code1: '2', code2: '22', code3: '222' },
  { code1: '2', code2: '22', code3: '223' },
  { code1: '3', code2: '33', code3: '333' },
]

// 解
function r(arr) {
  let stack = arr.map((o) => ({ ...o, index: 1 }))
  const ret = []
  let obj = {}
  let depth = 1
  while (stack.length) {
    const top = stack.pop()
    if (top.index === 1) {
      obj = {}
      depth = 1
    }
    obj[`code${depth}`] = top.code
    if (top.children.length) {
      stack = stack.concat(top.children)
      depth++
    } else {
      ret.push({ ...obj })
    }
  }
  return ret
}
```
