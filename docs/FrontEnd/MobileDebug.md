[[toc]]

## Android

1. 开发者选项中开启 USB 调试
2. 在弹出来 USB 调试授权中允许, 如果没弹出来, 拔掉数据线重新连接试试
3. 在 chrome 中访问 chrome://inspect/#devices, 可以看到手机设备以及连接的网页, 点击 inspect 即可调试

### 调试资源

需要结合 [whistle](https://github.com/avwo/whistle) 使用

设置 wifi 代理为 你的机器 ip 端口为 8899(具体看 whistle 启动后端口, 默认是 8899)

在 whistle 的配置中指定某个资源地址映射到本地启动的文件地址上

然后移动端访问线上 h5 地址时, 其中的资源地址是使用的本地启动的

## IOS

1. 在 MacOS 上使用数据线连接手机
2. 打开手机设置找到 Safari 浏览器, 进入 高级, 开启网页检查器
3. 在 MacOS 中 Safari 浏览器中 开发 中 可以找到连接的设备, 再点击调试对应的 Web 页面
