function r(code, list) {
  let arr = [...list]
  while (arr.length) {
    const cur = arr.shift()
    if (cur.code === code) {
      return cur
    }
    if (cur.children && cur.children.length) {
      arr = arr.concat(cur.children)
    }
  }
  return false
}

const list = [
  {
    code: '444',
    children: [{ code: '222' }],
  },
  {
    code: '222',
    children: [{ code: '333', children: [{ code: '444' }] }],
  },
  { code: '777' },
]
const ret = r('444', list)
console.log(ret)
