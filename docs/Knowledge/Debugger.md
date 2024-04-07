[[toc]]

## 移动端调试

### vconsole

### 抓包

ios 可以使用 stream 软件抓包

Android 使用 Charles 抓包

### 本地调试

通过将移动端网络代理到本地 结合 whistle 来实现本地开发的调试

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
