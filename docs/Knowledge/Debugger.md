[[toc]]

## 移动端调试

### vconsole

### 抓包

ios 可以使用 stream 软件抓包

Android 使用 Charles 抓包

### 本地调试

将线上 H5 里的资源代理到本地启动的服务上, 直接本地调试

#### https 证书安装

android 端需要安装 CA 证书, 像华为从设置里搜索 证书 找到 CA 证书安装, 小米安装证书时, 凭据用途选择 vpn和应用, 且提示包含 CA 证书即可

如果安装了证书, 浏览器里仍然提示证书无效时跟浏览器有关系, 可以安装一个三方浏览器像 chrome, edge 来调试



#### WIFI 代理配置

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

## debugger 日记

### iscroll 输入框聚焦中页面无法滚动到顶部

这是一个客户提出来的 缺陷单子, 活动页有个 输入框在长页面靠下方

在唤起输入框之后, 页面没法往上拉到最上面, 没法去查看这个表单其他项目的输入内容

客户希望能唤起输入框之后, 页面能正常滚动到长页面最顶部

我看了下 我们页面滚动的实现使用的 iscroll, iscroll 已经 8 年没更新过了

项目里是 clone 过来魔改过的, 在本地调试 iscroll 代码

具体原因是因为 iscroll 滚动实现是通过 translate 偏移做的, 键盘唤起之后, 页面视口高度发生了变化

window.innerHeight 变小了, 差值正是键盘高度

研究下来的改动方案: 拉到顶有个回弹动画, 将这个回弹的极限距离加长为键盘高度, 通过魔改 iscroll 就能解决长页滚动不全的问题

键盘唤起事件, 在 android 端可以通过监听 resize 事件变化做到

但 ios 不行, 键盘唤起时 resize 事件没触发

后又换了一种实现方式, 通过 focusin、focusout 事件监听键盘的唤起收起

另外仍存在一个问题, 直接在 focusin 事件里获取 innerHeight 并不是变小之后的, 因为键盘展开有延迟, 高度变化也是有延迟的

所以再通过 触发事件来捕捉键盘展开后用户的第一次触屏交互, 在这个节点去获取键盘高度

完整代码如下:

```js
// 初始视口高度
let innerHeight = window.innerHeight

document.addEventListener('focusin', (event) => {
  const touchstartListener = () => {
    // 键盘高度
    this.keyboardImpactHeight = innerHeight - window.innerHeight
    document.removeEventListener('touchstart', touchstartListener)
  }

  document.addEventListener('touchstart', touchstartListener)
})

document.addEventListener('focusout', (event) => {
  const touchstartListener = () => {
    this.keyboardImpactHeight = innerHeight - window.innerHeight
    document.removeEventListener('touchstart', touchstartListener)
  }

  document.addEventListener('touchstart', touchstartListener)
})
```
