[[toc]]

# Canvas

## 概念

Canvas 是 HTML5 提供的绘图 API, 它可以通过 JS 在 网页上绘制图形、图像、动画

它是基于像素的绘图技术, 可以通过一系列 API 方法来操作像素数据, 创建并操纵图形元素

应用场景包含:

1. 创建交互式的数据可视化
2. 绘制图表
3. 图像编辑工具
4. 游戏和动画效果

## 基础

### 矩形

- fillRect

  绘制一个填充矩形

  ```Js
  fillRect(x, y, width, height)
  ```

- strokeRect

  绘制一个矩形边框

  ```Js
  strokeRect(x, y, width, height)
  ```

- clearRect

  清除指定矩形区域, 让清除部分完全透明

  ```Js
  clearRect(x, y, width, height)
  ```

### 路径

- beginPath

  新建一条路径, 生成之后, 图形绘制命令被指向到路径上生成路径

- closePath

  闭合路径之后图形绘制命令又重新指向到上下文中

- stroke

  通过线条来绘制图形轮廓

- fill

  通过填充路径的内容区域生成实心图形

#### 移动笔触

将笔触移动到 x, y 坐标上

```Js
moveTo(x, y)
```

#### 线

绘制一条从当前位置到 x, y 位置的直线

```Js
lineTo(x, y)
```

#### 圆弧

- arc

  画一个以 (x, y) 为圆心, 以 radius 为半径的圆弧, 从 startAngle 开始 导 endAngle 结束, 按照 anticlockwise 给定的方向(默认为顺时针)来生成

  ```Js
  /**
   * startAngle: number
  * endAngle: number
  * radius: number
  * anticlockwise: boolean
  *
  */
  arc(x, y, radius, startAngle, endAngle, anticlockwise)
  ```

  角度单位是以弧度表示, 一个完整的圆等于 2π 弧度 (Math.PI \* 2)

- arcTo

  根据给定的控制点和半径画一段圆弧, 再以直线连接两个控制点

  ```Js
  arcTo(x1, y1, x2, y2, radius)
  ```

#### 贝塞尔曲线

示例:

![](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes/canvas_curves.png)

- quadraticCurveTo

  绘制二次贝塞尔曲线, cp1x, cp1y 为一个控制点, (x, y) 为结束点

  ```Js
  quadraticCurveTo(cp1x, cp1y, x, y)
  ```

- bezierCurveTo

  绘制三次贝塞尔曲线, cp1x, cp1y 为控制点一, cp2x, cp2y 为控制点二, (x, y)为结束点

  ```Js
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
  ```

### 样式

#### 色彩

- fillStyle

  设置图形的填充颜色

  ```Js
  ctx.fillStyle = 'red'
  ```

- strokeStyle

  设置图形轮廓颜色

  ```Js
  ctx.strokeStyle = 'red'
  ```

#### 透明度

- globalAlpha

  设置完这个属性, 将会影响 canvas 后续绘制的所有图形透明度, 在需要绘制大量相同透明度的图形时相当高效

  ```Js
  ctx.globalAlpha = 0.2
  ```

#### 线型

- lineWidth

  设置线条宽度

  ```Js
  ctx.lineWidth = 10
  ```

- lineCap

  设置线条末端样式

  ```Js
  /**
   * butt: 线段末端以方形结束
   * round: 线段末端以圆形结束
   * square: 线段末端以方形结束，但是增加了一个宽度和线段相同, 高度是线段厚度一半的矩形区域
   * 默认是 butt
   */
  ctx.lineCap = "butt";
  ```

- lineJoin

  设定线条与线条间 接合处的样式

  ```Js
  /**
   * bevel: 在相连部分的末端填充一个额外的以三角形为底的区域，每个部分都有各自独立的矩形拐角
   * round: 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。圆角的半径是线段的宽度
   * miter: 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 miterLimit 属性看到效果
   * 默认是 miter
   */
  ctx.lineJoin = "miter";
  ```

- miterLimit

  限制当两条线相交时交接处最大长度; 交接处长度是指线条交接处内角顶点到外角顶点的长度

- getLineDash

  返回一个包含当前虚线样式, 长度为 非负偶数的数组

- setLineDash

  设置当前虚线样式

  ```Js
  /**
   * w1: 线段长
   * w2: 间隙长
   *
   */
  ctx.setLineDash([w1, w2])
  ```

- lineDashOffset

  设置虚线样式的起始偏移量

  ```Js
  ctx.lineDashOffset = 10
  ```

