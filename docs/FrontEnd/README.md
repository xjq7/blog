---
title: Js处理日期和时间的Date对象
---

## 方法解析

```js
let date = new Date() //可返回当天的日期和时间。Thu Aug 29 2019 09:23:10 GMT+0800 (China Standard Time)
date.getYear() //获取当前年份(2位)
date.getFullYear() //获取完整的年份(4位)   2019
date.getMonth() //获取当前月份(0-11,0代表1月)  7
date.getDate() //获取当前日(1-31)  29
date.getDay() //获取当前星期X(0-6,0代表星期天)  4
date.getHours() //获取当前小时数(0-23)  9
date.getMinutes() //获取当前分钟数(0-59)  23
date.getSeconds() //获取当前秒数(0-59)  10
date.getMilliseconds() //获取当前毫秒数(0-999)   517
date.toLocaleDateString() //获取当前日   8/29/2019
date.toLocaleTimeString() //获取当前时间   9:39:17 AM
date.toLocaleString() //获取日期与时间   8/29/2019, 9:39:17 AM
date.getTime() //获取当前时间时间戳(从1970.1.1开始的毫秒数)  1567042757300
```

---

## parse 方法

- parse() 方法可解析一个日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数。
- 测试了下无论是 ' . ',' / ',' - ',都能输出时间戳

```js
Date.parse('2019.8.28') //默认为00:00:00
Date.parse('2019/8/28 12:12:02')
Date.parse('2019-8-28 12:12:02')
```

---

## 将时间转换成刚刚、几分钟前、几小时前...

```js
function DateDiff(date) {
  let timeStamp = new Date(date).getTime()
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  let halfamonth = day * 15
  let month = day * 30
  let nowTimeStamp = new Date().getTime()
  let diffTimeStamp = nowTimeStamp - timeStamp
  if (diffTimeStamp < 0) return
  let monthC = diffTimeStamp / month
  if (monthC >= 1) return '' + parseInt(monthC) + '月前'
  let weekC = diffTimeStamp / (7 * day)
  if (weekC >= 1) return '' + parseInt(weekC) + '周前'
  let dayC = diffTimeStamp / day
  if (dayC >= 1) return '' + parseInt(dayC) + '天前'
  let hourC = diffTimeStamp / hour
  if (hourC >= 1) return '' + parseInt(hourC) + '小时前'
  let minC = diffTimeStamp / minute
  if (minC >= 1) return '' + parseInt(minC) + '分钟前'
  return '刚刚'
}
console.log(new Date())
console.log('2019.8.29 17:54:32', DateDiff('2019.8.29 17:54:32'))
console.log('2019.7.10', DateDiff('2019.7.10'))
console.log('2019.8.26', DateDiff('2019.8.26'))
console.log('2019.8.16', DateDiff('2019.8.16'))
```

- 效果

<div style="text-align: center;">
  <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/javascript/timeDiff.png"/>
</div>

## 计算时间差

- 间隔多少小时

```js
//time为时间戳
let hour1 = time % (24 * 3600 * 1000)
let hour = Math.floor(hour1 / (3600 * 1000)) //间隔小时数
```

- 间隔多少分钟

```js
let minute1 = hour1 % (3600 * 1000)
let minute = Math.floor(minute1 / (60 * 1000))
```

```js
let second1 = minute1 % (60 * 1000)
let second = Math.round(second1 / 1000)
```
