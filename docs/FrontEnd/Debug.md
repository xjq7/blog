---
title: 神奇的bug
---

## 0.5x,0.6x 部分浏览器跨域响应头 Access-Control-Allow-Headers 不能识别\*

bug 描述: 简单请求未受影响,非简单请求都失败,在不同机型效果不同,因为大多数手机系统浏览器版本也比较高,刚开始难排查

在移动端,某些手机 webview 跟随系统浏览器版本,在 0.5x,0.6x 版本间,常规的跨域配置 Access-Control-Allow-Headers:\*,会导致非简单请求无法正常工作

## git 不区分文件名大小写

bug 描述: 远程出现出现两个文件(Readme.md,readme.md),本地却只有一个(Readme.md)

当你未配置大小写区分时,
