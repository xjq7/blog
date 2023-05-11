[[toc]]

## flex-布局

## 居中布局

## BFC

块级格式化上下文

BFC 的原理

1. BFC 这个元素的垂直的边距会发生重叠
2. BFC 的区域不会与浮动元素的 float 重叠
3. 独立的容器，内外元素互不影响
4. 计算 BFC 高度，浮动元素也参与计算

BFC 创建

1. float 不为 none 的时候
2. position 不为 static 或者 relative 的时候
3. display 与 table 相关的时候
4. overflow 为 auto, hidden 的时候

BFC 应用

1. 解决边距重叠问题
