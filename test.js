function repeat(fn, times, wait) {
  return function (str) {
    fn(str);
    times--;
    if (times > 0) {
      setTimeout(() => {
        arguments.callee(str);
      }, wait);
    }
  };
}

const repeatFn = repeat(console.log, 4, 1000);
repeatFn("hello");
