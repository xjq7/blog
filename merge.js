const a = { foo: { bar: 1 }, arr: [1, 3, { a: { b: 1 } }] };
const b = { foo: { bar: [1] }, arr: {} };

function getType(o) {
  return Object.prototype.toString.call(o);
}

function deepClone(obj, weakMap = new WeakMap()) {
  if (!(obj instanceof Object)) return obj;
  var isArray = obj instanceof Array;
  var res = isArray ? [] : {};
  if (!isArray) {
    if (weakMap.get(obj)) return {};
    weakMap.set(obj, {}.toString.call(obj));
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key], weakMap);
    }
  }
  return res;
}

function merge(a, b) {
  if (getType(a) !== getType(b)) {
    return deepClone(b);
  }
  if (!(a instanceof Object)) {
    return b;
  }
  const isArray = a instanceof Array;
  const res = isArray ? [] : {};
  for (let key in b) {
    if (b.hasOwnProperty(key)) {
      res[key] = merge(a[key], b[key]);
    }
  }
  for (let key in a) {
    if (res[key] === undefined && a.hasOwnProperty(key)) {
      res[key] = deepClone(a[key]);
    }
  }
  return res;
}

const obj = merge(a, b);

console.log(b);
console.log(a);
console.log(obj);
