[[toc]]

## 事件循环

## 原型链

## this

## 继承

## 装饰器

## DOM 事件流

事件流: 事件在元素之间的触发顺序

事件捕获: 事件由最顶层逐级向下传播, 直至到达目标元素
事件冒泡: 事件由目标元素接收, 然后逐级向上传播

事件流规定了事件是先捕获再冒泡
事件流的三个阶段:

1. 捕获阶段: 事件从最顶层元素 window 一直传递到目标元素的父元素
2. 目标阶段: 事件到达目标元素，如果事件指定不冒泡，那就会在这里中止
3. 冒泡阶段: 事件从目标元素父元素向上逐级传递直到最顶层元素 window

### 阻止捕获和冒泡

通过 Event 对象的 stopPropagation 方法可以阻止事件捕获和冒泡

在捕获事件里执行，子元素事件无法触发
在冒泡事件里执行，父元素事件无法触发

### DOM 级别

1. DOM0级事件是将函数赋值给元素的事件处理属性

比如 赋值给 button 属性的 onclick 属性

DOM0 级事件无法同时绑定多个处理函数

2.  DOM2级事件是通过元素的 addEventListener 和 removeEventListener 方法绑定与解绑事件

3.  DOM3级事件在 DOM2 级事件基础上新增了更多的事件类型

    - UI事件，当用户与页面上的元素交互时触发，如: load、scroll
    - 焦点事件，当元素获得或失去焦点时触发，如: blur、focus
    - 鼠标事件，mouseenter 和 mouseleave: 这两个事件与mouseover和mouseout类似，但是不会在子元素进入或离开父元素时触发。它们更适合用于实现鼠标进入和离开元素的效果，而不受子元素影响
    - 滚轮事件，当使用鼠标滚轮或类似设备时触发，如: mousewheel
    - 文本事件，当在文档中输入文本时触发，如: textInput
    - 键盘事件，input: 当用户输入文本时触发。与keydown、keypress和keyup事件不同，input事件在文本字段的值发生变化时触发，而不是在按键被按下或释放时触发
    - 变动事件，当底层DOM结构发生变化时触发，如: DOMsubtreeModified
    - 触摸事件，touchstart、touchend、touchmove、touchcancel: 这些事件用于处理触摸屏设备上的触摸操作，如手指接触屏幕、手指离开屏幕、手指在屏幕上移动等
    - 拖放事件，drag、dragstart、dragend、dragover、dragenter、dragleave、drop: 这些事件用于处理拖放操作，可以实现拖动元素并将其放置到其他位置的功能
    - 复合事件，compositionstart、compositionupdate、compositionend: 这些事件用于处理复合输入（如中文输入法输入）时的事件，可以捕获到输入法的中间状态和最终结果
