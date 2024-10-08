[[toc]]

# 性能优化

## Web 性能指标

### FCP

首次内容绘制指标测量页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间

内容包含文本、图像（包括背景图）、svg 元素或者非白色的 canvas 元素

#### 评分

为了良好的用户体验，FCP 时间最好控制在 1.8s 以内

### LCP

最大内容绘制指标： 可视区域内可见的最大图像或文本块完成渲染的相对时间

Good 2.5s Middle 4s Poor

#### 考量范围

- img 元素

- 内嵌在 svg 元素内的 image 元素

- video 元素（使用封面图像）

- 通过 url() 函数加载的带有背景图的元素

- 包含文本节点或其他行内级文本元素子元素的块级元素

#### 指标采集时机

### FID

FID 测量从用户第一次与页面交互（点击、轻触、按键等不连续操作）响应时间

Good 100ms Middle 300ms Poor

### TTI

TTI 指标测量页面从开始加载到主要子资源完成渲染， 并能够快速、可靠响应用户输入需要的时间

#### 计算步骤

1. 先进行首次绘制（FCP）
2. 沿着时间轴正向搜索时长至少为 5s 的安静窗口（没有长任务且不超过两个正在处理的网络 GET 请求）
3. 沿着时间轴反向搜索安静窗口之前的最后一个长任务，如果没有找到长任务，则在 FCP 步骤停止执行
4. TTI 是安静窗口之前最后一个长任务的结束时间（如果没有找到长任务，则与 FCP 值相同）

### TTFB

TTFB 是衡量资源的第一个字节开始到抵达之间时间的指标

影响 TTFB 指标的因素

- 重定向

- DNS 寻址时间

- 建立连接与 TLS 消耗

- 服务端响应， 从请求到响应的第一个字节到达的时延

#### 评分

Good 0.8 Middle 1.8 Poor

### TBT

总阻塞时间指标测量 FCP 与 TTI 之间的总阻塞时间， 阻塞期间主线程无法响应交互行为

TBT 时长为 TTI 之前所有超过 50ms 时间部分的时长总和

300ms 以内视为良好的 TBT 分数

#### 优化手段

- 减少第三方代码的影响

- 减少 js 执行时间

- 最小化主线程工作

- 保持较低的请求书和较小的传输大小

### CLS

累计布局偏移是衡量视觉稳定性的重要指标,有助于量化用户经历意外布局偏移的频率,较低的 CLS 有助于确保一个页面是令人愉悦的

Good 100ms Middle 250ms Poor

#### 布局偏移详情

布局偏移由布局不稳定性 API 定义,只要可视区域中可见元素的起始位置在两帧之间发生变更, 该 API 就会报告 layout-shift 条目。这样的元素被视为不稳定元素

只有当现有元素的起始位置发生变更时才算作布局偏移, 如果将新元素添加到 DOM 或是现有元素更改大小，则不算作布局偏移，前提是元素的变更不会导致其他可见元素的起始位置发生改变

#### 布局偏移分数

```
布局偏移分数 = 影响分数 * 距离分数
```

影响分数:

影响分数测量不稳定元素对两帧之间的可视区域产生的影响。

前一帧和当前帧的所有不稳定元素的可见区域集合（占总可视区域的部分）就是当前帧的影响分数。

<img src="https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/BbpE9rFQbF8aU6iXN1U6.png?auto=format"/>

在上图中，有一个元素在一帧中占据了一半的可视区域。接着，在下一帧中，元素下移了可视区域高度的 25%。红色虚线矩形框表示两帧中元素的可见区域集合，在本示例中，该集合占总可视区域的 75%，因此其影响分数为 0.75

距离分数:

布局偏移分数计算公式的另一部分测量不稳定元素相对于可视区域位移的距离。距离分数指的是任何不稳定元素在一帧中位移的最大距离（水平或垂直）除以可视区域的最大尺寸维度（宽度或高度，以较大者为准）

<img src="https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/ASnfpVs2n9winu6mmzdk.png?auto=format"/>

在上方的示例中，最大的可视区域尺寸维度是高度，不稳定元素的位移距离为可视区域高度的 25%，因此距离分数为 0.25。

所以，在这个示例中，影响分数是 0.75 ，距离分数是 0.25 ，所以布局偏移分数是 0.75 \* 0.25 = 0.1875

## rail 模型

rail 模型是一种以用户为中心的性能模型, 它提供了一种考虑性能的结构

该模型将用户体验分解到按键操作(点击, 滚动, 加载), 对每个操作都能定义性能目标