#### 渐变

- createLinearGradient

  ```Js
  /**
   * (x1, y1): 渐变起点
   * (x2, y2): 渐变终点
   */
  ctx.createLinearGradient(x1, y1, x2, y2)
  ```

- createRadialGradient

  createRadialGradient 方法接受 6 个参数, 前三个定义一个以 (x1, y1) 为原点, 半径为 r1 的圆, 后三个参数则定义另一个以 (x2, y2) 为原点, 半径为 r2 的圆

  ```Js
  ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)
  ```

- gradient.addColorStop

  添加 色标

  ```Js
  /**
   * position: 0 < position < 1 的数值, 代表渐变中颜色所在的相对位置
   * color: 颜色
   */
  linearGradient.addColorStop(position, color);

  // example
  const linearGradient = ctx.createLinearGradient(0, 0, 150, 150);
  linearGradient.addColorStop(1, "black");
  ```

#### 阴影

- shadowOffsetX、shadowOffsetY

  阴影方向, 正数往下或右延伸, 负数往上或左延伸, 默认为 0

  ```Js
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ```

- shadowBlur

  阴影模糊程度, 默认为 0

- shadowColor

  阴影颜色, 默认全透明黑色

#### Canvas 填充规则

使用到 fill、clip、isPointinPath 时可以选择一个填充规则

- nonzero

  非零缠绕规则

- evenodd

  奇偶规则

### 绘制文本

- fillText

  在指定位置填充文本

  ```Js
  /**
   * text: 文本
   * (x, y): 坐标
   * maxWidth?: 最大宽度
   *
   */
  ctx.fillText(text, x, y, [, maxWidth])
  ```

- strokeText

  在指定位置绘制文本边框

  ```Js
  // 参数同上
  ctx.strokeText(text, x, y, [, maxWidth])
  ```

#### 样式

- font

  绘制文本样式, 跟 CSS font 属性一样

- textAlign

  文本对齐选项

  ```Js
  // start end left right center 默认是 start
  ctx.textAlign = 'start'
  ```

- textBaseline

  基线对齐选项

  ```Js
  // top hanging middle alphabetic ideographic bottom 默认是 alphabetic
  ctx.textBaseline = 'top'
  ```

- direction

  文本方向

  ```Js
  // ltr rtl inherit 默认是 inherit
  ctx.direction = 'inherit'
  ```

#### 测量文本宽度

- measureText

  ```Js
  const text = ctx.measureText('foo')
  text.width // 16
  ```

### 图像使用

### 变形

#### 状态的保存和恢复

- save

  保存画布所有状态

- restore

  恢复画布状态

每次调用 save, 当前状态保存在栈中, 一个绘画状态包含

- 当前应用的变形(移动、旋转和缩放)
- 这些属性: strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, lineDashOffset, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation, font, textAlign, textBaseline, direction, imageSmoothingEnabled
- 裁切路径(clipping path)

#### 移动

- translate

  移动 canvas 和原点到 (x, y)

  ```Js
  ctx.translate(x, y)
  ```

#### 旋转

以原点为中心旋转 rotate, 顺时针方向

```Js
rotate(angle)

rotate(Math.PI / 180 * 30) // 旋转 30°
```

#### 缩放

- scale

### 组合

#### 裁切路径

- clip

  将当前正在构建的路径转换为当前的裁剪路径

## Canvas 与 SVG 的区别

Canvas 是基于像素的即时绘制技术, 适合频繁更新和复杂动画

SVG 是基于矢量的图形格式, 适合需要无损缩放和高分辨率的静态图形

基于矢量是指通过数学工时(如线条、曲线、形状等)进行定义, 而不是通过像素, 图形是由点、线段和曲线构成, 可以用公式精确描述

优缺点对比:

Canvas 不具备内置的 DOM 交互, 需要额外的事件处理, SVG 每个图形元素都是 DOM 节点, 天然支持交互事件处理

Canvas 优点:

- 高性能
- 粒度控制更小
- 适合实时渲染

Canvas 缺点:

- 缩放可能失真
- 无内置交互
- 复杂性高

SVG 优点:

- 可缩放性
- 高可读性: XML 格式, 具有良好的可读性和可维护性
- 内置交互事件

SVG 缺点:

- 性能问题: 处理复杂动画和大量图形元素时, 性能可能不如 Canvas
- 浏览器兼容性
- 复杂性: 对于复杂图形, SVG 文件大小跟复杂度可能会增加
