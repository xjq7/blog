[[toc]]

## 移动端调试

### vconsole

### 抓包

ios 可以使用 stream 软件抓包

Android 使用 Charles 抓包

### 本地调试

将线上 H5 里的资源代理到本地启动的服务上, 直接本地调试

我这里演示的是 ios 端的代理配置

1. 先将 WIFI 代理配置好

   ![](https://image.xjq.icu/2024/7/10/1720608110014_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240710184141.png)

   这里端口填的 8899, [whistle](https://github.com/avwo/whistle) 默认端口是 8899

2. 电脑安装 [whistle](https://github.com/avwo/whistle), 按照官方 README 教程安装

3. 本地 w2 start --init 启动之后, 需要在手机端安装 whistle 的证书, 才能抓包 https

   浏览器访问 http://127.0.0.1:8899/#network 进入 whistle 配置界面, 点击顶部 HTTPS 栏弹出证书下载页面, 扫码下载后安装并信任证书

4. 代理配置编写

   ![](https://image.xjq.icu/2024/7/10/1720608505663_Snipaste_2024-07-10_18-48-16.png)

   点击 Rules 编写规则, 比如将 https://www.baidu.com/a.js 替换为 http://127.0.0.1:8080/a.js

## Nodejs

使用 VSCode Debugger 调试 nodejs 程序

创建 .vscode/launch.json 文件

```json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "启动程序",
      "port": 8888,
      // "stopOnEntry": true, // 首行断住
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/index.cjs"
    }
  ]
}
```

debug 模式启动程序
