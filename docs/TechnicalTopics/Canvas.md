[[toc]]

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
