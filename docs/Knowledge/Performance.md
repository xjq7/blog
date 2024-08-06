[[toc]]

# 性能优化

## 基础概念

### 性能衡量标准

- 首次绘制时间(FP)

  内容开始绘制时间

- 首次内容绘制时间(FCP)

  首次内容绘制指标测量页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间, 内容包含文本、图像（包括背景图）、svg 元素或者非白色的 canvas 元素

- 最大内容绘制时间(LCP)

  可视区域内可见的最大图像或文本块完成渲染的相对时间

- 首次交互时延(FID)

  FID 测量从用户第一次与页面交互（点击、轻触、按键等不连续操作）响应时间

- 持续可交互时间(TTI)

  TTI 指标测量页面从开始加载到主要子资源完成渲染, 并能够快速、可靠响应用户输入需要的时间

- 首字节接受时间(TTFB)

  TTFB 是衡量资源的第一个字节开始到抵达之间时间的指标

  影响 TTFB 指标的因素

  - 重定向
  - DNS 寻址时间
  - 建立连接与 TLS 消耗
  - 服务端响应, 从请求到响应的第一个字节到达的时延

- 累计布局偏移(CLS)

  布局偏移由布局不稳定性 API 定义,只要可视区域中可见元素的起始位置在两帧之间发生变更, 该 API 就会报告 layout-shift 条目. 这样的元素被视为不稳定元素

### 帧率

帧率是指动画在每秒钟显示的帧数, 通常用 FPS 表示

## Chrome DevTools Performance

Chrome 浏览器开发工具中的一个功能板块, 用于分析网页性能, 帮助开发人员识别和解决性能问题

功能和用途:

- 性能分析

  在 Chrome DevTools 中打开 Performance 面板后, 可以通过点击“Record”按钮开始记录页面的性能数据. 在记录期间, DevTools会捕获页面加载、渲染、JavaScript 执行等信息

- 时间轴视图

  DevTools会展示一个时间轴图表, 显示了页面加载过程中的各个事件, 如网络请求、JS 执行、布局计算等. 这有助于开发者直观地查看页面性能情况

- 生成性能报告

  除了实时监测, DevTools 还支持生成性能报告的功能. 通过点击“Save Profile”按钮, 可以保存当前的性能数据, 并在之后进行分析或分享

### 控制面板

