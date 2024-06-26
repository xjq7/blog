[[toc]]

# Web 性能指标

## Load 加载性能

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

## Runtime 运行时性能

### 帧率(FPS)

FPS 是描述"帧"变化速度的物理量，每秒渲染多少帧的图像

帧率通常用来描述动画和视频的流畅度. 较高的帧率可以提供更平滑的动画和视频播放体验，而较低的帧率
则可能导致卡顿和不流畅的感觉

一般来说：

- 帧率稳定在 50-60 之间是比较流畅的
- 30-50 之间，较卡顿
- 30 以下，让人感觉明显卡顿和不适
- 帧率波动很大，也会感觉卡顿

帧率的计算方式

通过计算 requestAnimationFrame 在 1s 内的执行次数，即是帧率

```Javascript
function fps() {
  let lastTime = 0
  let frameCount = 0
  window.fps = []
  const _calFps = (currentTime) => {
    if (lastTime === 0) {
      lastTime = currentTime
    }

    frameCount++

    if (currentTime - lastTime >= 1000) {
      window.fps.push({
        time: ((Date.now() - performance.timing.navigationStart) / 1000).toFixed(1),
        value: frameCount,
      })
      frameCount = 0
      lastTime = currentTime
    }
    requestAnimationFrame(_calFps)
  }
  requestAnimationFrame(_calFps)
}
```

### 内存

- jsHeapSizeLimit

  上下文内可用堆的最大体积，以字节计算

- totalJSHeapSize

  已分配的堆体积，以字节计算

- usedJSHeapSize

  当前 JS 堆活跃段的体积，以字节计算
