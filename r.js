var arr1 = [
  {
    url: "1",
    children: [
      {
        url: "1-1",
        children: [
          {
            url: "1-1-1",
            children: [],
          },
          {
            url: "1-1-2",
            children: [],
          },
        ],
      },
    ],
  },
  {
    url: "2",
    children: [
      {
        url: "2-2",
        children: [
          {
            url: "2-2-1",
            children: [
              {
                url: "2-2-1-1",
                children: [],
              },
              {
                url: "2-2-1-2",
                children: [],
              },
              {
                url: "2-2-1-3",
                children: [],
              },
            ],
          },
          {
            url: "2-2-2",
            children: [
              {
                url: "2-2-2-1",
                children: [],
              },
              {
                url: "2-2-2-2",
                children: [],
              },
              {
                url: "2-2-2-3",
                children: [],
              },
            ],
          },
          {
            url: "2-2-3",
            children: [],
          },
        ],
      },
      {
        url: "2-1",
        children: [
          {
            url: "2-1-1",
            children: [],
          },
          {
            url: "2-1-2",
            children: [],
          },
          {
            url: "2-1-3",
            children: [],
          },
        ],
      },
    ],
  },
  {
    url: "3",
    children: [
      {
        url: "3-3",
        children: [
          {
            url: "3-3-3",
            children: [],
          },
        ],
      },
    ],
  },
]
function getSelectKeys(menus, path) {
  let openKeys = []
  const level = Symbol("level")
  let stack = menus.map((o) => ({ ...o, [level]: 1 }))

  let curLevel = 1

  // 层级,当遍历到第一层时，说明已经从另一个第一层菜单开始遍历，提前清空openKeys
  while (stack.length) {
    const top = stack.pop()
    const { url, children } = top
    // 回到第一层，清空
    if (top[level] === 1) {
      openKeys = []
    } else if (top[level] < curLevel) {
      openKeys.pop()
    }
    curLevel = top[level]

    if (Array.isArray(children) && children.length) {
      openKeys.push(url)
      stack = stack.concat(children.map((o) => ({ ...o, [level]: top[level] + 1 })))
    }
    if (url === path) {
      if (!(Array.isArray(children) && children.length)) {
        openKeys.push(url)
      }
      return openKeys
    }
  }
  return []
}

console.log(getSelectKeys(arr1, "2-2-2-3"))
console.log(getSelectKeys(arr1, "3-3-3"))
console.log(getSelectKeys(arr1, "3-3"))
console.log(getSelectKeys(arr1, "1-1-2"))