![](https://image.xjq.icu/2024/7/19/1721394007744_image.png)

### 性能分析

包含多个维度的性能数据分析

#### CPU

第一栏表示各项任务对 CPU 使用率

比如全程都有 黄色块 js 任务, 间断出现的 重排任务

![](https://image.xjq.icu/2024/7/24/1721805395238_image-1.png)

#### 内存变化趋势

随着时间线上升下降的内存趋势线

一般是梯形, 不断地经历 创建->释放 的过程

![](https://image.xjq.icu/2024/7/24/1721805393314_image.png)

#### 帧率分析

衡量动画性能主要指标是帧率, 正常 FPS 在 60 左右, 动画会比较流畅

通过查看帧绘制面板可以计算出当前动画不同时间段的帧率

![](https://image.xjq.icu/2024/7/24/1721790896405_Snipaste_2024-07-24_11-14-43.png)

这个面板头部是每一帧间隔, 我这里显示屏是 75 刷新率, 使用 1000/75 = 13.3 计算得到 每一帧绘制间隔是 13.3 ms, 大部分是 16.6 ms

然后下方是实际绘制的帧数, 可以看到, 实际过程中每 8 帧才绘制了一帧, 也就是说当前这段帧率在 75/8 ≈ 10帧左右

除了通过 Performance 去查看帧率之外, 还可以通过 js 代码计算

```Js
(function fps() {
  let lastTime = 0
  let frameCount = 0
  const _calFps = (currentTime) => {
    if (lastTime === 0) {
      lastTime = currentTime
    }

    frameCount++

    if (currentTime - lastTime >= 1000) {
      console.log('当前帧率: ' + frameCount)
      frameCount = 0
      lastTime = currentTime
    }
    requestAnimationFrame(_calFps)
  }
  requestAnimationFrame(_calFps)
})()
```

运行结果

![](https://image.xjq.icu/2024/7/24/1721791391652_Snipaste_2024-07-24_11-23-04.png)

#### 性能瓶颈分析(运行时)

主面板数据分析

![](https://image.xjq.icu/2024/7/24/1721792976906_image-1.png)

各颜色块的含义

- 黄色块: Js 执行
- 紫色块: 样式计算和布局, 重排
- 绿色块: 重绘

![](https://image.xjq.icu/2024/7/24/1721792407352_Snipaste_2024-07-24_11-40-02.png)

点击函数调用黄色块可以查看耗时分布以及代码位置

![](https://image.xjq.icu/2024/7/24/1721801208538_Snipaste_2024-07-24_14-06-31.png)

查看具体耗时分布, 这里是重排耗时最高

![](https://image.xjq.icu/2024/7/24/1721801489691_Snipaste_2024-07-24_14-10-10.png)

我们可以继续点击重排的紫色块查看摘要信息

![](https://image.xjq.icu/2024/7/24/1721802195807_image.png)

从摘要进入查看代码每行耗时

![](https://image.xjq.icu/2024/7/24/1721802176304_image-2.png)

这里可以看到性能耗时主要在于 70、71 行

70 行是方块位置更新动作, 触发重排是正常的

71 行由于使用了 offsetTop 属性触发了重排, 优化这行代码动画性能可以得到大幅提升

#### 网络性能分析

点击控制面板这个按钮 重新加载网页分析加载性能

![](https://image.xjq.icu/2024/7/24/1721804317078_image.png)

在网络板块可以看到所有资源的加载链路, 包含起始时间, 加载时长等信息

我们可以检索哪些资源加载时间过长, 并且对其他资源有阻塞效果, 来进行优化

![](https://image.xjq.icu/2024/7/24/1721804319508_image-1.png)

时间板块可以看到各个性能指标时间节点, 各个指标含义点击[性能衡量标准](#性能衡量标准)查看

![](https://image.xjq.icu/2024/7/24/1721804321211_image-2.png)

### CSS 选择器性能分析

## 优化维度

### 应用层

- 文件上传之分片上传
- 构建

  - 按需加载, 构建的分包, 实际运行过程中使用到才会加载
  - 资源压缩, 使用 terser 插件压缩资源
  - tree shaking 优化, 通过标记 sideEffects 来选择剔除一些死区代码

- 虚拟长列表
- 框架使用最佳实践

  React 组件开发中运用 useMemo, useCallback 优化

### 动画性能优化

- requestAnimationFrame

  通知浏览器执行一个动画, 浏览器会在下一次重绘之前调用执行, 使用 requestAnimationFrame 代替 setTimeout 执行动画可以优化动画性能

- 避免重排

  浏览器因为页面结构或者样式的变化而重新计算元素位置和大小, 导致整个页面布局发生改成

  - 添加或删除可见的 DOM 元素
  - 修改元素样式属性(宽高、边距、定位等)
  - 计算样式属性, 获取这些属性时, 导致重排

    ```
    clientWidth、clientHeight、clientTop、clientLeft
    offsetWidth、offsetHeight、offsetTop、offsetLeft
    scrollWidth、scrollHeight、scrollTop、scrollLeft
    scrollIntoView()、scrollIntoViewIfNeeded()
    getComputedStyle()
    getBoundingClientRect()
    scrollTo()
    ```

  - 内容发生变化, 比如文本变化或图片被另一个不同尺寸的图片所替代
  - 浏览器的窗口尺寸变化
  - 激活CSS伪类(例如：:hover)
  - 字体大小发生变化

- will-change

### JS 性能优化

通过 DevTools 分析 Js 运行性能, 找出长任务并优化

### 网络层

- http 缓存
- http/2 优化
- 资源预加载

## 优化

### 重绘

浏览器根据元素样式信息重新绘制, 而不涉及布局变更

- 修改元素背景色、文字颜色等
- 修改阴影、边框等效果
- 改变 visibility、 opacity 会影响元素可见性和透明度
