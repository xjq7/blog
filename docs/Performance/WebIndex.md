- [Load 加载性能](./WebIndex.html#Load-加载性能)
  - [FCP](./WebIndex.html#fcp)
  - [LCP](./WebIndex.html#lcp)
  - [FID](./WebIndex.html#fid)
  - [TTI](./WebIndex.html#tti)
  - [TTFB](./WebIndex.html#ttfb)
  - [TBT](./WebIndex.html#tbt)
- [Runtime 运行时性能](./WebIndex.html#Runtime-运行时性能)
  - [帧率](./WebIndex.html#帧率)
  - [内存](./WebIndex.html#内存)

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

## Runtime 运行时性能

### 帧率

### 内存
