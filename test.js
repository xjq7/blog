let d1 = document.getElementById('div1')
let d2 = document.getElementById('div2')
let d3 = document.getElementById('div3')

let e = new Event('b')

d1.addEventListener(
  'b',
  function (e) {
    console.log(e)
  },
  false
)

d1.addEventListener(
  'click',
  function (ee) {
    d1.dispatchEvent(e)
    console.log(ee)
  },
  false
)
