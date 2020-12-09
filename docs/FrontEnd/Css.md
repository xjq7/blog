---
title: css
sidebarDepth: 3
---

## 引入方式

### 内联方式

内联方式指的是直接在 HTML 标签中的 style 属性中添加 CSS,权重最高

```HTML
<div style='width:100px;height:100px;background-color:pink;'></div>
```

### 内部样式

在 head 标签里的 style 标签,只对当前页面生效

```HTML
<head>
  <style>
    .root{
      width:100px;
    }
  </style>
</head>
```

### 外部样式

#### 链接

链接方式指的是使用 HTML 头部的 head 标签引入外部的 CSS 文件,跟随页面同时加载,推荐使用 链接方式

```HTML
<head>
  <link rel="stylesheet" type="text/css" href="main.css">
</head>
```

#### 导入

导入方式指的是使用 CSS 规则引入外部 CSS 文件,等待页面加载完加载,且有兼容性问题

```HTML
<style>
  @import url('main.css')
</style>
```
