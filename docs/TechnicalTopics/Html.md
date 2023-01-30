- [盒模型](./Html.html#盒模型)

## 盒模型

标准 W3C 盒子模型的范围包括 margin、border、padding、content，并且 content 部分不包含其他部分

IE 盒子模型的范围也包括 margin、border、padding、content，和标准 W3C 盒子模型不同的是：IE 盒子模型的 content 部分包含了 border 和 pading

## HTML5

HTML5 是下一代 HTML 标准

`使用 <!DOCTYPE html> 声明 HTML5`

### 优势

- HTML5 在语义上却有很大的优势,提供了很多语义化标签, 如 header, article, footer

- 新的表单控件, 如 date, time, email, search

- 新增 canvas 支持 2D/3D 制图, video, audio

## 渐进增强和优雅降级

### 渐进增强

主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下，再针对高级浏览器进行效果，交互等方面的改进和追加功能，以达到更好的用户体验

### 优雅降级

一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容

## CSS

### z-index

失效的几种情况

- 父元素 position 为 relative 时，子元素的 z-index 失效

- 元素没有设置 position 属性为非 static 属性

- 元素在设置 z-index 的同时还设置了 float 浮动
