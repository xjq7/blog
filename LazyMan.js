const stepObj = {
  eat: async function ({ str }) {
    console.log(str)
  },
  sleep: async function ({ delay }) {
    return sleep(delay)
  },
  talk: async function ({ name }) {
    console.log(`I'm ${name}`)
  },
}

async function sleep(delay) {
  return new Promise((r, j) => setTimeout(r, delay))
}

function LazyManConstructor(name) {
  this.step = []
  this.name = name
  this.step.push({ name: 'talk', params: { name } })
  async function fn() {
    while (this.step.length) {
      const { name, params } = this.step.shift()
      await stepObj[name](params)
    }
  }
  setTimeout(fn.bind(this), 0)
  return this
}

function LazyMan(name) {
  return new LazyManConstructor(name)
}

LazyManConstructor.prototype.eat = function (str) {
  this.step.push({ name: 'eat', params: { str } })
  return this
}

LazyManConstructor.prototype.sleep = function (delay) {
  this.step.push({ name: 'sleep', params: { delay } })
  return this
}

LazyManConstructor.prototype.sleepFirst = function (delay) {
  this.step.unshift({ name: 'sleep', params: { delay } })
  return this
}

// 实现LazyMan
LazyMan('zhaojian').sleep(3000).eat('篮球').sleepFirst(3000).eat('rap').sleep(3000).eat('唱、跳')
// hi,I'm zhaojian
// 等待10s
// 篮球
// rap
// 唱、跳

// LazyMan('xjq').eat('高').sleep(3000).eat('富').eat('帅')
// hi,I'm xjq
// 高
// 等待5s
// 富
// 帅

// LazyMan('lurenjia').sleepFirst(3000).eat('吹').eat('牛')
// 等待10s
// hi,I'm lurenjia
// 吹
// 牛