rail 代表 Web 应用生命周期的四个不同方面:响应,动画,空闲和加载

用户对这些上下文分别有不用的性能期望, 因此,性能模板是根据上下文以及用户如何感知延迟的用户体验研究来定义的

<img src="https://web-dev.imgix.net/image/admin/uc1IWVOW2wEhIY6z4KjJ.png?auto=format&w=845"/>

### 以用户为中心

- 0-16 ms

  用户非常关注轨迹运动, 他们喜欢流畅的动画, 每秒 60 帧的动画是流畅的

  每一帧只有 16ms 的时间, 包括了浏览器将新帧绘制到屏幕所需时间, 因此应用约有 10ms 的时间来生成一个帧

- 0-100 ms

  在此时间窗口内响应用户操作会让用户觉得结果是即时呈现的

  如果时间更长, 操作与用户反应之间的联系就会中断

- 100-1000 ms

  在此时间窗口内, 用户会觉得任务进展基本上是自然连续的

  对大多数用户来说, 加载页面或更改视图是一项任务

- 1s 以上

  超过 1s, 用户注意力就会从正在执行的任务上转移

- 10s 以上

  用户会感到失望, 可能会离开

### 目标和准则

- 目标

与用户体验相关的关键性能指标

例如: 点击即可在 100ms 内绘制

- 准则

有助于实现目标的建议

不同硬件与网络连接条件下不同

### 响应: 在 50ms 内处理事件

- 目标

  在 100ms 内完成由用户输入发起的转换, 让用户感觉交互是即时的

- 准则

  为了确保在 100ms 内产生可见响应, 需要在 50ms 内处理用户输入事件. 适用于大多数输入, 例如:点击按钮,切换表单控件,启动动画. 不适用于触摸拖动或滚动

### 动画: 在 10ms 内生成一帧

- 目标

  在 10ms 或者更短的时间内生成动画的每一帧. 从技术角度考虑,每一帧的最大预算是 16ms, 但是浏览器需要大约 6ms 的时间来渲染一帧

- 准则

  有关各种动画优化策略,参阅 [rendering-performance](https://web.dev/rendering-performance/)

### 空闲: 最大限度增加空闲时间

- 目标

  最大限度增加空闲时间以提高页面在 50ms 内响应用户输入的几率

- 准则

  1. 利用空闲时间完成延缓的工作. 例如, 对于初始页面加载,应加载尽可能少的数据,然后利用空闲时间加载其余数据

  2. 在 50ms 或更短的空闲时间内执行工作, 如果时间更长, 可能会干扰应用在 50ms 内响应用户输入的能力

  3. 如果用户在空闲时间工作期间与页面交互,应该中断空闲时间工作, 用户交互始终保持最高优先级

### 加载: 在 5s 内交付内容并实现可交互

当页面加载缓慢时,用户注意力会分散, 他们会认为任务已中断

加载速度快的网站具有更长的平均会话时间, 更低的跳出率和更高的广告可见性

- 目标

  根据用户的设备和网络能力优化相关的快速加载性能, 对于首次加载, 在使用速度较慢的中端移动设备上, 理想的目标是在 5s 内实现可交互

  对于后续加载, 理想目标是 2s 内加载页面

- 准则

  1. 在最常见的用户移动设备和网络连接上测试负载性能

  2. 消除阻塞渲染资源

  3. 为了产生完整加载的感觉, 您不必再 5s 内加载所有内容

### 总结

- 以用户为中心

- 在 100ms 内响应用户输入

- 播放动画或执行滚动时,在 10ms 内生成一帧

- 最大限度延长主线程空闲时间

- 在 5000ms 内加载交互式内容

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

三个内存量化数据

- jsHeapSizeLimit

  上下文内可用堆的最大体积，以字节计算

- totalJSHeapSize

  已分配的堆体积，以字节计算

- usedJSHeapSize

  当前 JS 堆活跃段的体积，以字节计算

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

  告知浏览器该元素会有哪些变化, 让浏览器在元素属性发生变化前能够进行一些优化, 例如元素点击时发生变化优化可以将 will-change 加在 元素 hover 状态上, 另一个
  例子是针对元素 hover 时发生变化可以 在他的父级元素的 hover 上声明 该元素 will-change 属性

- CSS 动画优于 JS 动画

- 在使用 JS 动画时可以采用适当的防抖节流优化性能

- 添加 transform:translate3d(0,0,0) 让动画独立图层 触发 GPU 加速

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
