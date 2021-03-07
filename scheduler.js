class Scheduler {
  constructor() {
    this.runQueue = []
    this.queue = []
    this.count = 2
  }

  addTask(task) {
    this.queue.push(task)
    return this.run()
  }

  run() {
    if (this.runQueue.length < this.count && this.queue.length) {
      const task = this.queue.shift()
      const promise = task().then(() => {
        this.runQueue.splice(this.runQueue.indexOf(promise), 1)
      })
      this.runQueue.push(promise)
      return promise
    } else {
      return Promise.race(this.runQueue).then(() => this.run())
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler
    .addTask(() => timeout(time))
    .then(() => {
      console.log(order)
    })
}

addTask(10000, '1')
addTask(5000, '2')
addTask(3000, '3')
addTask(4000, '4')
