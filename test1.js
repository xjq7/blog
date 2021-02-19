function Parent() {
  this.arr = [1, 2]
}

function Child(name) {
  this.name = name
}

Child.prototype = new Parent()

const c1 = new Child('x1')
const c2 = new Child('x2')
console.log(Child.prototype)
console.log(c1.arr)
c1.arr.push(3)
console.log(c2.arr)
