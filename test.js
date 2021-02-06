//极简的实现+链式调用+延迟机制+状态
// class Promise {
//   callbacks = [];
//   state = "pending"; //增加状态
//   value = null; //保存结果
//   constructor(fn) {
//     fn(this._resolve.bind(this));
//   }
//   then(onFulfilled) {
//     if (this.state === "pending") {
//       //在resolve之前，跟之前逻辑一样，添加到callbacks中
//       this.callbacks.push(onFulfilled);
//     } else {
//       //在resolve之后，直接执行回调，返回结果了
//       onFulfilled(this.value);
//     }
//     return this;
//   }
//   _resolve(value) {
//     this.state = "fulfilled"; //改变状态
//     this.value = value; //保存结果
//     this.callbacks.forEach((fn) => fn(value));
//   }
// }

function Promise(fn) {
  this.callbacks = [];
  this.errorCallbacks = [];
  this.state = "pending";
  this.value = null;
  fn(this._resolve.bind(this), this._reject.bind(this));
}

Promise.prototype._resolve = function (value) {
  this.state = "fullfilled";
  this.value = value;

  this.callbacks.forEach((fn) => fn(value));
};

Promise.prototype._reject = function (value) {
  this.state = "reject";
  this.value = value;
  this.errorCallbacks.forEach((fn) => fn(value));
};

Promise.prototype.then = function (onFullfilled) {
  if (this.state === "pending") {
    this.callbacks.push(onFullfilled);
  } else if (this.state === "fullfilled") {
    onFullfilled(this.value);
  }
  return this;
};

Promise.prototype.catch = function (onReject) {
  if (this.state === "pending") {
    this.errorCallbacks.push(onReject);
  } else if (this.state === "reject") {
    onReject(this.value);
  }
  return this;
};

const p = new Promise((r, j) => {
  r(1);
});

p.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});

p.then((res) => {
  console.log(res);
});
p.then((res) => {
  console.log(res);
  return 2;
}).then((res) => {
  console.log(res);
});
