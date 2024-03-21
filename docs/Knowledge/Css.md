[[toc]]

## BFC

### 格式化上下文(Formatting context)

格式化上下文是 CSS 中用于决定块级盒子如何布局的一种机制

它是页面中一块渲染区域，决定了其子元素如何定位、相互关联以及如何布局。在CSS中，有多种类型的格式化上下文，包括常见的块格式化上下文（Block Formatting Context，BFC）、内联格式化上下文（Inline Formatting Context，IFC）、表格格式化上下文（Table Formatting Context，TFC）等

### 块级格式化上下文(BFC)

BFC 是页面中的一块独立的渲染区域，其中的盒子布局受到一些限制和规则

BFC 的特点包括：

1. 浮动清除：BFC 可以包含浮动元素，避免父元素高度塌陷的问题

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      .container {
        background-color: orange;

        /* BFC 解决高度塌陷问题 */
        overflow: hidden;
      }

      .item {
        width: 400px;
        height: 200px;
        box-sizing: border-box;
        border: 1px solid #000;
        float: left;
        background-color: #f00;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </body>
</html>
```

2. 边距折叠：BFC 可以阻止相邻块级元素的垂直边距折叠

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      .container {
        overflow: hidden;
      }

      .box1 {
        height: 200px;
        width: 400px;
        background-color: orange;
        margin-bottom: 30px;
      }
      .box2 {
        height: 150px;
        background-color: purple;
        margin-top: 50px;
      }
    </style>
  </head>
  <body>
    <!-- 套一层盒子形成 BFC 使 box1 margin 不与 box2 重叠 -->
    <div class="container">
      <div class="box1"></div>
    </div>
    <div class="box2"></div>
  </body>
</html>
```

3. 块级盒子布局：BFC 内部的块级盒子会在垂直方向一个接一个地放置

4. 不与浮动元素重叠：BFC 内部的盒子不会与浮动元素重叠

### BFC 触发条件

1. 根元素：根元素或包含根元素的元素

2. 浮动元素：元素的 float 属性不为 none

3. 绝对定位元素：元素的 position 属性为 absolute 或 fixed

4. 行内块元素：元素的 display 属性为 inline-block

5. 块级网格元素：元素的 display 属性为 grid 或 flex

6. overflow 属性：元素的 overflow 属性不为 visible

## CSS 引入方式

### 内联方式

内联方式指的是直接在 html 标签中的 style 属性中添加 CSS,权重最高

```html
<div style="width:100px;height:100px;background-color:pink;"></div>
```

### 内部样式

在 head 标签里的 style 标签,只对当前页面生效

```html
<head>
  <style>
    .root {
      width: 100px;
    }
  </style>
</head>
```

### 外部样式

#### 链接

链接方式指的是使用 html 头部的 head 标签引入外部的 CSS 文件, 跟随页面同时加载, 推荐使用 链接方式

优先级高于 导入

```html
<head>
  <link rel="stylesheet" type="text/css" href="main.css" />
</head>
```

#### 导入

导入方式指的是使用 CSS 规则引入外部 CSS 文件, 等待页面加载完加载, 且有兼容性问题

```html
<style>
  @import url('main.css');
</style>
```
