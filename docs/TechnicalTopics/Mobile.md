[[toc]]

## JSBridge

原生与 Webview 通信的桥梁, 让原生可以调用 JS, JS 可以调用原生

### JS 调用 Native

1. 拦截 URL Scheme

URL Scheme 是一种类似 url 的链接,是为了方便 App 互相调用而设计的

2. Native 重写原生 JS 方法

3. 注入 API

通过 Webview 提供的接口, 像 Window 注入对象或方法

## Native 调用 JS

执行 拼接好的 JS 代码
