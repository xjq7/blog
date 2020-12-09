---
title: 科学开发,更高效
---

## v2ray

- 安装

  我经常使用的服务器是 centos7,通过脚本一键解决就好啦,我们不必过多研究,这只是工具罢了,按步骤选择,其中选择 tcp 方式就好

```Shell
bash <(curl -s -L https://git.io/v2ray.sh)
```

安装完成后,查看链接,在客户端可一键导入配置,有些软件无法导入需要手动配置

```Shell
#查看一键导入链接
v2ray link

# 查看配置信息,以便手动配置客户端
v2ray info
```

- bbr 加速

  BBR 由 Google 开发,供 Linux 内核的 TCP 协议栈使用,有了 BBR 算法,Linux 服务器可以显著提高吞吐量并减少连接延迟,简单来说 BBR 能加速网络传输速度。此外,部署 BBR 也很容易,因为该算法只需要发送方,而不需要网络或接收方的支持。
  这里我就不过多解释了,安装教程也参考其他 blog 的,我自己使用搬瓦工服务器,自带 bbr 加速

  > [bbr 安装教程](https://www.jianshu.com/p/52815c34215e)

- 客户端下载
  - 安卓 apk,[https://image.xjq.icu/books/v2rayNG_1.3.1.apk](https://image.xjq.icu/books/v2rayNG_1.3.1.apk)
  - windows,[https://image.xjq.icu/books/v2ray-windows-64.zip](https://image.xjq.icu/books/v2ray-windows-64.zip)
  - mac,[https://image.xjq.icu/books/V2RayX.app.zip](https://image.xjq.icu/books/V2RayX.app.zip)
