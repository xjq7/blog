(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{236:function(t,r,e){"use strict";e.r(r);var i=e(0),a=Object(i.a)({},(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("blockquote",[e("p",[e("a",{attrs:{href:"https://juejin.im/post/5df1e312f265da33d039d06d",target:"_blank",rel:"noopener noreferrer"}},[t._v("面试完 50 个人后我写下这篇总结"),e("OutboundLink")],1)])]),t._v(" "),e("h2",{attrs:{id:"盒模型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#盒模型"}},[t._v("#")]),t._v(" 盒模型")]),t._v(" "),e("h3",{attrs:{id:"box-sizing-content-box-w3c-盒模型-又名标准盒模型-元素的宽高大小表现为内容的大小。-box-sizing-border-box-ie-盒模型-又名怪异盒模型-元素的宽高表现为内容-内边距-边框的大小。背景会延伸到边框的外沿。"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#box-sizing-content-box-w3c-盒模型-又名标准盒模型-元素的宽高大小表现为内容的大小。-box-sizing-border-box-ie-盒模型-又名怪异盒模型-元素的宽高表现为内容-内边距-边框的大小。背景会延伸到边框的外沿。"}},[t._v("#")]),t._v(" box-sizing: content-box(W3C 盒模型,又名标准盒模型):元素的宽高大小表现为内容的大小。 box-sizing: border-box(IE 盒模型,又名怪异盒模型):元素的宽高表现为内容 + 内边距 + 边框的大小。背景会延伸到边框的外沿。")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("W3C 盒模型:margin+border+padding+width(content)")])]),t._v(" "),e("li",[e("p",[t._v("IE 盒模型:margin+width(border+padding+content)")])])]),t._v(" "),e("h2",{attrs:{id:"浏览器渲染之重绘和重排"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器渲染之重绘和重排"}},[t._v("#")]),t._v(" 浏览器渲染之重绘和重排")]),t._v(" "),e("ul",[e("li",[e("h4",{attrs:{id:"重绘-repaint-或-redraw-当盒子的位置、大小以及其他属性-例如颜色、字体大小等都确定下来之后-浏览器便把这些原色都按照各自的特性绘制一遍-将内容呈现在页面上。重绘是指一个元素外观的改变所触发的浏览器行为-浏览器会根据元素的新属性重新绘制-使元素呈现新的外观。重绘发生在元素的可见的外观被改变-但并没有影响到布局的时候。比如-仅修改-dom-元素的字体颜色-只有-repaint-因为不需要调整布局"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#重绘-repaint-或-redraw-当盒子的位置、大小以及其他属性-例如颜色、字体大小等都确定下来之后-浏览器便把这些原色都按照各自的特性绘制一遍-将内容呈现在页面上。重绘是指一个元素外观的改变所触发的浏览器行为-浏览器会根据元素的新属性重新绘制-使元素呈现新的外观。重绘发生在元素的可见的外观被改变-但并没有影响到布局的时候。比如-仅修改-dom-元素的字体颜色-只有-repaint-因为不需要调整布局"}},[t._v("#")]),t._v(" 重绘(repaint 或 redraw):当盒子的位置、大小以及其他属性,例如颜色、字体大小等都确定下来之后,浏览器便把这些原色都按照各自的特性绘制一遍,将内容呈现在页面上。重绘是指一个元素外观的改变所触发的浏览器行为,浏览器会根据元素的新属性重新绘制,使元素呈现新的外观。重绘发生在元素的可见的外观被改变,但并没有影响到布局的时候。比如,仅修改 DOM 元素的字体颜色(只有 Repaint,因为不需要调整布局)")])]),t._v(" "),e("li",[e("p",[e("strong",[t._v("重排(重构/回流/reflow):当渲染树中的一部分(或全部)因为元素的规模尺寸,布局,隐藏等改变而需要重新构建, 这就称为回流(reflow)。每个页面至少需要一次回流,就是在页面第一次加载的时候。")])])]),t._v(" "),e("li",[e("p",[e("strong",[t._v("触发重排的条件：任何页面布局和几何属性的改变都会触发重排:")])]),t._v(" "),e("ol",[e("li",[t._v("页面渲染初始化(无法避免)")]),t._v(" "),e("li",[t._v("添加或删除可见的 DOM 元素")]),t._v(" "),e("li",[t._v("元素位置的改变,或者使用动画")]),t._v(" "),e("li",[t._v("元素尺寸的改变——大小,外边距,边框")]),t._v(" "),e("li",[t._v("浏览器窗口尺寸的变化")]),t._v(" "),e("li",[t._v("填充内容的改变,比如文本的改变或图片大小改变而引起的计算值宽度和高度的改变")])])])]),t._v(" "),e("p",[t._v("重排必定会引发重绘,但重绘不一定会引发重排。")])])}),[],!1,null,null,null);r.default=a.exports}}]);