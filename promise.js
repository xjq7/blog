function Promise(fn) {
  this.state = 'pending'
  this.value = null
  this.callbacks = []
  fn(this._resolve.bind(this), this._reject.bind(this))
}

Promise.prototype.then = function (onFullfilled) {
  if (this.state === 'pending') {
    this.callbacks.push(onFullfilled)
    return
  }
  onFullfilled(this.value)
}

Promise.prototype._resolve = function (value) {
  this.state = 'fullfilled'
  this.value = value
  this.callbacks.forEach((fn) => fn(value))
}

Promise.prototype._reject = function (value) {
  this.state = 'rejected'
  this.value = value
  this.callbacks.forEach((fn) => fn(value))
}

const p = new Promise((r, j) => {
  r(1)
})

p.then((res) => {
  console.log(1)
})

p.then((res) => {
  console.log(1)
})

p.then((res) => {
  console.log(1)
})
