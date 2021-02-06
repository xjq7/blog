function Promise(fn) {
  this.state = "pending";
  this.value = null;
  this.callbacks = [];
  fn(this._resolve.bind(this), this._reject.bind(this));
}

Promise.prototype.then = function (onFullfilled, onRejected) {
  return new Promise((resolve, reject) => {
    this._handle({
      onFullfilled: onFullfilled || null,
      onRejected: onRejected || null,
      resolve,
      reject,
    });
  });
};

Promise.prototype.catch = function (onError) {
  return this.then(null, onError);
};

Promise.prototype.finally = function (onFinally) {
  if (typeof onFinally !== "function") return this.then();
  let promise = this.constructor;
  return this.then(
    (value) => promise.resolve(onFinally()).then(() => value),
    (reason) =>
      promise.resolve(onFinally()).then(() => {
        throw reason;
      })
  );
};

Promise.prototype._resolve = function (value) {
  this.state = "fullfilled";
  this.value = value;
  this.callbacks.forEach((fn) => fn(value));
};

Promise.prototype._reject = function (value) {
  this.state = "rejected";
  this.value = value;
  this.callbacks.forEach((fn) => fn(value));
};

Promise.prototype._handle = function (callback) {
  if (this.state === "pending") {
    this.callbacks.push(callback);
    return;
  }
  let cb =
    this.state === "fullfilled" ? callback.onFullfilled : callback.onRejected;
  if (!cb) {
    cb = this.state === "fullfilled" ? callback.resolve : callback.reject;
    cb(this.value);
    return;
  }
  let ret;
  try {
    ret = cb(this.value);
    cb = this.state === "fullfilled" ? callback.resolve : callback.reject;
  } catch (error) {
    ret = error;
    cb = callback.reject;
  } finally {
    cb(ret);
  }
};

const p1 = new Promise((r, j) => {
  r(1);
});

p1.then((res) => {
  console.log(res);
  // return res;
})
  .then((res) => {
    console.log(res, "resss");
  })
  .catch((err) => {
    console.log("err1", err);
  })
  .finally((err) => {
    console.log("err2", err);
    return err;
  });
