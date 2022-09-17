[静态方法](./Bignumberjs.html#静态方法)

- [config](./Bignumberjs.html#config)

## Properties

## 静态方法

静态方法调用后一般返回 BigNumber 实例

### config

给构造函数设置参数

#### DECIMAL_PLACES

设置小数位数

```js
BigNumber.config({ DECIMAL_PLACES: 4 })
BigNumber.random().toNumber() // 0.7793
```

### sum

计算传入的参数和,参数类型可以是 String,Number

```js
// 两数之和
var x = BigNumber.sum('11', 23)
x.toNumber() // 34

// 多个参数
arr = [2, new BigNumber(14), '15.9999', 12]
var y = BigNumber.sum(...arr)
y.toString() // '43.9999'
```

### clone

生成 bignumber 构造函数

```js
var X = BigNumber.clone()
var y = new X()
y // bignumber实例
```

### isBigNumber

判断是否是 bignumber 实例,通过 clone 的构造函数生成的实例仍然是 bignumber 实例,但是原型与 BigNumber 原型不同

```js
var y = new BigNumber(2)
BigNumber.isBigNumber(y) // true
y instanceof BigNumber // true

var BN = BigNumber.clone()
z = new BN(x)
z instanceof BigNumber // false
BigNumber.isBigNumber(z) // true
```

### maximum,minimum

求最大值,简写 max,min

```js
var x = [2222, 3333, '4444']
BigNumber.max(...x).toNumber() // 4444
BigNumber.min(...x).toNumber() // 2222
```

### random

生成伪随机数,传入参数决定小数位数

```js
BigNumber.random().toNumber() // 0.1501651215311695
BigNumber.random(3).toNumber() // 0.150
```

## 实例方法

### negated

相反数

```js
var x = new BigNumber(1.8)
x.negated() // -1.8
```

### absoluteValue(abs)

绝对值

```js
var x = new BigNumber(-0.01)
x.abs().toNumber() // 0.01
```

### comparedTo

比较两数,返回值:
1: 大于
-1:小于
0:等于
null:比较值出现 NaN

```js
var x = new BigNumber(Infinity)
var y = new BigNumber(5)
var z = new BigNumber(5)
x.comparedTo(y) // 1
y.comparedTo(x) // -1
y.comparedTo(z) // 0
y.comparedTo(NaN) // null
```

### decimalPlaces(dp)

确定小数位数

```js
var x = new BigNumber(1234.5678912345)
var y = new BigNumber(1234.56)
x.dp(2).toNumber() // 1234.56
y.dp(10).toNumber() // 1234.56
```

### plus

加法运算

```js
0.1 + 0.2 // 0.30000000000000004
var x = new BigNumber(0.1)
x.plus(0.2).toNumber() // 0.3
```

### minus

减法运算

```js
0.3 - 0.1 // 0.19999999999999998
var x = new BigNumber(0.3)
x.minus(0.1) // 0.2
```

### multipliedBy(times)

乘法运算

```js
0.6 * 3 // 1.7999999999999998
var x = new BigNumber(0.6)
x.times(3) // 1.8
```

### dividedBy(div)

除法运算

```js
var x = new BigNumber(300)
x.div(3).toNumber() // 100
x.div(7).dp(3).toNumber() // 42.857
```

### dividedToIntegerBy(idiv)

除法运算,返回整数

```js
var x = new BigNumber(5)
x.idiv(3).toNumber() // 1
x.idiv(0.7).toNumber() // 7
```

### modulo(mod)

取余

```js
1 % 0.9 // 0.09999999999999998
var x = new BigNumber(1)
x.mod(0.9).toNumber() // 0.1
```

### exponentiatedBy(pow)

幂运算

```js
Math.pow(0.7, 2) // 0.48999999999999994
var x = BigNumber(0.7)
x.pow(2).toNumber() // 0.49
```

### integerValue

取整,参数取值参考 Properties

```js
var x = new BigNumber(123.456)
x.integerValue().toNumber() // 123
x.integerValue(BigNumber.ROUND_CEIL).toNumber() // 124
```

### isEqualTo(eq)

比较两数是否相等,NaN 不等于 NaN

```js
0 === 1e-324 // js中
var x = new BigNumber(0)
x.eq('1e-324') // false

var y = new BigNumber(NaN)
y.eq(NaN) // false
```

### isFinite

判断数字是否有效

```js
var x = new BigNumber(1)
x.isFinite() // true

var y = new BigNumber(Infinity)
y.isFinite() // false

var z = new BigNumber(NaN)
z.isFinite() // false
```

### isGreaterThan(gt)

```js
0.1 > 0.3 - 0.2 // true
var x = new BigNumber(0.1)
x.gt(BigNumber(0.3).minus(0.2)) // false
```

### isGreaterThanOrEqualTo(gte)

判断是否大于等于某数,用法同 isGreaterThan

### isLessThan(lt)

判断是否小于某数,用法同 isGreaterThan

### isLessThanOrEqualTo(lte)

判断是否小于等于某数,用法同 isGreaterThan

### isNaN

判断是否是 NaN

```js
var x = new BigNumber(NaN)
x.isNaN() // true

var y = new BigNumber(Infinity)
y.isNaN() // false
```

### isPositive

判断是否是正数

```js
var x = new BigNumber(-0)
x.isPositive() // false
```

### isNegative

判断是否是负数,用法同 isPositive

### isZero

判断是否是 0 或者-0

```js
var x = new BigNumber(-0)
x.isZero() // true
```

### toFixed

控制小数位数,不够后面补 0

```js
var x = 3.456
var y = new BigNumber(x)
x.toFixed().toNumber() // 3
y.toFixed().toNumber() // 3.456
y.toFixed(0).toNumber() // 3
y.toFixed(2).toNumber() // 3.46
y.toFixed(5).toNumber() // 3.45600
```

### toNumber

转 Number

### toString

转 String
